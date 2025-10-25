// components/Footer.js
import Link from "next/link";
import Image from "next/image";
import BackToTopButton from "./Backtotop";

export default function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-700 text-sm">
      <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
        {/* Top row: left text + right logo */}

        <div className="flex flex-col sm:flex-row items-center justify-between">
          <p className="mb-4 sm:mb-0 text-center sm:text-left">
            Empowering individuals to create generational income and freedom.
          </p>
          <div className="flex-shrink-0">
            <Image src="/logo.png" alt="Logo" width={180} height={180} />
          </div>
        </div>

        {/* Disclaimer */}
        <p className="text-xs text-center text-gray-500">
          Disclaimer: This site does not guarantee financial success. Results
          may vary based on individual effort and market conditions.
        </p>

        {/* Footer navs + back to top */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-4 border-t border-gray-300">
          <div className="flex gap-4 mt-4 sm:mt-0 flex-wrap justify-center sm:justify-start">
            <Link href="/" className="hover:text-green-900">
              Home
            </Link>
            <Link href="/about" className="hover:text-green-900">
              Learn About WBA
            </Link>
            <Link href="/community" className="hover:text-green-900">
              Community
            </Link>
            <Link href="/contact" className="hover:text-green-900">
              Contact
            </Link>
            <Link
              href="/wealth-builder-program"
              className="hover:text-green-900"
            >
              Course
            </Link>
          </div>

          <div className="mt-4 sm:mt-0">
            <BackToTopButton />
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-gray-400 border-t border-gray-200 pt-4 text-xs">
          © {new Date().getFullYear()} Wealth Builder Academy. All rights
          reserved.
        </div>
      </div>
    </footer>
  );
}
