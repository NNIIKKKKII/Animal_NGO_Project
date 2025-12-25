import { razorpay } from "../services/razorpayService.js";
import {
  createDonationRequest,
  getAllDonationRequests,
  updateDonationStatus,
  getDonationById,
  deleteDonation,
} from "../models/donationModel.js";

export const createDonation = async (req, res) => {
  console.log("Create Donation Request - User:", req.user);
  console.log("Create Donation Request - Body:", req.body);
  try {
    const { title, description } = req.body;

    // 1. Debugging: Log what we received
    console.log("Create Donation Request - User:", req.user);
    console.log("Create Donation Request - Body:", req.body);

    // 2. Safety Check: Ensure user is logged in
    if (!req.user || !req.user.id) {
      return res
        .status(401)
        .json({ message: "User not authenticated or ID missing." });
    }

    const user_id = req.user.id;

    // 3. Validation: Ensure title/desc exist
    if (!title || !description) {
      return res
        .status(400)
        .json({ message: "Title and description are required" });
    }

    const donation = await createDonationRequest({
      user_id,
      title,
      description,
    });

    // 4. Success Response
    return res
      .status(201)
      .json({ message: "Donation request created", data: donation });
  } catch (error) {
    // 5. Log the ACTUAL error to your terminal so you can see it
    console.error("❌ Donation Creation Error:", error);
    return res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
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


export const createRazorpayOrder = async (req, res) => {
  try {
    const { amount } = req.body;

    const order = await razorpay.orders.create({
      amount: amount * 100, // ₹ → paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    });

    res.status(200).json(order);
  } catch (error) {
    console.error("Razorpay order error:", error);
    res.status(500).json({ message: "Payment order failed" });
  }
};
