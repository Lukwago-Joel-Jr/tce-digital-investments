"use client";

import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FiPlay, FiBookOpen, FiTarget, FiStar } from "react-icons/fi";
import { FaStarHalfStroke } from "react-icons/fa6";

export const CourseModules = () => {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: false,
  });

  const containerVariants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.2 } },
  };

  const moduleVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const modules = [
    {
      title: "🧱 FOUNDATION: Mindset & Alignment",
      lessons: [
        "Spiritual Foundation for Wealth",
        "Investor Identity & Faith-Fueled Confidence",
        "Stewardship, Stability & Legacy",
      ],
    },
    {
      title: "🚀 ENGINE: Investing & Fund Building",
      lessons: [
        "Venture Capital Ecosystem",
        "Private Equity Fundamentals",
        "Micro Fund Structuring",
        "Portfolio Management & Exit Strategy",
        "Getting Started as an Investor",
      ],
    },
    {
      title: "🌍 EXPANSION: Impact & Influence",
      lessons: [
        "Branding for Kingdom Influence",
        "Investing in Global Markets",
        "Wealth Building & Legacy Planning",
      ],
    },
  ];

  return (
    <section ref={ref} className="max-w-5xl mx-auto px-6 py-12 ">
      <motion.h2
        variants={moduleVariants}
        initial="hidden"
        animate={inView ? "show" : "hidden"}
        className="text-3xl md:text-4xl font-bold mb-8 text-center text-green-900"
      >
        Course Modules
      </motion.h2>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "show" : "hidden"}
        className="space-y-10"
      >
        {modules.map((mod, idx) => (
          // <motion.div
          //   key={idx}
          //   variants={moduleVariants}
          //   className="bg-green-50  p-6 shadow-md hover:shadow-lg transition-shadow duration-300"
          // >
          //   <h3 className="text-xl md:text-2xl font-semibold mb-3 text-green-800">
          //     {mod.title}
          //   </h3>
          //   <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
          //     {mod.lessons.map((lesson, i) => (
          //       <li key={i} className="text-lg">
          //         {lesson}
          //       </li>
          //     ))}
          //   </ul>
          // </motion.div>
          <motion.div
            key={idx}
            variants={moduleVariants}
            className="bg-green-50 p-6 shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <h3 className="text-xl md:text-2xl font-semibold mb-3 text-green-800">
              {mod.title}
            </h3>
            <ul className="text-gray-700 space-y-3 ml-2">
              {mod.lessons.map((lesson, i) => (
                <li key={i} className="flex items-start gap-3 text-lg">
                  <FaStarHalfStroke className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>{lesson}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};
