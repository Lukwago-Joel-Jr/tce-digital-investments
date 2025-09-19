// "use client";

// import { useState } from "react";
// import { motion } from "framer-motion";
// import { FiMail, FiUser } from "react-icons/fi";

// export default function WaitlistPage() {
//   const [email, setEmail] = useState("");
//   const [name, setName] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [success, setSuccess] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     // Mailchimp form action URL (replace with your own)
//     const formData = new FormData();
//     formData.append("EMAIL", email);
//     formData.append("FNAME", name);

//     await fetch("", {
//       method: "POST",
//       body: formData,
//       mode: "no-cors", // Mailchimp doesn’t allow CORS, so no response is expected
//     });

//     setLoading(false);
//     setSuccess(true);
//     setEmail("");
//     setName("");
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
//       <motion.div
//         initial={{ opacity: 0, y: 40 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//         className="bg-white rounded-2xl shadow-xl p-8 max-w-lg w-full text-center"
//       >
//         <h1 className="text-3xl font-extrabold text-green-900 mb-4">
//           Join the Waitlist 🚀
//         </h1>
//         <p className="text-gray-600 mb-6">
//           Be the first to access{" "}
//           <span className="font-semibold">Wealth Coaching Program</span> and
//           enjoy exclusive early bird perks.
//         </p>

//         {!success ? (
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div className="relative">
//               <FiUser className="absolute left-3 top-3 text-green-900" />
//               <input
//                 type="text"
//                 placeholder="Your name"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 required
//                 className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-900"
//               />
//             </div>
//             <div className="relative">
//               <FiMail className="absolute left-3 top-3 text-green-900" />
//               <input
//                 type="email"
//                 placeholder="Your email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//                 className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-900"
//               />
//             </div>
//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full bg-green-900 text-gray-100 py-3 rounded-lg font-medium hover:bg-green-800 transition"
//             >
//               {loading ? "Joining..." : "Join Waitlist"}
//             </button>
//           </form>
//         ) : (
//           <motion.p
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             className="text-green-700 font-medium bg-yellow-100 p-3 rounded-lg mt-4"
//           >
//             🎉 Thanks for joining! Check your email for confirmation.
//           </motion.p>
//         )}
//       </motion.div>
//     </div>
//   );
// }

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
