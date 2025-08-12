"use client";

import {
  FaLaptop,
  FaMoneyBillWave,
  FaUsers,
  FaChartLine,
} from "react-icons/fa";
import { motion } from "framer-motion";

const fadeUpVariant = {
  hidden: { opacity: 0, y: 80 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function StatsHighlights() {
  return (
    <section className="bg-green-900 text-white py-20 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 text-center">
        {/* Stat 1 */}
        <motion.div
          variants={fadeUpVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
        >
          <FaLaptop size={48} className="mx-auto mb-4" />
          <h3 className="text-lg font-bold tracking-wide uppercase">
            our goal is 1,000,000+ <br /> Students Worldwide
          </h3>
          <p className="mt-2 text-sm opacity-90">
            Our community grows every day with people ready to build wealth
            through Venture Capital and Private Equity investment
          </p>
        </motion.div>

        {/* Stat 2 */}
        <motion.div
          variants={fadeUpVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
        >
          <FaMoneyBillWave size={48} className="mx-auto mb-4" />
          <h3 className="text-lg font-bold tracking-wide uppercase">
            our Goal is $40M+ in <br /> Student Earnings
          </h3>
          <p className="mt-2 text-sm opacity-90">
            Our students collectively earn over forty million dollars using our
            strategies
          </p>
        </motion.div>

        {/* Stat 3 */}
        <motion.div
          variants={fadeUpVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
        >
          <FaUsers size={48} className="mx-auto mb-4" />
          <h3 className="text-lg font-bold tracking-wide uppercase">
            10.3K+ <br /> Organic Followers
          </h3>
          <p className="mt-2 text-sm opacity-90">
            Built my brand organically through authentic connection and posting
            reels
          </p>
        </motion.div>

        {/* Stat 4 */}
        <motion.div
          variants={fadeUpVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
        >
          <FaChartLine size={48} className="mx-auto mb-4" />
          <h3 className="text-lg font-bold tracking-wide uppercase">
            200M <br /> In 3yrs
          </h3>
          <p className="mt-2 text-sm opacity-90">
            My personal success story that inspired me to create this academy
          </p>
        </motion.div>
      </div>
    </section>
  );
}
