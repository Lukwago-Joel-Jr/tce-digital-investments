import React from "react";

const DownloadBook = () => {
  return (
    <div className="flex justify-center  flex-col items-center py-16 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold mb-4">Download Your Ebook</h1>
      <p className="text-lg mb-8 max-w-2xl">
        Thank you for your purchase! Click the button below to download your
        ebook. If you have any issues, please contact our support team.
      </p>

      <a
        href="/ebooks/KINGDOM-LENDING-GUIDE.pdf"
        className="bg-green-900 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-green-800 transition-colors shadow-lg"
        download
      >
        Download Now
      </a>
    </div>
  );
};

export default DownloadBook;
