import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
// 1. Rename getUserById to getUserByIdModel to avoid conflict with the controller function name
import {
  findUserByEmail,
  updateUserProfile,
  getUserById as getUserByIdModel,
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

// Placeholders
export const setUserLocation = (req, res) =>
  res.status(501).json({ message: "Not Implemented Yet" });
export const getNearbyUsers = (req, res) =>
  res.status(501).json({ message: "Not Implemented Yet" });
export const logoutUser = (req, res) =>
  res.status(501).json({ message: "Not Implemented Yet" });
export const getAllUsers = (req, res) =>
  res.status(501).json({ message: "Not Implemented Yet" });
export const deleteUser = (req, res) =>
  res.status(501).json({ message: "Not Implemented Yet" });
