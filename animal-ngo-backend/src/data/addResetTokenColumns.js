import pool from "../config/db.js";

export const addResetTokenColumns = async () => {
  const query = `
    ALTER TABLE users
    ADD COLUMN IF NOT EXISTS reset_token TEXT,
    ADD COLUMN IF NOT EXISTS reset_token_expires TIMESTAMP;
  `;

  try {
    await pool.query(query);
    console.log("Reset token columns added or already exist");
  } catch (error) {
    console.error("Error adding reset token columns:", error.message);
  }
};
