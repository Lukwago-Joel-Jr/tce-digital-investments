import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Nav";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Wealth Builder Academy",
  description: "Wealth Builder Academy you're way to digital wealth",
  keywords: "digital wealth, online courses, financial freedom, entrepreneurship, skills development",
  authors: [{ name: "Wealth Builder Academy", url: "https://www.tcedigitalinvestments.com" }],
  creator: "Wealth Builder Academy",
  openGraph: {
    title: "Wealth Builder Academy",
    description: "Learn the skills to build digital wealth and freedom.",
    url: "https://www.tcedigitalinvestments.com",
    siteName: "Wealth Builder Academy",
    images: [
      {
        url: "/images/logo-512x512.png",
        width: 1200,
        height: 630,
        alt: "Wealth Builder Academy OG Image"
      }
    ],
    locale: "en_US",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    site: "@wealthbuilderacademy",
    creator: "@wealthbuilderacademy"
  },  
  icons: {
    icon: '/favicon.ico'}
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar/>
        {children}
        <Footer/>
      </body>
    </html>
  );
}
