// src/routes/adminRoutes.js
import express from "express";
import { verifyToken } from "../middlewares/authMiddleware.js";
import { requireAdmin } from "../middlewares/requireAdmin.js";
import {
  getAdminStats,
  getAllUsersAdmin,
  deleteUserAdmin,
  updateUserRoleAdmin,
} from "../controllers/adminController.js";

const router = express.Router();

// Protect all admin routes: authenticated and admin role
router.use(verifyToken, requireAdmin);

// Admin endpoints
router.get("/stats", getAdminStats);
router.get("/users", getAllUsersAdmin);
router.delete("/users/:id", deleteUserAdmin);
router.put("/users/:id/role", updateUserRoleAdmin);

export default router;
