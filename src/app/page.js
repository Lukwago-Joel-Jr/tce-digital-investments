import About from '@/components/About'
import Books from '@/components/Books'
import Company from '@/components/Company'
import HeroSection from '@/components/Hero'
import StatsHighlights from '@/components/Stats'
import React from 'react'

function Home() {
  return (
    <div>
      <HeroSection/>
      
      <About/>
      <Books/>
      <StatsHighlights/>
      <Company/>
    </div>
  )
}

export default Home