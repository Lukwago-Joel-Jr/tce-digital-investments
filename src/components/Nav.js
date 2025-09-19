// "use client";

// import { useEffect, useState, useRef } from "react";
// import Link from "next/link";
// import { FaInstagram } from "react-icons/fa";
// import Image from "next/image";
// import { motion } from "framer-motion";

// export default function Navbar() {
//   const [showLogo, setShowLogo] = useState(true);
//   const scrollTimeout = useRef(null);

//   useEffect(() => {
//     const handleScroll = () => {
//       // Hide immediately when scrolling starts
//       setShowLogo(false);

//       // Clear previous timeout
//       if (scrollTimeout.current) clearTimeout(scrollTimeout.current);

//       // Show after scrolling stops for 200ms
//       scrollTimeout.current = setTimeout(() => {
//         setShowLogo(true);
//       }, 200);
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//       if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
//     };
//   }, []);

//   return (
//     <header className="fixed top-0 left-0 w-full z-50 mt-5">
//       <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
//         {/* Logo Container */}
//         <div className="flex items-center w-[90px] md:w-[150px] h-[90px] md:h-[150px]">
//           <Link href="/" className="flex items-center">
//             <motion.div
//               initial={{ opacity: 1, y: 0 }}
//               animate={{ opacity: showLogo ? 1 : 0, y: showLogo ? 0 : -20 }}
//               transition={{ duration: 0.3 }}
//             >
//               <Image
//                 src="/logo.png"
//                 alt="Logo"
//                 width={150}
//                 height={150}
//                 className="w-[90px] h-[90px] md:w-[150px] md:h-[150px]"
//                 priority
//               />
//             </motion.div>
//           </Link>
//         </div>

//         {/* Right Side */}
//         <div className="flex items-center gap-4">
//           <a
//             href="https://www.instagram.com/the.cityentrepreneur"
//             target="_blank"
//             rel="noopener noreferrer"
//             className="text-gray-600 hover:text-pink-500 transition"
//           >
//             <FaInstagram size={22} />
//           </a>

//           <Link href="/wealth-builder-program">
//             <button className="bg-green-900 text-white px-6 py-2 rounded-full text-lg hover:bg-green-800 transition">
//               Join Academy
//             </button>
//           </Link>
//         </div>
//       </div>
//     </header>
//   );
// }

"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { FaInstagram } from "react-icons/fa";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Navbar() {
  const [showLogo, setShowLogo] = useState(true);
  const scrollTimeout = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setShowLogo(false);
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);

      scrollTimeout.current = setTimeout(() => {
        setShowLogo(true);
      }, 200);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    };
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full z-50 mt-5">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo Container */}
        <div className="flex items-center w-[90px] md:w-[150px] h-[90px] md:h-[150px]">
          <Link href="/" className="flex items-center">
            <motion.div
              initial={{ opacity: 1, y: 0 }}
              animate={{ opacity: showLogo ? 1 : 0, y: showLogo ? 0 : -20 }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src="/logo.png"
                alt="Logo"
                width={150}
                height={150}
                className="w-[90px] h-[90px] md:w-[150px] md:h-[150px]"
                priority
              />
            </motion.div>
          </Link>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-6">
          {/* Instagram */}
          <a
            href="https://www.instagram.com/the.cityentrepreneur"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-pink-500 transition"
          >
            <FaInstagram size={22} />
          </a>

          {/* Gain Early Access */}
          <Link href="/waitlist">
            <div className="relative group">
              <span className="text-gray-700 hover:text-green-900 transition font-medium">
                Gain Early Access
              </span>
              <span className="absolute -top-4 -right-3 text-xs bg-yellow-100 text-green-900 px-2 py-0.5 rounded-full font-semibold">
                NEW
              </span>
            </div>
          </Link>

          {/* Join Academy */}
          <Link href="/wealth-builder-program">
            <button className="bg-green-900 text-white px-6 py-2 rounded-full text-lg hover:bg-green-800 transition">
              Join Academy
            </button>
          </Link>
        </div>
      </div>
    </header>
  );
}
