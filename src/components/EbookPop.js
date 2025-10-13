"use client";

import { useState } from "react";

export default function EbookBuyPopup({ link }) {
  const [showPopup, setShowPopup] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleBuyClick = () => setShowPopup(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Call your API to save data in Firebase
      const res = await fetch("/api/initiate-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, amount: 0 }), // set amount if needed
      });

      const data = await res.json();
      console.log("Saved to DB:", data);

      // Redirect to the real book/Pesapal link
      window.location.href = link;
    } catch (err) {
      console.error("Error saving data:", err);
      alert("Failed to save your info. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={handleBuyClick}
        className="bg-green-900 text-white px-6 py-2 rounded-full text-lg hover:bg-green-800 transition"
      >
        Buy Now
      </button>

      {showPopup && (
        <div className="fixed inset-0 shadow-xl bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">Enter Your Details</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border px-3 py-2 rounded"
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border px-3 py-2 rounded"
                required
              />
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowPopup(false)}
                  className="px-4 py-2 rounded border"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded bg-green-900 text-white"
                  disabled={loading}
                >
                  {loading ? "Processing..." : "Proceed to Buy"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
