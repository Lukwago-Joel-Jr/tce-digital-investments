// "use client";

// export default function BuyNowButton({ book }) {
//   const handleBuy = () => {
//     const checkoutUrl = `/checkout?id=${book.id}&title=${encodeURIComponent(book.title)}&price=${book.price}`;
//     window.location.href = checkoutUrl;
//   };

//   return (
//     <button
//       onClick={handleBuy}
//       className="bg-green-900 text-white px-6 py-2 rounded-full text-lg hover:bg-green-800 transition"
//     >
//       Buy Now
//     </button>
//   );
// }

// src/components/BuyNowButton.js
"use client";

export default function BuyNowButton({ book }) {
  const handleBuy = () => {
    // Pass ALL product info including type
    const checkoutUrl = `/checkout?id=${book.id}&title=${encodeURIComponent(book.title)}&price=${book.price}&type=${book.type}`;
    window.location.href = checkoutUrl;
  };

  return (
    <button
      onClick={handleBuy}
      className="bg-green-900 text-white px-6 py-2 rounded-full text-lg hover:bg-green-800 transition"
    >
      {book.type === "course" ? "Enroll Now" : "Buy Now"}
    </button>
  );
}
