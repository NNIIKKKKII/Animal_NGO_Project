import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
// 1. Rename getUserById to getUserByIdModel to avoid conflict with the controller function name
import {
  findUserByEmail,
  updateUserProfile,
  getUserById as getUserByIdModel,
  updateUserLocation,
} from "../models/userModel.js";
import pool from "../config/db.js";

// Helper function to create the JWT token
const generateToken = (user) => {
  return jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

// ----------------------
// 🚨 REGISTER USER
// ----------------------
export const registerUser = async (req, res, next) => {
  try {
    const {
      name,
      email,
      password,
      role,
      phone_number,
      address,
      latitude,
      longitude,
    } = req.body;

    if (
      !name ||
      !email ||
      !password ||
      !role ||
      !phone_number ||
      !address ||
      latitude == null ||
      longitude == null
    ) {
      return res
        .status(400)
        .json({ message: "All fields including location are required" });
    }

    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return res.status(409).json({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const insertQuery = `
      INSERT INTO users (name, email, password, role, phone_number, address, location)
      VALUES ($1, $2, $3, $4, $5, $6, ST_SetSRID(ST_MakePoint($7, $8), 4326)::geography)
      RETURNING id, name, email, role, address, phone_number,
        ST_X(location::geometry) as longitude, ST_Y(location::geometry) as latitude; 
    `;

    const values = [
      name,
      email,
      hashedPassword,
      role,
      phone_number,
      address,
      longitude,
      latitude,
    ];
    const { rows } = await pool.query(insertQuery, values);
    const newUser = rows[0];

    const token = generateToken(newUser);
    res.status(201).json({
      message: "User registered successfully",
      user: newUser,
      token,
    });
  } catch (error) {
    console.error("Registration error:", error.message);
    next(error);
  }
};

// ----------------------
// 🔑 LOGIN USER
// ----------------------
export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user);

    const userResponse = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    res.status(200).json({
      message: "Login successful",
      user: userResponse,
      token,
    });
  } catch (error) {
    console.error("Login error:", error.message);
    next(error);
  }
};

// ----------------------
// 👤 GET USER BY ID (New Function)
// ----------------------
export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    // Call the renamed model function
    const user = await getUserByIdModel(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Remove password from response if it exists
    delete user.password;

    res.status(200).json({ user }); // Ensure frontend expects { user: ... } or adjust to just json(user)
  } catch (error) {
    console.error("Get User Error:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ----------------------
// ✏️ UPDATE USER
// ----------------------
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const authUserId = req.user.id;

    if (String(id) !== String(authUserId)) {
      return res
        .status(403)
        .json({ message: "Forbidden: You can only update your own profile." });
    }

    const { name, phone_number, address } = req.body;

    if (!name || !phone_number || !address) {
      return res
        .status(400)
        .json({ message: "Name, phone number, and address are required." });
    }

    const updatedUser = await updateUserProfile(authUserId, {
      name,
      phone_number,
      address,
    });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json({
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Profile update error:", error);
    res
      .status(500)
      .json({ message: "Error updating profile", error: error.message });
  }
};

export const setUserLocation = async (req, res, next) => {
  const { latitude, longitude } = req.body;
  const userId = req.user.id; // Get user ID from the authentication token

  if (typeof latitude === "undefined" || typeof longitude === "undefined") {
    return res.status(400).json({
      success: false,
      message: "Missing latitude or longitude in request body.",
    });
  }

  try {
    const success = await updateUserLocation(userId, latitude, longitude);

    if (success) {
      res.status(200).json({
        success: true,
        message: "User location updated successfully.",
        location: { latitude, longitude },
      });
    } else {
      // This might happen if the user ID from the token doesn't exist
      res.status(404).json({
        success: false,
        message: "User not found or location update failed.",
      });
    }
  } catch (error) {
    console.error("Error updating user location:", error);
    next(error);
  }
};

// ----------------------
// 🔑 FORGOT PASSWORD
// ----------------------
export const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate reset token (JWT) with 15-minute expiry
    const resetToken = jwt.sign(
      { id: user.id, purpose: "reset" },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );

    // Calculate expiry timestamp (15 minutes from now)
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

    // Store token and expiry in database
    const updateQuery = `
      UPDATE users
      SET reset_token = $1, reset_token_expires = $2
      WHERE id = $3
    `;
    await pool.query(updateQuery, [resetToken, expiresAt, user.id]);

    res.status(200).json({
      message: "Reset token generated successfully",
      resetToken,
    });
  } catch (error) {
    console.error("Forgot password error:", error.message);
    next(error);
  }
};

// ----------------------
// 🔐 RESET PASSWORD
// ----------------------
export const resetPassword = async (req, res, next) => {
  try {
    const { token, newPassword } = req.body;

    if (!token || !newPassword) {
      return res
        .status(400)
        .json({ message: "Token and new password are required" });
    }

    // Verify JWT token
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return res
        .status(401)
        .json({ message: "Invalid or expired token" });
    }

    // Check purpose
    if (decoded.purpose !== "reset") {
      return res.status(401).json({ message: "Invalid token purpose" });
    }

    // Look up user and check stored token
    const userQuery = `
      SELECT id, reset_token, reset_token_expires
      FROM users
      WHERE id = $1
    `;
    const { rows } = await pool.query(userQuery, [decoded.id]);
    const user = rows[0];

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if stored token matches
    if (user.reset_token !== token) {
      return res.status(401).json({ message: "Token mismatch" });
    }

    // Check if token is expired
    if (new Date() > new Date(user.reset_token_expires)) {
      return res.status(401).json({ message: "Reset token has expired" });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update password and clear reset token fields
    const updateQuery = `
      UPDATE users
      SET password = $1, reset_token = NULL, reset_token_expires = NULL
      WHERE id = $2
    `;
    await pool.query(updateQuery, [hashedPassword, user.id]);

    res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    console.error("Reset password error:", error.message);
    next(error);
  }
};

// // Placeholders
// export const setUserLocation = (req, res) =>
//   res.status(501).json({ message: "Not Implemented Yet" });
export const getNearbyUsers = (req, res) =>
  res.status(501).json({ message: "Not Implemented Yet" });
export const logoutUser = (req, res) =>
  res.status(501).json({ message: "Not Implemented Yet" });
export const getAllUsers = (req, res) =>
  res.status(501).json({ message: "Not Implemented Yet" });
export const deleteUser = (req, res) =>
  res.status(501).json({ message: "Not Implemented Yet" });
