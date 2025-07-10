'use client'

import React from 'react'

// Mock testimonials
const testimonials = [
  {
    id: 1,
    heading: 'Amazing Results',
    text: 'This course transformed my understanding of digital wealth. I feel more confident about my investments and financial future.',
    name: 'Sarah Johnson'
  },
  {
    id: 2,
    heading: 'Highly Recommend',
    text: 'I never thought online learning could be this engaging. The instructors break down complex ideas so clearly.',
    name: 'Michael Lee'
  },
  {
    id: 3,
    heading: 'Life Changing',
    text: 'From the first module, I knew I made the right choice. The insights I gained are priceless.',
    name: 'Emily Davis'
  },
  {
    id: 4,
    heading: 'Practical and Clear',
    text: 'Finally, a course that gives real-world examples and actionable steps. No fluff, just results.',
    name: 'James Smith'
  },
  {
    id: 5,
    heading: 'Great Community',
    text: 'I love how the community supports each other. It’s motivating to learn alongside like-minded people.',
    name: 'Olivia Brown'
  },
]

export default function TestimonialSection() {
  return (
    <section className="w-full flex flex-col md:flex-row min-h-screen">
      {/* Left side */}
      <div className="w-full md:w-1/2 h-64 md:h-auto bg-gray-300">
        {/* Replace with <Image /> later */}
        <div
          className="w-full h-full object-cover bg-cover bg-center"
          style={{ backgroundImage: 'url(/placeholder.jpg)' }}
        >
          {/* Placeholder */}
        </div>
      </div>

      {/* Right side */}
      <div className="w-full md:w-1/2 bg-white p-8 flex flex-col justify-center">
        <div className="space-y-12">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id}>
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                "{testimonial.heading}
              </h3>
              <p className="text-gray-600 text-base mb-2">
                {testimonial.text}"
              </p>
              <div className="flex items-center space-x-2">
                <span className="h-px w-8 bg-gray-400 font-semibold"></span>
                <span className="text-gray-900 text-xl font-semibold">{testimonial.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
