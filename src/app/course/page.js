

'use client'

import React from 'react'
import dynamic from 'next/dynamic'

// Dynamically import the Player with SSR disabled
const Player = dynamic(
  () => import('@lottiefiles/react-lottie-player').then(mod => mod.Player),
  { ssr: false }
)

export default function CoursePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="text-center">
        <div className="flex justify-center mb-6">
          <Player
            autoplay
            loop
            src="/animations/hourglass.json"
            style={{ height: '120px', width: '120px' }}
          />
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
          Courses are Coming Soon
        </h1>

        <p className="text-gray-600 mb-6">
          Our digital wealth course is launching soon. Get ready to level up.
        </p>

        <button className="bg-green-900 hover:bg-amber-700 text-white px-6 py-3 rounded-full transition">
          Notify Me
        </button>
      </div>
    </div>
  )
}
