import dotenv from "dotenv";
import pkg from "pg";

dotenv.config();
const { Pool } = pkg;

const isProduction = process.env.NODE_ENV === "production";

const validateEnv = (mode) => {
  if (mode === "database url") {
    if (!process.env.DATABASE_URL) {
      throw new Error("DATABASE_URL is required when NODE_ENV=production.");
    }
    return;
  }

  const requiredLocalKeys = [
    "DB_USER",
    "DB_HOST",
    "DB_NAME",
    "DB_PASSWORD",
    "DB_PORT",
  ];

  const missingKeys = requiredLocalKeys.filter((key) => !process.env[key]);

  if (missingKeys.length > 0) {
    throw new Error(
      `Local database config is incomplete. Missing: ${missingKeys.join(", ")}`
    );
  }
};

const dbMode = isProduction ? "database url" : "local config";
validateEnv(dbMode);

const poolConfig =
  dbMode === "database url"
    ? {
        connectionString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false },
      }
    : {
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        password: process.env.DB_PASSWORD,
        port: Number(process.env.DB_PORT),
      };

console.log(`PostgreSQL connection mode: ${dbMode}`);

const pool = new Pool(poolConfig);

pool.on("connect", () => {
  console.log("Connected to PostgreSQL");
});

pool
  .query("SELECT 1")
  .then(() => console.log("DB test query passed"))
  .catch((err) => console.error("DB test failed:", err.message));

export default pool;
