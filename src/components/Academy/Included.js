"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import React from "react";

export const Included = () => {
  // Variants for stagger animation
  const containerVariants = {
    hidden: { opacity: 1 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: false,
  });

  const items = [
    "Self-paced video modules",
    "Bi-weekly live coaching",
    "Private community support",
    "Real-world assignment + final project",
    "Tools, templates, and roadmaps",
  ];

  return (
    <section ref={ref} className="max-w-4xl mx-auto text-center px-6">
      <h2 className="md:text-6xl text-3xl font-semibold mb-8">
        What&apos;s Included
      </h2>

      <motion.ul
        className="list-none text-left max-w-xl mx-auto space-y-5"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "show" : "hidden"}
      >
        {items.map((text, index) => (
          <motion.li key={index} variants={itemVariants}>
            <div className="bg-green-800 p-4 shadow-sm relative">
              <p className="text-white text-center text-xl">{text}</p>
              <span className="absolute bottom-[-19px] left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[20px] border-r-[20px] border-t-[20px] border-t-green-800 border-l-transparent border-r-transparent"></span>
            </div>
          </motion.li>
        ))}
      </motion.ul>
    </section>
  );
};
