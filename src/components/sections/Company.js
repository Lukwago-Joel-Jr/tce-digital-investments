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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-white via-yellow-50 to-green-50">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-20 w-72 h-72 bg-green-800/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-yellow-100/30 rounded-full blur-3xl" />
      </div>

      <div className="container relative z-10 px-4 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center gap-8">
            <div className="text-center space-y-6 max-w-5xl">
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight text-balance text-green-800">
                Wealth Builders Academy
              </h1>

              <p className="text-2xl md:text-3xl lg:text-4xl text-green-800/70 font-light italic text-balance">
                Your one-stop shop to Investment Pathway
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Company;
