// "use client";

// export default function VideoSection() {
//   return (
//     <section className="bg-gray-400 py-16 px-4 md:px-10 md:h-screen flex justify-center items-center">
//       <div className="max-w-4xl mx-auto text-center">
//         <div className="aspect-video w-full rounded-xl overflow-hidden shadow-lg">
//           <video
//             controls
//             autoPlay
//             muted
//             loop
//             playsInline
//             className="w-full h-full object-cover"
//           >
//             <source
//               src="https://res.cloudinary.com/dgdxb5nqt/video/upload/v1753973769/welcomevideo_y7dbtz.mp4"
//               type="video/mp4"
//             />
//             Your browser does not support the video tag.
//           </video>
//         </div>
//       </div>
//     </section>
//   );
// }

"use client";

import { Pacifico, Meow_Script } from "next/font/google";
import { FaChessRook } from "react-icons/fa";
import { FaCircleCheck } from "react-icons/fa6";

const pacifico = Pacifico({
  weight: "400",
  subsets: ["latin"],
});

const meow = Meow_Script({
  weight: "400",
  subsets: ["latin"],
});

export default function VideoSection() {
  return (
    <div className="md:h-screen flex flex-col justify-center align-center">
      <section className="relative bg-white py-16 px-4 md:px-10 flex flex-col  items-center ">
        <div className=" mb-4 md:w-4xl max-w-4xl flex justify-start">
          <div className="-rotate-30  w-50 flex items-center ">
            <FaChessRook size={28} className="" />
            <p
              className={`${meow.className} text-4xl md:text-4xl font-light text-gray `}
            >
              My Story
            </p>
          </div>
        </div>
        <div className="relative max-w-3xl w-full z-10">
          <div className="aspect-video w-full rounded-3xl overflow-hidden shadow-xl border border-gray-200">
            <video
              controls
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            >
              <source
                src="https://res.cloudinary.com/dgdxb5nqt/video/upload/v1753973769/welcomevideo_y7dbtz.mp4"
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          </div>
          <div className="mt-2 max-w-4xl flex justify-end">
            <div className="-rotate-30 w-40">
              <p
                className={`${meow.className} text-4xl md:text-4xl font-light `}
              >
                Sandra
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
