import { useState } from "react";
import { createOrder } from "../api/paymentService";

const PayButton = ({ amount }) => {
  const [loading, setLoading] = useState(false);
  const numericAmount = Number(amount);

  if (!numericAmount || numericAmount <= 0) {
    return (
      <p className="text-sm text-red-500 font-medium">
        Invalid donation amount
      </p>
    );
  }

  const handlePayment = async () => {
    try {
      setLoading(true);

      if (typeof window === "undefined" || !window.Razorpay) {
        alert("Payment system not loaded. Please refresh the page.");
        setLoading(false);
        return;
      }

      const order = await createOrder(numericAmount);

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: "INR",
        name: "Animal NGO",
        description: "Donation Payment",
        order_id: order.id,
        handler: function (response) {
          console.log("Payment Success:", response);
          alert("Payment successful 🐾");
        },
        theme: {
          color: "#22c55e",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("❌ Payment failed:", err);

      const message =
        err?.response?.status === 503
          ? "Payments are temporarily unavailable"
          : "Payment failed. Please try again.";

      alert(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handlePayment}
      disabled={loading}
      className="w-full flex items-center justify-center gap-2 bg-green-600 text-white font-semibold px-5 py-3 rounded-xl shadow-md hover:bg-green-700 hover:shadow-lg transition transform hover:scale-105 disabled:opacity-60"
    >
      {loading ? (
        "Processing..."
      ) : (
        <>
          💚 Donate ₹{numericAmount}
        </>
      )}
    </button>
  );
};

export default PayButton;