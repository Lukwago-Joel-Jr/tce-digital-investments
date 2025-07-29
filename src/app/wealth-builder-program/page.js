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

"use client";

import React from "react";
import Image from "next/image";

export default function CoursePage() {
  return (
    <div className="bg-white text-gray-900 px-6 py-16 space-y-20 mt-20 md:mt-30">
      {/* Hero Section */}
      <section className="text-center md:max-w-3xl md:mx-auto w-full">
        <h1 className="md:text-8xl text-4xl font-bold mb-4">
          Wealth Builder Coaching Program
        </h1>
        <p className="text-lg text-gray-700 mb-6">
          You&apos;re going to learn how to{" "}
          <span className="bg-yellow-200">think like an investor</span>, analyze
          deals, and even structure your own micro fund. But more than that,
          you&apos;ll walk away knowing how to turn knowledge into capital and
          capital into legacy.
        </p>
        <p className="text-md text-gray-600 mb-6">
          This is the program that&apos;s going to shift how you build wealth —
          not by trading your time for money, but by owning equity and investing
          smart, like the top 1%.
        </p>
        <button className="bg-green-900 hover:bg-green-800 text-white px-8 py-4 rounded-full text-lg transition">
          Join Now
        </button>
      </section>

      {/* Demo Images */}
      <section className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        <Image
          src="/images/sandra-smile2.png"
          alt="Course Preview 1"
          width={400}
          height={250}
          className="rounded-lg"
        />
        {/* <Image
          src="/images/sandra-smile2.png"
          alt="Course Preview 2"
          width={400}
          height={250}
          className="rounded-lg"
        />
        <Image
          src="/images/sandra-smile2.png"
          alt="Course Preview 3"
          width={400}
          height={250}
          className="rounded-lg"
        /> */}
      </section>

      {/* Modules */}
      <section className="max-w-4xl mx-auto">
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
      <section className="max-w-4xl mx-auto">
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

      {/* Who It&apos;s For */}
      <section className="max-w-4xl mx-auto text-center">
        <h2 className="text-2xl font-semibold mb-4">Who It&apos;s For</h2>
        <p className="text-gray-700 mb-4">
          What if you could build wealth, fund innovation, and structure your
          own fund — while staying rooted in Biblical principles?
        </p>
        <ul className="list-disc list-inside text-gray-700 text-left max-w-xl mx-auto">
          <li>Aspiring Kingdom investors</li>
          <li>Entrepreneurs ready to become funders</li>
          <li>Faith-driven leaders ready to multiply influence</li>
          <li>
            Anyone seeking to grow wealth without losing spiritual integrity
          </li>
        </ul>
      </section>

      {/* What&apos;s Included */}
      <section className="max-w-4xl mx-auto text-center">
        <h2 className="text-2xl font-semibold mb-4">What&apos;s Included</h2>
        <ul className="list-disc list-inside text-gray-700 text-left max-w-xl mx-auto space-y-1">
          <li>Self-paced video modules</li>
          <li>Bi-weekly live coaching</li>
          <li>Private community support</li>
          <li>Real-world assignment + final project</li>
          <li>Tools, templates, and roadmaps</li>
        </ul>
      </section>

      {/* Pricing Section */}
      <section className="max-w-2xl mx-auto text-center border-t border-gray-300 pt-10">
        <h2 className="text-3xl font-bold mb-4">$342</h2>
        <p className="text-gray-700 mb-6">
          One-time payment for full course access + community and coaching
        </p>
        <button className="bg-green-900 hover:bg-green-800 text-white px-10 py-4 rounded-full text-lg transition">
          Join Now
        </button>
      </section>
    </div>
  );
}
