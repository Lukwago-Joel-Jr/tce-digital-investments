'use client'

import React from 'react'
import { FaLightbulb, FaUserTie, FaUsers, FaLaptop } from 'react-icons/fa'

const features = [
  {
    id: 1,
    icon: <FaLightbulb size={32} className="text-amber-800 mb-4" />,
    title: 'Actionable Insights',
    text: 'We focus on practical steps, not just theory. Every module gives you real tools you can use immediately.'
  },
  {
    id: 2,
    icon: <FaUserTie size={32} className="text-amber-800 mb-4" />,
    title: 'Expert Instructors',
    text: 'Learn from seasoned professionals with proven track records in digital wealth and investing.'
  },
  {
    id: 3,
    icon: <FaUsers size={32} className="text-amber-800 mb-4" />,
    title: 'Supportive Community',
    text: 'You’re not alone. Our community helps you stay motivated and get answers fast.'
  },
  {
    id: 4,
    icon: <FaLaptop size={32} className="text-amber-800 mb-4" />,
    title: 'Flexible Learning',
    text: 'Access lessons anytime, anywhere. Fit your learning into your life — not the other way around.'
  },
]

export default function WhatMakesUsDifferent() {
  return (
    <section className="bg-white py-20 px-4">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-12">
          What Makes Us Different
        </h2>

        <div className="grid gap-12 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2">
          {features.map(feature => (
            <div key={feature.id} className="text-left flex flex-col items-start">
              {feature.icon}
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-base">
                {feature.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
