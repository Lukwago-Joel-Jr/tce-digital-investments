import Image from "next/image";
import { ebooks } from "@/components/Data/ebooks";

// Next.js 13 App Router uses params as a prop
export default function EbookDetails({ params }) {
  const { id } = params;

  const book = ebooks.find((b) => b.id === id);

  if (!book) {
    return (
      <p className="p-10 text-center text-red-600">
        Book not found or loading...
      </p>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen flex justify-center items-center p-4 md:p-12">
    <div className="mt-30 md:mt-50">
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

        <div className="md:w-1/2 p-8 flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold capitalize mb-3">{book.title}</h1>
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

          {/* <button className="bg-green-900 text-white px-8 py-3 rounded-full text-lg hover:bg-green-800 transition w-full md:w-auto">
            I Need This
          </button> */}
        </div>
      </div>
    </div>
    </div>
  );
}
