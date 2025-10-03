"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Parisienne, Baskervville, Cormorant_Infant } from "next/font/google";
import Link from "next/link";

const parisienne = Parisienne({ weight: "400", subsets: ["latin"] });
const baskervville = Baskervville({ weight: "400", subsets: ["latin"] });
const cormorat = Cormorant_Infant({ weight: "400", subsets: ["latin"] });

// Variants for stagger animation
const containerVariants = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.3 },
  },
};

const lineVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function HeroSection() {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: false, // allow it to animate every time it's in view
  });

  return (
    <section
      ref={ref}
      className="bg-white min-h-screen flex items-center md:pt-20 pt-0"
    >
      <div className="max-w-7xl mx-auto p-0 w-full">
        {/* Desktop Hero */}
        <div className="hidden lg:flex flex-col-reverse lg:flex-row items-center justify-between gap-12">
          {/* Left content */}
          <motion.div
            className="max-w-3xl text-center lg:text-left"
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
          >
            <motion.h1 className="sm:text-8xl font-extrabold text-gray-900 leading-tighter">
              <motion.span variants={lineVariants} className="block text-6xl">
                Learn the Skills to Build
              </motion.span>
              <motion.span variants={lineVariants} className="block">
                Generational{" "}
                <span className="text-green-900 text-8xl">
                  Wealth & Freedom
                </span>
              </motion.span>
              <motion.span variants={lineVariants} className="block text-3xl">
                Just Like The Top 1%
              </motion.span>
            </motion.h1>

            <motion.p
              variants={lineVariants}
              className={`${cormorat.className} italic text-4xl md:text-3xl`}
            >
              <i>Join thousands of others taking control of their future.</i>
            </motion.p>
          </motion.div>

          {/* Right image */}
          <div className="w-full lg:w-1/2 h-full">
            <div className="relative w-full h-[800px] overflow-hidden">
              <Image
                src="/images/sandra-reading-bible.jpg"
                alt="Digital Skills"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>

        {/* Mobile Hero */}
        <div className="relative flex flex-col items-center justify-center text-center gap-6 lg:hidden min-h-screen w-full">
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center w-full h-full"
            style={{
              backgroundImage: "url(/images/sandra-reading-bible.jpg)",
              opacity: 0.3,
            }}
          ></div>

          {/* Content */}
          <motion.div
            className="relative z-10 px-4 text-left"
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
          >
            <motion.h1 className="text-4xl font-extrabold text-black leading-tight">
              <motion.span variants={lineVariants} className="block">
                Learn the Skills to
              </motion.span>
              <motion.span variants={lineVariants} className="block text-6xl">
                Build
              </motion.span>
              <motion.span
                variants={lineVariants}
                className="block text-green-900 text-7xl"
              >
                Wealth & Freedom
              </motion.span>
              <motion.span variants={lineVariants} className="block">
                Just Like The Top 1%
              </motion.span>
            </motion.h1>

            <motion.p
              variants={lineVariants}
              className={`${cormorat.className} italic text-2xl`}
            >
              <i>Join thousands of others taking control of their future.</i>
            </motion.p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
