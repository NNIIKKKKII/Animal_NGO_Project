import express from "express";
import {
  registerNgo,
  loginNgo,
  getNgoProfile,
} from "../controllers/ngoController.js";

const router = express.Router();

router.post("/register", registerNgo);
router.post("/login", loginNgo);
router.get("/:id", getNgoProfile); // PUBLIC

export default router;
