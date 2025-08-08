// // pages/api/pesapal/pay.js
// import axios from "axios";
// import crypto from "crypto";

// // Hardcoded Pesapal credentials (for testing only)
// const CONSUMER_KEY = "h4bqR749515z64EVjMmdQxN8H2GHtrJl";
// const CONSUMER_SECRET = "xUN9sR0nstcDHdwQTM8r4dg6uT0=";

// const PESAPAL_BASE = "https://pay.pesapal.com/v3";

// export default async function handler(req, res) {
//   if (req.method !== "POST") {
//     return res.status(405).end();
//   }

//   const { amount, email, phone, firstName, lastName, ebookId } = req.body;

//   try {
//     // STEP 1: Get OAuth Token
//     const tokenRes = await axios.post(`${PESAPAL_BASE}/api/Auth/RequestToken`, {
//       consumer_key: CONSUMER_KEY,
//       consumer_secret: CONSUMER_SECRET,
//     });

//     const token = tokenRes.data.token;

//     // STEP 2: Prepare Order
//     const order = {
//       id: crypto.randomUUID(),
//       currency: "UGX",
//       amount,
//       description: `Purchase of eBook: ${ebookId}`,
//       callback_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/pesapal/callback`,
//       notification_id: "",
//       billing_address: {
//         email_address: email,
//         phone_number: phone,
//         first_name: firstName,
//         last_name: lastName,
//         line_1: "Online",
//         city: "Kampala",
//         country_code: "UGA",
//       },
//     };

//     // STEP 3: Submit Order
//     const response = await axios.post(
//       `${PESAPAL_BASE}/api/Transactions/SubmitOrderRequest`,
//       order,
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       },
//     );

//     const redirectUrl = response.data.redirect_url;
//     return res.status(200).json({ url: redirectUrl });
//   } catch (error) {
//     console.error(error.response?.data || error.message);
//     return res.status(500).json({ error: "Payment initiation failed" });
//   }
// }

import { NextResponse } from "next/server";

export async function POST(req) {
  const body = await req.json();

  const { amount, user_name, user_email, user_phone } = body;

  // Hardcoded credentials (replace with .env later)
  const consumerKey = "h4bqR749515z64EVjMmdQxN8H2GHtrJl";
  const consumerSecret = "xUN9sR0nstcDHdwQTM8r4dg6uT0=";

  try {
    // Step 1: Get OAuth token
    const authRes = await fetch(
      "https://pay.pesapal.com/v3/api/Auth/RequestToken",
      {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Basic ${Buffer.from(`${consumerKey}:${consumerSecret}`).toString("base64")}`,
        },
      },
    );

    const authData = await authRes.json();
    const token = authData.token;

    if (!token) {
      return NextResponse.json(
        { error: "Failed to authenticate with Pesapal." },
        { status: 500 },
      );
    }

    // Step 2: Create Order
    const orderPayload = {
      id: "",
      currency: "UGX",
      amount,
      description: "Ebook Purchase",
      callback_url:
        "https://www.tcedigitalinvestments.com/api/pesapal/callback", // placeholder
      notification_id: "", // Optional: If you're using IPN
      billing_address: {
        email_address: user_email,
        phone_number: user_phone,
        first_name: user_name.split(" ")[0] || user_name,
        last_name: user_name.split(" ")[1] || " ",
        line_1: "N/A",
        city: "Kampala",
        state: "Kampala",
        postal_code: "256",
        country_code: "UG",
      },
    };

    const orderRes = await fetch(
      "https://pay.pesapal.com/v3/api/Transactions/SubmitOrderRequest",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(orderPayload),
      },
    );

    const orderData = await orderRes.json();

    if (!orderData.redirect_url) {
      return NextResponse.json(
        { error: "No payment URL received." },
        { status: 500 },
      );
    }

    return NextResponse.json({ paymentUrl: orderData.redirect_url });
  } catch (err) {
    console.error("Pesapal error:", err);
    return NextResponse.json(
      { error: "Payment error occurred." },
      { status: 500 },
    );
  }
}
