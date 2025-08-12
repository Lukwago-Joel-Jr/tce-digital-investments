"use client";

import { Pacifico, Meow_Script } from "next/font/google";
import { FaChessRook } from "react-icons/fa";
import { motion } from "framer-motion";

const pacifico = Pacifico({
  weight: "400",
  subsets: ["latin"],
});

const meow = Meow_Script({
  weight: "400",
  subsets: ["latin"],
});

const fadeUpVariant = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const fadeDownVariant = {
  hidden: { opacity: 0, y: -60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function VideoSection() {
  return (
    <div className="md:h-screen flex flex-col justify-center align-center">
      <section className="relative bg-white py-16 px-4 md:px-10 flex flex-col  items-center ">
        <div className=" mb-4 md:w-4xl max-w-4xl flex justify-start">
          <motion.div
            className="-rotate-30  w-50 flex items-center "
            variants={fadeUpVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
          >
            <FaChessRook size={28} className="" />
            <p
              className={`${meow.className} text-4xl md:text-4xl font-light text-gray `}
            >
              My Story
            </p>
          </motion.div>
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
            <motion.div
              className="-rotate-30 w-40"
              variants={fadeDownVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.3 }}
            >
              <p
                className={`${meow.className} text-4xl md:text-4xl font-light `}
              >
                Sandra
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}

// "use client";

// import { Pacifico, Meow_Script } from "next/font/google";
// import { FaChessRook } from "react-icons/fa";
// import { motion } from "framer-motion";

// const pacifico = Pacifico({
//   weight: "400",
//   subsets: ["latin"],
// });

// const meow = Meow_Script({
//   weight: "400",
//   subsets: ["latin"],
// });

// // Animation variants for text
// const fadeUp = {
//   hidden: { opacity: 0, y: 20 },
//   visible: { opacity: 1, y: 0 },
// };

// export default function VideoSection() {
//   return (
//     <div className="md:h-screen flex flex-col justify-center align-center">
//       <section className="relative bg-white py-16 px-4 md:px-10 flex flex-col  items-center ">
//         {/* My Story */}
//         <div className="mb-4 md:w-4xl max-w-4xl flex justify-start">
//           <motion.div
//             className="-rotate-30 w-50 flex items-center"
//             initial={{ opacity: 0, y: 50 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: false, amount: 0.2 }} // 👈 "once: false" allows repeat on scroll up
//             transition={{ duration: 0.6, ease: "easeOut" }}
//           >
//             <FaChessRook size={28} />
//             <p
//               className={`${meow.className} text-4xl md:text-4xl font-light text-gray`}
//             >
//               My Story
//             </p>
//           </motion.div>
//         </div>

//         {/* Video */}
//         <div className="relative max-w-3xl w-full z-10">
//           <div className="aspect-video w-full rounded-3xl overflow-hidden shadow-xl border border-gray-200">
//             <video
//               controls
//               autoPlay
//               muted
//               loop
//               playsInline
//               className="w-full h-full object-cover"
//             >
//               <source
//                 src="https://res.cloudinary.com/dgdxb5nqt/video/upload/v1753973769/welcomevideo_y7dbtz.mp4"
//                 type="video/mp4"
//               />
//               Your browser does not support the video tag.
//             </video>
//           </div>

//           {/* Sandra */}
//           <div className="mt-2 max-w-4xl flex justify-end">
//             {/* <motion.div
//               className="-rotate-30 w-40"
//               variants={fadeUp}
//               initial="hidden"
//               whileInView="visible"
//               viewport={{ once: true, amount: 0.3 }}
//               transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
//             > */}
//             <motion.div
//               className="-rotate-30 w-40"
//               initial={{ opacity: 0, y: 50 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: false, amount: 0.2 }} // 👈 "once: false" allows repeat on scroll up
//               transition={{ duration: 0.6, ease: "easeOut" }}
//             >
//               <p
//                 className={`${meow.className} text-4xl md:text-4xl font-light`}
//               >
//                 Sandra
//               </p>
//             </motion.div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }
