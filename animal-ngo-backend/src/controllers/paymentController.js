import razorpay from "../config/razorpay.js";
import crypto from "crypto";

export const createOrder = async (req, res) => {
  try {
    // 🔐 Guard: Razorpay not configured
    if (!razorpay) {
      return res.status(503).json({
        message: "Payment service not configured",
      });
    }

    const { amount } = req.body;

    if (!amount || Number(amount) <= 0) {
      return res.status(400).json({ message: "Invalid amount" });
    }

    const order = await razorpay.orders.create({
      amount: Math.round(Number(amount) * 100), // INR → paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    });

    res.status(200).json(order);
  } catch (error) {
    console.error("❌ Razorpay order error:", error);
    res.status(500).json({ message: "Failed to create order" });
  }
};

export const verifyPayment = (req, res) => {
  try {
    // 🔐 Guard: secret missing
    if (!process.env.RAZORPAY_KEY_SECRET) {
      return res.status(503).json({
        success: false,
        message: "Payment verification unavailable",
      });
    }

    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = req.body;

    if (
      !razorpay_order_id ||
      !razorpay_payment_id ||
      !razorpay_signature
    ) {
      return res.status(400).json({
        success: false,
        message: "Missing payment verification fields",
      });
    }

    const body = `${razorpay_order_id}|${razorpay_payment_id}`;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature === razorpay_signature) {
      return res.json({ success: true });
    }

    res.status(400).json({ success: false });
  } catch (err) {
    console.error("❌ Payment verification error:", err);
    res.status(500).json({ success: false });
  }
};
