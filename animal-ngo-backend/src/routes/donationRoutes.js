import express from "express";
import { verifyToken } from "../middlewares/authMiddleware.js"; // ⬅️ IMPORT THIS
import {
  createDonation,
  getAllDonations,
  getDonation,
  updateDonation,
  deleteDonationRequest,
} from "../controllers/donationController.js";
const router = express.Router();

// 🚨 CRITICAL FIX: Add 'verifyToken' here!
// Without this, req.user is undefined, and the database crashes (500 Error).
router.post("/", verifyToken, createDonation);

router.get("/", getAllDonations);
router.get("/:id", getDonation);
router.patch("/:id", verifyToken, updateDonation);
router.delete("/:id", verifyToken, deleteDonationRequest);

export default router;
