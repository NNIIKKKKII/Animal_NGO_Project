import pool from "../config/db.js";

// @param {string} email
// @returns {object}

export const findUserByEmail = async (email) => {
  const result = await pool.query("SELECT * FROM users WHERE email = $1;", [
    email,
  ]);
  return result.rows[0];
};

export const createUser = async (
  name,
  email,
  hashedPassword,
  role,
  phone_number,
  address
) => {
  const result = await pool.query(
    "INSERT INTO users (name, email, password, role, phone_number, address) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id, name ,email, role, phone_number, address;",
    [name, email, hashedPassword, role, phone_number, address]
  );
  return result.rows[0];
};
