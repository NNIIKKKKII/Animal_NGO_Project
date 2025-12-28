import { createLostPet, getAllLostPets } from "../models/lostPetModel.js";

// import { createLostPet } from "../models/lostPetModel.js";

export const reportLostPet = async (req, res) => {
  try {
    const { owner_name, owner_phone, last_seen, description } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Image required" });
    }

    const image_url = `/uploads/lost-pets/${req.file.filename}`;

    const lostPet = await createLostPet({
      owner_name,
      owner_phone,
      last_seen,
      description,
      image_url,
      created_by: req.user?.id || null,
    });

    res.status(201).json(lostPet);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to report lost pet" });
  }
};

export const fetchLostPets = async (req, res) => {
  try {
    const pets = await getAllLostPets();
    res.json({ data: pets });
  } catch (err) {
    res.status(500).json({ message: "Failed to load lost pets" });
  }
};
