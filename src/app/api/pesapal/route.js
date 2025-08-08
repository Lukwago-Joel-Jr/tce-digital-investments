// import { consumer_key, consumer_secret } from "@/components/Keys";
// import { NextResponse } from "next/server";

// export async function POST(req) {
//   const body = await req.json();

//   const { amount, user_name, user_email, user_phone } = body;

//   // Hardcoded credentials (replace with .env later)
//   const consumerKey = consumer_key;
//   const consumerSecret = consumer_secret;

//   try {
//     // Step 1: Get OAuth token
//     const authRes = await fetch(
//       "https://pay.pesapal.com/v3/api/Auth/RequestToken",
//       {
//         method: "GET",
//         headers: {
//           accept: "application/json",
//           Authorization: `Basic ${Buffer.from(`${consumerKey}:${consumerSecret}`).toString("base64")}`,
//         },
//       },
//     );

//     const authData = await authRes.json();
//     const token = authData.token;

//     if (!token) {
//       return NextResponse.json(
//         { error: "Failed to authenticate with Pesapal." },
//         { status: 500 },
//       );
//     }

//     // Step 2: Create Order
//     const orderPayload = {
//       id: "",
//       currency: "UGX",
//       amount,
//       description: "Ebook Purchase",
//       callback_url:
//         "https://www.tcedigitalinvestments.com/api/pesapal/callback", // placeholder
//       notification_id: "", // Optional: If you're using IPN
//       billing_address: {
//         email_address: user_email,
//         phone_number: user_phone,
//         first_name: user_name.split(" ")[0] || user_name,
//         last_name: user_name.split(" ")[1] || " ",
//         line_1: "N/A",
//         city: "Kampala",
//         state: "Kampala",
//         postal_code: "256",
//         country_code: "UG",
//       },
//     };

//     const orderRes = await fetch(
//       "https://pay.pesapal.com/v3/api/Transactions/SubmitOrderRequest",
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(orderPayload),
//       },
//     );

//     const orderData = await orderRes.json();

//     if (!orderData.redirect_url) {
//       return NextResponse.json(
//         { error: "No payment URL received." },
//         { status: 500 },
//       );
//     }

//     return NextResponse.json({ paymentUrl: orderData.redirect_url });
//   } catch (err) {
//     console.error("Pesapal error:", err);
//     return NextResponse.json(
//       { error: "Payment error occurred." },
//       { status: 500 },
//     );
//   }
// }

import { consumer_key, consumer_secret } from "@/components/Keys";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const { amount, user_name, user_email, user_phone } = body;

    // Step 1: Get OAuth token
    const authRes = await fetch(
      "https://pay.pesapal.com/v3/api/Auth/RequestToken",
      {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Basic ${Buffer.from(
            `${consumer_key}:${consumer_secret}`,
          ).toString("base64")}`,
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

    // Step 2: Create order
    const orderPayload = {
      id: "",
      currency: "UGX",
      amount,
      description: "Ebook Purchase",
      callback_url:
        "https://www.tcedigitalinvestments.com/api/pesapal/callback",
      notification_id: "",
      billing_address: {
        email_address: user_email,
        phone_number: user_phone,
        first_name: user_name?.split(" ")[0] || user_name,
        last_name: user_name?.split(" ")[1] || " ",
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

    return NextResponse.json({ url: orderData.redirect_url });
  } catch (err) {
    console.error("Pesapal error:", err);
    return NextResponse.json(
      { error: "Payment error occurred." },
      { status: 500 },
    );
  }
}
