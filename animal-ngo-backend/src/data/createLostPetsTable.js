import pool from "../config/db.js";

export const createLostPetsTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS lost_pets (
      id SERIAL PRIMARY KEY,
      owner_name VARCHAR(100) NOT NULL,
      owner_phone VARCHAR(20) NOT NULL,
      last_seen TEXT NOT NULL,
      description TEXT NOT NULL,
      image_url TEXT NOT NULL,
      created_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
      created_at TIMESTAMP DEFAULT NOW()
    );
  `;

  try {
    await pool.query(query);

    // 🔹 Ensure description exists even if table was created earlier
    await pool.query(`
      ALTER TABLE lost_pets
      ADD COLUMN IF NOT EXISTS description TEXT NOT NULL DEFAULT '';
    `);

    console.log("lost_pets table ready");
  } catch (err) {
    console.error("Error creating/updating lost_pets table:", err);
  }
};
