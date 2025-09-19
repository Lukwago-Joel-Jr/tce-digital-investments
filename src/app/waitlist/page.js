"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FiMail, FiUser } from "react-icons/fi";

export default function WaitlistPage() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Mailchimp form action URL (replace with your own)
    const formData = new FormData();
    formData.append("EMAIL", email);
    formData.append("FNAME", name);

    await fetch("", {
      method: "POST",
      body: formData,
      mode: "no-cors", // Mailchimp doesn’t allow CORS, so no response is expected
    });

    setLoading(false);
    setSuccess(true);
    setEmail("");
    setName("");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-2xl shadow-xl p-8 max-w-lg w-full text-center"
      >
        <h1 className="text-3xl font-extrabold text-green-900 mb-4">
          Join the Waitlist 🚀.
        </h1>
        <p className="text-gray-600 mb-6">
          Be the first to access{" "}
          <span className="font-semibold">[Course Name]</span> and enjoy
          exclusive early bird perks.
        </p>

        {!success ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <FiUser className="absolute left-3 top-3 text-green-900" />
              <input
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-900"
              />
            </div>
            <div className="relative">
              <FiMail className="absolute left-3 top-3 text-green-900" />
              <input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-900"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-900 text-gray-100 py-3 rounded-lg font-medium hover:bg-green-800 transition"
            >
              {loading ? "Joining..." : "Join Waitlist"}
            </button>
          </form>
        ) : (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-green-700 font-medium bg-yellow-100 p-3 rounded-lg mt-4"
          >
            🎉 Thanks for joining! Check your email for confirmation.
          </motion.p>
        )}
      </motion.div>
    </div>
  );
}
