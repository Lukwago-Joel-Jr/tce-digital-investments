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

      <CourseModules />

      {/* Bonus Content */}
      <BonusContent />

      <InvestmentWisdom />

      <PricingSection />
    </div>
  );
}
