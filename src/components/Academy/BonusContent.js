"use client";

import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export const BonusContent = () => {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: false, // animate every time in view
  });

  const containerVariants = {
    hidden: { opacity: 1 },
    show: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const bonuses = [
    "Devotional Guide for Investors",
    "Investment Thesis & Fund Template",
    "Legacy Workbook",
    "Global Market Playbook",
    "Live Coaching & Weekly Q&A",
    "Private Community Access",
  ];

  return (
    <section
      ref={ref}
      className="max-w-4xl mx-auto px-6 py-12 bg-yellow-100  shadow-lg"
    >
      <motion.h2
        variants={itemVariants}
        initial="hidden"
        animate={inView ? "show" : "hidden"}
        className="text-3xl md:text-4xl font-bold mb-6 text-center text-green-900"
      >
        🎁 Bonus Content
      </motion.h2>

      <motion.ul
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "show" : "hidden"}
        className="space-y-4"
      >
        {bonuses.map((bonus, index) => (
          <motion.li
            key={index}
            variants={itemVariants}
            className="bg-green-800 text-white p-4  shadow-sm flex items-center space-x-3"
          >
            <span className="text-xl">✅</span>
            <p className="text-lg">{bonus}</p>
          </motion.li>
        ))}
      </motion.ul>
    </section>
  );
};
