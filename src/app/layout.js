import {
  Geist,
  Geist_Mono,
  Parisienne,
  Baskervville,
  Inter,
  Host_Grotesk,
  Cormorant_Infant,
} from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Nav";
import Footer from "@/components/Footer";
import Script from "next/script";

const parisienne = Parisienne({
  variable: "--font-parisienne",
  weight: "400",
  subsets: ["latin"],
});
const montserrat = Host_Grotesk({
  weight: ["400", "800"],
  subsets: ["latin"],
});
const cormorat = Cormorant_Infant({
  weight: "400",
  subsets: ["latin"],
});

const baskervville = Baskervville({
  weight: "400",
  subsets: ["latin"],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL("https://www.tcedigitalinvestments.com"), // ✅ Add this line
  title: "Wealth Builder Academy",
  description: "Wealth Builder Academy — your way to digital wealth",
  keywords:
    "digital wealth, online courses, financial freedom, entrepreneurship, skills development",
  authors: [
    {
      name: "Wealth Builder Academy",
      url: "https://www.tcedigitalinvestments.com",
    },
  ],
  creator: "Wealth Builder Academy",
  openGraph: {
    title: "Wealth Builder Academy",
    description: "Learn the skills to build digital wealth and freedom.",
    url: "https://www.tcedigitalinvestments.com",
    siteName: "Wealth Builder Academy",
    images: [
      {
        url: "/images/original.png",
        width: 1200,
        height: 630,
        alt: "Wealth Builder Academy OG Image",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@wealthbuilderacademy",
    creator: "@wealthbuilderacademy",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${montserrat.className} antialiased`}>
        <Navbar />
        {children}
        <Footer />
        <Script
          id="mcjs"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `!function(c,h,i,m,p){
              m=c.createElement(h),p=c.getElementsByTagName(h)[0],
              m.async=1,m.src=i,p.parentNode.insertBefore(m,p)
            }(document,"script","https://chimpstatic.com/mcjs-connected/js/users/f5d80c08e45124cb703562330/bd601dad58b12f0d4f9964a79.js");`,
          }}
        />
      </body>
    </html>
  );
}
