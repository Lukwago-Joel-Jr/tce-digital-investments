// import Link from "next/link";

// const Preheader = () => {
//   return (
//     <div className="mb-20">
//       <div className="md:hidden bg-green-900 text-white text-center py-3 px-4">
//         <Link href="/waitlist">
//           <p className="text-sm font-medium mb-2">
//             Enroll now and get <span className="font-bold">20% off</span> your
//             first course!
//           </p>
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default Preheader;

import Link from "next/link";

const Preheader = () => {
  return (
    <div className="md:hidden bg-green-900 text-white text-sm overflow-hidden relative">
      <div className="flex animate-marquee whitespace-nowrap space-x-6 py-2 px-4">
        <p>
          Enroll now and get <span className="font-bold">20% off</span> your
          first course!
        </p>
        <Link href="/waitlist" className="relative flex items-center">
          <span className="underline font-medium">Gain Early Access</span>
          <span className="text-xs bg-yellow-100 text-green-900 px-4 py-0.5 rounded-full font-bold">
            NEW
          </span>
        </Link>
      </div>

      <style jsx>{`
        .animate-marquee {
          display: inline-flex;
          animation: marquee 12s linear infinite;
        }

        @keyframes marquee {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
      `}</style>
    </div>
  );
};

export default Preheader;
