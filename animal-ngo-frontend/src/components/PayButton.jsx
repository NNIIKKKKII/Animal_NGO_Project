import { createOrder } from "../api/paymentService";

const PayButton = ({ amount }) => {
  const numericAmount = Number(amount);

  if (!numericAmount || numericAmount <= 0) {
    return (
      <p className="text-sm text-red-500">
        Invalid donation amount
      </p>
    );
  }

  const handlePayment = async () => {
    try {
      if (typeof window === "undefined" || !window.Razorpay) {
        alert("Payment system not loaded. Please refresh the page.");
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
    }
  };

  return (
    <button
      onClick={handlePayment}
      className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
    >
      Pay ₹{numericAmount}
    </button>
  );
};

export default PayButton;
