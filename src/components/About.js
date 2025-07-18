// import React from "react";
// import Image from "next/image";

// const AboutSection =()=>{
//     return(
//         <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 py-10 ">
//             <div className=" flex flex-col items-center justify-center mb-p-10 py-0">
//                     <h1 className=" text-2xl md:text-4xl">Digital marketing Changed </h1>
//                     <h1 className=" text-5xl md:text-8xl uppercase font-extrabold">Everything</h1>
//                     <h1 className=" text-2xl md:text-4xl">for me</h1>
//             </div>

//             <div className="flex flex-col md:flex-row justify-center items-center mb:mt-4 ">
//                 <div className=" flex items-center justify-center">

//                 <Image
//                 src="/images/sandra-smile2.png"
//                 alt="Sandra smiling"
//                 width={400} // width in **pixels**
//                 height={500} // height in **pixels**

//                 />
//                 </div>
//                 <div className=" flex flex-col">
//                 <div className="w-fill px-5 md:p-2 md:w-100 md:mb-0 mb-2">
//                 <h1 className="italic bg-orange-200 text-3xl md:text-4xl font-light text-center  md:text-left">I'm Sandra N Sserumaga</h1>
//                 </div>
//                 <div className=" w-fill px-5 md:p-2 md:w-100 mb:m-2">
//                 <p>I am wife, mother, entrepreneur, and a Christian who accepted Jesus to be my personal
//                 LORD and Savior l've seen firsthand the power of financial Jiteracy and the impact it can
//                 have on people's lives when God is put in first Place when running Business. Deuteronomy 8:18 Remember the LORD your God, for it is He who gives you the ability to produce wealth. I'm excited to share my knowledge and insights in this Ebook on how i was able to grow 2m-200m in capital through money leading in a space of 3 years , and to help others build the financial confidence and security they deserve. </p>
//                 </div>
//                 </div>
//             </div>

//             <div className="flex flex-col items-center justify-center md:w-2/3 rounded-2xl shadow-1xl bg-white p-5 md:p-15 mb-5 gap-4 md:mt-[-40px]">
//             <div className="flex flex-col md:flex-row items-center gap-8 ">
//             <div> <p className="text-lg font-bold">I have a background in finance and a passion for helping low income earner women and men achieve financial success. With over years of
//                     experience n the industry, I've worked with clients from all walks of life and understand the nique challenges faced by underrepresented communities.
//                     Through my work as a financial advisor and advocate, strive to create more equitable access to financial education, resources and generally better livelihood for all through creating generational wealth. I'm thrilled to be the author of this Ebook, and to share my perspective and expertise with people everywhere.</p></div>
//             {/* <div className=""> <p className="text-lg">I promise you I'm not special, I'm an ordinary busy mom who decided to find out if this was even possible. So if you're looking for a way to enter the digital marketing space, make money you did not know was quite possible, and be taught as a complete beginner, you’ve found the right place!</p></div>
//                 */}
//              </div>
//               <button className="bg-green-900 text-white px-6 py-2 rounded-full text-lg hover:bg-green-800 transition">
//               Join Now
//             </button>
//              </div>
//         </div>
//     )
// }
// export default AboutSection

import React from "react";
import Image from "next/image";

const AboutSection = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 py-10 ">
      <div className="flex flex-col items-center justify-center mb-p-10 py-0">
        <h1 className="text-2xl md:text-4xl">Digital marketing Changed</h1>
        <h1 className="text-5xl md:text-8xl uppercase font-extrabold">
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
            <h1 className="italic bg-orange-200 text-3xl md:text-4xl font-light text-center md:text-left">
              I&apos;m Sandra N Sserumaga
            </h1>
          </div>
          <div className="w-fill px-5 md:p-2 md:w-100 mb:m-2">
            <p className="font-light text-base">
              I am wife, mother, entrepreneur, and a Christian who accepted
              Jesus to be my personal LORD and Savior. I&apos;ve seen firsthand
              the power of financial literacy and the impact it can have on
              people&apos;s lives when God is put in first Place when running
              Business. Deuteronomy 8:18 Remember the LORD your God, for it is
              He who gives you the ability to produce wealth. I&apos;m excited
              to share my knowledge and insights in this Ebook on how I was able
              to grow 2m-200m in capital through money lending in a space of 3
              years, and to help others build the financial confidence and
              security they deserve.
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center md:w-2/3 rounded-2xl shadow-1xl bg-white p-5 md:p-15 mb-5 gap-4 md:mt-[-40px]">
        <div className="flex flex-col md:flex-row items-center gap-8 ">
          <div className="">
            <p className="text-lg font-bold">
              I have a background in finance and a passion for helping low
              income earner women and men achieve financial success. With over
              years of experience in the industry, I&apos;ve worked with clients
              from all walks of life and understand the unique challenges faced
              by underrepresented communities. Through my work as a financial
              advisor and advocate, I strive to create more equitable access to
              financial education, resources, and generally better livelihood
              for all through creating generational wealth. I&apos;m thrilled to
              be the author of this Ebook, and to share my perspective and
              expertise with people everywhere.
            </p>
          </div>
          {/* 
          <div className="">
            <p className="text-lg">
              I promise you I&apos;m not special, I&apos;m an ordinary busy mom who decided to find out if this was
              even possible. So if you&apos;re looking for a way to enter the digital marketing space,
              make money you did not know was quite possible, and be taught as a complete beginner,
              you&apos;ve found the right place!
            </p>
          </div> 
          */}
        </div>
        <button className="bg-green-900 text-white px-6 py-2 rounded-full text-lg hover:bg-green-800 transition">
          Join Now
        </button>
      </div>
    </div>
  );
};

export default AboutSection;
