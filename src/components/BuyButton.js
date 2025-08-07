"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function EbookBuyButton({ book }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleBuy = async () => {
    setLoading(true);

    try {
      const res = await fetch("/api/pesapal/pay", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: book.price,
          email: "testbuyer@example.com",
          phone: "+256700000000",
          firstName: "John",
          lastName: "Doe",
          ebookId: book.id,
        }),
      });

      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("Payment initiation failed.");
      }
    } catch (err) {
      console.error(err);
      alert("Error: " + err.message);
    }

    setLoading(false);
  };

  return (
    <button
      onClick={handleBuy}
      disabled={loading}
      className="bg-green-900 text-white px-6 py-2 rounded-full text-lg hover:bg-green-800 transition disabled:opacity-50"
    >
      {loading ? "Redirecting..." : "Buy Now"}
    </button>
  );
}
