import Link from "next/link";

const Preheader = () => {
  return (
    <div className="md:hidden bg-green-900 text-white text-sm overflow-hidden relative">
      <Link href="/waitlist">
        <div className="flex animate-marquee whitespace-nowrap space-x-6 py-2 px-4">
          <p>
            Enroll now and get <span className="font-bold">20% off</span> your
            first course! 🎉🥂
          </p>
          <div className="relative flex items-center">
            <span className="underline font-medium">Gain Early Access</span>
            <span className="ml-5 text-xs bg-yellow-100 text-green-900 px-4 py-0.5 rounded-full font-bold">
              NEW
            </span>
          </div>
        </div>
      </Link>
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
