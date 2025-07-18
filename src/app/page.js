
import AboutSection from '@/components/About'
import Company from '@/components/Company'
import EbooksSection from '@/components/EbooksSection'
import HeroSection from '@/components/Hero'
import StatsHighlights from '@/components/Stats'
import React from 'react'

function Home() {
  return (
    <div>
      <HeroSection/>
      
      <AboutSection/>
      <EbooksSection/>
      <StatsHighlights/>
      <Company/>
    </div>
  )
}

export default Home