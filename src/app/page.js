import About from '@/components/About'
import HeroSection from '@/components/Hero'
import StatsHighlights from '@/components/Stats'
import React from 'react'

function Home() {
  return (
    <div>
      <HeroSection/>
      <StatsHighlights/>
      <About/>
    </div>
  )
}

export default Home