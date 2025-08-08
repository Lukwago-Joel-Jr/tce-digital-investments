// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";

// export default function EbookBuyButton({ book }) {
//   const router = useRouter();
//   const [loading, setLoading] = useState(false);

//   const handleBuy = async () => {
//     setLoading(true);

//     try {
//       const res = await fetch("/api/pesapal/pay", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           amount: book.price,
//           email: "testbuyer@example.com",
//           phone: "+256700000000",
//           firstName: "John",
//           lastName: "Doe",
//           ebookId: book.id,
//         }),
//       });

//       const data = await res.json();
//       if (data.url) {
//         window.location.href = data.url;
//       } else {
//         alert("Payment initiation failed.");
//       }
//     } catch (err) {
//       console.error(err);
//       alert("Error: " + err.message);
//     }

//     setLoading(false);
//   };

//   return (
//     <button
//       onClick={handleBuy}
//       disabled={loading}
//       className="bg-green-900 text-white px-6 py-2 rounded-full text-lg hover:bg-green-800 transition disabled:opacity-50"
//     >
//       {loading ? "Redirecting..." : "Buy Now"}
//     </button>
//   );
// }

"use client";

import { useState } from "react";

export default function EbookBuyButton({ book }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleBuy = async () => {
    setLoading(true);
    setError("");

    if (!book?.price || !book?.id) {
      setError("Invalid book data.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/pesapal/pay", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: book.price,
          email: "testbuyer@example.com", // replace with real user email if logged in
          phone: "+256700000000", // replace with real phone input
          firstName: "John",
          lastName: "Doe",
          ebookId: book.id,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Payment initiation failed.");
      }

      const data = await res.json();

      if (data.url) {
        window.location.href = data.url; // redirect to Pesapal
      } else {
        throw new Error("No redirect URL returned.");
      }
    } catch (err) {
      console.error("Pesapal error:", err);
      setError(err.message || "An unexpected error occurred.");
    }

    setLoading(false);
  };

  return (
    <div className="space-y-2">
      <button
        onClick={handleBuy}
        disabled={loading}
        className="bg-green-900 text-white px-6 py-2 rounded-full text-lg hover:bg-green-800 transition disabled:opacity-50"
      >
        {loading ? "Redirecting..." : "Buy Now"}
      </button>
      {error && <p className="text-red-600 text-sm">{error}</p>}
    </div>
  );
}
