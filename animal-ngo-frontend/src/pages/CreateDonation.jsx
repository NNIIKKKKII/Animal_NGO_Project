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

  // Kept for future optional inline payments.
  const _handlePayment = async () => {
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
      theme: { color: "#c84d67" },
    };
    const razor = new window.Razorpay(options);
    razor.open();
  };

  return (
    <div className="app-page">
      <div className="app-shell">
        <div className="mx-auto w-full max-w-2xl app-card p-8 md:p-10">
          <p className="app-label text-center">Donor Support</p>
          <h2 className="app-title mt-3 text-center text-4xl">Request a Donation</h2>
          <p className="app-subtitle mt-3 text-center">
            Publish verified needs for treatment, food, and rescue logistics.
          </p>

          {error && <div className="app-alert app-alert-error mt-6">{error}</div>}

          <form onSubmit={handleSubmit} className="mt-6 space-y-5">
            <div>
              <label className="mb-2 block text-sm font-semibold text-[#4f3f3b]">Title of Request</label>
              <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Need 50kg Dog Food" required className="app-input" />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-[#4f3f3b]">Description</label>
              <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Describe exactly what is needed..." rows="4" required className="app-textarea" />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-[#4f3f3b]">Amount (INR)</label>
              <input type="number" name="amount" value={formData.amount} onChange={handleChange} placeholder="500" min="1" required className="app-input" />
            </div>

            <button type="submit" disabled={isLoading} className="app-btn app-btn-primary w-full">
              {isLoading ? "Submitting..." : "Post Donation Request"}
            </button>

            {/* Optional payment button retained for future use */}
            {/* <button type="button" onClick={handlePayment} className="app-btn app-btn-secondary w-full">Donate Now</button> */}
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateDonation;
