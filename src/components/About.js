import React from "react";
import Image from "next/image";
import Link from "next/link";

const AboutSection = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 md:py-30 overflow-hidden">
      <div className="flex flex-col items-center justify-center px-20 mb-p-10 pt-10">
        <h1 className="text-2xl md:text-4xl text-center">
          Venture Capital and Private Equity Changed
        </h1>
        <h1 className="text-5xl md:text-8xl uppercase font-extrabold text-center">
          Everything
        </h1>
        <h1 className="text-2xl md:text-4xl">for me</h1>
      </div>

      <div className="flex flex-col md:flex-row justify-center items-center mb:mt-4 ">
        <div className="flex items-center justify-center">
          <Image
            src="/images/sandra-smile2.png"
            alt="Sandra smiling"
            width={400}
            height={500}
          />
        </div>
        <div className="flex flex-col">
          <div className="w-fill px-5 md:p-2 md:w-100 md:mb-0 mb-2">
            <h1 className="italic bg-yellow-200 text-3xl md:text-4xl font-light text-center md:text-left">
              I&apos;m Sandra N Sserumaga
            </h1>
          </div>
          <div className="w-fill px-5 md:p-2 md:w-100 mb:m-2">
            <p className="font-light text-base">
              I&apos;m Sandra N SSerumaga, a venture-minded entrepreneur,
              investor, and coach. I&apos;ve built businesses, funded others,
              and now I&apos;m showing you how to step into this world too —
              especially if you&apos;re starting from scratch.” For years I
              thought saving was the only way to build wealth. But after
              discovering how the rich use equity, VC, and PE — my entire
              financial strategy changed.
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center md:w-2/3 rounded-2xl shadow-1xl bg-white p-5 md:p-15 mb-5 gap-4 mt-18 md:mt-[-40px]">
        <div className="flex flex-col md:flex-row items-start gap-18 md:gap-8 ">
          <div className="md:w-[50%]">
            <h2 className="text-2xl text-green-900 font-bold">
              What&apos;s holding back Kingdom-minded leaders from investing
              boldly?
            </h2>
            <p className="text-lg font-bold">
              You feel called to wealth creation but don&apos;t know where to
              start. The world of venture capital and private equity seems
              intimidating or inaccessible. You&apos;ve been a steward — but now
              you&apos;re ready to multiply. You want to invest in alignment
              with your values, not compromise them.
            </p>
          </div>

          <div className="md:w-[50%]">
            <h2 className="text-2xl text-green-900 font-bold">
              &ldquo;You&apos;ve heard that the wealthy invest differently — but
              no one ever taught you how.
            </h2>
            <p className="text-sm">
              You&apos;re working hard, but your money isn&apos;t multiplying
              the way it should&hellip;&rdquo; Digital marketing and AI has
              transformed so many people&apos;s lives (Young and Old), but
              making money doesn&apos;t mean keeping it or multiplying it for
              generations to come, if you don&apos;t get the necessary
              wisdom/knowledge to{" "}
              <span className="bg-yellow-200">
                multiply it through investments!!!!
              </span>{" "}
              It&apos;s just a matter of time before you go back to hustle mode.
              Proverbs 1:5&hellip;&hellip;A wise man will hear and increase
              learning, And a man of understanding will attain wise
              counsel&hellip;&hellip; &ldquo;That&apos;s why I created Wealth
              Builders Academy — a step-by-step coaching program that teaches
              you how to think, invest, and build wealth like a venture
              capitalist or private equity pro while honoring God at the same
              time.&rdquo;
            </p>
          </div>
        </div>

        <Link href="/wealth-builder-program">
          <button className="bg-green-900 text-white px-6 py-2 rounded-full text-lg hover:bg-green-800 transition">
            Join Now
          </button>
        </Link>
      </div>
    </div>
  );
};

export default AboutSection;
