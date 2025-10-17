"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const fadeUpVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function AnimatedEbookDetailsContent({ book }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.3 }}
      variants={fadeUpVariant}
      className="bg-gray-100 min-h-screen flex justify-center items-center p-2 md:p-12"
    >
      <div className="mt-30 md:mt-50 w-full max-w-7xl">
        {/* Book Cover and Details Section */}
        <motion.div
          className="bg-white rounded-2xl shadow-lg max-w-4xl w-full flex flex-col md:flex-row overflow-hidden"
          variants={fadeUpVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
        >
          <div className="md:w-1/2">
            <Image
              src={book.cover}
              alt={book.title}
              width={500}
              height={650}
              className="object-cover"
            />
          </div>

          <div className="md:w-1/2 p-4 md:p-8 flex flex-col justify-between">
            <div>
              <h1 className="text-3xl font-bold capitalize mb-3">
                {book.title}
              </h1>
              <p className="text-gray-700 mb-4">{book.description}</p>

              <ul className="text-gray-600 mb-6 space-y-1">
                <li>
                  <strong>Author:</strong> {book.author}
                </li>
                <li>
                  <strong>Pages:</strong> {book.pages}
                </li>
                <li>
                  <strong>Publisher:</strong> {book.publisher}
                </li>
                <li>
                  <strong>Release Date:</strong> {book.releaseDate}
                </li>
              </ul>

              <p className="text-xl font-semibold mb-6">{book.price}</p>
            </div>
            <div>
              <Link href={book.linktobook}>
                <button className="bg-green-900 text-white px-6 py-2 rounded-full text-lg hover:bg-green-800 transition">
                  Buy Now
                </button>
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Additional Details Section */}
        <motion.div
          className="bg-white rounded-2xl shadow-lg max-w-4xl w-full flex flex-col overflow-hidden mt-10 p-4 md:p-8"
          variants={fadeUpVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
        >
          {/* Testimonials */}
          {book.testimonials && book.testimonials.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">
                What People Are Saying
              </h2>
              <div className="space-y-4">
                {book.testimonials.map((testimonial, index) => (
                  <div key={index} className="border-l-4 border-green-800 pl-4">
                    <p className="italic">{testimonial.testimonial}</p>
                    <p className="font-bold mt-1">— {testimonial.name}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* "Who This Is For" */}
          {book.Whothisisfor && (
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Who This is For</h2>
              <p>{book.Whothisisfor}</p>
            </div>
          )}

          {/* Faith-Based Belief Section */}
          {book.faithBasedBeliefSection && (
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">
                Faith-Based Belief
              </h2>
              <p>{book.faithBasedBeliefSection}</p>
            </div>
          )}

          {/* Bonus Section */}
          {book.bonus && (
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">
                Bonus: {book.bonus.title}
              </h2>
              <p>{book.bonus.description}</p>
              <ul className="list-disc pl-5">
                {book.bonus.worksheetList.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          {/* FAQ Section */}
          {book.faq && book.faq.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">FAQs</h2>
              <div className="space-y-4">
                {book.faq.map((faq, index) => (
                  <div key={index}>
                    <p className="font-semibold">{faq.question}</p>
                    <p>{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}
