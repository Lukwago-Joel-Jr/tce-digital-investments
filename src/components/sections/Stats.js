"use client";

import {
  FaLaptop,
  FaMoneyBillWave,
  FaUsers,
  FaChartLine,
} from "react-icons/fa";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

const fadeUpVariant = {
  hidden: { opacity: 0, y: 80 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function StatsHighlights() {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: false,
  });

  return (
    <section ref={ref} className="bg-green-900 text-white py-20 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 text-center">
        {/* Stat 1 */}
        <motion.div
          variants={fadeUpVariant}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <FaLaptop size={48} className="mx-auto mb-4" />
          <div className="text-2xl font-extrabold">
            {inView && (
              <CountUp
                start={0}
                end={1000000}
                separator=","
                duration={3}
                suffix="+"
              />
            )}
          </div>
          <h3 className="mt-2 text-lg font-semibold">
            Students Worldwide target
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
          animate={inView ? "visible" : "hidden"}
        >
          <FaMoneyBillWave size={48} className="mx-auto mb-4" />
          <div className="text-2xl font-extrabold">
            $
            {inView && (
              <CountUp
                start={0}
                end={40000000}
                separator=","
                duration={3}
                suffix="+"
              />
            )}
          </div>
          <h3 className="mt-2 text-lg font-semibold">
            Student Earnings is our goal
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
          animate={inView ? "visible" : "hidden"}
        >
          <FaUsers size={48} className="mx-auto mb-4" />
          <div className="text-2xl font-extrabold">
            {inView && (
              <CountUp
                start={0}
                end={10300}
                separator=","
                duration={2}
                suffix="+"
              />
            )}
          </div>
          <h3 className="mt-2 text-lg font-semibold">Organic Followers</h3>
          <p className="mt-2 text-sm opacity-90">
            Built my brand organically through authentic connection and posting
            reels
          </p>
        </motion.div>

        {/* Stat 4 */}
        <motion.div
          variants={fadeUpVariant}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <FaChartLine size={48} className="mx-auto mb-4" />
          <div className="text-2xl font-extrabold">
            UGX{" "}
            {inView && (
              <CountUp start={0} end={200000000} separator="," duration={3} />
            )}
          </div>
          <h3 className="mt-2 text-lg font-semibold">In 3yrs</h3>
          <p className="mt-2 text-sm opacity-90">
            My personal success story that inspired me to create this academy
          </p>
        </motion.div>
      </div>
    </section>
  );
}
