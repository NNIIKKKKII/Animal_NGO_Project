import express from "express";
import cloudinary from "../config/cloudinary.js";
import multer from "multer";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post("/cloudinary-test", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const result = await cloudinary.uploader.upload(
      `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`,
      { folder: "test" }
    );

    res.json({
      success: true,
      url: result.secure_url,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Cloudinary failed" });
  }
});

export default router;
