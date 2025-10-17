"use client";

import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { products } from "../Data/ebooks";
import BuyNowButton from "../BuyNowButton";

// Get the Wealth Builder Academy course
const course = products.find(
  (product) => product.id === "WEALTH-BUILDER-ACADEMY",
);

export const HeroText = () => {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: false, // animate every time in view
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
      className="text-center md:max-w-3xl md:mx-auto w-full px-6"
      variants={containerVariants}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
    >
      <motion.h1
        variants={itemVariants}
        className="md:text-8xl text-4xl font-bold mb-4"
      >
        Wealth Builder Coaching Program
      </motion.h1>

      <motion.p
        variants={itemVariants}
        className="text-lg text-gray-700 mb-6 text-left"
      >
        You&apos;re going to learn how to{" "}
        <span className="bg-yellow-200">think like an investor</span>, analyze
        deals, and even structure your own micro fund. But more than that,
        you&apos;ll walk away knowing how to turn knowledge into capital and
        capital into legacy.
      </motion.p>

      <motion.p
        variants={itemVariants}
        className="text-md text-gray-600 mb-6 text-left"
      >
        This is the program that&apos;s going to shift how you build wealth —
        not by trading your time for money, but by owning equity and investing
        smart, like the top 1%.
      </motion.p>

      <motion.div variants={itemVariants}>
        {/* <Link
          href={
            "https://store.pesapal.com/shop/yb8tkz-tcedigitalinvestmentsltd?productCode=21921f16-1f79-433b-9079-8e2114790e9a"
          }
        >
          <button className="bg-green-900 hover:bg-green-800 text-white px-10 py-2 rounded-full text-lg transition">
            Join Academy
          </button>
        </Link> */}

        <BuyNowButton book={course} />
      </motion.div>
    </motion.section>
  );
};
