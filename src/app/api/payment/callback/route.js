// src/app/api/payment/callback/route.js
import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

// This is where users are redirected after completing payment on Pesapal

export async function GET(req) {
  const searchParams = req.nextUrl.searchParams;

  const orderTrackingId = searchParams.get("OrderTrackingId");
  const orderMerchantReference = searchParams.get("OrderMerchantReference");

  console.log("\n🔄 Payment Callback:", {
    orderTrackingId,
    orderMerchantReference,
  });

  let status = "UNKNOWN";

  if (orderMerchantReference) {
    try {
      const ref = doc(db, "payments", orderMerchantReference);
      const snap = await getDoc(ref);
      if (snap.exists()) {
        const data = snap.data();
        status = data.status || status;
      }
    } catch (err) {
      console.error("❌ Failed to read payment record:", err);
    }
  }

  // Redirect to success page, include found status (IPN will update status to COMPLETED)
  const successUrl = new URL("/payment/success", req.url);
  successUrl.searchParams.set("order", orderMerchantReference || "unknown");
  successUrl.searchParams.set("tracking", orderTrackingId || "unknown");
  successUrl.searchParams.set("status", status);

  return NextResponse.redirect(successUrl);
}
