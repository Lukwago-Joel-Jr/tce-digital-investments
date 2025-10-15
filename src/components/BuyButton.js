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

// "use client";

// import { useState } from "react";

// export default function EbookBuyButton({ book }) {
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleBuy = async () => {
//     setLoading(true);
//     setError("");

//     if (!book?.price || !book?.id) {
//       setError("Invalid book data.");
//       setLoading(false);
//       return;
//     }

//     try {
//       const res = await fetch("/api/pesapal/pay", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           amount: book.price,
//           email: "testbuyer@example.com", // replace with real user email if logged in
//           phone: "+256700000000", // replace with real phone input
//           firstName: "John",
//           lastName: "Doe",
//           ebookId: book.id,
//         }),
//       });

//       if (!res.ok) {
//         const errorData = await res.json();
//         throw new Error(errorData.error || "Payment initiation failed.");
//       }

//       const data = await res.json();

//       if (data.url) {
//         window.location.href = data.url; // redirect to Pesapal
//       } else {
//         throw new Error("No redirect URL returned.");
//       }
//     } catch (err) {
//       console.error("Pesapal error:", err);
//       setError(err.message || "An unexpected error occurred.");
//     }

//     setLoading(false);
//   };

//   return (
//     <div className="space-y-2">
//       <button
//         onClick={handleBuy}
//         disabled={loading}
//         className="bg-green-900 text-white px-6 py-2 rounded-full text-lg hover:bg-green-800 transition disabled:opacity-50"
//       >
//         {loading ? "Redirecting..." : "Buy Now"}
//       </button>
//       {error && <p className="text-red-600 text-sm">{error}</p>}
//     </div>
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

  // Handle different price formats (e.g., "$29.99", "9.99")
  let numericPrice;
    if (typeof book.price === "string") {
      // Remove currency symbols, spaces, and commas, then convert to number
      numericPrice = parseFloat(book.price.replace(/[^\d.]/g, ""));
    } else {
      numericPrice = book.price;
    }

    if (!numericPrice || numericPrice <= 0) {
      setError("Invalid book price.");
      setLoading(false);
      return;
    }

    try {
      console.log("🛒 Initiating purchase for:", book.title);
      console.log("Price:", numericPrice);

      const res = await fetch("/api/pesapal/pay", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: numericPrice,
          email: "testbuyer@example.com", // TODO: replace with real user email
          phone: "+256700000000", // TODO: replace with real phone input
          firstName: "John", // TODO: replace with real user data
          lastName: "Doe", // TODO: replace with real user data
          ebookId: book.id,
        }),
      });

      const data = await res.json();
      console.log("Payment API response:", data);

      if (!res.ok) {
        console.error("Payment API error:", data);
        throw new Error(
          data.error || `Payment failed with status ${res.status}`,
        );
      }

      if (data.url) {
        console.log("✅ Redirecting to Pesapal:", data.url);
        // Use window.open for better debugging, or window.location.href for direct redirect
        window.location.href = data.url;
      } else {
        throw new Error("No redirect URL returned from payment service.");
      }
    } catch (err) {
      console.error("❌ Payment error:", err);
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-2">
      <button
        onClick={handleBuy}
        disabled={loading}
        className="bg-green-900 text-white px-6 py-2 rounded-full text-lg hover:bg-green-800 transition disabled:opacity-50"
      >
        {loading ? "Processing..." : `Buy Now`}
      </button>
      {error && (
        <div className="text-red-600 text-sm p-2 bg-red-50 border border-red-200 rounded">
          <strong>Error:</strong> {error}
        </div>
      )}
    </div>
  );
}
