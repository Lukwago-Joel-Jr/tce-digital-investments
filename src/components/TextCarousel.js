"use client";

export default function MarqueeSection() {
  const marqueeItems = [
    "START HERE",
    "KINGDOM MINDSET",
    "INVESTOR MINDSET",
    "LEGACY",
    "STEWARDSHIP",
    "VENTURE CAPITAL",
    "PRIVATE EQUITY",
    "FUND STRUCTURE",
    "PORTFOLIO MANAGEMENT",
    "INVESTMENT THESIS",
    "REINVESTMENT STRATEGY",
    "BRANDING",
  ];

  return (
    <section className="relative overflow-hidden bg-white py-6">
      {/* Inline <style> for marquee animation */}
      <style>
        {`
          @keyframes scroll-left {
            0% {
              transform: translateX(0%);
            }
            100% {
              transform: translateX(-50%);
            }
          }

          .marquee {
            animation: scroll-left 30s linear infinite;
            white-space: nowrap;
          }

          .marquee:hover {
            animation-play-state: paused;
          }
        `}
      </style>

      <div className="w-full overflow-hidden">
        <div className="flex marquee space-x-10">
          {[...marqueeItems, ...marqueeItems].map((item, index) => (
            <span
              key={index}
              className="text-lg md:text-2xl font-semibold text-gray-800"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
