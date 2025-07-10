// components/AboutSection.js
import Image from "next/image"
import { FaArrowRight } from "react-icons/fa"

export default function AboutSection() {
  return (
    <section className="min-h-screen bg-[#F6F5F3] py-24 px-4">
      <div className="max-w-6xl mx-auto">

        {/* Section Title */}
        <h2 className="text-gray-400 text-xl font-semibold mb-12 text-center">
          About Me
        </h2>

        {/* Top: Image + History */}
        <div className="flex flex-col lg:flex-row items-center gap-12 mb-24">
          
         {/* Left: Coach Image */}
<div className="w-full lg:w-1/2">
  <div className="rounded-3xl overflow-hidden shadow-lg">
    <img
      src="https://images.pexels.com/photos/8297145/pexels-photo-8297145.jpeg"
      alt="Coach"
      className="object-cover w-full h-full"
    />
  </div>
</div>


          {/* Right: Coach History */}
          <div className="w-full lg:w-1/2">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              From Corporate Chaos to Digital Calm
            </h3>
            <p className="text-gray-700 leading-relaxed">
              I started my career stuck in a 9-5 grind, juggling deadlines and stress. 
              But deep down, I knew there had to be more. I ventured into the digital world, 
              made countless mistakes — and eventually, built a freedom-first lifestyle 
              through monetizing my knowledge, skills, and passion online.
            </p>
          </div>
        </div>

        {/* Bottom: Monetization Story Box */}
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl max-w-4xl mx-auto">
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            How I fell in love with digital monetization
          </h3>
          <p className="text-gray-700 mb-6 leading-relaxed">
            I never imagined I’d be earning from content, consultations, and courses — but here I am.
            Learning how the online world works changed everything for me, and now I help others build the same.
          </p>
          <button className="flex items-center gap-2 bg-amber-800 hover:bg-amber-900 text-white px-6 py-3 rounded-full transition">
            Start Your Journey <FaArrowRight size={16} />
          </button>
        </div>
      </div>
    </section>
  )
}
