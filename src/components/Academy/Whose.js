"use client";

import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FaCircleCheck } from "react-icons/fa6";

export const Whose = () => {
  const containerVariants = {
    hidden: { opacity: 1 },
    show: { opacity: 1, transition: { staggerChildren: 0.3 } },
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
    "Aspiring Kingdom investors",
    "Entrepreneurs ready to become funders",
    "Faith-driven leaders ready to multiply influence",
    "Anyone seeking to grow wealth without losing spiritual integrity",
  ];

  return (
    <section
      ref={ref}
      className="max-w-4xl mx-auto text-center px-6 bg-yellow-200 p-8 flex flex-col items-center justify-center"
    >
      <div className="max-w-xl">
        <h2 className="md:text-6xl text-3xl font-bold mb-4">
          Who It&apos;s For
        </h2>
        <p className="text-gray-700 mb-4 text-xl">
          What if you could build wealth, fund innovation, and structure your
          own fund — while staying rooted in Biblical principles?
        </p>
      </div>

      <motion.ul
        className="list-none text-left max-w-xl mx-auto space-y-6"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "show" : "hidden"}
      >
        {items.map((text, index) => (
          <motion.li key={index} variants={itemVariants}>
            <div className="flex items-center w-full h-19 bg-white">
              <div className="bg-green-800 p-6">
                <FaCircleCheck size={30} className="text-white" />
              </div>
              <div className="p-7 w-full">
                <p className="md:text-xl text-sm">{text}</p>
              </div>
            </div>
          </motion.li>
        ))}
      </motion.ul>
    </section>
  );
};
