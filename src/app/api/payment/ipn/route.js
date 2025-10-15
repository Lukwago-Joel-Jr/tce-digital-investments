// src/app/api/payment/ipn/route.js
import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { Resend } from "resend";

const RESEND_API_KEY = process.env.RESEND_API_KEY || "";
const resend = new Resend(RESEND_API_KEY);

async function sendPaymentConfirmation(email, name, amount) {
  await resend.emails.send({
    from: "TCEDigital <no-reply@tcedigitalinvestments.com>",
    to: email,
    subject: "🎉 Payment Received — Thank You!",
    html: `
      <p>Hi ${name || "Customer"},</p>
      <p>Thank you for your purchase. We have received your payment of <strong>$${(amount || 0).toFixed(2)}</strong>.</p>
      <p>Your ebook will be delivered to this email shortly.</p>
      <br/>
      <p>Warm regards,<br/>TCEDigital Investments</p>
    `,
  });
}

// GET variant: simple acknowledgement (optional)
export async function GET(req) {
  const searchParams = req.nextUrl.searchParams;

  const data = {
    OrderTrackingId: searchParams.get("OrderTrackingId"),
    OrderMerchantReference: searchParams.get("OrderMerchantReference"),
    OrderNotificationType: searchParams.get("OrderNotificationType"),
  };

  console.log("\n💳 IPN Notification (GET):", data);

  return NextResponse.json({ status: "received", data }, { status: 200 });
}

export async function POST(req) {
  try {
    const body = await req.json();
    console.log("✅ PESAPAL IPN:", body);

    const {
      pesapal_merchant_reference,
      pesapal_transaction_tracking_id,
      payment_status_description,
    } = body;

    if (!pesapal_merchant_reference) {
      return NextResponse.json({ error: "Missing reference" }, { status: 400 });
    }

    if (payment_status_description?.toUpperCase() !== "COMPLETED") {
      console.log("ℹ️ Payment not completed yet:", payment_status_description);
      return NextResponse.json(
        { message: "Payment not completed" },
        { status: 200 },
      );
    }

    const ref = doc(db, "payments", pesapal_merchant_reference);
    const snapshot = await getDoc(ref);

    if (!snapshot.exists()) {
      console.error("❌ No record for:", pesapal_merchant_reference);
      return NextResponse.json({ error: "Payment not found" }, { status: 404 });
    }

    const data = snapshot.data();

    // Update status in Firebase
    await updateDoc(ref, { status: "COMPLETED" });

    // Send confirmation email safely
    if (data.email) {
      try {
        await sendPaymentConfirmation(data.email, data.name, data.amount);
        console.log("📧 Email sent to", data.email);
      } catch (emailErr) {
        console.error("❌ Failed to send email:", emailErr);
      }
    }

    return NextResponse.json({ message: "IPN processed successfully" });
  } catch (error) {
    console.error("❌ IPN Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
