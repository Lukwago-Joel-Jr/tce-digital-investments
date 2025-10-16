// // components/BackToTopButton.js
// 'use client'

// export default function BackToTopButton() {
//   const scrollToTop = () => {
//     window.scrollTo({ top: 0, behavior: 'smooth' })
//   }

//   return (
//     <button
//       onClick={scrollToTop}
//       className="px-4 py-1 bg-gray-200 hover:bg-gray-300 rounded-full transition text-xs"
//     >
//       ↑ Back to Top
//     </button>
//   )
// }

// components/BackToTopButton.js
"use client";

import { motion } from "framer-motion";
import { FiArrowUp } from "react-icons/fi";

export default function BackToTopButton() {
  const scrollToTop = () => {
    // Super smooth scrolling with custom easing
    const start = window.pageYOffset;
    const duration = Math.min(1500, Math.max(1000, start / 10)); // Slower, more relaxed scrolling
    const startTime = performance.now();

    const easeInOutCubic = (t) => {
      return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
    };

    const animateScroll = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeInOutCubic(progress);

      window.scrollTo(0, start * (1 - easedProgress));

      if (progress < 1) {
        requestAnimationFrame(animateScroll);
      }
    };

    requestAnimationFrame(animateScroll);
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={scrollToTop}
      className="inline-flex items-center gap-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-full transition-colors duration-200 text-sm font-medium text-gray-700 hover:text-gray-900 group"
      aria-label="Back to top"
    >
      <FiArrowUp className="w-4 h-4 transition-transform duration-200 group-hover:-translate-y-0.5" />
      Back to Top
    </motion.button>
  );
}
