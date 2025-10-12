// import { NextResponse } from "next/server";
// import { Resend } from "resend";

// const RESEND_API_KEY = "re_19DUmfB7_AUuKTtcUksxxmvk9wgFQEjYX";
// const PESAPAL_CONSUMER_KEY = "h4bqR749515z64EVjMmdQxN8H2GHtrJl";
// const PESAPAL_CONSUMER_SECRET = "xUN9sR0nstcDHdwQTM8r4dg6uT0=";

// const resend = new Resend(RESEND_API_KEY);

// // ✅ Helper: send confirmation email
// async function sendPaymentConfirmation(email, name, amount) {
//   await resend.emails.send({
//     from: "TCEDigital <no-reply@tcedigitalinvestments.com>",
//     to: email,
//     subject: "🎉 Payment Successful – Thank You!",
//     html: `
//       <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #eee; border-radius: 12px; overflow: hidden;">
//         <div style="background-color: #064e3b; color: #fff; padding: 20px;">
//           <h2 style="margin: 0;">Payment Received ✅</h2>
//         </div>
//         <div style="padding: 25px;">
//           <p>Hi ${name || "there"},</p>
//           <p>We’ve received your payment of <strong>UGX ${amount?.toLocaleString?.() || amount}</strong>.</p>
//           <p>Thank you for supporting <strong>TCEDigital Investments</strong>.</p>
//           <p style="margin-top: 20px;">Your order or subscription will be processed shortly.</p>
//           <p style="margin-top: 20px; color: #064e3b;">— The TCEDigital Team</p>
//         </div>
//       </div>
//     `,
//   });
// }

// export async function POST(req) {
//   try {
//     const body = await req.json();
//     console.log("PESAPAL IPN RECEIVED:", body);

//     // Pesapal sends data like this:
//     const {
//       order_reference,
//       order_tracking_id,
//       payment_status_description,
//       email,
//       name,
//       amount,
//     } = body;

//     // If no tracking ID, return error
//     if (!order_tracking_id) {
//       return NextResponse.json(
//         { error: "Missing order tracking ID" },
//         { status: 400 },
//       );
//     }

//     // 🔹 Check status (Pesapal usually sends "COMPLETED" or "SUCCESSFUL")
//     const status = payment_status_description?.toUpperCase?.();

//     if (status === "COMPLETED" || status === "SUCCESSFUL") {
//       console.log("✅ Payment successful, sending email...");
//       await sendPaymentConfirmation(email, name, amount);
//     } else {
//       console.log("ℹ️ Payment not completed yet:", status);
//     }

//     return NextResponse.json({ message: "IPN processed" }, { status: 200 });
//   } catch (error) {
//     console.error("❌ IPN Error:", error);
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }

// import { NextResponse } from "next/server";
// import { Resend } from "resend";

// const RESEND_API_KEY = "re_19DUmfB7_AUuKTtcUksxxmvk9wgFQEjYX";
// const resend = new Resend(RESEND_API_KEY);

// async function sendPaymentConfirmation(email, name, amount) {
//   if (!email) {
//     console.warn("⚠️ No email provided. Skipping email send.");
//     return;
//   }

//   try {
//     await resend.emails.send({
//       from: "TCEDigital <no-reply@tcedigitalinvestments.com>",
//       to: email,
//       subject: "🎉 Payment Successful – Thank You!",
//       html: `
//         <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto;">
//           <div style="background-color: #064e3b; color: #fff; padding: 20px;">
//             <h2>Payment Received ✅</h2>
//           </div>
//           <div style="padding: 25px;">
//             <p>Hi ${name || "there"},</p>
//             <p>We’ve received your payment of <strong>UGX ${amount?.toLocaleString?.() || amount}</strong>.</p>
//             <p>Thank you for supporting <strong>TCEDigital Investments</strong>.</p>
//             <p>— The TCEDigital Team</p>
//           </div>
//         </div>
//       `,
//     });

//     console.log("📧 Email sent successfully to:", email);
//   } catch (error) {
//     console.error("❌ Email sending error:", error?.response?.body || error);
//   }
// }

// export async function POST(req) {
//   const raw = await req.text();
//   console.log("📩 FULL BODY RECEIVED:", raw);

//   try {
//     const body = JSON.parse(raw);
//     console.log("✅ Parsed body:", body);

//     const {
//       order_reference,
//       order_tracking_id,
//       payment_status_description,
//       email,
//       name,
//       amount,
//     } = body;

//     if (!order_tracking_id) {
//       console.error("❌ Missing tracking ID");
//       return NextResponse.json(
//         { error: "Missing tracking ID" },
//         { status: 400 },
//       );
//     }

//     // Return early to Pesapal (prevent timeout)
//     const response = NextResponse.json(
//       { message: "IPN processed" },
//       { status: 200 },
//     );

//     // Continue async logic (don’t block Pesapal)
//     (async () => {
//       const status = payment_status_description?.toUpperCase?.();
//       if (status === "COMPLETED" || status === "SUCCESSFUL") {
//         console.log("✅ Payment completed. Sending email...");
//         await sendPaymentConfirmation(email, name, amount);
//       } else {
//         console.log("ℹ️ Payment status not completed:", status);
//       }
//     })();

//     return response;
//   } catch (error) {
//     console.error("❌ IPN Processing Error:", error);
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }

import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

async function sendPaymentConfirmation(email, name, amount) {
  await resend.emails.send({
    from: "TCEDigital <no-reply@tcedigitalinvestments.com>",
    to: email,
    subject: "🎉 Payment Successful – Thank You!",
    html: `<p>Hi ${name},</p><p>Your payment of UGX ${amount} was received successfully.</p>`,
  });
}

export async function POST(req) {
  try {
    const body = await req.json();
    console.log("✅ PESAPAL IPN:", body);

    const { pesapal_merchant_reference, pesapal_transaction_tracking_id } =
      body;
    if (!pesapal_merchant_reference) {
      return NextResponse.json({ error: "Missing reference" }, { status: 400 });
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

    // Send confirmation email
    await sendPaymentConfirmation(data.email, data.name, data.amount);

    return NextResponse.json({ message: "IPN processed successfully" });
  } catch (error) {
    console.error("❌ IPN Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
