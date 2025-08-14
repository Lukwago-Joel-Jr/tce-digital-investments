"use client";

import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Image from "next/image";

export const Academyimage = () => {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: false, // animate every time in view
  });

  const fadeVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <section className="flex justify-center items-center py-12">
      <motion.div
        ref={ref}
        variants={fadeVariant}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="w-full flex justify-center"
      >
        <Image
          src="/images/better.jpg"
          alt="Course Preview 1"
          width={700}
          height={250}
          className="rounded-t-[47%] mx-auto w-full max-w-[700px] object-cover"
        />
      </motion.div>
    </section>
  );
};
