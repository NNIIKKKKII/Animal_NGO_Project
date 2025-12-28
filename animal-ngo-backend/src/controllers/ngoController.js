import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  createNgo,
  findNgoByEmail,
  getNgoById,
} from "../models/ngoModel.js";

export const registerNgo = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      phone_number,
      address,
      registration_number,
      description,
    } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    const existingNgo = await findNgoByEmail(email);
    if (existingNgo) {
      return res.status(409).json({ message: "NGO already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const ngo = await createNgo({
      name,
      email,
      password: hashedPassword,
      phone_number,
      address,
      registration_number,
      description,
    });

    res.status(201).json({
      message: "NGO registered successfully. Await verification.",
      ngo,
    });
  } catch (error) {
    console.error("NGO registration error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getNgoProfile = async (req, res) => {
  try {
    const ngo = await getNgoById(req.params.id);
    if (!ngo) {
      return res.status(404).json({ message: "NGO not found" });
    }
    res.json({ ngo });
  } catch (error) {
    res.status(500).json({ message: "Error fetching NGO profile" });
  }
};
// src/controllers/ngoController.js

export const loginNgo = async (req, res) => {
  try {
    const { email, password } = req.body;

    const ngo = await findNgoByEmail(email);
    if (!ngo) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, ngo.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: ngo.id, role: "ngo" },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      ngo: {
        id: ngo.id,
        name: ngo.name,
        email: ngo.email,
      },
    });
  } catch (err) {
    console.error("NGO login error:", err);
    res.status(500).json({ message: "Login failed" });
  }
};
