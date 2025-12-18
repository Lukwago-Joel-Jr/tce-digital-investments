// src/app/cart/page.js
"use client";

export default function CartPage() {
  // Prices are in USD
  const ebooks = [
    {
      id: 1,
      title: "7 Streams of Wealth",
      price: 0.16,
      description:
        "Learn how to build multiple income streams and achieve lasting financial freedom. sample ",
    },
    {
      id: 2,
      title: "Mastering Online Income",
      price: 14.99,
      description:
        "Discover proven ways to make money online and grow a digital business fast.",
    },
    {
      id: 3,
      title: "Financial Freedom Blueprint",
      price: 12.0,
      description:
        "Step-by-step guide to escaping the rat race and building passive income sources.",
    },
    {
      id: 4,
      title: "Entrepreneur's Mindset",
      price: 7.5,
      description:
        "Transform your thinking and habits to become a successful wealth creator.",
    },
  ];

  const handleBuy = (ebook) => {
    const checkoutUrl = `/checkout?id=${ebook.id}&title=${encodeURIComponent(ebook.title)}&price=${ebook.price}`;
    window.location.href = checkoutUrl;
  };

  return (
    <main className="min-h-screen bg-gray-50 py-10 px-6">
      <h1 className="text-3xl font-semibold text-center mb-6">
        💼 Digital Wealth eBooks
      </h1>
      <p className="text-center text-gray-600 mb-10">
        Learn how to generate income, build wealth, and achieve financial
        independence.
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {ebooks.map((ebook) => (
          <div
            key={ebook.id}
            className="bg-white p-5 rounded-2xl shadow hover:shadow-lg transition"
          >
            <h2 className="text-xl font-bold mb-2 text-gray-900">
              {ebook.title}
            </h2>
            <p className="text-gray-600 text-sm mb-3">{ebook.description}</p>
            <p className="text-green-700 font-semibold text-lg mb-4">
              ${ebook.price.toFixed(2)}
            </p>
            <button
              onClick={() => handleBuy(ebook)}
              className="w-full px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white font-medium transition"
            >
              Buy Now
            </button>
          </div>
        ))}
      </div>

      <div className="max-w-2xl mx-auto mt-10 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-sm text-blue-800">
          <strong>📝 Testing Mode:</strong> This is using Pesapal sandbox for
          testing. Use test credentials from Pesapal to complete payments.
        </p>
      </div>
    </main>
  );
}
