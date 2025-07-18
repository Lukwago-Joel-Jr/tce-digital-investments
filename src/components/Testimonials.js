import React from "react";
import Image from "next/image";
import { testimonials } from "./Data/testomonials";

function Testimonials() {
  return (
    <div className="w-full flex justify-center items-center md:my-20">
      <div className="flex flex-col md:flex-row w-full">
        {/* Image Section */}
        <div className="relative w-full md:w-2/5 aspect-[3/4] overflow-hidden rounded-r-[60px]">
          <Image
            src="/images/sandra-seated.jpg"
            alt="Digital Skills"
            fill
            className="object-cover"
          />
        </div>

        {/* Testimonials Section */}
        <div className="w-full md:w-3/5 flex flex-col justify-center">
          <div className="m-4 md:m-20 md:mr-40 p-4 md:p-8 space-y-12">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="flex flex-col justify-center items-start space-y-4"
              >
                <p className="font-semibold text-2xl">{testimonial.title}</p>
                <p className="font-light text-lg">{testimonial.description}</p>
                <p className="font-extrabold uppercase text-lg">
                  -{testimonial.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Testimonials;
