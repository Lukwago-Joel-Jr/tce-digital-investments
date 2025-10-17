import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { Resend } from "resend";
import { products } from "@/components/Data/ebooks";

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

// Send EBOOK confirmation email with PDF attachment or link
async function sendEbookEmail(email, name, amount, orderId, productTitle) {
  try {
    // Find the product based on its title
    const product = products.find((p) => p.title === productTitle);
    if (!product) {
      throw new Error(`Product not found with title: ${productTitle}`);
    }

    const isKingdomLending = product.id === "KINGDOM-LENDING";
    const isDigitalEntrepreneurship = product.id === "DIGITAL-ENTREPRENEURSHIP";

    let emailConfig = {
      from: "TCEDigital <no-reply@tcedigitalinvestments.com>",
      to: email,
      subject: isKingdomLending
        ? "Your Kingdom Lending Guide is Here — Let's Build Biblical Wealth!"
        : "Your Digital Entrepreneurship Guide is Here — Let's Turn Ideas Into Income!",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #16a34a;">Your ${productTitle} is Ready!</h2>
          
          <p>Hi ${name || "there"},</p>
          
          <p>Congratulations — you just took a powerful step toward ${
            isKingdomLending
              ? "building Kingdom wealth and creating impact!"
              : "financial freedom and online success!"
          }</p>
          
          ${
            isKingdomLending
              ? `<p>Your copy of <strong>${productTitle}</strong> and all bonus worksheets are attached to this email as a PDF.</p>`
              : `<p>Your copy of <strong>${productTitle}</strong> is ready! Click the button below to access your guide:</p>
                 <div style="text-align: center; margin: 30px 0;">
                   <a href="${product.ebookLink}" style="background-color: #16a34a; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold;">Access Your Guide</a>
                 </div>`
          }
          
          <div style="background-color: #f3f4f6; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 5px 0;"><strong>Order ID:</strong> ${orderId}</p>
            <p style="margin: 5px 0;"><strong>Amount Paid:</strong> $${(amount || 0).toFixed(2)} USD</p>
            <p style="margin: 5px 0;"><strong>Status:</strong> Completed ✅</p>
          </div>

          <p><strong>Here's what to do next:</strong></p>
          <ul style="line-height: 1.8;">
            ${
              isKingdomLending
                ? `<li>Download and save the PDF attachment</li>
                   <li>Print the bonus worksheets for your lending business</li>
                   <li>Start with the first module and implement as you go</li>`
                : `<li>Click the access button above to view your guide</li>
                   <li>Bookmark the link for easy access</li>
                   <li>Start with Module 1 and take action immediately</li>`
            }
            <li>Follow us on Instagram for daily motivation and success stories</li>
          </ul>

          <p>${
            isKingdomLending
              ? "You now hold the blueprint to create Kingdom wealth through lending."
              : "You now have the roadmap to create digital products and passive income."
          }</p>
          
          <p>Remember — you don't need permission to start; you just need a plan and faith to act.<br/>
          This guide gives you both.</p>

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
    };

    // Add PDF attachment for Kingdom Lending
    if (isKingdomLending) {
      emailConfig.attachments = [
        {
          filename: "KINGDOM-LENDING.pdf",
          path: `${process.cwd()}/public/ebooks/KINGDOM-LENDING.pdf`,
        },
      ];
    }

    await createResend().emails.send(emailConfig);
    console.log(`✅ eBook email sent to ${email} for ${productTitle}`);
  } catch (error) {
    console.error("❌ eBook email send failed:", error);
    throw error;
  }
}

// Send COURSE enrollment email with academy instructions
async function sendCourseEmail(email, name, amount, orderId, productTitle) {
  try {
    // Find the course product based on title
    const courseProduct = products.find((p) => p.title === productTitle);
    if (!courseProduct) {
      throw new Error(`Course not found with title: ${productTitle}`);
    }

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

          <p style="font-size: 18px; font-weight: bold; color: #16a34a;">🎉 Your Enrollment Link is Ready!</p>

          <div style="text-align: center; margin: 30px 0;">
            <a href="${courseProduct.enrollmentLink}" style="background-color: #16a34a; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold;">Begin Your Journey</a>
          </div>

          <div style="background-color: #dbeafe; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #16a34a;">
            <p style="margin: 10px 0;"><strong>📧 Important Next Steps:</strong></p>
            <p style="margin: 10px 0;">1. Click the button above to start your enrollment</p>
            <p style="margin: 10px 0;">2. Complete your student profile</p>
            <p style="margin: 10px 0;">3. Join our private community for daily support</p>
            <p style="margin: 10px 0;">4. Watch for your Welcome Pack email within 24-48 hours</p>
          </div>

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
            Need help? Contact us at info@tcedigitalinvestments.com<br/>
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
          const productTitle = paymentData.productTitle;
          if (!productTitle) {
            throw new Error("Product title is required for sending emails");
          }

          // Find product in our catalog
          const product = products.find((p) => p.title === productTitle);
          if (!product) {
            throw new Error(`Product not found with title: ${productTitle}`);
          }

          console.log(
            `📧 Sending ${product.type} email to ${paymentData.email} for ${productTitle}`,
          );

          if (product.type === "course") {
            await sendCourseEmail(
              paymentData.email,
              paymentData.name || paymentData.firstName,
              paymentData.amount,
              OrderMerchantReference,
              productTitle,
            );
          } else {
            await sendEbookEmail(
              paymentData.email,
              paymentData.name || paymentData.firstName,
              paymentData.amount,
              OrderMerchantReference,
              productTitle,
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

          // Find product in our catalog
          const product = products.find((p) => p.title === productTitle);
          if (!product) {
            throw new Error(`Product not found with title: ${productTitle}`);
          }

          if (product.type === "course") {
            await sendCourseEmail(
              paymentData.email,
              paymentData.name,
              paymentData.amount,
              OrderMerchantReference,
              productTitle,
            );
          } else {
            await sendEbookEmail(
              paymentData.email,
              paymentData.name,
              paymentData.amount,
              OrderMerchantReference,
              productTitle,
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
