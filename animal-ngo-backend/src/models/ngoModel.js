import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import pool from "../config/db.js";

export const createNgo = async (ngo) => {
  const query = `
    INSERT INTO ngos
    (name, email, password, phone_number, address, registration_number, description)
    VALUES ($1,$2,$3,$4,$5,$6,$7)
    RETURNING id, name, email, is_verified;
  `;
  const values = [
    ngo.name,
    ngo.email,
    ngo.password,
    ngo.phone_number,
    ngo.address,
    ngo.registration_number,
    ngo.description,
  ];

  const { rows } = await pool.query(query, values);
  return rows[0];
};

export const findNgoByEmail = async (email) => {
  const { rows } = await pool.query("SELECT * FROM ngos WHERE email = $1", [
    email,
  ]);
  return rows[0];
};

const generateNgoToken = (ngo) => {
  return jwt.sign({ id: ngo.id, role: "ngo" }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

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

    if (!ngo.is_verified) {
      return res.status(403).json({
        message: "NGO not verified yet by admin",
      });
    }

    const token = generateNgoToken(ngo);

    res.json({
      message: "Login successful",
      token,
      ngo: {
        id: ngo.id,
        name: ngo.name,
        email: ngo.email,
        role: "ngo",
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Login failed" });
  }
};

export const getNgoById = async (id) => {
  const query = `SELECT * FROM ngos WHERE id = $1;`;
  const { rows } = await pool.query(query, [id]);
  return rows[0];
};
