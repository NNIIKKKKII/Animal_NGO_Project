import dotenv from "dotenv";
dotenv.config();

import path from "path";
import { fileURLToPath } from "url";
import express from "express";
import cors from "cors";

// --- Path helpers ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// --- Routes ---
import paymentRoutes from "./src/routes/paymentRoutes.js";
import userRoutes from "./src/routes/userRoutes.js";
import rescueRoutes from "./src/routes/rescueRoutes.js";
import donationRoutes from "./src/routes/donationRoutes.js";
import adminRoutes from "./src/routes/adminRoutes.js";
import ngoRoutes from "./src/routes/ngoRoutes.js";
import lostPetRoutes from "./src/routes/lostPetRoutes.js";

// --- DB setup ---
import { createUserTable } from "./src/data/createUserTable.js";
import { createDonationRequestsTable } from "./src/data/createDonationReqTable.js";
import { createRescueTable } from "./src/data/createRescueTable.js";
import { createNgoTable } from "./src/data/createNgoTable.js";
import { createLostPetsTable } from "./src/data/createLostPetsTable.js";

const app = express();
const port = process.env.PORT || 5000;

// --- CORS (LOCAL + RENDER) ---
const allowedOrigins = ["http://localhost:5173", process.env.FRONTEND_URL];

app.use(
  cors({
    origin: true, // 👈 allow all origins dynamically
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.options("*", cors());

app.use(express.json());

// --- Static uploads ---
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// --- Routes ---
app.use("/api/users", userRoutes);
app.use("/api/rescue", rescueRoutes);
app.use("/api/donations", donationRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/ngos", ngoRoutes);
app.use("/api/lost-pets", lostPetRoutes);

// --- Health ---
app.get("/", (req, res) => {
  res.send("Animal NGO API is running ....");
});

app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

// --- DB migrations ---
async function runDBMigrations() {
  try {
    await createUserTable();
    await createDonationRequestsTable();
    await createRescueTable();
    await createNgoTable();
    await createLostPetsTable();
    console.log("✅ All DATABASES checked!");
  } catch (error) {
    console.error("❌ Database setup failed:", error);
  }
}

runDBMigrations().then(() => {
  app.listen(port, () => {
    console.log(`🚀 Server running on port ${port}`);
  });
});
