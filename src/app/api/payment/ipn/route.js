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
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden;">
    
    <div style="background-color: #166534; padding: 20px 30px; text-align: center;"> 
        <h2 style="color: #ffffff; font-size: 28px; margin: 0; font-weight: bold;">
            🎉 Your eBook is Ready! Get Started Now! 🚀
        </h2>
    </div>

    <div style="padding: 20px 30px;">
        <p style="color: #374151; font-size: 16px; margin-top: 0;">
            Hi ${name || "there"},
        </p>

        <p style="color: #374151; font-size: 16px;">
            Congratulations — you just took a powerful step toward financial freedom 💰 and online success! We're excited for you to dive in. 🎉
        </p>
    </div>

    <div style="width: 100%; background: #e0f2f1; padding: 0; border-top: 5px solid #16a34a;">
        <img src="https://images.pexels.com/photos/6969962/pexels-photo-6969962.jpeg" alt="Empowerment and Success Image" style="width: 100%; height: auto; display: block; object-fit: cover;">
    </div>

    <div style="padding: 20px 30px;">
        <p style="color: #374151; font-size: 16px;">
            Your exclusive copy of <strong>${productTitle}</strong> is attached to this email as a PDF.
        </p>

        <div style="text-align: center; margin: 30px 0;">
            <a href="${productLink}" target="_blank" style="
                display: inline-block;
                padding: 15px 30px;
                background-color: #16a34a;
                color: #ffffff;
                text-decoration: none;
                font-weight: bold;
                border-radius: 8px;
                font-size: 18px;
                border: 1px solid #16a34a;
                box-shadow: 0 4px 10px rgba(22, 163, 74, 0.4);
            ">
                ⬇️ Click Here to Download Your eBook
            </a>
        </div>
        
        <p style="color: #374151; font-size: 16px; font-weight: bold; margin-top: 30px;">
            Here's what to do next:
        </p>
        <ul style="line-height: 1.8; color: #4b5563; padding-left: 20px;">
            <li style="margin-bottom: 8px;">Download the PDF attachment or use the button above. ✅</li>
            <li style="margin-bottom: 8px;">Read one section at a time — take action as you go! 🧠</li>
            <li>
                <a href="https://www.instagram.com/the.cityentrepreneur/" target="_blank" style="color: #16a34a; text-decoration: none; font-weight: bold;">Follow us on Instagram</a> for daily motivation and success stories. 📸
            </li>
        </ul>

        <p style="color: #374151; font-size: 16px; margin-top: 25px;">
            You now hold the blueprint to create financial transformation.
        </p>
        <p style="color: #374151; font-size: 16px;">
            Remember — you don't need permission to start; you just need a plan and faith to act. This eBook gives you both. I can't wait to see what you create and how your journey unfolds! 🌟
        </p>

        <p style="margin-top: 40px; color: #374151;">
            With excitement and belief in you, 💚
        </p>
        <p style="margin-top: -10px;">
            <strong style="color: #16a34a; font-size: 17px;">Sandra Nanyonga</strong><br/>
            <span style="color: #374151; font-weight: bold;">#THE CITY ENTREPRENEUR</span><br/>
            <span style="color: #6b7280; font-size: 14px;">Kampala, Uganda | Mobile: +256773298586 / 0703983855</span>
        </p>

        <div style="margin-top: 20px; padding: 10px; background-color: #f9fafb; border-left: 4px solid #10b981; border-radius: 4px;">
            <p style="font-style: italic; color: #6b7280; margin: 0; font-size: 14px;">
                PSALMS 23:1-6<br/>
                THE LORD IS MY SHEPHERD 🙏
            </p>
        </div>
    </div>

    <div style="background-color: #f3f4f6; padding: 15px 30px; text-align: center; border-top: 1px solid #e5e7eb;">
        <p style="font-size: 12px; color: #6b7280; margin: 0;">
            If you have any questions, contact us at <a href="mailto:infor@tcedigitalinvestments.com" style="color: #16a34a; text-decoration: none;">infor@tcedigitalinvestments.com</a>.
        </p>
    </div>
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
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden;">
    <!-- Email Header / Title Section (Dark Green Banner) -->
    <div style="background-color: #166534; padding: 20px 30px; text-align: center;"> 
        <h2 style="color: #ffffff; font-size: 28px; margin: 0; font-weight: bold;">
            👑 Welcome to Wealth Builder's Academy! 🚀
        </h2>
    </div>

    <div style="padding: 20px 30px;">
        <p style="color: #374151; font-size: 16px; margin-top: 0;">
            Hi ${name || "there"},
        </p>

        <p style="color: #374151; font-size: 16px;">
            Congratulations! You've just made one of the most powerful investments in your financial future — and I'm so proud of you for taking this step. This is where **Kingdom-minded investors are raised**, and financial legacies are built with wisdom, excellence, and purpose. 💡
        </p>
    </div>

    <!-- Hero Image Section -->
    <div style="width: 100%; background: #e0f2f1; padding: 0;">
        <img src="https://images.pexels.com/photos/6969962/pexels-photo-6969962.jpeg" alt="Empowerment and Success Image" style="width: 100%; height: auto; display: block; object-fit: cover;">
    </div>

    <div style="padding: 20px 30px;">
        
        <!-- ** NEW PRODUCT LINK/WELCOME GUIDE CTA ** -->
        <div style="text-align: center; margin: 20px 0 40px 0; border: 1px solid #d1fae5; border-radius: 8px; padding: 15px; background-color: #f0fdf4;">
            <p style="font-size: 16px; margin-bottom: 10px; color: #065f46; font-weight: bold;">
                🎁 Your Immediate Enrollment Resource:
            </p>
            <a href="${productLink}" target="_blank" style="
                display: inline-block;
                padding: 10px 20px;
                background-color: #16a34a;
                color: #ffffff;
                text-decoration: none;
                font-weight: bold;
                border-radius: 6px;
                font-size: 16px;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            ">
                Click to View Your Enrollment Resource
            </a>
        </div>
        <!-- ** END NEW PRODUCT LINK/WELCOME GUIDE CTA ** -->

        <!-- Activation Steps - Primary Focus -->
        <p style="font-size: 18px; font-weight: bold; color: #16a34a; margin-top: 30px;">
            ⚠️ Quick Action Required: Complete these steps to activate your access:
        </p>

        <div style="background-color: #e0f2f1; padding: 20px; border-radius: 8px; margin: 20px 0; border: 1px solid #16a34a;">
            <p style="margin: 10px 0; color: #1f2937;">
                <strong style="color: #065f46;">1. 📧 Send Your Receipt:</strong> Please forward your full payment receipt to <a href="mailto:infor@tcedigitalinvestments.com" style="color: #16a34a; font-weight: bold;">infor@tcedigitalinvestments.com</a>.
            </p>
            <p style="margin: 10px 0; color: #1f2937;">
                <strong style="color: #065f46;">2. ✉️ Confirm Your Email:</strong> Include **${email}** in the body of that message (this is the address where we will send your secure login details).
            </p>
            <p style="margin: 10px 0; color: #1f2937;">
                <strong style="color: #065f46;">3. ⏰ Sit Tight:</strong> Our dedicated team will set up your account and send your **Welcome Pack** with your login credentials within 24-48 hours.
            </p>
        </div>

        <p style="color: #374151; font-size: 16px; margin-top: 25px;">
            As a Wealth Builder, you're not just learning about money — you're learning how to steward it God's way, multiply it through venture capital and private equity, and create generational impact.
        </p>

        <p style="color: #374151; font-size: 16px;">
            I can't wait to walk this journey with you. Get ready for transformation, growth, and divine financial acceleration! 🔥
        </p>
        
        <!-- Signature Block -->
        <p style="margin-top: 40px; color: #374151;">
            With excitement and faith, 💚
        </p>
        <p style="margin-top: -10px;">
            <strong style="color: #16a34a; font-size: 17px;">Sandra Nanyonga</strong><br/>
            <span style="color: #374151; font-weight: bold;">Founder, Wealth Builder's Academy</span><br/>
            <span style="color: #374151; font-weight: bold;">#THE CITY ENTREPRENEUR</span><br/>
            <span style="color: #6b7280; font-size: 14px;">Kampala, Uganda | Mobile: +256773298586 / 0703983855</span>
        </p>

        <!-- Scripture/PS -->
        <div style="margin-top: 20px; padding: 10px; background-color: #f9fafb; border-left: 4px solid #10b981; border-radius: 4px;">
            <p style="font-style: italic; color: #6b7280; margin: 0; font-size: 14px;">
                PSALMS 23:1-6<br/>
                THE LORD IS MY SHEPHERD 🙏
            </p>
        </div>
    </div>

    <!-- Footer Disclaimer -->
    <div style="background-color: #f3f4f6; padding: 15px 30px; text-align: center; border-top: 1px solid #e5e7eb;">
        <p style="font-size: 12px; color: #6b7280; margin: 0;">
            Follow us: <a href="https://www.instagram.com/the.cityentrepreneur/" target="_blank" style="color: #16a34a; text-decoration: none; font-weight: bold;">Instagram</a>
        </p>
        <p style="font-size: 12px; color: #6b7280; margin: 5px 0 0 0;">
            #WealthBuildersAcademy #FaithDrivenFinance #KingdomWealth
        </p>
    </div>
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
