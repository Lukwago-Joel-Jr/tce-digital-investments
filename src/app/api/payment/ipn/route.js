// src/app/api/payment/ipn/route.js
import { NextResponse } from "next/server";

// This endpoint receives payment notifications from Pesapal
// when payment status changes

export async function GET(req) {
  const searchParams = req.nextUrl.searchParams;

  const data = {
    OrderTrackingId: searchParams.get("OrderTrackingId"),
    OrderMerchantReference: searchParams.get("OrderMerchantReference"),
    OrderNotificationType: searchParams.get("OrderNotificationType"),
  };

  console.log("\n💳 IPN Notification (GET):", data);

  // TODO:
  // 1. Verify payment status with Pesapal
  // 2. Update database with payment status
  // 3. Send email with ebook download link if payment successful

  return NextResponse.json(
    {
      status: "received",
      message: "IPN notification processed",
    },
    { status: 200 },
  );
}

export async function POST(req) {
  const body = await req.json();

  console.log("\n💳 IPN Notification (POST):", body);

  // TODO: Same as above

  return NextResponse.json(
    {
      status: "received",
      message: "IPN notification processed",
    },
    { status: 200 },
  );
}
