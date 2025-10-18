"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function WaitlistForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const firstName = formData.get("FNAME");
    const email = formData.get("EMAIL");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, firstName }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to subscribe");
      }

      setSubmitted(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex justify-center items-center py-16 bg-gray-100 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white p-10 rounded-3xl shadow-xl w-full max-w-lg"
      >
        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <h2 className="text-3xl font-bold text-green-900">
              Join the Waitlist 🚀
            </h2>
            <p className="text-gray-700">
              Be the first to access <strong>Wealth Coaching Program</strong>{" "}
              and enjoy early bird perks!
            </p>

            <input
              type="text"
              name="FNAME"
              placeholder="First Name"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-900 focus:outline-none"
            />

            <input
              type="email"
              name="EMAIL"
              placeholder="Email Address"
              required
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-900 focus:outline-none"
            />

            {error && <p className="text-red-600 text-sm">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-900 text-white py-3 rounded-xl font-semibold hover:bg-green-800 transition disabled:opacity-50"
            >
              {loading ? "Submitting..." : "Subscribe"}
            </button>
          </form>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center bg-yellow-100 p-6 rounded-xl"
          >
            <h3 className="text-green-900 font-bold text-xl mb-2">
              🎉 Thank you for joining!
            </h3>
            <p className="text-gray-700">
              Check your email for confirmation and early access details.
            </p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
