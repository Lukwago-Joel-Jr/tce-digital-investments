// // components/Navbar.js
// import Link from 'next/link'
// import { FaInstagram } from 'react-icons/fa'
// import Image from 'next/image'

// export default function Navbar() {
//   return (
//     <header className="fixed top-0 left-0 w-full z-50 mt-5">
//       <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
        
//         {/* Logo */}
//         <Link href="/" className="text-xl font-bold text-gray-900">
//           <Image
//           src="/logo.png" 
//           alt="Hero background"
//           width={150}
//           height={150}
//           />
         
//         </Link>

//         {/* Right Side */}
//         <div className="flex items-center gap-4">
//           <a
//             href="https://instagram.com/yourusername"
//             target="_blank"
//             rel="noopener noreferrer"
//             className="text-gray-600 hover:text-pink-500 transition"
//           >
//             <FaInstagram size={22} />
//           </a>
          
//           <Link href="/course">
//             <button className="bg-green-900 text-white px-6 py-2 rounded-full text-lg hover:bg-green-800 transition">
//               Join Now
//             </button>
//           </Link>
//         </div>
//       </div>
//     </header>
//   )
// }


import Link from 'next/link'
import { FaInstagram } from 'react-icons/fa'
import Image from 'next/image'

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 mt-5">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
        
        {/* Logo */}
        <Link href="/" className="text-xl font-bold text-gray-900 flex items-center">
          <Image
            src="/logo.png"
            alt="Logo"
            width={150}
            height={150}
            className="w-[90px] h-[90px] md:w-[150px] md:h-[150px]"
          />
        </Link>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          <a
            href="https://instagram.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-pink-500 transition"
          >
            <FaInstagram size={22} />
          </a>

          <Link href="/course">
            <button className="bg-green-900 text-white px-6 py-2 rounded-full text-lg hover:bg-green-800 transition">
              Join Now
            </button>
          </Link>
        </div>
      </div>
    </header>
  )
}
