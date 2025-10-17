// src/app/cart/buy/route.js - PRODUCTION ONLY (REAL MONEY)
import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { doc, setDoc } from "firebase/firestore";

// ⚠️ PRODUCTION CREDENTIALS - REAL MONEY WILL BE CHARGED
const PESAPAL_CONSUMER_KEY = "h4bqR749515z64EVjMmdQxN8H2GHtrJl";
const PESAPAL_CONSUMER_SECRET = "xUN9sR0nstcDHdwQTM8r4dg6uT0=";
const PESAPAL_IPN_ID = "9ab385d7-78b0-4d5b-b254-db3486747b07";

// PRODUCTION URLs ONLY
const TOKEN_URL = "https://pay.pesapal.com/v3/api/Auth/RequestToken";
const ORDER_URL =
  "https://pay.pesapal.com/v3/api/Transactions/SubmitOrderRequest";

export async function POST(req) {
  try {
    console.log(
      "\n=== 🚀 PAYMENT REQUEST STARTED ⚠️ PRODUCTION - REAL MONEY ===",
    );

    // Check IPN ID
    if (!PESAPAL_IPN_ID) {
      console.error("❌ PESAPAL_IPN_ID not set!");
      return NextResponse.json(
        {
          error: "IPN not configured",
          message:
            "Visit /api/pesapal/register-ipn first to get production IPN ID",
        },
        { status: 500 },
      );
    }

    const body = await req.json();
    console.log("📦 Request Body:", body);

    // const {
    //   cartItems,
    //   ebookId,
    //   customerName,
    //   customerEmail,
    //   phoneNumber,
    //   amount,
    // } = body;
    const {
      cartItems,
      ebookId,
      productType, // ⬅️ ADD THIS LINE
      productTitle, // ⬅️ ADD THIS LINE
      customerName,
      customerEmail,
      phoneNumber,
      amount,
    } = body;

    // Validate customer info
    if (!customerName || !customerEmail || !phoneNumber) {
      console.log("❌ Missing customer fields");
      return NextResponse.json(
        { error: "Missing required customer information" },
        { status: 400 },
      );
    }

    const [firstName, ...lastNameParts] = customerName.split(" ");
    const lastName = lastNameParts.join(" ") || firstName;

    // Parse price to USD
    function parsePriceToUSD(raw) {
      if (raw == null) return 0;
      if (typeof raw === "number") return raw;

      const s = String(raw).trim();

      // Reject UGX
      if (/UGX|UG\b/i.test(s)) {
        throw new Error("Prices must be in USD only.");
      }

      // Parse $ amounts
      if (s.includes("$")) {
        const num = parseFloat(s.replace(/[^0-9.\-]/g, ""));
        if (isNaN(num)) throw new Error("Invalid price format");
        return num;
      }

      // Plain numbers
      const num = parseFloat(s.replace(/,/g, ""));
      if (!isNaN(num)) return num;

      throw new Error("Invalid price format");
    }

    // Calculate total amount
    let totalUSD = 0;
    if (Array.isArray(cartItems) && cartItems.length) {
      try {
        totalUSD = cartItems.reduce((sum, item) => {
          const rawPrice = item.price ?? item.unitPrice ?? 0;
          const qty = parseInt(item.quantity || item.qty || 1, 10) || 1;
          const priceUSD = parsePriceToUSD(rawPrice);
          return sum + priceUSD * qty;
        }, 0);
      } catch (err) {
        console.error("❌ Price parse error:", err.message);
        return NextResponse.json({ error: err.message }, { status: 400 });
      }
    } else if (amount) {
      try {
        totalUSD = parsePriceToUSD(amount);
      } catch (err) {
        console.error("❌ Amount parse error:", err.message);
        return NextResponse.json({ error: err.message }, { status: 400 });
      }
    } else {
      return NextResponse.json(
        { error: "Missing payment amount" },
        { status: 400 },
      );
    }

    // Round to 2 decimals
    totalUSD = Math.round((totalUSD + Number.EPSILON) * 100) / 100;

    if (totalUSD <= 0) {
      console.log("❌ Invalid amount:", totalUSD);
      return NextResponse.json(
        { error: "Invalid payment amount" },
        { status: 400 },
      );
    }

    // console.log("👤 Customer:", {
    //   firstName,
    //   lastName,
    //   customerEmail,
    //   phoneNumber,
    // });
    // console.log("💰 REAL PAYMENT AMOUNT: $" + totalUSD);

    // Generate order ID

    console.log("👤 Customer:", {
      firstName,
      lastName,
      customerEmail,
      phoneNumber,
    });
    console.log("💰 REAL PAYMENT AMOUNT: $" + totalUSD);
    console.log("📦 Product Type:", productType || "ebook"); // ⬅️ ADD THIS LINE

    const orderId = `PROD-${Date.now()}`;
    const host = req.headers.get("host") || "tcedigitalinvestments.com";
    const protocol = host.includes("localhost") ? "http" : "https";
    const callbackUrl = `${protocol}://${host}/api/payment/callback`;

    // Save payment record to Firestore
    // const paymentRecord = {
    //   id: orderId,
    //   items: Array.isArray(cartItems)
    //     ? cartItems
    //     : ebookId
    //       ? [{ id: ebookId }]
    //       : [],
    //   name: customerName,
    //   firstName,
    //   lastName,
    //   email: customerEmail,
    //   phone: phoneNumber,
    //   amount: totalUSD,
    //   currency: "USD",
    //   status: "PENDING",
    //   environment: "PRODUCTION",
    //   createdAt: new Date().toISOString(),
    //   callbackUrl,
    // };
    const paymentRecord = {
      id: orderId,
      items: Array.isArray(cartItems)
        ? cartItems
        : ebookId
          ? [
              {
                id: ebookId,
                type: productType || "ebook", // ⬅️ ADD THIS LINE
                title: productTitle || "Product", // ⬅️ ADD THIS LINE
              },
            ]
          : [],
      productType: productType || "ebook", // ⬅️ ADD THIS LINE
      productTitle: productTitle || "Product", // ⬅️ ADD THIS LINE
      name: customerName,
      firstName,
      lastName,
      email: customerEmail,
      phone: phoneNumber,
      amount: totalUSD,
      currency: "USD",
      status: "PENDING",
      environment: "PRODUCTION",
      createdAt: new Date().toISOString(),
      callbackUrl,
    };

    try {
      await setDoc(doc(db, "payments", orderId), paymentRecord);
      console.log("💾 Payment record saved:", orderId);
    } catch (saveErr) {
      console.error("❌ Failed to save to Firestore:", saveErr);
      // Continue anyway
    }

    // STEP 1: Get Authentication Token
    console.log("\n🔐 Step 1: Requesting production token...");

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
        { error: "Authentication failed", details: errorText },
        { status: 500 },
      );
    }

    const tokenData = await tokenRes.json();

    if (!tokenData.token) {
      console.error("❌ No token received:", tokenData);
      return NextResponse.json(
        { error: "Authentication failed", details: tokenData },
        { status: 500 },
      );
    }

    console.log("✅ Production token received");

    // STEP 2: Submit Order to Pesapal
    console.log("\n📝 Step 2: Submitting REAL order...");

    const orderBody = {
      id: orderId,
      currency: "USD",
      amount: parseFloat(totalUSD),
      description: `TCE Digital Investments - Order ${orderId}`,
      callback_url: callbackUrl,
      notification_id: PESAPAL_IPN_ID,
      branch: "Main Branch",
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
        postal_code: "00256",
        zip_code: "00256",
      },
    };

    console.log("📦 Order Details:", JSON.stringify(orderBody, null, 2));

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
      "📨 Pesapal Response Status:",
      orderRes.status,
      orderRes.statusText,
    );

    if (!orderRes.ok) {
      const errorText = await orderRes.text();
      console.error("❌ Order submission failed:", errorText);
      return NextResponse.json(
        { error: "Payment initiation failed", details: errorText },
        { status: 500 },
      );
    }

    const orderData = await orderRes.json();
    console.log("📦 Pesapal Response:", JSON.stringify(orderData, null, 2));

    // Check for errors
    if (orderData.error) {
      console.error("❌ Pesapal rejected order:", orderData.error);
      return NextResponse.json(
        { error: "Payment rejected", details: orderData.error },
        { status: 400 },
      );
    }

    if (!orderData.redirect_url) {
      console.error("❌ No payment URL received");
      return NextResponse.json(
        { error: "Payment URL not generated", details: orderData },
        { status: 400 },
      );
    }

    console.log("✅ Payment URL generated:", orderData.redirect_url);
    console.log("\n=== ✅ REAL PAYMENT INITIATED SUCCESSFULLY ===\n");

    return NextResponse.json({
      success: true,
      paymentUrl: orderData.redirect_url,
      orderId: orderId,
      orderTrackingId: orderData.order_tracking_id,
      amount: totalUSD,
      currency: "USD",
      environment: "PRODUCTION",
    });
  } catch (error) {
    console.error("\n❌ FATAL ERROR:", error);
    return NextResponse.json(
      { error: "Server error", message: error.message },
      { status: 500 },
    );
  }
}
