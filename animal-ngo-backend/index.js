import dotenv from "dotenv";
dotenv.config();

import path from "path";
import { fileURLToPath } from "url";
import express from "express";
import cors from "cors";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import paymentRoutes from "./src/routes/paymentRoutes.js";
import userRoutes from "./src/routes/userRoutes.js";
import rescueRoutes from "./src/routes/rescueRoutes.js";
import donationRoutes from "./src/routes/donationRoutes.js";
import adminRoutes from "./src/routes/adminRoutes.js";
import ngoRoutes from "./src/routes/ngoRoutes.js";
import lostPetRoutes from "./src/routes/lostPetRoutes.js";

import { createUserTable } from "./src/data/createUserTable.js";
import { createDonationRequestsTable } from "./src/data/createDonationReqTable.js";
import { createRescueTable } from "./src/data/createRescueTable.js";
import { createNgoTable } from "./src/data/createNgoTable.js";
import { createLostPetsTable } from "./src/data/createLostPetsTable.js";
import { addResetTokenColumns } from "./src/data/addResetTokenColumns.js";

import testRoutes from "./src/routes/testRoutes.js";

const app = express();
const port = process.env.PORT || 5000;

app.use(
  cors({
    origin: true,
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/users", userRoutes);
app.use("/api/rescue", rescueRoutes);
app.use("/api/donations", donationRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/ngos", ngoRoutes);
app.use("/api/lost-pets", lostPetRoutes);
app.use("/api/test", testRoutes);

app.use((err, req, res, next) => {
  console.error("SERVER ERROR:", err);
  res.status(500).json({
    message: "Internal server error",
    error: err.message,
  });
});

app.get("/", (req, res) => {
  res.send("Animal NGO API is running ....");
});

app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

async function runDBMigrations() {
  await createUserTable();
  await createDonationRequestsTable();
  await createRescueTable();
  await createNgoTable();
  await createLostPetsTable();
  await addResetTokenColumns();
  console.log("All DATABASES checked!");
}

async function startServer() {
  try {
    await runDBMigrations();
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.error("Database setup failed:", error);
    process.exit(1);
  }
}

startServer();
