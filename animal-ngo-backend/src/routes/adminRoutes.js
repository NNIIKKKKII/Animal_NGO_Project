import express from "express";
import { verifyToken } from "../middlewares/authMiddleware.js";
import { requireAdmin } from "../middlewares/requireAdmin.js";
import { getAdminStats, getAllUsersAdmin } from "../controllers/adminController.js";

const router = express.Router();

router.use(verifyToken, requireAdmin);

router.get("/stats", getAdminStats);
router.get("/users", getAllUsersAdmin);

export default router;
