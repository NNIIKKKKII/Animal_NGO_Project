// animal-ngo-backend/src/routes/rescueRoutes.js
import express from "express";
import { verifyToken } from "../middlewares/authMiddleware.js";
import {
  checkVolunteerRole,
  validateRescueCase,
  validateStatusUpdate,
} from "../middlewares/validation.js";

import {
  createRescue,
  getNearbyCases,
  assignVolunteerToCase,
  updateCaseStatus,
  getCases,
  getMyReportedCases,
  getMyAssignedCases,
} from "../controllers/rescueController.js";

const router = express.Router();

// -------------------- Donor/Public Routes --------------------

// POST /api/rescue → Create rescue case
// Requires token (to get reporter_user_id) and validation
router.post("/", verifyToken, validateRescueCase, createRescue);

// -------------------- Volunteer Routes --------------------

// POST /api/rescue/nearby → Get cases near the volunteer's current location
// Requires token and role check. Uses POST for location privacy.
router.post("/nearby", verifyToken, checkVolunteerRole, getNearbyCases);

// PUT /api/rescue/:id/assign → Assign volunteer to a pending case
// Requires token and role check.
router.put(
  "/:id/assign",
  verifyToken,
  checkVolunteerRole,
  assignVolunteerToCase
);

// PUT /api/rescue/:id/status → Update case status (e.g., 'resolved')
// Requires token and status validation.
router.put("/:id/status", verifyToken, validateStatusUpdate, updateCaseStatus);

// -------------------- Admin/General Routes --------------------

// GET /api/rescue → Get all cases (Can be restricted to Admin/Superuser later)
router.get("/", verifyToken, getCases);

router.get("/my-reports", verifyToken, getMyReportedCases);

router.get("/my-assigned", verifyToken, getMyAssignedCases);

export default router;
