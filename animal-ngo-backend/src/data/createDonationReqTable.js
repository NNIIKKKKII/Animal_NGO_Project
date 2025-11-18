import pool from "../config/db.js";

export const createDonationRequestsTable = async () => {
  const enumExistsQuery = `SELECT 1 FROM pg_type WHERE typname = 'rescue_status';`;
  const enumExistsResult = await pool.query(enumExistsQuery);

  if (enumExistsResult.rowCount === 0) {
    await pool.query(
      `CREATE TYPE rescue_status AS ENUM ('pending', 'assigned', 'resolved');`
    );
    console.log("✅ Rescue status enum created");
  } else {
    console.log("Rescue status enum already exists");
  }

  const query = `
        CREATE TABLE IF NOT EXISTS donation_requests(
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        category TEXT,
        status rescue_status DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );`;

  try {
    await pool.query(query);
    console.log("Donation Request Table created successfully");
  } catch (error) {
    console.log("Ërror in creating donation Request Table ", error.message);
  }
};
