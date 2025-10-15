// src/app/api/payment/callback/route.js
import { NextResponse } from "next/server";

// This is where users are redirected after completing payment on Pesapal

export async function GET(req) {
  const searchParams = req.nextUrl.searchParams;

  const orderTrackingId = searchParams.get("OrderTrackingId");
  const orderMerchantReference = searchParams.get("OrderMerchantReference");

  console.log("\n🔄 Payment Callback:", {
    orderTrackingId,
    orderMerchantReference,
  });

  // TODO:
  // 1. Verify payment status with Pesapal API
  // 2. Check if payment was successful
  // 3. Update database
  // 4. Redirect to appropriate page (success/failure)

  // For now, redirect to success page
  const successUrl = new URL("/payment/success", req.url);
  successUrl.searchParams.set("order", orderMerchantReference || "unknown");
  successUrl.searchParams.set("tracking", orderTrackingId || "unknown");

  return NextResponse.redirect(successUrl);
}
