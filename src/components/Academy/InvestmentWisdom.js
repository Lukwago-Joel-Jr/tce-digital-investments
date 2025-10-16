"use client";

import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export const InvestmentWisdom = () => {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: false,
  });

  const containerVariants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.3 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <motion.section
      ref={ref}
      className="max-w-4xl mx-auto px-6 py-8"
      variants={containerVariants}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
    >
      <motion.h2
        variants={itemVariants}
        className="text-3xl md:text-4xl font-semibold mb-6 text-center leading-snug"
      >
        “You&apos;ve heard that the wealthy invest differently — but no one ever
        taught you how.”
      </motion.h2>

      <motion.p
        variants={itemVariants}
        className="md:text-xl text-base text-gray-700 leading-relaxed"
      >
        You&apos;re working hard, but your money isn&apos;t multiplying the way
        it should… Digital marketing and AI has transformed so many
        people&apos;s lives (young and old), but making money doesn&apos;t mean
        keeping it or multiplying it for generations to come if you don&apos;t
        get the necessary wisdom/knowledge to multiply it through investments!
        It&apos;s just a matter of time before you go back to hustle mode.
        Proverbs 1:5 — A wise man will hear and increase learning, and a man of
        understanding will attain wise counsel.
      </motion.p>
    </motion.section>
  );
};
