import { createOrder } from "../api/paymentService";

const PayButton = ({ amount }) => {
  if (!amount) return null;

  const handlePayment = async () => {
    try {
      if (!window.Razorpay) {
        alert("Razorpay SDK not loaded");
        return;
      }

      const order = await createOrder(amount);

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: "INR",
        name: "Animal NGO",
        description: "Donation Payment",
        order_id: order.id,
        handler: function (response) {
          console.log("Payment Success:", response);
          alert("Payment successful!");
        },
        theme: {
          color: "#22c55e",
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (err) {
      console.error("Payment failed:", err);
      alert("Payment failed");
    }
  };

  return (
    <button
      onClick={handlePayment}
      className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
    >
      Pay ₹{amount}
    </button>
  );
};

export default PayButton;
