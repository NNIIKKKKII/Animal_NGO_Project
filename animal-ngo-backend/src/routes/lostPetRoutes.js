import express from "express";
import {
  reportLostPet,
  fetchLostPets,
} from "../controllers/lostPetController.js";
import { uploadLostPetImage } from "../middlewares/uploadLostPet.js";

const router = express.Router();

// POST → report lost pet
router.post(
  "/report",
  uploadLostPetImage.single("image"),
  reportLostPet
);

// ✅ GET → fetch all lost pets
router.get("/", fetchLostPets);

export default router;
