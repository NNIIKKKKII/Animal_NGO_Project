// animal-ngo-backend/src/controllers/rescueControllers.js
import {
  createRescueCase,
  getNearbyRescueCases,
  assignVolunteer,
  updateRescueStatus,
  getAllRescueCases,
  getRescuesByReporter,
  getRescuesAssignedToVolunteer,
} from "../models/rescueModel.js";
import pool from "../config/db.js"; // Imported for specific checks inside controller

// ----------------------------------------------------
// 📝 Create a new rescue case (Donor/General User)
// POST /api/rescue
// ----------------------------------------------------
export const createRescue = async (req, res, next) => {
  try {
    // Reporter ID is attached by the verifyToken middleware
    const reporter_user_id = req.user.id;
    const { title, description, image_url, latitude, longitude } = req.body;

    const newCase = await createRescueCase({
      title,
      description,
      image_url,
      latitude,
      longitude,
      reporter_user_id,
    });

    res.status(201).json({
      success: true,
      message: "Rescue case reported successfully",
      data: newCase,
    });
  } catch (error) {
    console.error("Create rescue case error:", error);
    next(error);
  }
};

// ----------------------------------------------------
// 🗺️ Get nearby pending rescue cases (Volunteer View)
// POST /api/rescue/nearby
// ----------------------------------------------------
export const getNearbyCases = async (req, res, next) => {
  // Requires verifyToken and checkVolunteerRole middleware
  try {
    const { latitude, longitude, radius } = req.body; // Use POST for location data privacy

    if (latitude == null || longitude == null) {
      return res
        .status(400)
        .json({ message: "Location data (latitude, longitude) is required." });
    }

    // radius is distance in meters (default 5000m = 5km)
    const cases = await getNearbyRescueCases(latitude, longitude, radius);

    res.status(200).json({
      success: true,
      count: cases.length,
      data: cases,
    });
  } catch (error) {
    console.error("Get nearby cases error:", error);
    next(error);
  }
};

// ----------------------------------------------------
// 🧑‍🚒 Assign a volunteer to a specific rescue case
// PUT /api/rescue/:id/assign
// ----------------------------------------------------
export const assignVolunteerToCase = async (req, res, next) => {
  // Requires verifyToken and checkVolunteerRole middleware
  try {
    const caseId = req.params.id;
    const volunteerId = req.user.id; // The volunteer logged in is the one assigning

    // 1. Check if the case exists and is pending
    const checkQuery = `SELECT assigned_volunteer_id, status FROM rescues WHERE id = $1`;
    const result = await pool.query(checkQuery, [caseId]);
    const rescueCase = result.rows[0];

    if (!rescueCase) {
      return res
        .status(404)
        .json({ success: false, message: "Rescue case not found" });
    }
    if (rescueCase.status !== "pending") {
      return res.status(400).json({
        success: false,
        message: `Case is already ${rescueCase.status}.`,
      });
    }

    // 2. Call the model function
    const updatedCase = await assignVolunteer(caseId, volunteerId);

    res.status(200).json({
      success: true,
      message: "Rescue case assigned to you (volunteer)",
      data: updatedCase,
    });
  } catch (error) {
    console.error("Assign volunteer error:", error);
    next(error);
  }
};

// ----------------------------------------------------
// 🔁 Update rescue case status (e.g., to 'resolved')
// PUT /api/rescue/:id/status
// ----------------------------------------------------
export const updateCaseStatus = async (req, res, next) => {
  // Requires verifyToken and validateStatusUpdate middleware
  try {
    const caseId = req.params.id;
    const { status } = req.body;
    const user_id = req.user.id; // User updating the status

    // Optional: Check if the user is the assigned volunteer (for security/logic)
    const checkAssignmentQuery = `SELECT assigned_volunteer_id FROM rescues WHERE id = $1`;
    const checkResult = await pool.query(checkAssignmentQuery, [caseId]);

    if (checkResult.rows.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Rescue case not found" });
    }

    const assignedId = checkResult.rows[0].assigned_volunteer_id;
    if (assignedId !== user_id) {
      return res.status(403).json({
        success: false,
        message:
          "You are not assigned to this case and cannot update its status",
      });
    }

    // Call the model function
    const updatedCase = await updateRescueStatus(caseId, status);

    res.status(200).json({
      success: true,
      message: `Status updated to ${status}`,
      data: updatedCase,
    });
  } catch (error) {
    console.error("Update status error:", error);
    next(error);
  }
};

// ----------------------------------------------------
// 🌐 Get all cases (For Admins/Reporting)
// GET /api/rescue
// ----------------------------------------------------
export const getCases = async (req, res, next) => {
  try {
    const cases = await getAllRescueCases();
    res.status(200).json({ success: true, data: cases });
  } catch (error) {
    console.error("Get all cases error:", error);
    next(error);
  }
};

export const getMyReportedCases = async (req, res, next) => {
  try {
    const userId = req.user.id; // Get ID from token
    const cases = await getRescuesByReporter(userId);

    res.status(200).json({
      success: true,
      count: cases.length,
      data: cases,
    });
  } catch (error) {
    console.error("Get my reported cases error:", error);
    next(error);
  }
};

export const getMyAssignedCases = async (req, res, next) => {
  try {
    const volunteerId = req.user.id; // Get ID from token (must be volunteer role)

    // Basic Role check (optional, but good practice)
    if (req.user.role !== "volunteer") {
      return res
        .status(403)
        .json({
          success: false,
          message: "Access denied. Only volunteers can view assigned cases.",
        });
    }

    const cases = await getRescuesAssignedToVolunteer(volunteerId);

    res.status(200).json({
      success: true,
      count: cases.length,
      data: cases,
    });
  } catch (error) {
    console.error("Get my assigned cases error:", error);
    next(error);
  }
};
