// animal-ngo-backend/src/controllers/userController.js
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { findUserByEmail } from '../models/userModel.js';
import pool from "../config/db.js"; // Needed for the location insert query

// Helper function to create the JWT token
const generateToken = (user) => {
  return jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

// ----------------------
// 🚨 REGISTER USER (POST /api/users/register)
// ----------------------
export const registerUser = async (req, res, next) => {
  try {
    const { name, email, password, role, phone_number, address, latitude, longitude } = req.body;

    // 1. Basic Validation
    if (!name || !email || !password || !role || !phone_number || !address || latitude == null || longitude == null) {
      return res.status(400).json({ message: 'All fields including location are required' });
    }

    // 2. Check for existing user
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return res.status(409).json({ message: 'Email already registered' });
    }

    // 3. Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4. Insert user and location using PostGIS (ST_MakePoint, ST_SetSRID)
    const insertQuery = `
      INSERT INTO users (name, email, password, role, phone_number, address, location)
      VALUES ($1, $2, $3, $4, $5, $6, ST_SetSRID(ST_MakePoint($7, $8), 4326)::geography)
      RETURNING id, name, email, role, address, phone_number,
        ST_X(location::geometry) as longitude, ST_Y(location::geometry) as latitude; 
    `;

    // Note: ST_MakePoint takes (longitude, latitude)
    const values = [name, email, hashedPassword, role, phone_number, address, longitude, latitude];
    const { rows } = await pool.query(insertQuery, values);
    const newUser = rows[0];

    // 5. Generate Token and respond
    const token = generateToken(newUser);
    res.status(201).json({ 
      message: 'User registered successfully', 
      user: newUser, 
      token 
    });

  } catch (error) {
    console.error("Registration error:", error.message);
    // 500 error will be caught by Express default error handler or you can create a custom one
    next(error); 
  }
};

// ----------------------
// 🔑 LOGIN USER (POST /api/users/login)
// ----------------------
export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // 1. Find user
    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // 2. Compare password hash
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // 3. Generate Token and respond
    const token = generateToken(user);
    
    // Create a user object without the password
    const userResponse = { 
        id: user.id, 
        name: user.name, 
        email: user.email, 
        role: user.role 
    };

    res.status(200).json({ 
      message: 'Login successful', 
      user: userResponse, 
      token 
    });

  } catch (error) {
    console.error("Login error:", error.message);
    next(error);
  }
};

// Implement placeholder functions from userRoutes.js (to avoid errors)
export const getUserById = (req, res) => res.status(501).json({ message: "Not Implemented Yet" });
export const updateUser = (req, res) => res.status(501).json({ message: "Not Implemented Yet" });
export const setUserLocation = (req, res) => res.status(501).json({ message: "Not Implemented Yet" });
export const getNearbyUsers = (req, res) => res.status(501).json({ message: "Not Implemented Yet" });
export const logoutUser = (req, res) => res.status(501).json({ message: "Not Implemented Yet" });
export const getAllUsers = (req, res) => res.status(501).json({ message: "Not Implemented Yet" });
export const deleteUser = (req, res) => res.status(501).json({ message: "Not Implemented Yet" });