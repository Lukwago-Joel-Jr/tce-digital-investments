// import { NextResponse } from "next/server";
// import { db } from "@/lib/firebase";
// import { doc, updateDoc, getDoc } from "firebase/firestore";
// import { Resend } from "resend";

// // Create Resend instance only when needed
// function createResend() {
//   const key = "re_19DUmfB7_AUuKTtcUksxxmvk9wgFQEjYX";
//   return new Resend(key);
// }

// async function sendPaymentConfirmation(email, name, amount) {
//   try {
//     await createResend().emails.send({
//       from: "TCEDigital <no-reply@tcedigitalinvestments.com>",
//       to: email,
//       subject: "🎉 Payment Received — Thank You!",
//       html: `
//         <p>Hi ${name || "Customer"},</p>
//         <p>Thank you for your purchase. We have received your payment of <strong>$${(amount || 0).toFixed(2)}</strong>.</p>
//         <p>Your ebook will be delivered to this email shortly.</p>
//         <br/>
//         <p>Warm regards,<br/>TCEDigital Investments 2025</p>
//       `,
//     });
//     console.log("✅ Email sent successfully to", email);
//   } catch (error) {
//     console.error("❌ Email send failed:", error);
//     throw error;
//   }
// }

// // CRITICAL: Pesapal sends IPN as GET requests with query parameters
// export async function GET(req) {
//   try {
//     const searchParams = req.nextUrl.searchParams;

//     // Pesapal sends these exact field names in GET request
//     const OrderTrackingId = searchParams.get("OrderTrackingId");
//     const OrderMerchantReference = searchParams.get("OrderMerchantReference");
//     const OrderNotificationType = searchParams.get("OrderNotificationType");

//     console.log("\n💳 IPN Notification (GET):", {
//       OrderTrackingId,
//       OrderMerchantReference,
//       OrderNotificationType,
//       allParams: Object.fromEntries(searchParams),
//     });

//     if (!OrderMerchantReference) {
//       console.error("❌ Missing OrderMerchantReference");
//       return NextResponse.json(
//         { error: "Missing merchant reference" },
//         { status: 400 },
//       );
//     }

//     // Get payment record from Firestore
//     const paymentRef = doc(db, "payments", OrderMerchantReference);
//     const snapshot = await getDoc(paymentRef);

//     if (!snapshot.exists()) {
//       console.error("❌ Payment record not found:", OrderMerchantReference);
//       return NextResponse.json(
//         { error: "Payment record not found" },
//         { status: 404 },
//       );
//     }

//     const paymentData = snapshot.data();
//     console.log("📦 Payment record found:", {
//       id: OrderMerchantReference,
//       currentStatus: paymentData.status,
//       email: paymentData.email,
//     });

//     // Check if already completed (avoid duplicate processing)
//     if (paymentData.status === "COMPLETED") {
//       console.log("ℹ️ Payment already marked as completed");
//       return NextResponse.json({
//         message: "Payment already completed",
//       });
//     }

//     // Update status to COMPLETED
//     await updateDoc(paymentRef, {
//       status: "COMPLETED",
//       pesapalTrackingId: OrderTrackingId,
//       completedAt: new Date().toISOString(),
//     });
//     console.log("✅ Payment status updated to COMPLETED");

//     // Send confirmation email
//     if (paymentData.email) {
//       try {
//         await sendPaymentConfirmation(
//           paymentData.email,
//           paymentData.name || paymentData.firstName,
//           paymentData.amount,
//         );
//       } catch (emailError) {
//         console.error(
//           "⚠️ Email failed but payment marked complete:",
//           emailError,
//         );
//         // Don't fail the IPN if email fails
//       }
//     }

//     return NextResponse.json({
//       message: "IPN processed successfully",
//       orderId: OrderMerchantReference,
//     });
//   } catch (error) {
//     console.error("❌ IPN Error:", error);
//     return NextResponse.json(
//       { error: "IPN processing failed", message: error.message },
//       { status: 500 },
//     );
//   }
// }

// // Optional: Handle POST as well (some systems might send POST)
// export async function POST(req) {
//   try {
//     const body = await req.json();
//     console.log("\n💳 IPN Notification (POST):", body);

//     // Extract fields - try both naming conventions
//     const OrderMerchantReference =
//       body.OrderMerchantReference ||
//       body.order_merchant_reference ||
//       body.merchant_reference;

//     const OrderTrackingId =
//       body.OrderTrackingId || body.order_tracking_id || body.tracking_id;

//     if (!OrderMerchantReference) {
//       return NextResponse.json(
//         { error: "Missing merchant reference" },
//         { status: 400 },
//       );
//     }

//     // Get payment record
//     const paymentRef = doc(db, "payments", OrderMerchantReference);
//     const snapshot = await getDoc(paymentRef);

//     if (!snapshot.exists()) {
//       console.error("❌ Payment not found:", OrderMerchantReference);
//       return NextResponse.json({ error: "Payment not found" }, { status: 404 });
//     }

//     const paymentData = snapshot.data();

//     if (paymentData.status === "COMPLETED") {
//       return NextResponse.json({ message: "Already completed" });
//     }

//     // Update status
//     await updateDoc(paymentRef, {
//       status: "COMPLETED",
//       pesapalTrackingId: OrderTrackingId,
//       completedAt: new Date().toISOString(),
//     });

//     // Send email
//     if (paymentData.email) {
//       try {
//         await sendPaymentConfirmation(
//           paymentData.email,
//           paymentData.name,
//           paymentData.amount,
//         );
//       } catch (emailError) {
//         console.error("⚠️ Email failed:", emailError);
//       }
//     }

//     return NextResponse.json({
//       message: "IPN processed successfully",
//     });
//   } catch (error) {
//     console.error("❌ POST IPN Error:", error);
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }

// src/app/api/payment/ipn/route.js - WITH PAYMENT VERIFICATION
import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { Resend } from "resend";

// PRODUCTION CREDENTIALS
const PESAPAL_CONSUMER_KEY = "h4bqR749515z64EVjMmdQxN8H2GHtrJl";
const PESAPAL_CONSUMER_SECRET = "xUN9sR0nstcDHdwQTM8r4dg6uT0=";

// PRODUCTION URLs
const TOKEN_URL = "https://pay.pesapal.com/v3/api/Auth/RequestToken";
const STATUS_URL =
  "https://pay.pesapal.com/v3/api/Transactions/GetTransactionStatus";

// Create Resend instance
function createResend() {
  const key = "re_19DUmfB7_AUuKTtcUksxxmvk9wgFQEjYX";
  return new Resend(key);
}

// Send payment confirmation email
async function sendPaymentConfirmation(email, name, amount, orderId) {
  try {
    await createResend().emails.send({
      from: "TCEDigital <no-reply@tcedigitalinvestments.com>",
      to: email,
      subject: "🎉 Payment Confirmed - Your eBook is Ready!",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #16a34a;">Payment Successful!</h2>
          <p>Hi ${name || "Customer"},</p>
          <p>Thank you for your purchase! We have successfully received your payment of <strong>$${(amount || 0).toFixed(2)}</strong>.</p>
          
          <div style="background-color: #f3f4f6; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 5px 0;"><strong>Order ID:</strong> ${orderId}</p>
            <p style="margin: 5px 0;"><strong>Amount:</strong> $${(amount || 0).toFixed(2)} USD</p>
            <p style="margin: 5px 0;"><strong>Status:</strong> Completed ✅</p>
          </div>

          <p>Your ebook will be delivered to this email address shortly.</p>
          
          <p style="margin-top: 30px;">Best regards,<br/>
          <strong>TCEDigital Investments Team</strong></p>
          
          <hr style="margin-top: 30px; border: none; border-top: 1px solid #e5e7eb;">
          <p style="font-size: 12px; color: #6b7280;">
            If you have any questions, please contact us at support@tcedigitalinvestments.com
          </p>
        </div>
      `,
    });
    console.log("✅ Confirmation email sent to", email);
  } catch (error) {
    console.error("❌ Email send failed:", error);
    throw error;
  }
}

// Verify payment status with Pesapal
async function verifyPaymentStatus(orderTrackingId) {
  try {
    console.log("\n🔍 Verifying payment status with Pesapal...");

    // Get authentication token
    const tokenRes = await fetch(TOKEN_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        consumer_key: PESAPAL_CONSUMER_KEY,
        consumer_secret: PESAPAL_CONSUMER_SECRET,
      }),
    });

    if (!tokenRes.ok) {
      throw new Error("Failed to get authentication token");
    }

    const tokenData = await tokenRes.json();

    if (!tokenData.token) {
      throw new Error("No token received from Pesapal");
    }

    // Get transaction status
    const statusUrl = `${STATUS_URL}?orderTrackingId=${orderTrackingId}`;

    const statusRes = await fetch(statusUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${tokenData.token}`,
      },
    });

    if (!statusRes.ok) {
      throw new Error("Failed to get transaction status");
    }

    const statusData = await statusRes.json();
    console.log("📦 Payment Status from Pesapal:", statusData);

    return statusData;
  } catch (error) {
    console.error("❌ Payment verification failed:", error);
    throw error;
  }
}

// Handle GET IPN (Pesapal sends notifications as GET)
export async function GET(req) {
  try {
    const searchParams = req.nextUrl.searchParams;

    const OrderTrackingId = searchParams.get("OrderTrackingId");
    const OrderMerchantReference = searchParams.get("OrderMerchantReference");
    const OrderNotificationType = searchParams.get("OrderNotificationType");

    console.log("\n💳 IPN Notification (GET):", {
      OrderTrackingId,
      OrderMerchantReference,
      OrderNotificationType,
    });

    if (!OrderMerchantReference || !OrderTrackingId) {
      console.error("❌ Missing required parameters");
      return NextResponse.json(
        { error: "Missing parameters" },
        { status: 400 },
      );
    }

    // Get payment record from Firestore
    const paymentRef = doc(db, "payments", OrderMerchantReference);
    const snapshot = await getDoc(paymentRef);

    if (!snapshot.exists()) {
      console.error("❌ Payment record not found:", OrderMerchantReference);
      return NextResponse.json(
        { error: "Payment record not found" },
        { status: 404 },
      );
    }

    const paymentData = snapshot.data();
    console.log("📦 Payment record found:", {
      id: OrderMerchantReference,
      currentStatus: paymentData.status,
    });

    // Check if already completed
    if (paymentData.status === "COMPLETED") {
      console.log("ℹ️ Payment already completed");
      return NextResponse.json({
        message: "Payment already completed",
      });
    }

    // CRITICAL: Verify payment status with Pesapal
    let paymentStatus;
    try {
      const statusData = await verifyPaymentStatus(OrderTrackingId);
      paymentStatus =
        statusData.payment_status_description || statusData.status_code;

      console.log("✅ Verified payment status:", paymentStatus);
    } catch (verifyError) {
      console.error("❌ Failed to verify payment:", verifyError);

      // Update as FAILED if verification fails
      await updateDoc(paymentRef, {
        status: "FAILED",
        failureReason: "Payment verification failed",
        pesapalTrackingId: OrderTrackingId,
        updatedAt: new Date().toISOString(),
      });

      return NextResponse.json(
        {
          error: "Payment verification failed",
        },
        { status: 500 },
      );
    }

    // Check if payment was actually completed
    const isCompleted =
      paymentStatus === "COMPLETED" ||
      paymentStatus === "Completed" ||
      paymentStatus === 1; // Pesapal returns 1 for completed

    if (isCompleted) {
      // Payment is COMPLETED
      console.log("✅ Payment verified as COMPLETED");

      await updateDoc(paymentRef, {
        status: "COMPLETED",
        pesapalTrackingId: OrderTrackingId,
        completedAt: new Date().toISOString(),
        paymentStatus: paymentStatus,
      });

      // Send confirmation email
      if (paymentData.email) {
        try {
          await sendPaymentConfirmation(
            paymentData.email,
            paymentData.name || paymentData.firstName,
            paymentData.amount,
            OrderMerchantReference,
          );
        } catch (emailError) {
          console.error("⚠️ Email failed but payment is complete:", emailError);
        }
      }

      return NextResponse.json({
        message: "Payment completed successfully",
        orderId: OrderMerchantReference,
        status: "COMPLETED",
      });
    } else {
      // Payment FAILED or PENDING
      const status =
        paymentStatus === "PENDING" || paymentStatus === 0
          ? "PENDING"
          : "FAILED";

      console.log(`⚠️ Payment not completed. Status: ${status}`);

      await updateDoc(paymentRef, {
        status: status,
        pesapalTrackingId: OrderTrackingId,
        paymentStatus: paymentStatus,
        updatedAt: new Date().toISOString(),
        failureReason:
          paymentStatus !== "PENDING"
            ? `Payment ${status.toLowerCase()}`
            : undefined,
      });

      return NextResponse.json({
        message: `Payment status: ${status}`,
        orderId: OrderMerchantReference,
        status: status,
      });
    }
  } catch (error) {
    console.error("❌ IPN Error:", error);
    return NextResponse.json(
      { error: "IPN processing failed", message: error.message },
      { status: 500 },
    );
  }
}

// Handle POST IPN (backup)
export async function POST(req) {
  try {
    const body = await req.json();
    console.log("\n💳 IPN Notification (POST):", body);

    const OrderMerchantReference =
      body.OrderMerchantReference ||
      body.order_merchant_reference ||
      body.merchant_reference;

    const OrderTrackingId =
      body.OrderTrackingId || body.order_tracking_id || body.tracking_id;

    if (!OrderMerchantReference || !OrderTrackingId) {
      return NextResponse.json(
        { error: "Missing parameters" },
        { status: 400 },
      );
    }

    // Get payment record
    const paymentRef = doc(db, "payments", OrderMerchantReference);
    const snapshot = await getDoc(paymentRef);

    if (!snapshot.exists()) {
      console.error("❌ Payment not found:", OrderMerchantReference);
      return NextResponse.json({ error: "Payment not found" }, { status: 404 });
    }

    const paymentData = snapshot.data();

    if (paymentData.status === "COMPLETED") {
      return NextResponse.json({ message: "Already completed" });
    }

    // Verify payment status
    let paymentStatus;
    try {
      const statusData = await verifyPaymentStatus(OrderTrackingId);
      paymentStatus =
        statusData.payment_status_description || statusData.status_code;
    } catch (verifyError) {
      await updateDoc(paymentRef, {
        status: "FAILED",
        failureReason: "Verification failed",
        updatedAt: new Date().toISOString(),
      });
      return NextResponse.json(
        { error: "Verification failed" },
        { status: 500 },
      );
    }

    const isCompleted =
      paymentStatus === "COMPLETED" ||
      paymentStatus === "Completed" ||
      paymentStatus === 1;

    if (isCompleted) {
      await updateDoc(paymentRef, {
        status: "COMPLETED",
        pesapalTrackingId: OrderTrackingId,
        completedAt: new Date().toISOString(),
      });

      if (paymentData.email) {
        try {
          await sendPaymentConfirmation(
            paymentData.email,
            paymentData.name,
            paymentData.amount,
            OrderMerchantReference,
          );
        } catch (emailError) {
          console.error("⚠️ Email failed:", emailError);
        }
      }

      return NextResponse.json({ message: "Payment completed" });
    } else {
      const status = paymentStatus === "PENDING" ? "PENDING" : "FAILED";

      await updateDoc(paymentRef, {
        status: status,
        paymentStatus: paymentStatus,
        updatedAt: new Date().toISOString(),
      });

      return NextResponse.json({ message: `Payment ${status}` });
    }
  } catch (error) {
    console.error("❌ POST IPN Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
