import {
  createLostPet,
  getAllLostPets,
  getLostPetById,
  deleteLostPetById,
} from "../models/lostPetModel.js";
import cloudinary from "../config/cloudinary.js";

export const reportLostPet = async (req, res) => {
  try {
    const { owner_name, owner_phone, last_seen, description } = req.body;

    // these are called form validation
    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

    if (!/^[0-9]{10}$/.test(owner_phone)) {
      return res.status(400).json({ message: "Invalid phone number" });
    }

    const image_url = req.file.path;
    const image_public_id = req.file.filename; // 👈 Cloudinary public_id

    if (!owner_name || !owner_phone || !last_seen || !description) {
      return res.status(400).json({ message: "All fields are required" });
    }
    // these are called form validation

    const lostPet = await createLostPet({
      owner_name,
      owner_phone,
      last_seen,
      description,
      image_url,
      image_public_id,
      created_by: req.user?.id || null, // optional
    });

    res.status(201).json({
      message: "Lost pet reported successfully",
      data: lostPet,
    });
  } catch (error) {
    console.error("Lost pet error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const fetchLostPets = async (req, res) => {
  try {
    const pets = await getAllLostPets();
    res.status(200).json({ data: pets });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteLostPet = async (req, res) => {
  try {
    const { id } = req.params;

    const pet = await getLostPetById(id);
    if (!pet) {
      return res.status(404).json({ message: "Lost pet not found" });
    }

    // 🔥 Cloudinary cleanup
    if (pet.image_public_id) {
      await cloudinary.uploader.destroy(pet.image_public_id);
    }

    await deleteLostPetById(id);

    res.status(200).json({
      message: "Lost pet deleted successfully",
    });
  } catch (error) {
    console.error("Delete lost pet error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
