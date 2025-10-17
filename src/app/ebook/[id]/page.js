import Image from "next/image";
import Link from "next/link";
import { products } from "@/components/Data/ebooks";
import BuyNowButton from "@/components/BuyNowButton";

// Filter for ebooks only
const ebooks = products.filter((product) => product.type === "ebook");

export async function generateMetadata({ params }) {
  const { id } = params;

  const book = ebooks.find((b) => b.id === id);

  if (!book) {
    return {
      title: "Book Not Found | Wealth Builder Academy",
      description: "This ebook could not be found.",
    };
  }

  const url = `https://www.tcedigitalinvestments.com/ebook/${book.id}`;

  return {
    title: `${book.title} | Wealth Builder Academy`,
    description: book.shortDescription,
    keywords: `ebook, ${book.title}, ${book.author}, digital wealth, online income`,
    authors: [
      {
        name: book.author,
        url: url,
      },
    ],
    creator: "Wealth Builder Academy",
    openGraph: {
      title: book.title,
      description: book.shortDescription,
      url: url,
      siteName: "Wealth Builder Academy",
      images: [
        {
          url: book.cover.startsWith("http")
            ? book.metacover
            : `${book.metacover}`,
          width: 1200,
          height: 630,
          alt: `${book.title} Cover`,
        },
      ],
      locale: "en_US",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      site: "@wealthbuilderacademy",
      creator: "@wealthbuilderacademy",
      title: book.title,
      description: book.shortDescription,
      images: [
        book.cover.startsWith("http")
          ? book.cover
          : `https://www.tcedigitalinvestments.com${book.cover}`,
      ],
    },
  };
}

export default function EbookDetails({ params }) {
  const { id } = params;

  const book = ebooks.find((b) => b.id === id);

  if (!book) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-red-600 mb-4">
            Ebook Not Found
          </h1>
          <p className="text-gray-600 mb-4">
            Sorry, we could not find the ebook you are looking for.
          </p>
          <Link
            href="/"
            className="text-green-900 hover:text-green-800 font-semibold"
          >
            ← Return to Homepage
          </Link>
        </div>
      </div>
    );
  }
  return (
    <div className="bg-gray-100 min-h-screen flex justify-center items-center p-2 md:p-12">
      <div className="mt-30 md:mt-50">
        {/* Book Cover and Details Section */}
        <div className="bg-white rounded-2xl shadow-lg max-w-4xl w-full flex flex-col md:flex-row overflow-hidden">
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

              <p className="text-xl font-semibold mb-6">$ {book.price} USD</p>
            </div>

            <div>
              <BuyNowButton book={book} />
            </div>
          </div>
        </div>

        {/* Additional Details Section */}
        <div className="bg-white rounded-2xl shadow-lg max-w-4xl w-full flex flex-col  overflow-hidden mt-10 p-4 md:p-8">
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
        </div>
      </div>
    </div>
  );
}
