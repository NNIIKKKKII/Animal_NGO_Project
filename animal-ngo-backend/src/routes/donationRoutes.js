import express from "express";

import {
  createDonation,
  getAllDonations,
  updateDonation,
  deleteDonationRequest,
  getDonation,
} from "../controllers/donationController.js";

import { verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();
// POST /api/donations - Create donation request (Requires login)
router.post("/", verifyToken, createDonation);

// GET /api/donations - Get all (Public feed)
router.get("/", getAllDonations);

// GET /api/donations/:id - Get one (Public)
router.get("/:id", getDonation);

// PATCH /api/donations/:id - Update status (Requires login, typically restricted to admins/reporters)
router.patch("/:id", verifyToken, updateDonation);

// DELETE /api/donations/:id - Delete (Requires login, typically restricted to admins/reporters)
router.delete("/:id", verifyToken, deleteDonationRequest);

console.log("Donation routes loaded!");


export default router;
