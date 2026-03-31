import dotenv from "dotenv";
import pkg from "pg";

dotenv.config();
const { Pool } = pkg;

const pool = new Pool(
  process.env.DATABASE_URL
    ? {
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
    }
    : {
      user: process.env.DB_USER,
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      password: process.env.DB_PASSWORD,
      port: process.env.DB_PORT,
    }
);

pool.on("connect", () => {
  console.log("✅ Connected to PostgreSQL");
});

pool
  .query("SELECT 1")
  .then(() => console.log("✅ DB test query passed"))
  .catch((err) => console.error("❌ DB test failed:", err.message));

export default pool;