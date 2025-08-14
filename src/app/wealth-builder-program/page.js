import React from "react";
import MarqueeSection from "@/components/TextCarousel";
import { Academyimage } from "@/components/Academy/Academyimage";
import { Included } from "@/components/Academy/Included";
import { Whose } from "@/components/Academy/Whose";
import { BonusContent } from "@/components/Academy/BonusContent";
import { CourseModules } from "@/components/Academy/CourseModules";
import { HeroText } from "@/components/Academy/HeroText";
import { InvestmentWisdom } from "@/components/Academy/InvestmentWisdom";
import { PricingSection } from "@/components/Academy/PricingSection";

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
      <HeroText />

      <MarqueeSection />

      <Academyimage />

      {/* What&apos;s Included */}
      <Included />

      {/* Who It&apos;s For */}
      <Whose />

      {/* Modules */}
      {/* <section className="max-w-4xl mx-auto px-6">
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
      </section> */}
      <CourseModules />

      {/* Bonus Content */}
      <BonusContent />

      <InvestmentWisdom />

      {/* Pricing Section */}
      {/* <section className="max-w-2xl mx-auto text-center border-t border-gray-300 pt-10 px-6">
        <h2 className="text-3xl font-bold mb-4">$342</h2>
        <p
          className={`${meow.className}  text-4xl md:text-4xl font-light mb-5`}
        >
          One-time payment for full course access + community and coaching
        </p>

        <Link
          href={
            "https://store.pesapal.com/shop/yb8tkz-tcedigitalinvestmentsltd?productCode=21921f16-1f79-433b-9079-8e2114790e9a"
          }
        >
          <button className="bg-green-900 hover:bg-green-800 text-white px-10 py-2 rounded-full text-lg transition">
            Join Academy
          </button>
        </Link>
      </section> */}

      <PricingSection />
    </div>
  );
}
