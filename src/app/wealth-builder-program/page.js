// &apos;use client&apos;

// import React from &apos;react&apos;
// import dynamic from &apos;next/dynamic&apos;

// // Dynamically import the Player with SSR disabled
// const Player = dynamic(
//   () => import(&apos;@lottiefiles/react-lottie-player&apos;).then(mod => mod.Player),
//   { ssr: false }
// )

// export default function CoursePage() {
//   return (
//     <div className="min-h-screen flex items-center justify-center bg-white px-4">
//       <div className="text-center">
//         <div className="flex justify-center mb-6">
//           <Player
//             autoplay
//             loop
//             src="/animations/Hourglass.json"
//             style={{ height: &apos;120px&apos;, width: &apos;120px&apos; }}
//           />
//         </div>

//         <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
//           Courses are Coming Soon
//         </h1>

//         <p className="text-gray-600 mb-6">
//           Our digital wealth course is launching soon. Get ready to level up.
//         </p>

//         <button className="bg-green-900 hover:bg-green-800 text-white px-6 py-3 rounded-full transition">
//           Notify Me
//         </button>
//       </div>
//     </div>
//   )
// }

import { Pacifico, Meow_Script } from "next/font/google";
import { FaCircleCheck } from "react-icons/fa6";
import React from "react";
import Image from "next/image";

const pacifico = Pacifico({
  weight: "400",
  subsets: ["latin"],
});

const meow = Meow_Script({
  weight: "400",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL("https://www.tcedigitalinvestments.com"),
  title: "Wealth Builder Coaching Program", // Update for program
  description:
    "Wealth Builder Coaching Program — learn how to build wealth through smart investing, coaching, and fund structuring.",
  keywords:
    "wealth coaching, investment coaching, digital wealth, fund building, financial freedom, entrepreneurship, Biblical investing, wealth building courses",
  authors: [
    {
      name: "Wealth Builder Academy",
      url: "https://www.tcedigitalinvestments.com",
    },
  ],
  creator: "Wealth Builder Academy",
  openGraph: {
    title: "Wealth Builder Coaching Program", // Update for program
    description:
      "Join the Wealth Builder Coaching Program to learn how to think like an investor and structure your own micro fund.",
    url: "https://www.tcedigitalinvestments.com/wealth-builder-program",
    siteName: "Wealth Builder Academy",
    images: [
      {
        url: "/images/sandraseatedog.jpeg",
        width: 1200,
        height: 630,
        alt: "Wealth Builder Program OG Image",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@wealthbuilderacademy",
    creator: "@wealthbuilderacademy",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function CoursePage() {
  return (
    <div className="bg-white text-gray-900  py-16 space-y-20 mt-20 md:mt-30">
      {/* Hero Section */}
      <section className="text-center md:max-w-3xl md:mx-auto w-full px-6">
        <h1 className="md:text-8xl text-4xl font-bold mb-4">
          Wealth Builder Coaching Program
        </h1>
        <p className="text-lg text-gray-700 mb-6 text-left">
          You&apos;re going to learn how to{" "}
          <span className="bg-yellow-200">think like an investor</span>, analyze
          deals, and even structure your own micro fund. But more than that,
          you&apos;ll walk away knowing how to turn knowledge into capital and
          capital into legacy.
        </p>
        <p className="text-md text-gray-600 mb-6 text-left">
          This is the program that&apos;s going to shift how you build wealth —
          not by trading your time for money, but by owning equity and investing
          smart, like the top 1%.
        </p>
        <button className="bg-green-900 hover:bg-green-800 text-white px-8 py-4 rounded-full text-lg transition">
          Join Now
        </button>
      </section>

      <section className="flex justify-center items-center max-w-6xl mx-auto">
        <Image
          src="/images/better.jpg"
          alt="Course Preview 1"
          width={700}
          height={250}
          className="rounded-t-[47%]"
        />
      </section>

      {/* What&apos;s Included */}
      <section className="max-w-4xl mx-auto text-center px-6">
        <h2 className="text-6xl font-semibold mb-4">What&apos;s Included</h2>
        <ul className="list-disc list-inside text-gray-700 text-left max-w-xl mx-auto space-y-5">
          <li className="list-none">
            <div className="bg-green-800 list-none p-4 shadow-sm relative">
              <p className="text-white text-center text-xl">
                Self-paced video modules
              </p>
              <span className="absolute bottom-[-19px] left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[20px] border-r-[20px] border-t-[20px] border-t-green-800 border-l-transparent border-r-transparent"></span>
            </div>
          </li>

          <li className="list-none">
            <div className="bg-green-800 list-none p-4 shadow-sm relative">
              <p className="text-white text-center text-xl">
                Bi-weekly live coaching
              </p>
              <span className="absolute bottom-[-19px] left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[20px] border-r-[20px] border-t-[20px] border-t-green-800 border-l-transparent border-r-transparent"></span>
            </div>
          </li>

          <li className="list-none">
            <div className="bg-green-800 list-none p-4 shadow-sm relative">
              <p className="text-white text-center text-xl">
                Private community support
              </p>
              <span className="absolute bottom-[-19px] left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[20px] border-r-[20px] border-t-[20px] border-t-green-800 border-l-transparent border-r-transparent"></span>
            </div>
          </li>

          <li className="list-none">
            <div className="bg-green-800 list-none p-4 shadow-sm relative">
              <p className="text-white text-center text-xl">
                Real-world assignment + final project
              </p>
              <span className="absolute bottom-[-19px] left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[20px] border-r-[20px] border-t-[20px] border-t-green-800 border-l-transparent border-r-transparent"></span>
            </div>
          </li>

          <li className="list-none">
            <div className="bg-green-800 list-none p-4 shadow-sm relative">
              <p className="text-white text-center text-xl">
                Tools, templates, and roadmaps
              </p>
              <span className="absolute bottom-[-19px] left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[20px] border-r-[20px] border-t-[20px] border-t-green-800 border-l-transparent border-r-transparent"></span>
            </div>
          </li>
        </ul>
      </section>

      {/* Who It&apos;s For */}
      <section className="max-w-4xl mx-auto text-center px-6 bg-yellow-200 p-8 flex flex-col items-center justify-center">
        <div className="max-w-xl">
          <h2 className="text-6xl font-bold mb-4">Who It&apos;s For</h2>
          <p className="text-gray-700 mb-4">
            What if you could build wealth, fund innovation, and structure your
            own fund — while staying rooted in Biblical principles?
          </p>
        </div>
        <ul className="list-disc list-inside text-gray-700 text-left max-w-xl mx-auto list-none space-y-6">
          <li className="">
            <div className="flex items-center w-full h-19 bg-white">
              <div className="bg-green-800 p-6">
                <FaCircleCheck size={30} className="text-white" />{" "}
              </div>
              <div className="p-7 w-full">
                <p className="md:text-xl text-sm">Aspiring Kingdom investors</p>
              </div>
            </div>
          </li>
          <li>
            <div className="flex items-center w-full h-19 bg-white">
              <div className="bg-green-800 p-6">
                <FaCircleCheck size={30} className="text-white" />{" "}
              </div>
              <div className="p-7 w-full">
                <p className="md:text-xl text-sm">
                  Entrepreneurs ready to become funders
                </p>
              </div>
            </div>
          </li>
          <li>
            <div className="flex items-center w-full h-19 bg-white">
              <div className="bg-green-800 p-6">
                <FaCircleCheck size={30} className="text-white" />{" "}
              </div>
              <div className="p-7 w-full">
                <p className="md:text-xl text-sm">
                  Faith-driven leaders ready to multiply influence
                </p>
              </div>
            </div>
          </li>
          <li>
            <div className="flex items-center w-full h-19 bg-white">
              <div className="bg-green-800 p-6">
                <FaCircleCheck size={30} className="text-white" />{" "}
              </div>
              <div className="p-7 w-full">
                <p className="md:text-xl text-sm">
                  Anyone seeking to grow wealth without losing spiritual
                  integrity
                </p>
              </div>
            </div>
          </li>
        </ul>
      </section>

      {/* Modules */}
      <section className="max-w-4xl mx-auto px-6">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Course Modules
        </h2>

        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-bold">
              🧱 FOUNDATION: Mindset & Alignment
            </h3>
            <ul className="list-disc list-inside text-gray-700">
              <li>Spiritual Foundation for Wealth</li>
              <li>Investor Identity & Faith-Fueled Confidence</li>
              <li>Stewardship, Stability & Legacy</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold">
              🚀 ENGINE: Investing & Fund Building
            </h3>
            <ul className="list-disc list-inside text-gray-700">
              <li>Venture Capital Ecosystem</li>
              <li>Private Equity Fundamentals</li>
              <li>Micro Fund Structuring</li>
              <li>Portfolio Management & Exit Strategy</li>
              <li>Getting Started as an Investor</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold">
              🌍 EXPANSION: Impact & Influence
            </h3>
            <ul className="list-disc list-inside text-gray-700">
              <li>Branding for Kingdom Influence</li>
              <li>Investing in Global Markets</li>
              <li>Wealth Building & Legacy Planning</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Bonus Content */}
      <section className="max-w-4xl mx-auto px-6">
        <h2 className="text-2xl font-semibold mb-4 text-center">
          🎁 Bonus Content
        </h2>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>Devotional Guide for Investors</li>
          <li>Investment Thesis & Fund Template</li>
          <li>Legacy Workbook</li>
          <li>Global Market Playbook</li>
          <li>Live Coaching & Weekly Q&A</li>
          <li>Private Community Access</li>
        </ul>
      </section>

      {/* Pricing Section */}
      <section className="max-w-2xl mx-auto text-center border-t border-gray-300 pt-10 px-6">
        <h2 className="text-3xl font-bold mb-4">$342</h2>
        <p className={`${meow.className}  text-4xl md:text-4xl font-light `}>
          One-time payment for full course access + community and coaching
        </p>

        <button className="bg-green-900 hover:bg-green-800 text-white px-10 py-4 rounded-full text-lg transition">
          Join Now
        </button>
      </section>
    </div>
  );
}
