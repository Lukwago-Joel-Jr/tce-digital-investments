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

// Send EBOOK confirmation email with PDF attachment
async function sendEbookEmail(
  email,
  name,
  amount,
  orderId,
  productTitle,
  productLink,
) {
  try {
    await createResend().emails.send({
      from: "TCEDigital <no-reply@tcedigitalinvestments.com>",
      to: email,
      subject: `Your ${productTitle} eBook is Here — Let's Turn Ideas Into Income!`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #16a34a;">Your eBook is Ready!</h2>
          
          <p>Hi ${name || "there"},</p>
          
          <p>Congratulations — you just took a powerful step toward financial freedom and online success!</p>
          
          <p>Your copy of <strong>${productTitle}</strong> is attached to this email as a PDF.</p>
           <a href="${productLink}" target="_blank" style="color: #16a34a;">
            Click here to download your eBook
          </a>
          <div style="background-color: #f3f4f6; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 5px 0;"><strong>Order ID:</strong> ${orderId}</p>
            <p style="margin: 5px 0;"><strong>Amount Paid:</strong> $${(amount || 0).toFixed(2)} USD</p>
            <p style="margin: 5px 0;"><strong>Status:</strong> Completed ✅</p>
          </div>

          <p><strong>Here's what to do next:</strong></p>
          <ul style="line-height: 1.8;">
            <li>Download the PDF attachment below</li>
            <li>Read one section at a time — take action as you go</li>
            <li>Follow us on Instagram for daily motivation and success stories</li>
          </ul>

          <p>You now hold the blueprint to create financial transformation.</p>
          <p>Remember — you don't need permission to start; you just need a plan and faith to act.<br/>
          This eBook gives you both.</p>

          <p>I can't wait to see what you create and how your journey unfolds!</p>
          
          <p style="margin-top: 30px;">With excitement and belief in you,<br/>
          <strong>Sandra Nanyonga</strong><br/>
          #THE CITY ENTREPRENEUR<br/>
          Kampala, Uganda<br/>
          Mobile: +256773298586 / 0703983855</p>
          
          <p style="font-style: italic; color: #6b7280; margin-top: 20px;">
            PSALMS 23:1-6<br/>
            THE LORD IS MY SHEPHERD
          </p>
          
          <hr style="margin-top: 30px; border: none; border-top: 1px solid #e5e7eb;">
          <p style="font-size: 12px; color: #6b7280;">
            If you have any questions, contact us at info@tcedigitalinvestments.com
          </p>
        </div>
      `,
      // TODO: Add PDF attachment in next phase
    });
    console.log("✅ eBook email sent to", email);
  } catch (error) {
    console.error("❌ eBook email send failed:", error);
    throw error;
  }
}

// Send COURSE enrollment email with academy instructions
async function sendCourseEmail(email, name, amount, orderId, productLink) {
  try {
    await createResend().emails.send({
      from: "TCEDigital <no-reply@tcedigitalinvestments.com>",
      to: email,
      subject:
        "Welcome to Wealth Builder's Academy — Let's Start Building Kingdom Wealth Together!",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #16a34a;">Welcome to Wealth Builder's Academy!</h2>
          
          <p>Hi ${name || "there"},</p>
          
          <p>Congratulations and welcome to Wealth Builder's Academy!</p>
          
          <p>You've just made one of the most powerful investments in your financial future — and I'm so proud of you for taking this step. This is where Kingdom-minded investors are raised, and financial legacies are built with wisdom, excellence, and purpose.</p>

          <div style="background-color: #f3f4f6; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 5px 0;"><strong>Order ID:</strong> ${orderId}</p>
            <p style="margin: 5px 0;"><strong>Amount Paid:</strong> $${(amount || 0).toFixed(2)} USD</p>
            <p style="margin: 5px 0;"><strong>Status:</strong> Completed ✅</p>
          </div>

          <p style="font-size: 18px; font-weight: bold; color: #16a34a;">Before we officially activate your access to the Academy, please complete these quick steps:</p>

          <div style="background-color: #dbeafe; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #16a34a;">
            <p style="margin: 10px 0;"><strong>📧 Step 1:</strong> Send your payment receipt to <a href="mailto:info@tcedigitalinvestments.com" style="color: #16a34a;">info@tcedigitalinvestments.com</a></p>
            <p style="margin: 10px 0;"><strong>✉️ Step 2:</strong> Include <strong>${email}</strong> in that message (this is where we'll send your login details)</p>
            <p style="margin: 10px 0;"><strong>⏰ Step 3:</strong> Our team will set up your account and send your Welcome Pack within 24-48 hours</p>
          </div>
           <a href="${productLink}" target="_blank" style="color: #16a34a;">
            Click here to download your eBook
          </a>
          <p>As a Wealth Builder, you're not just learning about money — you're learning how to steward it God's way, multiply it through venture capital and private equity, and create generational impact.</p>

          <p>I can't wait to walk this journey with you.<br/>
          Get ready for transformation, growth, and divine financial acceleration!</p>
          
          <p style="margin-top: 30px;">With excitement and faith,<br/>
          <strong>Sandra Nanyonga</strong><br/>
          Founder, Wealth Builder's Academy<br/>
          #THE CITY ENTREPRENEUR<br/>
          Kampala, Uganda<br/>
          Mobile: +256773298586 / 0703983855</p>
          
          <p style="font-style: italic; color: #6b7280; margin-top: 20px;">
            PSALMS 23:1-6<br/>
            THE LORD IS MY SHEPHERD
          </p>
          
          <hr style="margin-top: 30px; border: none; border-top: 1px solid #e5e7eb;">
          <p style="font-size: 12px; color: #6b7280;">
            #WealthBuildersAcademy #FaithDrivenFinance #KingdomWealth
          </p>
        </div>
      `,
    });
    console.log("✅ Course enrollment email sent to", email);
  } catch (error) {
    console.error("❌ Course email send failed:", error);
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
      productType: paymentData.productType || "ebook",
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
        { error: "Payment verification failed" },
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

      // Send confirmation email based on product type
      if (paymentData.email) {
        try {
          const productType = paymentData.productType || "ebook";
          const productTitle = paymentData.productTitle || "Your Purchase";

          console.log(
            `📧 Sending ${productType} email to ${paymentData.email}`,
          );

          // if (productType === "course") {
          //   await sendCourseEmail(
          //     paymentData.email,
          //     paymentData.name || paymentData.firstName,
          //     paymentData.amount,
          //     OrderMerchantReference,
          //   );
          // } else {
          //   await sendEbookEmail(
          //     paymentData.email,
          //     paymentData.name || paymentData.firstName,
          //     paymentData.amount,
          //     OrderMerchantReference,
          //     productTitle,
          //   );
          // }
          if (productType === "course") {
            await sendCourseEmail(
              paymentData.email,
              paymentData.name || paymentData.firstName,
              paymentData.amount,
              OrderMerchantReference,
              paymentData.productLink || "", // ⬅️ ADD THIS
            );
          } else {
            await sendEbookEmail(
              paymentData.email,
              paymentData.name || paymentData.firstName,
              paymentData.amount,
              OrderMerchantReference,
              productTitle,
              paymentData.productLink || "", // ⬅️ ADD THIS
            );
          }
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

      // Send confirmation email based on product type
      if (paymentData.email) {
        try {
          const productType = paymentData.productType || "ebook";
          const productTitle = paymentData.productTitle || "Your Purchase";

          // if (productType === "course") {
          //   await sendCourseEmail(
          //     paymentData.email,
          //     paymentData.name,
          //     paymentData.amount,
          //     OrderMerchantReference,
          //   );
          // } else {
          //   await sendEbookEmail(
          //     paymentData.email,
          //     paymentData.name,
          //     paymentData.amount,
          //     OrderMerchantReference,
          //     productTitle,
          //   );
          // }
          if (productType === "course") {
            await sendCourseEmail(
              paymentData.email,
              paymentData.name,
              paymentData.amount,
              OrderMerchantReference,
              paymentData.productLink || "", // ⬅️ ADD THIS
            );
          } else {
            await sendEbookEmail(
              paymentData.email,
              paymentData.name,
              paymentData.amount,
              OrderMerchantReference,
              productTitle,
              paymentData.productLink || "", // ⬅️ ADD THIS
            );
          }
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
