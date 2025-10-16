// src/app/payment/failed/page.js
"use client";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";

function FailedContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("order");
  const reason = searchParams.get("reason");

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
        {/* Failed Icon */}
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-8 h-8 text-red-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>

        {/* Failed Message */}
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Payment Failed
        </h1>
        <p className="text-gray-600 mb-6">
          Unfortunately, your payment could not be processed.
        </p>

        {/* Order Details */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
          <h2 className="font-semibold text-gray-900 mb-2">Details</h2>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Order ID:</span>
              <span className="font-medium text-gray-900">
                {orderId || "N/A"}
              </span>
            </div>
            {reason && (
              <div className="flex justify-between">
                <span className="text-gray-600">Reason:</span>
                <span className="font-medium text-gray-900 text-xs">
                  {reason}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Info Message */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-yellow-800">
            💡 No money was charged to your account. You can try again with a
            different payment method.
          </p>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <Link
            href="/cart"
            className="block w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg transition"
          >
            Try Again
          </Link>
          <Link
            href="/"
            className="block w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-3 px-4 rounded-lg transition"
          >
            Go to Home
          </Link>
        </div>

        {/* Support */}
        <div className="mt-6">
          <p className="text-sm text-gray-500">
            Need help? Contact{" "}
            <a
              href="mailto:support@tcedigitalinvestments.com"
              className="text-green-600 hover:underline"
            >
              support@tcedigitalinvestments.com
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}

export default function FailedPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-gray-600">Loading...</div>
        </div>
      }
    >
      <FailedContent />
    </Suspense>
  );
}
