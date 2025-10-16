// src/app/api/pesapal/register-ipn/route.js - PRODUCTION ONLY
import { NextResponse } from "next/server";

// ⚠️ PRODUCTION CREDENTIALS
const PESAPAL_CONSUMER_KEY = "h4bqR749515z64EVjMmdQxN8H2GHtrJl";
const PESAPAL_CONSUMER_SECRET = "xUN9sR0nstcDHdwQTM8r4dg6uT0=";

// PRODUCTION URLs
const TOKEN_URL = "https://pay.pesapal.com/v3/api/Auth/RequestToken";
const IPN_REGISTER_URL = "https://pay.pesapal.com/v3/api/URLSetup/RegisterIPN";

export async function GET(req) {
  try {
    console.log("\n=== 📝 REGISTERING PRODUCTION IPN URL ===");
    console.log("⚠️ WARNING: THIS IS FOR REAL PAYMENTS!");

    // Step 1: Get Production Token
    console.log("\n🔐 Getting production token...");

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
        { error: "Failed to authenticate", details: tokenData },
        { status: 500 },
      );
    }

    console.log("✅ Production token received");

    // Step 2: Register Production IPN URL
    const ipnUrl = "https://www.tcedigitalinvestments.com/api/payment/ipn";

    console.log("\n📝 Registering production IPN URL:", ipnUrl);

    const ipnBody = {
      url: ipnUrl,
      ipn_notification_type: "POST",
    };

    const ipnRes = await fetch(IPN_REGISTER_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${tokenData.token}`,
      },
      body: JSON.stringify(ipnBody),
    });

    if (!ipnRes.ok) {
      const errorText = await ipnRes.text();
      console.error("❌ IPN registration failed:", errorText);
      return NextResponse.json(
        { error: "IPN registration failed", details: errorText },
        { status: 500 },
      );
    }

    const ipnData = await ipnRes.json();
    console.log("📦 IPN Response:", JSON.stringify(ipnData, null, 2));

    if (ipnData.error) {
      console.error("❌ Pesapal rejected IPN registration:", ipnData);
      return NextResponse.json(
        { error: "IPN registration rejected", details: ipnData },
        { status: 400 },
      );
    }

    console.log("✅ PRODUCTION IPN Registered Successfully!");
    console.log("📌 PRODUCTION IPN ID:", ipnData.ipn_id);
    console.log("\n=== ✅ REGISTRATION COMPLETE ===\n");

    return NextResponse.json({
      success: true,
      message: "✅ PRODUCTION IPN URL registered successfully!",
      environment: "PRODUCTION",
      warning: "⚠️ REAL MONEY WILL BE CHARGED FROM NOW ON!",
      ipn_id: ipnData.ipn_id,
      url: ipnData.url,
      created_date: ipnData.created_date,
      instructions: [
        "⚠️⚠️⚠️ IMPORTANT ⚠️⚠️⚠️",
        "",
        "1. Copy this IPN ID:",
        `   ${ipnData.ipn_id}`,
        "",
        "2. Open: src/app/cart/buy/route.js",
        "",
        "3. Find line 8 and replace:",
        `   const PESAPAL_IPN_ID = "${ipnData.ipn_id}";`,
        "",
        "4. Save and deploy to Vercel",
        "",
        "5. REAL MONEY will be charged after this!",
        "",
        "6. Test with smallest amount first ($7.50)",
      ],
    });
  } catch (error) {
    console.error("❌ Error:", error);
    return NextResponse.json(
      { error: "Server error", message: error.message },
      { status: 500 },
    );
  }
}
