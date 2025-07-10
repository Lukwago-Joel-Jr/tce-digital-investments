


// // components/VideoSection.js
// export default function VideoSection() {
//   return (
//     <section className="relative bg-[#F6F5F3] py-24 px-4 overflow-hidden">
//       <div className="max-w-5xl mx-auto relative z-10">

//         {/* Stylized top-left text */}
//        <p className="absolute -top-16 -left-8 text-sm sm:text-base handwritten text-gray-600 z-20">
//         my success story
//        </p>

//         {/* Stylized bottom-right text */}
//        <p className="absolute -bottom-6 -right-4 text-sm sm:text-base handwritten text-gray-600 z-20">
//             see I made it
//        </p>

//         {/* Background shadow layer behind video */}
//         <div className="absolute top-25 left-8 w-full h-[56.25%] bg-[#EAE8E4] rounded-3xl -z-10 max-w-5xl mx-auto scale-95"></div>

//         {/* Main Video */}
//         <div className="relative w-full pt-[56.25%] rounded-3xl overflow-hidden shadow-xl z-10">
//           <iframe
//             className="absolute top-0 left-0 w-full h-full"
//             src="https://www.youtube.com/embed/Fwm8O5jrFgA?rel=0&modestbranding=1"
//             title="DWA Video"
//             frameBorder="0"
//             allow="autoplay; encrypted-media; gyroscope; picture-in-picture"
//             allowFullScreen
//           />
//         </div>
//          <div className="absolute top-14 left-6 w-full h-[56.25%] bg-[#EAE8E4] rounded-3xl -z-10 max-w-5xl mx-auto scale-95"></div>
//       </div>

//       <div>
        
//       </div>
//     </section>
//   )
// }




// components/VideoSection.js
export default function VideoSection() {
  return (
    <section className="relative bg-[#F6F5F3] py-24 px-4 overflow-hidden">
      <div className="max-w-5xl mx-auto relative z-10">

        {/* Stylized top-left text */}
        <p className="absolute -top-16 -left-8 text-sm sm:text-base handwritten text-gray-600 z-20">
          my success story
        </p>

        {/* Stylized bottom-right text */}
        <p className="absolute -bottom-6 -right-4 text-sm sm:text-base handwritten text-gray-600 z-20">
          see I made it
        </p>

        {/* Background shadow layer behind video */}
        <div className="absolute top-14 left-6 w-full h-[56.25%] bg-[#EAE8E4] rounded-3xl -z-10 max-w-5xl mx-auto scale-95"></div>

        {/* Main Video */}
        <div className="relative w-full pt-[56.25%] rounded-3xl overflow-hidden shadow-xl z-10">
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src="https://www.youtube.com/embed/Fwm8O5jrFgA?rel=0&modestbranding=1"
            title="DWA Video"
            frameBorder="0"
            allow="autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>

      {/* CTA Text + Button */}
      <div className="max-w-5xl mx-auto mt-12 px-4">
        <div className="text-left">
          <p className="text-black font-semibold text-base sm:text-lg mb-4 max-w-md">
            If that inspired you... this is your chance to take control. Start your journey to building real digital wealth today.
          </p>
          <button className="bg-amber-800 hover:bg-amber-900 text-white px-6 py-3 rounded-full text-sm sm:text-base transition">
            Join the Academy
          </button>
        </div>
      </div>
    </section>
  )
}
