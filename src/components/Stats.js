
import { FaLaptop, FaMoneyBillWave, FaUsers, FaChartLine } from 'react-icons/fa'

export default function StatsHighlights() {
  return (
    <section className="bg-green-900 text-white py-20 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 text-center">

        {/* Stat 1 */}
        <div>
          <FaLaptop size={48} className="mx-auto mb-4" />
          <h3 className="text-lg font-bold tracking-wide uppercase">
            100,000+ <br /> Students Worldwide
          </h3>
          <p className="mt-2 text-sm opacity-90">
            Our community grows every day with people ready to build their digital marketing business
          </p>
        </div>

        {/* Stat 2 */}
        <div>
          <FaMoneyBillWave size={48} className="mx-auto mb-4" />
          <h3 className="text-lg font-bold tracking-wide uppercase">
            $40M+ in <br /> Student Earnings
          </h3>
          <p className="mt-2 text-sm opacity-90">
            Our students have collectively earned over forty million dollars using our strategies
          </p>
        </div>

        {/* Stat 3 */}
        <div>
          <FaUsers size={48} className="mx-auto mb-4" />
          <h3 className="text-lg font-bold tracking-wide uppercase">
            400K+ <br /> Organic Followers
          </h3>
          <p className="mt-2 text-sm opacity-90">
            Built my brand organically through authentic connection and posting reels
          </p>
        </div>

        {/* Stat 4 */}
        <div>
          <FaChartLine size={48} className="mx-auto mb-4" />
          <h3 className="text-lg font-bold tracking-wide uppercase">
            7-Figures <br /> In 6 Months
          </h3>
          <p className="mt-2 text-sm opacity-90">
            My personal success story that inspired me to create this academy
          </p>
        </div>
      </div>
    </section>
  )
}

