"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function WaitlistForm() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="flex justify-center items-center py-16 bg-gray-100 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white p-10 rounded-3xl shadow-xl w-full max-w-lg"
      >
        {!submitted ? (
          <form
            action="https://tcedigitalinvestments.us20.list-manage.com/subscribe/post?u=f5d80c08e45124cb703562330&amp;id=7edceae3ce&amp;f_id=00da79e0f0"
            method="post"
            id="mc-embedded-subscribe-form"
            name="mc-embedded-subscribe-form"
            target="_blank"
            className="space-y-6"
            onSubmit={() => setSubmitted(true)}
          >
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
              id="mce-FNAME"
              placeholder="First Name"
              defaultValue=""
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-900 focus:outline-none"
            />

            <input
              type="email"
              name="EMAIL"
              id="mce-EMAIL"
              placeholder="Email Address"
              defaultValue=""
              required
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-900 focus:outline-none"
            />

            {/* Hidden anti-bot field */}
            <div
              style={{ position: "absolute", left: "-5000px" }}
              aria-hidden="true"
            >
              <input
                type="text"
                name="b_f5d80c08e45124cb703562330_7edceae3ce"
                tabIndex="-1"
                defaultValue=""
              />
            </div>

            <button
              type="submit"
              className="w-full bg-green-900 text-white py-3 rounded-xl font-semibold hover:bg-green-800 transition"
            >
              Subscribe
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
