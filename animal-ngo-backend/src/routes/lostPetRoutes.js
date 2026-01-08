import express from "express";
import {
  reportLostPet,
  fetchLostPets,
  deleteLostPet,
} from "../controllers/lostPetController.js";
import { uploadLostPetImage } from "../middlewares/uploadLostPetImage.js";

const router = express.Router();

// POST → report lost pet
router.post("/report", uploadLostPetImage.single("image"), reportLostPet);

// ✅ GET → fetch all lost pets
router.get("/", fetchLostPets);

router.delete("/:id", deleteLostPet);

export default router;
