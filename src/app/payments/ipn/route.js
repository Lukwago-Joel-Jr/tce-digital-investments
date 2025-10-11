// import { NextResponse } from "next/server";

// export async function POST(req) {
//   try {
//     const body = await req.text(); // Pesapal sends raw text
//     console.log("Pesapal IPN received:", body);

//     // TODO: verify transaction with Pesapal API if needed

//     return NextResponse.json(
//       { message: "IPN received successfully" },
//       { status: 200 },
//     );
//   } catch (error) {
//     console.error("Error handling IPN:", error);
//     return NextResponse.json(
//       { error: "Internal Server Error" },
//       { status: 500 },
//     );
//   }
// }

// export async function GET() {
//   // Pesapal sometimes sends GET requests to test the endpoint
//   return NextResponse.json({ message: "IPN endpoint active" }, { status: 200 });
// }

import { NextResponse } from "next/server";
import { Resend } from "resend";

// 🔹 Put your keys directly here for testing
const RESEND_API_KEY = "re_19DUmfB7_AUuKTtcUksxxmvk9wgFQEjYX";
const PESAPAL_CONSUMER_KEY = "h4bqR749515z64EVjMmdQxN8H2GHtrJl";
const PESAPAL_CONSUMER_SECRET = "xUN9sR0nstcDHdwQTM8r4dg6uT0=";

const resend = new Resend(RESEND_API_KEY);

// ✅ Helper: send confirmation email
async function sendPaymentConfirmation(email, name, amount) {
  await resend.emails.send({
    from: "TCEDigital <no-reply@tcedigitalinvestments.com>",
    to: email,
    subject: "🎉 Payment Successful – Thank You!",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #eee; border-radius: 12px; overflow: hidden;">
        <div style="background-color: #064e3b; color: #fff; padding: 20px;">
          <h2 style="margin: 0;">Payment Received ✅</h2>
        </div>
        <div style="padding: 25px;">
          <p>Hi ${name || "there"},</p>
          <p>We’ve received your payment of <strong>UGX ${amount?.toLocaleString?.() || amount}</strong>.</p>
          <p>Thank you for supporting <strong>TCEDigital Investments</strong>.</p>
          <p style="margin-top: 20px;">Your order or subscription will be processed shortly.</p>
          <p style="margin-top: 20px; color: #064e3b;">— The TCEDigital Team</p>
        </div>
      </div>
    `,
  });
}

// ✅ IPN route handler
export async function POST(req) {
  try {
    const body = await req.json();
    console.log("PESAPAL IPN RECEIVED:", body);

    // Pesapal sends data like this:
    const {
      order_reference,
      order_tracking_id,
      payment_status_description,
      email,
      name,
      amount,
    } = body;

    // If no tracking ID, return error
    if (!order_tracking_id) {
      return NextResponse.json(
        { error: "Missing order tracking ID" },
        { status: 400 },
      );
    }

    // 🔹 Check status (Pesapal usually sends "COMPLETED" or "SUCCESSFUL")
    const status = payment_status_description?.toUpperCase?.();

    if (status === "COMPLETED" || status === "SUCCESSFUL") {
      console.log("✅ Payment successful, sending email...");
      await sendPaymentConfirmation(email, name, amount);
    } else {
      console.log("ℹ️ Payment not completed yet:", status);
    }

    return NextResponse.json({ message: "IPN processed" }, { status: 200 });
  } catch (error) {
    console.error("❌ IPN Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
