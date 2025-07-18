import Image from "next/image";
import { Parisienne, Baskervville, Cormorant_Infant } from "next/font/google";

const parisienne = Parisienne({
  weight: "400",
  subsets: ["latin"],
});

const baskervville = Baskervville({
  weight: "400",
  subsets: ["latin"],
});

const cormorat = Cormorant_Infant({
  weight: "400",
  subsets: ["latin"],
});

export default function HeroSection() {
  return (
    <section className="bg-white min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto p-0 w-full">
        {/* Desktop/Large Screen Hero */}
        <div className="hidden lg:flex flex-col-reverse lg:flex-row items-center justify-between gap-12">
          {/* Left content */}
          <div className="max-w-3xl text-center lg:text-left">
            <h1 className="sm:text-8xl font-extrabold text-gray-900 leading-tighter">
              <span className="text-6xl">Learn the Skills to Build</span> <br />
              Digital{" "}
              <span className="text-green-900 text-8xl">Wealth & Freedom</span>
            </h1>
            <p className={`${cormorat.className} italic text-4xl md:text-3xl `}>
              <i>Join thousands of others taking control of their future.</i>
            </p>
          </div>
          <div className="w-full lg:w-1/2 h-full">
            <div className="relative w-full h-[800px] overflow-hidden">
              <Image
                src="/images/sandra-reading-bible.jpg"
                alt="Digital Skills"
                fill
                className="object-cover"
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
          <div className="relative z-10 px-4 text-left">
            <h1 className="text-4xl font-extrabold text-black leading-tight">
              Learn the Skills to <br /> <span className="text-6xl">Build</span>{" "}
              <br />
              <span className="text-green-900 text-7xl">Wealth & Freedom</span>
            </h1>
            <p className={`${cormorat.className} italic text-2xl  `}>
              <i>Join thousands of others taking control of their future.</i>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
