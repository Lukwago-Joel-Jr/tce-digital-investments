import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { amount, email, phone, firstName, lastName, ebookId } =
      await request.json();

    // Validate input data
    if (!amount || amount <= 0) {
      throw new Error("Invalid amount provided");
    }
    if (!email || !email.includes("@")) {
      throw new Error("Valid email is required");
    }
    if (!phone) {
      throw new Error("Phone number is required");
    }
    if (!firstName || !lastName) {
      throw new Error("First name and last name are required");
    }

    // Validate required environment variables
    if (
      !process.env.PESAPAL_CONSUMER_KEY ||
      !process.env.PESAPAL_CONSUMER_SECRET
    ) {
      throw new Error("Missing Pesapal credentials in environment variables");
    }

    if (!process.env.PESAPAL_BASE_URL) {
      throw new Error("Missing PESAPAL_BASE_URL in environment variables");
    }

    console.log("🔐 Attempting Pesapal authentication...");
    console.log("Base URL:", process.env.PESAPAL_BASE_URL);
    console.log(
      "Consumer Key:",
      process.env.PESAPAL_CONSUMER_KEY?.substring(0, 10) + "...",
    );

    // 1️⃣ Get access token with proper error handling
    const authUrl = `${process.env.PESAPAL_BASE_URL}/api/Auth/RequestToken`;
    const authRes = await fetch(authUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        consumer_key: process.env.PESAPAL_CONSUMER_KEY,
        consumer_secret: process.env.PESAPAL_CONSUMER_SECRET,
      }),
    });

    console.log("Auth response status:", authRes.status);
    console.log("Auth response headers:", Object.fromEntries(authRes.headers));

    if (!authRes.ok) {
      const errorText = await authRes.text();
      console.error("Auth failed with status:", authRes.status);
      console.error("Error response:", errorText);

      // Check if it's an HTML error page (like your current issue)
      if (errorText.includes("<!DOCTYPE html>")) {
        throw new Error(
          `Authentication failed: Server returned HTML error page. Check your PESAPAL_BASE_URL and credentials. Status: ${authRes.status}`,
        );
      }

      throw new Error(`Authentication failed: ${errorText}`);
    }

    const authData = await authRes.json();
    console.log("Auth response:", authData);

    const { token } = authData;
    if (!token) {
      throw new Error("No token returned from Pesapal authentication");
    }

    console.log("✅ Authentication successful");

    // 2️⃣ Create order with better error handling
    const orderId = crypto.randomUUID();
    const orderPayload = {
      id: orderId,
      currency: "UGX",
      amount: Number(amount),
      description: `Ebook Purchase - ${ebookId || "Unknown"}`,
      callback_url: `${process.env.NEXT_PUBLIC_SITE_URL}/api/pesapal/callback`,
      cancellation_url: `${process.env.NEXT_PUBLIC_SITE_URL}/payment-cancelled`,
      notification_id: process.env.PESAPAL_NOTIFICATION_ID,
      billing_address: {
        email_address: email,
        phone_number: phone,
        first_name: firstName,
        last_name: lastName,
        line_1: "N/A",
        city: "Kampala",
        country_code: "USD",
      },
    };

    console.log("📦 Creating order with payload:", orderPayload);

    const orderRes = await fetch(
      `${process.env.PESAPAL_BASE_URL}/api/Transactions/SubmitOrderRequest`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(orderPayload),
      },
    );

    console.log("Order response status:", orderRes.status);

    if (!orderRes.ok) {
      const errorText = await orderRes.text();
      console.error("Order creation failed:", errorText);
      throw new Error(`Order creation failed: ${errorText}`);
    }

    const orderData = await orderRes.json();
    console.log("Order response:", orderData);
    console.log("Order response keys:", Object.keys(orderData));

    // Pesapal might return different field names, let's check all possible ones
    const redirectUrl =
      orderData.redirect_url ||
      orderData.redirectUrl ||
      orderData.payment_url ||
      orderData.paymentUrl ||
      orderData.checkout_url ||
      orderData.checkoutUrl;

    if (!redirectUrl) {
      console.error(
        "❌ No redirect URL found in response. Full response:",
        JSON.stringify(orderData, null, 2),
      );
      throw new Error(
        `No redirect URL returned from Pesapal. Response: ${JSON.stringify(orderData)}`,
      );
    }

    console.log("✅ Order created successfully, redirecting to:", redirectUrl);

    return NextResponse.json({
      url: redirectUrl,
      orderId: orderId,
      trackingId: orderData.tracking_id || orderData.order_tracking_id,
      fullResponse: orderData, // for debugging
    });
  } catch (err) {
    console.error("❌ Pesapal payment error:", err);
    return NextResponse.json(
      {
        error: err.message || "Payment initialization failed",
        details: "Check server logs for more information",
      },
      { status: 500 },
    );
  }
}
