import "dotenv/config";

import dotenv from "dotenv";
dotenv.config(); // 👈 REQUIRED

import express from "express";
import cors from "cors";

import paymentRoutes from "./src/routes/paymentRoutes.js";
import userRoutes from "./src/routes/userRoutes.js";
import rescueRoutes from "./src/routes/rescueRoutes.js";
import donationRoutes from "./src/routes/donationRoutes.js";
import adminRoutes from "./src/routes/adminRoutes.js";

import { createUserTable } from "./src/data/createUserTable.js";
import { createDonationRequestsTable } from "./src/data/createDonationReqTable.js";
import { createRescueTable } from "./src/data/createRescueTable.js";

const app = express();
const port = process.env.PORT || 5000;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

// --- Routes ---
app.use("/api/users", userRoutes);
app.use("/api/rescue", rescueRoutes);
app.use("/api/donations", donationRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/payments", paymentRoutes);

// --- Health ---
app.get("/", (req, res) => {
  res.send("Animal NGO API is running ....");
});

app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

// --- DB setup ---
async function runDBMigrations() {
  try {
    await createUserTable();
    await createDonationRequestsTable();
    await createRescueTable();
    console.log("✅ All DATABASES checked!");
  } catch (error) {
    console.error("❌ Database setup failed:", error);
  }
}

runDBMigrations().then(() => {
  app.listen(port, () => {
    console.log(`🚀 Server running on http://localhost:${port}`);
  });
});
