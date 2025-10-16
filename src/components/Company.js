import React from "react";
import { Parisienne, Baskervville } from "next/font/google";

const parisienne = Parisienne({
  weight: "400",
  subsets: ["latin"],
});

const baskervville = Baskervville({
  weight: "400",
  subsets: ["latin"],
});

function Company() {
  return (
    <div className={`h-screen flex flex-col justify-center items-center`}>
      <div className="w-full md:w-250 flex flex-col justify-center items-center">
        <div className="text-6xl md:text-8xl font-[800] text-center uppercase">
          Wealth Build Academy
        </div>
        <div
          className={`${baskervville.className} italic text-2xl md:text-4xl font-light text-center`}
        >
          <p className="italic">Your one stop shop to Investment Pathway</p>
          <p className="mt-5">
            Join thousands of others taking control of their future.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Company;
