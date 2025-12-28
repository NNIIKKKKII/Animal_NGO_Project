import pool from "../config/db.js";

export const createNgoTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS ngos (
      id SERIAL PRIMARY KEY,
      name VARCHAR(150) NOT NULL,
      email VARCHAR(150) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      phone_number VARCHAR(20),
      address TEXT,
      registration_number VARCHAR(100),
      description TEXT,
      is_verified BOOLEAN DEFAULT false,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
  try {
    await pool.query(query);
  } catch (err) {
    console.error("Error creating NGO table", err);
  }
};
