import AboutSection from "@/components/sections/About";
import Company from "@/components/sections/Company";
import EbooksSection from "@/components/sections/EbooksSection";
import HeroSection from "@/components/sections/Hero";
import StatsHighlights from "@/components/sections/Stats";
import Testimonials from "@/components/sections/Testimonials";
import VideoSection from "@/components/sections/Video";

import React from "react";

function Home() {
  return (
    <div>
      <HeroSection />

      <VideoSection />

      <AboutSection />

      <EbooksSection />

      <Testimonials />

      <StatsHighlights />

      <Company />
    </div>
  );
}

export default Home;
