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

export default function VideoSection() {
  return (
    <div className="md:h-screen">
      <section className="relative bg-white py-16 px-4 md:px-10 flex justify-center items-center ">
        {/* Background shadow/layer */}
        <div className="absolute inset-0 flex justify-center items-center">
          <div className="w-[90%] md:w-[720px] h-[calc(100%-3rem)] bg-gray-100 rounded-3xl shadow-md translate-x-10 translate-y-6"></div>
        </div>

        {/* Foreground content */}
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
        </div>
      </section>
    </div>
  );
}
