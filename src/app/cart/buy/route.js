// src/app/cart/buy/route.js
import { NextResponse } from "next/server";

const PESAPAL_CONSUMER_KEY = process.env.PESAPAL_CONSUMER_KEY;
const PESAPAL_CONSUMER_SECRET = process.env.PESAPAL_CONSUMER_SECRET;
const PESAPAL_IPN_ID = process.env.PESAPAL_IPN_ID;

const TOKEN_URL = "https://cybqa.pesapal.com/pesapalv3/api/Auth/RequestToken";
const ORDER_URL =
  "https://cybqa.pesapal.com/pesapalv3/api/Transactions/SubmitOrderRequest";

export async function POST(req) {
  try {
    console.log("\n=== 🚀 PAYMENT REQUEST STARTED ===");

    // Check if IPN ID is configured
    if (!PESAPAL_IPN_ID) {
      console.error("❌ PESAPAL_IPN_ID not configured!");
      return NextResponse.json(
        {
          error: "IPN not configured",
          message:
            "Please register IPN URL first by visiting /api/pesapal/register-ipn",
        },
        { status: 500 },
      );
    }

    const body = await req.json();
    console.log("📦 Request Body:", body);

    const { ebookId, customerName, customerEmail, phoneNumber, amount } = body;

    // Validate
    if (
      !ebookId ||
      !customerName ||
      !customerEmail ||
      !phoneNumber ||
      !amount
    ) {
      console.log("❌ Missing fields");
      return NextResponse.json(
        {
          error: "Missing required fields",
        },
        { status: 400 },
      );
    }

    // Split name
    const [firstName, ...lastNameParts] = customerName.split(" ");
    const lastName = lastNameParts.join(" ") || firstName;

    console.log("👤 Customer:", {
      firstName,
      lastName,
      customerEmail,
      phoneNumber,
    });

    // STEP 1: Get Token
    console.log("\n🔐 Step 1: Requesting Token...");

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
      const errorText = await tokenRes.text();
      console.error("❌ Token request failed:", errorText);
      return NextResponse.json(
        {
          error: "Failed to authenticate with Pesapal",
          details: errorText,
        },
        { status: 500 },
      );
    }

    const tokenData = await tokenRes.json();

    if (!tokenData.token) {
      console.error("❌ No token received:", tokenData);
      return NextResponse.json(
        {
          error: "Failed to get token",
          details: tokenData,
        },
        { status: 500 },
      );
    }

    console.log("✅ Token received");

    // STEP 2: Submit Order
    console.log("\n📝 Step 2: Submitting Order...");

    const orderId = `ORD-${ebookId}-${Date.now()}`;
    const host = req.headers.get("host") || "localhost:3000";
    const protocol = host.includes("localhost") ? "http" : "https";
    const callbackUrl = `${protocol}://${host}/api/payment/callback`;

    console.log("Order ID:", orderId);
    console.log("Callback URL:", callbackUrl);
    console.log("IPN ID:", PESAPAL_IPN_ID);

    const orderBody = {
      id: orderId,
      currency: "UGX",
      amount: parseFloat(amount),
      description: `Ebook Purchase - ${ebookId}`,
      callback_url: callbackUrl,
      notification_id: PESAPAL_IPN_ID, // CRITICAL: This must be the IPN ID from registration
      branch: "Main",
      billing_address: {
        email_address: customerEmail,
        phone_number: phoneNumber,
        country_code: "UG",
        first_name: firstName,
        middle_name: "",
        last_name: lastName,
        line_1: "Kampala",
        line_2: "",
        city: "Kampala",
        state: "Central",
        postal_code: "",
        zip_code: "",
      },
    };

    console.log("📦 Order Payload:", JSON.stringify(orderBody, null, 2));

    const orderRes = await fetch(ORDER_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${tokenData.token}`,
      },
      body: JSON.stringify(orderBody),
    });

    console.log(
      "📨 Order Response Status:",
      orderRes.status,
      orderRes.statusText,
    );

    if (!orderRes.ok) {
      const errorText = await orderRes.text();
      console.error("❌ Order submission failed:", errorText);
      return NextResponse.json(
        {
          error: "Failed to submit order",
          details: errorText,
        },
        { status: 500 },
      );
    }

    const orderData = await orderRes.json();
    console.log("📦 Order Data:", JSON.stringify(orderData, null, 2));

    // Check for errors
    if (orderData.error) {
      console.error("❌ Pesapal Error:", orderData.error);
      return NextResponse.json(
        {
          error: "Pesapal rejected order",
          details: orderData.error,
        },
        { status: 400 },
      );
    }

    if (!orderData.redirect_url) {
      console.error("❌ No redirect_url in response");
      return NextResponse.json(
        {
          error: "No payment URL received",
          details: orderData,
        },
        { status: 400 },
      );
    }

    console.log("✅ Payment URL:", orderData.redirect_url);
    console.log("\n=== ✅ PAYMENT REQUEST SUCCESS ===\n");

    return NextResponse.json({
      success: true,
      paymentUrl: orderData.redirect_url,
      orderId: orderId,
      orderTrackingId: orderData.order_tracking_id,
    });
  } catch (error) {
    console.error("\n❌ FATAL ERROR:", error);
    return NextResponse.json(
      {
        error: "Server error",
        message: error.message,
      },
      { status: 500 },
    );
  }
}
