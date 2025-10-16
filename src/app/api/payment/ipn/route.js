import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { Resend } from "resend";

// Create Resend instance only when needed
function createResend() {
  const key = "re_19DUmfB7_AUuKTtcUksxxmvk9wgFQEjYX";
  return new Resend(key);
}

async function sendPaymentConfirmation(email, name, amount, productId) {
  try {
    // Get the product details
    const { products } = await import("@/components/Data/ebooks");
    const product = products.find((p) => p.id === productId);

    if (!product) {
      throw new Error(`Product ${productId} not found`);
    }

    let emailData = {
      from: "TCEDigital <no-reply@tcedigitalinvestments.com>",
      to: email,
      attachments: [],
    };

    if (product.type === "ebook") {
      // Ebook delivery email
      emailData = {
        ...emailData,
        subject: `🎉 Your ${product.title} Ebook Is Here!`,
        html: `
          <p>Hi ${name || "Customer"},</p>
          <p>Thank you for purchasing <strong>${product.title}</strong>. We have received your payment of <strong>$${(amount || 0).toFixed(2)}</strong>.</p>
          <p>Your ebook is attached to this email. You can download and start reading right away!</p>
          <br/>
          <p>Inside this ebook, you'll discover:</p>
          <ul>
            ${product.description
              .split(".")
              .filter((line) => line.trim())
              .map((line) => `<li>${line.trim()}.</li>`)
              .join("\n")}
          </ul>
          <br/>
          <p>We hope you find great value in this resource!</p>
          <br/>
          <p>Warm regards,<br/>TCEDigital Investments 2025</p>
        `,
        attachments: [
          {
            filename: `${product.title}.pdf`,
            path: `${process.cwd()}/public/ebooks/${product.pdfFile}`,
          },
        ],
      };
    } else if (product.type === "course") {
      // Academy enrollment email
      emailData = {
        ...emailData,
        subject: `🎓 Welcome to ${product.title}!`,
        html: `
          <p>Hi ${name || "Customer"},</p>
          <p>Congratulations on joining <strong>${product.title}</strong>! Your payment of <strong>$${(amount || 0).toFixed(2)}</strong> has been received.</p>
          <br/>
          <p>🔑 <strong>Your Next Steps:</strong></p>
          <ol>
            <li>Click here to access your academy: <a href="${product.enrollmentLink}">${product.enrollmentLink}</a></li>
            <li>Complete your profile setup</li>
            <li>Join our private community</li>
            <li>Mark your calendar for our next live session</li>
          </ol>
          <br/>
          <p>You now have access to:</p>
          <ul>
            ${product.features?.map((feature) => `<li>${feature}</li>`).join("\n") || ""}
          </ul>
          <br/>
          <p>We're excited to have you on board!</p>
          <br/>
          <p>To your success,<br/>TCEDigital Investments 2025</p>
        `,
      };
    }

    await createResend().emails.send(emailData);
    console.log(
      `✅ ${product.type.toUpperCase()} delivery email sent successfully to`,
      email,
    );
  } catch (error) {
    console.error("❌ Email send failed:", error);
    throw error;
  }
}

// CRITICAL: Pesapal sends IPN as GET requests with query parameters
export async function GET(req) {
  try {
    const searchParams = req.nextUrl.searchParams;

    // Pesapal sends these exact field names in GET request
    const OrderTrackingId = searchParams.get("OrderTrackingId");
    const OrderMerchantReference = searchParams.get("OrderMerchantReference");
    const OrderNotificationType = searchParams.get("OrderNotificationType");

    console.log("\n💳 IPN Notification (GET):", {
      OrderTrackingId,
      OrderMerchantReference,
      OrderNotificationType,
      allParams: Object.fromEntries(searchParams),
    });

    if (!OrderMerchantReference) {
      console.error("❌ Missing OrderMerchantReference");
      return NextResponse.json(
        { error: "Missing merchant reference" },
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
      email: paymentData.email,
    });

    // Check if already completed (avoid duplicate processing)
    if (paymentData.status === "COMPLETED") {
      console.log("ℹ️ Payment already marked as completed");
      return NextResponse.json({
        message: "Payment already completed",
      });
    }

    // Update status to COMPLETED
    await updateDoc(paymentRef, {
      status: "COMPLETED",
      pesapalTrackingId: OrderTrackingId,
      completedAt: new Date().toISOString(),
    });
    console.log("✅ Payment status updated to COMPLETED");

    // Send confirmation email with ebook
    if (
      paymentData.email &&
      paymentData.items &&
      paymentData.items.length > 0
    ) {
      try {
        // Get the first ebook from the order (assuming one ebook per order)
        const ebookId = paymentData.items[0].id;
        await sendPaymentConfirmation(
          paymentData.email,
          paymentData.name || paymentData.firstName,
          paymentData.amount,
          ebookId,
        );
      } catch (emailError) {
        console.error(
          "⚠️ Email failed but payment marked complete:",
          emailError,
        );
        // Don't fail the IPN if email fails
      }
    }

    return NextResponse.json({
      message: "IPN processed successfully",
      orderId: OrderMerchantReference,
    });
  } catch (error) {
    console.error("❌ IPN Error:", error);
    return NextResponse.json(
      { error: "IPN processing failed", message: error.message },
      { status: 500 },
    );
  }
}

// Optional: Handle POST as well (some systems might send POST)
export async function POST(req) {
  try {
    const body = await req.json();
    console.log("\n💳 IPN Notification (POST):", body);

    // Extract fields - try both naming conventions
    const OrderMerchantReference =
      body.OrderMerchantReference ||
      body.order_merchant_reference ||
      body.merchant_reference;

    const OrderTrackingId =
      body.OrderTrackingId || body.order_tracking_id || body.tracking_id;

    if (!OrderMerchantReference) {
      return NextResponse.json(
        { error: "Missing merchant reference" },
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

    // Update status
    await updateDoc(paymentRef, {
      status: "COMPLETED",
      pesapalTrackingId: OrderTrackingId,
      completedAt: new Date().toISOString(),
    });

    // Send email
    if (
      paymentData.email &&
      paymentData.items &&
      paymentData.items.length > 0
    ) {
      try {
        const productId = paymentData.items[0].id;
        await sendPaymentConfirmation(
          paymentData.email,
          paymentData.name || paymentData.firstName,
          paymentData.amount,
          productId,
        );
      } catch (emailError) {
        console.error("⚠️ Email failed:", emailError, emailError.stack);
      }
    }

    return NextResponse.json({
      message: "IPN processed successfully",
    });
  } catch (error) {
    console.error("❌ POST IPN Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
