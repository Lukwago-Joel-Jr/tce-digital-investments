// src/app/checkout/page.js
"use client";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { FaSpinner } from "react-icons/fa";

function CheckoutForm() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [ebook, setEbook] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    customerName: "",
    customerEmail: "",
    phoneNumber: "256",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const ebookId = searchParams.get("id");
    const title = searchParams.get("title");
    const price = searchParams.get("price");
    const productLink = searchParams.get("productLink"); // ⬅️ ADD THIS LINE
    const type = searchParams.get("type"); // ⬅️ ADD THIS LINE

    if (ebookId && title && price) {
      setEbook({
        id: ebookId, // ⬅️ CHANGED: Keep as string (works for both ebooks & courses)
        title: decodeURIComponent(title),
        price: parseFloat(price),
        type: type || "ebook", // ⬅️ ADD THIS LINE
        productLink: productLink || "", // ⬅️ ADD THIS LINE
      });
    } else {
      router.push("/cart");
    }
  }, [searchParams, router]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.customerName.trim()) {
      newErrors.customerName = "Name is required";
    } else if (formData.customerName.trim().length < 3) {
      newErrors.customerName = "Name must be at least 3 characters";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.customerEmail.trim()) {
      newErrors.customerEmail = "Email is required";
    } else if (!emailRegex.test(formData.customerEmail)) {
      newErrors.customerEmail = "Please enter a valid email";
    }

    const phoneRegex = /^256[0-9]{9}$/;
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required";
    } else if (!phoneRegex.test(formData.phoneNumber)) {
      newErrors.phoneNumber = "Phone must be 256XXXXXXXXX (12 digits)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCheckout = async (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setLoading(true);

    try {
      console.log("🛒 Processing checkout for:", ebook.title);

      const res = await fetch("/cart/buy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ebookId: ebook.id,
          productType: ebook.type,
          productTitle: ebook.title,
          productLink: ebook.productLink,
          customerName: formData.customerName.trim(),
          customerEmail: formData.customerEmail.trim(),
          phoneNumber: formData.phoneNumber.trim(),
          amount: ebook.price,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(`Payment failed: ${data.error || "Unknown error"}`);
        setLoading(false);
        return;
      }

      if (data.paymentUrl) {
        window.location.href = data.paymentUrl;
      } else {
        alert("Could not start payment.");
        setLoading(false);
      }
    } catch (err) {
      alert(`Payment failed: ${err.message}`);
      setLoading(false);
    }
  };

  if (!ebook) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">
          <FaSpinner size={40} />
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 mt-30 py-10 px-6">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Checkout</h1>
          <p className="text-gray-600">Complete your purchase</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl shadow p-6 h-fit">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Order Summary
            </h2>

            <div className="space-y-3 mb-4">
              <div>
                <p className="text-sm text-gray-600">Product</p>
                <p className="font-medium text-gray-900">{ebook.title}</p>
              </div>

              <div className="border-t pt-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">${ebook.price.toFixed(2)}</span>
                </div>
              </div>

              <div className="border-t pt-3">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-gray-900">
                    Total
                  </span>
                  <span className="text-lg font-bold text-green-600">
                    ${ebook.price.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <p className="text-xs text-blue-800">
                {ebook.type === "course"
                  ? "🎓 Academy enrollment link will be sent to your email after payment."
                  : "📧 Your ebook will be delivered to your email after payment."}
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Your Details
            </h2>

            <form onSubmit={handleCheckout} className="space-y-4">
              <div>
                <label
                  htmlFor="customerName"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Full Name *
                </label>
                <input
                  type="text"
                  id="customerName"
                  name="customerName"
                  value={formData.customerName}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none ${
                    errors.customerName ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.customerName && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.customerName}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="customerEmail"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email Address *
                </label>
                <input
                  type="email"
                  id="customerEmail"
                  name="customerEmail"
                  value={formData.customerEmail}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none ${
                    errors.customerEmail ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.customerEmail && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.customerEmail}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="phoneNumber"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder="256700123456"
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none ${
                    errors.phoneNumber ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.phoneNumber && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.phoneNumber}
                  </p>
                )}
                <p className="text-xs text-gray-500 mt-1">
                  Format: 256XXXXXXXXX (start with 256)
                </p>
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 px-4 rounded-lg font-medium transition ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-green-600 hover:bg-green-700 text-white"
                }`}
              >
                {loading
                  ? "Processing..."
                  : ebook.type === "course"
                    ? `Enroll Now - $${ebook.price.toFixed(2)}`
                    : `Pay $${ebook.price.toFixed(2)}`}
              </button>

              <button
                type="button"
                onClick={() => router.push("/cart")}
                className="w-full py-2 px-4 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition"
              >
                Back to Cart
              </button>
            </form>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            🔒 Secure payment powered by Pesapal
          </p>
        </div>
      </div>
    </main>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-gray-600">Loading checkout...</div>
        </div>
      }
    >
      <CheckoutForm />
    </Suspense>
  );
}
