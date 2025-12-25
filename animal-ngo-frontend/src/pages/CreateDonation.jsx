// animal-ngo-frontend/src/pages/CreateDonation.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createDonationRequest } from "../api/donationService";
import { createOrder } from "../api/paymentService";
import { createPaymentOrder } from "../api/donationService";

const CreateDonation = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
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
      // Redirect to the feed to see the new post
      navigate("/donations");
    } catch (err) {
      console.error("Failed to create donation:", err);
      setError("Failed to create request. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePayment = async () => {
    const order = await createPaymentOrder(500); // ₹500
  
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
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white p-8 rounded-xl shadow-md">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Request a Donation 📦
        </h2>

        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Title of Request
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g., Need 50lbs of Dog Food"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe exactly what is needed and why..."
              rows="4"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition disabled:bg-blue-400"
          >
            {isLoading ? "Submitting..." : "Post Request"}
          </button>

          <button
            onClick={handlePayment}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Donate ₹500
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateDonation;
