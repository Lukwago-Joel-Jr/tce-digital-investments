"use client";
import { Pacifico, Meow_Script } from "next/font/google";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Link from "next/link";
import { products } from "../Data/ebooks";
import BuyNowButton from "../BuyNowButton";

const pacifico = Pacifico({
  weight: "400",
  subsets: ["latin"],
});

const meowScript = Meow_Script({
  weight: "400",
  subsets: ["latin"],
});

// Get the Wealth Builder Academy course
const course = products.find(
  (product) => product.id === "WEALTH-BUILDER-ACADEMY",
);

export const PricingSection = ({ meow }) => {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: false,
  });

  const [typewriterText, setTypewriterText] = useState("");
  const fullText =
    "One-time payment for full course access + community and coaching";

  useEffect(() => {
    if (inView) {
      setTypewriterText("");
      let i = 0;
      const typeInterval = setInterval(() => {
        if (i < fullText.length) {
          setTypewriterText(fullText.slice(0, i + 1));
          i++;
        } else {
          clearInterval(typeInterval);
        }
      }, 50); // Adjust speed here (lower = faster)

      return () => clearInterval(typeInterval);
    } else {
      setTypewriterText("");
    }
  }, [inView]);

  const containerVariants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.4 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    show: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        delay: 0.3,
      },
    },
    hover: {
      scale: 1.05,
      transition: { duration: 0.2 },
    },
    tap: {
      scale: 0.95,
    },
  };

  return (
    <motion.section
      ref={ref}
      className="max-w-2xl mx-auto text-center pt-10 px-6"
      variants={containerVariants}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
    >
      <motion.h2
        variants={itemVariants}
        className="text-green-800 text-6xl font-bold mb-4"
      >
        $342
      </motion.h2>

      <motion.div
        variants={itemVariants}
        className={`${pacifico.className} text-4xl md:text-4xl font-light mb-5 min-h-[120px] flex items-center justify-center`}
      >
        <span>
          {typewriterText}
          <span className="animate-pulse">.</span>
        </span>
      </motion.div>

      <BuyNowButton book={course} />
    </motion.section>
  );
};
