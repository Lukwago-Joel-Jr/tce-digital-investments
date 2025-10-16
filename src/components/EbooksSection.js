"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { products } from "./Data/ebooks";

// Filter only ebook products
const ebooks = products.filter((product) => product.type === "ebook");

const fadeUpVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

function EbooksSection() {
  return (
    <div className="bg-gray-100 h-auto md:h-screen my-5 md:my-0 flex flex-col justify-center items-center md:py-100 mb-20 md:mb-0">
      <div className="flex flex-col md:flex-row gap-15 md:gap-30 ">
        {ebooks.map((book) => (
          <motion.div
            key={book.id}
            variants={fadeUpVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
            className="w-80"
          >
            <Link
              href={`/ebook/${book.id}`}
              className="cursor-pointer rounded-2xl p-0 shadow-lg bg-white hover:shadow-2xl transition overflow-hidden block"
            >
              <Image
                src={book.cover}
                alt={book.title}
                width={400}
                height={400}
                className="object-cover"
              />
              <div className="py-2 px-4 flex flex-col gap-1">
                <h1 className="text-2xl font-bold capitalize">{book.title}</h1>
                <p className="text-sm capitalize font-thin">
                  {book.shortDescription}
                </p>
                <p className="text-lg font-semibold">{book.price}</p>
                <div className="bg-green-900 text-white px-6 py-2 rounded-full text-lg hover:bg-green-800 transition mt-2 w-full mb-5 text-center">
                  I Need This
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default EbooksSection;
