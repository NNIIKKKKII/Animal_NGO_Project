// src/routes/adminRoutes.js
import express from "express";
import { verifyToken } from "../middlewares/authMiddleware.js";
import { requireAdmin } from "../middlewares/requireAdmin.js";
import {
  getAdminStats,
  getAllUsersAdmin,
  deleteUserAdmin,
  updateUserRoleAdmin,
  getAllRescuesAdmin,
  assignVolunteerAdmin,
} from "../controllers/adminController.js";

const router = express.Router();

// Every admin route requires authentication + admin role
router.use(verifyToken, requireAdmin);

router.get("/stats", getAdminStats);
router.get("/users", getAllUsersAdmin);
router.delete("/users/:id", deleteUserAdmin);
router.put("/users/:id/role", updateUserRoleAdmin);
router.get("/rescues", getAllRescuesAdmin);
router.patch("/rescues/:id/assign", assignVolunteerAdmin);

export default router;