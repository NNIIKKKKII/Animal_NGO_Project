import pool from "../config/db.js";

export const createRescueTable = async () => {
  try {
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
        CREATE TABLE IF NOT EXISTS rescues(
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        image_url VARCHAR(500),
        location GEOGRAPHY(Point, 4326) NOT NULL,
        reporter_user_id INTEGER NOT NULL REFERENCES users(id),
        assigned_volunteer_id INTEGER REFERENCES users(id),
        status rescue_status DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT NOW()
        );`;

    try {
      await pool.query(query);
      console.log("Rescue table created successfully!");
    } catch (error) {
      console.error("Error creating rescue table", error);
    }

    const queryOfIndexes = [
      `CREATE INDEX IF NOT EXISTS rescue_cases_location_idx on rescues USING GIST(location);`,
      `CREATE INDEX IF NOT EXISTS rescue_cases_status_idx on rescues(status);`,
      `CREATE INDEX IF NOT EXISTS rescue_cases_created_at_idx ON rescues(created_at);`,
    ];

    try {
      for (const query of queryOfIndexes) {
        await pool.query(query);
      }
      console.log("Indexes created successfully!");
    } catch (error) {
      console.error("Error creating indexes", error);
    }
  } catch (error) {
    console.error(
      "Error somewhere in creating createRescueTable.js file in data folder",
      error
    );
  }
};
