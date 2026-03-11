import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createDonationRequest } from "../api/donationService";
import { createOrder } from "../api/paymentService";

const CreateDonation = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    amount: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      await createDonationRequest(formData);
      navigate("/donations");
    } catch (err) {
      console.error(err);
      setError("Failed to create request. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePayment = async () => {
    const order = await createOrder(Number(formData.amount));

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: "INR",
      name: "Animal NGO",
      description: "Donation",
      order_id: order.id,
      handler: function (response) {
        alert("Payment successful!");
        console.log(response);
      },
      theme: { color: "#16a34a" },
    };

    const razor = new window.Razorpay(options);
    razor.open();
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200">

      {/* Glass Card */}
      <div className="w-full max-w-xl backdrop-blur-lg bg-white/30 border border-white/40 shadow-2xl rounded-2xl p-8">

        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Request a Donation 📦
        </h2>

        {error && (
          <div className="bg-red-100/80 text-red-700 p-3 rounded-lg mb-4 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Title */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Title of Request
            </label>

            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g., Need 50kg Dog Food"
              required
              className="w-full rounded-lg border border-gray-300 bg-white/80 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Description
            </label>

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe exactly what is needed..."
              rows="4"
              required
              className="w-full rounded-lg border border-gray-300 bg-white/80 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>

          {/* Amount */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Amount (₹)
            </label>

            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              placeholder="e.g. 500"
              min="1"
              required
              className="w-full rounded-lg border border-gray-300 bg-white/80 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition disabled:opacity-60"
          >
            {isLoading ? "Submitting..." : "Post Donation Request"}
          </button>

          {/* Optional payment button */}
          {/* 
          <button
            type="button"
            onClick={handlePayment}
            className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            Donate Now 💚
          </button>
          */}

        </form>
      </div>
    </div>
  );
};

export default CreateDonation;