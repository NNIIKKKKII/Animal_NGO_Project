import {
  createDonationRequest,
  getAllDonationRequests,
  updateDonationStatus,
  getDonationById,
  deleteDonation,
} from "../models/donationModel.js";



export const createDonation = async (req, res) => {
  try {
    const { title, description } = req.body;
    // User ID is retrieved from the JWT token attached by verifyToken middleware
    const user_id = req.user.id;

    if (!title || !description) {
      return res
        .status(400)
        .json({ message: "Title and description are required." });
    }

    const donation = await createDonationRequest({
      user_id,
      title,
      description,
    });
    res
      .status(201)
      .json({ message: "Donation request created", data: donation });
  } catch (error) {
    // Use the next() function for proper error handling if needed, but for simple errors, 500 is fine.
    res.status(500).json({
      message: "Failed to create donation request",
      error: error.message,
    });
  }
};

export const getAllDonations = async (req, res) => {
  try {
    const donations = await getAllDonationRequests();
    res.status(200).json({ data: donations });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching donations", error: error.message });
  }
};

export const getDonation = async (req, res) => {
  try {
    const { id } = req.params;
    const donation = await getDonationById(id);
    if (!donation)
      return res.status(404).json({ message: "Donation not found" });
    res.status(200).json({ data: donation });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching donation", error: error.message });
  }
};

export const updateDonation = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["pending", "cancelled", "completed"].includes(status)) {
      res.status(400).json({
        message:
          "Invalid status provided. Must be pending, or cancelled or completed",
      });
    }

    const update = await updateDonationStatus(id, status);
    if (!update) {
      return res.status(404).json({ message: "Donation not found" });
    }
    res
      .status(200)
      .json({ message: "Donation status updated successfully", data: update });
  } catch (error) {
    res.status(500).json({
      message: "Error updating donation status",
      error: error.message,
    });
  }
};

export const deleteDonationRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await deleteDonation(id);
    if (!deleted)
      return res.status(404).json({ message: "Donation not found" });

    res.status(200).json({
      message: "Donation request deleted successfully",
      data: deleted,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting donation request",
      error: error.message,
    });
  }
};
