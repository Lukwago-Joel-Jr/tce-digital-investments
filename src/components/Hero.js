// // components/HeroSection.js
// import Link from 'next/link'

// export default function HeroSection() {
//   return (
//     <section className="bg-white min-h-screen flex items-center">
//       <div className="max-w-7xl mx-auto px-4 flex flex-col-reverse lg:flex-row items-center justify-between gap-12 w-full">
        
//         {/* Left content */}
//         <div className="max-w-3xl text-center lg:text-left">
//           <h1 className="text-6xl sm:text-7xl font-extrabold text-gray-900 leading-tight">
//            <span className='text-5xl'>Learn the Skills to Build</span>  <br />
//             Digital <span className="text-amber-800 text-9xl">Wealth & Freedom</span>
//           </h1>
//           <p className="mt-8 text-xl text-gray-600 max-w-xl mx-auto lg:mx-0">
//             Join thousands of others taking control of their future. No fluff. Just results.
//           </p>
      
//         </div>

//         {/* Right image/graphic placeholder */}
//         <div className="w-full lg:w-1/2 h-96 bg-gray-100 rounded-xl hidden lg:block" />
//       </div>
//     </section>
//   )
// }


// components/HeroSection.js
import Link from 'next/link'

export default function HeroSection() {
  return (
    <section className="bg-white min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto px-4 flex flex-col-reverse lg:flex-row items-center justify-between gap-12 w-full">
        
        {/* Left content */}
        <div className="max-w-3xl text-center lg:text-left">
          <h1 className=" sm:text-7xl font-extrabold text-gray-900 leading-tight">
            <span className='text-4xl'>Learn the Skills to Build</span> <br />
            Digital <span className="text-amber-800 text-9xl">Wealth & Freedom</span>
          </h1>
          <p className="mt-8 text-xl text-gray-600 max-w-xl mx-auto lg:mx-0">
            Join thousands of others taking control of their future. No fluff. Just results.
          </p>
        </div>

        {/* Right image */}
        <div className="w-full lg:w-1/2">
          <div className="rounded-xl overflow-hidden shadow-lg">
            <img
              src="https://images.pexels.com/photos/572056/pexels-photo-572056.jpeg"
              alt="Digital Skills"
              className="object-cover w-full h-96"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
