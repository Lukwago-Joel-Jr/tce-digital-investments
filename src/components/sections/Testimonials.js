"use client";
import React from "react";
import Image from "next/image";
import { testimonials } from "../Data/testomonials";
import { motion } from "framer-motion";

function Testimonials() {
  const fadeUpVariant = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const fadeLeftVariant = {
    hidden: { opacity: 0, x: 30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };
  return (
    <div className="w-full flex justify-center items-center md:my-20 overflow-hidden">
      <div className="flex flex-col md:flex-row w-full">
        <div className="relative w-full md:w-[35%] aspect-[3/4] overflow-hidden rounded-r-[60px]">
          <Image
            src="/images/sandra-seated.jpg"
            alt="Digital Skills"
            fill
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 35vw"
            className="object-cover"
          />
        </div>

        <div className="w-full md:w-[60%] flex flex-col justify-center ">
          <div className="m-4 md:m-20 md:mr-40 p-4 md:p-8 space-y-12">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                variants={fadeUpVariant}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.3 }}
                className="flex flex-col justify-center items-start space-y-4"
              >
                <p className="font-semibold text-2xl">{testimonial.title}</p>
                <p className="font-light text-base">
                  {testimonial.description}
                </p>
                <p className="font-extrabold uppercase text-base">
                  —{testimonial.name}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
        <motion.div
          className="md:w-[5%] md:block hidden  md:mr-6"
          variants={fadeLeftVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
        >
          <h1
            className="text-8xl font-extrabold text-gray-300"
            style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
          >
            what others say
          </h1>
        </motion.div>
      </div>
    </div>
  );
}

export default Testimonials;
