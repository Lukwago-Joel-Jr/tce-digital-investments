
import AboutSection from '@/components/About'
import Company from '@/components/Company'
import EbooksSection from '@/components/EbooksSection'
import HeroSection from '@/components/Hero'
import StatsHighlights from '@/components/Stats'
import Testimonials from '@/components/Testimonials'
import React from 'react'

function Home() {
  return (
    <div>
      <HeroSection/>

      <AboutSection/>

      <EbooksSection/>

      <Testimonials/>

      <StatsHighlights/>
      
      <Company/>
    </div>
  )
}

export default Home