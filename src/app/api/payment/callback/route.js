// // src/app/api/payment/callback/route.js
// import { NextResponse } from "next/server";
// import { db } from "@/lib/firebase";
// import { doc, getDoc } from "firebase/firestore";

// // This is where users are redirected after completing payment on Pesapal

// export async function GET(req) {
//   const searchParams = req.nextUrl.searchParams;

//   const orderTrackingId = searchParams.get("OrderTrackingId");
//   const orderMerchantReference = searchParams.get("OrderMerchantReference");

//   console.log("\n🔄 Payment Callback:", {
//     orderTrackingId,
//     orderMerchantReference,
//   });

//   let status = "UNKNOWN";

//   if (orderMerchantReference) {
//     try {
//       const ref = doc(db, "payments", orderMerchantReference);
//       const snap = await getDoc(ref);
//       if (snap.exists()) {
//         const data = snap.data();
//         status = data.status || status;
//       }
//     } catch (err) {
//       console.error("❌ Failed to read payment record:", err);
//     }
//   }

//   // Redirect to success page, include found status (IPN will update status to COMPLETED)
//   const successUrl = new URL("/payment/success", req.url);
//   successUrl.searchParams.set("order", orderMerchantReference || "unknown");
//   successUrl.searchParams.set("tracking", orderTrackingId || "unknown");
//   successUrl.searchParams.set("status", status);

//   return NextResponse.redirect(successUrl);
// }

// src/app/api/payment/callback/route.js - WITH STATUS CHECK
import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

// This is where users are redirected after payment

export async function GET(req) {
  const searchParams = req.nextUrl.searchParams;

  const orderTrackingId = searchParams.get("OrderTrackingId");
  const orderMerchantReference = searchParams.get("OrderMerchantReference");

  console.log("\n🔄 Payment Callback:", {
    orderTrackingId,
    orderMerchantReference,
  });

  let status = "PENDING";
  let paymentData = null;

  // Try to get payment status from Firestore
  if (orderMerchantReference) {
    try {
      const ref = doc(db, "payments", orderMerchantReference);
      const snap = await getDoc(ref);
      if (snap.exists()) {
        paymentData = snap.data();
        status = paymentData.status || status;
        console.log("📦 Payment status from database:", status);
      }
    } catch (err) {
      console.error("❌ Failed to read payment record:", err);
    }
  }

  // Redirect based on status
  if (status === "COMPLETED") {
    // Payment successful - go to success page
    const successUrl = new URL("/payment/success", req.url);
    successUrl.searchParams.set("order", orderMerchantReference || "unknown");
    successUrl.searchParams.set("tracking", orderTrackingId || "unknown");
    successUrl.searchParams.set("status", "success");
    if (paymentData?.amount) {
      successUrl.searchParams.set("amount", paymentData.amount.toString());
    }

    console.log("✅ Redirecting to success page");
    return NextResponse.redirect(successUrl);
  } else if (status === "FAILED") {
    // Payment failed - go to failure page
    const failureUrl = new URL("/payment/failed", req.url);
    failureUrl.searchParams.set("order", orderMerchantReference || "unknown");
    failureUrl.searchParams.set(
      "reason",
      paymentData?.failureReason || "Payment was not completed",
    );

    console.log("❌ Redirecting to failure page");
    return NextResponse.redirect(failureUrl);
  } else {
    // Payment pending - go to pending page
    const pendingUrl = new URL("/payment/pending", req.url);
    pendingUrl.searchParams.set("order", orderMerchantReference || "unknown");
    pendingUrl.searchParams.set("tracking", orderTrackingId || "unknown");

    console.log("⏳ Redirecting to pending page");
    return NextResponse.redirect(pendingUrl);
  }
}
