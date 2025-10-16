// // src/app/api/pesapal/register-ipn/route.js
// import { NextResponse } from "next/server";

// // WARNING: Hard-coded for testing. Remove before production.
// const PESAPAL_CONSUMER_KEY = "TDpigBOOhs+zAl8cwH2Fl82jJGyD8xev";
// const PESAPAL_CONSUMER_SECRET = "1KpqkfsMaihIcOlhnBo/gBZ5smw=";

// const TOKEN_URL = "https://cybqa.pesapal.com/pesapalv3/api/Auth/RequestToken";
// const IPN_REGISTER_URL =
//   "https://cybqa.pesapal.com/pesapalv3/api/URLSetup/RegisterIPN";

// export async function GET(req) {
//   try {
//     console.log("\n=== 📝 REGISTERING IPN URL ===");

//     // Step 1: Get Token
//     console.log("🔐 Getting token...");

//     const tokenRes = await fetch(TOKEN_URL, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Accept: "application/json",
//       },
//       body: JSON.stringify({
//         consumer_key: PESAPAL_CONSUMER_KEY,
//         consumer_secret: PESAPAL_CONSUMER_SECRET,
//       }),
//     });

//     const tokenData = await tokenRes.json();

//     if (!tokenData.token) {
//       console.error("❌ Failed to get token:", tokenData);
//       return NextResponse.json(
//         {
//           error: "Failed to get token",
//           details: tokenData,
//         },
//         { status: 500 },
//       );
//     }

//     console.log("✅ Token received");

//     // Step 2: Register IPN URL
//     const ipnUrl = "https://www.tcedigitalinvestments.com/api/payment/ipn";

//     console.log("📝 Registering IPN URL:", ipnUrl);

//     const ipnBody = {
//       url: ipnUrl,
//       ipn_notification_type: "GET",
//     };

//     const ipnRes = await fetch(IPN_REGISTER_URL, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Accept: "application/json",
//         Authorization: `Bearer ${tokenData.token}`,
//       },
//       body: JSON.stringify(ipnBody),
//     });

//     const ipnData = await ipnRes.json();

//     console.log("📦 IPN Response:", JSON.stringify(ipnData, null, 2));

//     if (ipnData.error) {
//       console.error("❌ Failed to register IPN:", ipnData);
//       return NextResponse.json(
//         {
//           error: "Failed to register IPN",
//           details: ipnData,
//         },
//         { status: 400 },
//       );
//     }

//     console.log("✅ IPN URL Registered Successfully!");
//     console.log("📌 IPN ID:", ipnData.ipn_id);
//     console.log("\n=== ✅ REGISTRATION COMPLETE ===\n");

//     return NextResponse.json({
//       success: true,
//       message: "✅ IPN URL registered successfully!",
//       ipn_id: ipnData.ipn_id,
//       url: ipnData.url,
//       created_date: ipnData.created_date,
//       instructions: [
//         "1. Copy the IPN ID above",
//         "2. Open your .env.local file",
//         "3. Add this line: PESAPAL_IPN_ID=" + ipnData.ipn_id,
//         "4. Restart your dev server (npm run dev)",
//         "5. You can now process payments!",
//       ],
//     });
//   } catch (error) {
//     console.error("❌ Error:", error);
//     return NextResponse.json(
//       {
//         error: "Server error",
//         message: error.message,
//       },
//       { status: 500 },
//     );
//   }
// }

// src/app/api/pesapal/register-ipn/route.js
import { NextResponse } from "next/server";

const PESAPAL_CONSUMER_KEY = "TDpigBOOhs+zAl8cwH2Fl82jJGyD8xev";
const PESAPAL_CONSUMER_SECRET = "1KpqkfsMaihIcOlhnBo/gBZ5smw=";

const TOKEN_URL = "https://cybqa.pesapal.com/pesapalv3/api/Auth/RequestToken";
const IPN_REGISTER_URL =
  "https://cybqa.pesapal.com/pesapalv3/api/URLSetup/RegisterIPN";

export async function GET(req) {
  try {
    console.log("\n=== 📝 REGISTERING IPN URL ===");

    // Step 1: Get Token
    console.log("🔐 Getting token...");

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

    const tokenData = await tokenRes.json();

    if (!tokenData.token) {
      console.error("❌ Failed to get token:", tokenData);
      return NextResponse.json(
        {
          error: "Failed to get token",
          details: tokenData,
        },
        { status: 500 },
      );
    }

    console.log("✅ Token received");

    // Step 2: Register IPN URL
    const ipnUrl = "https://www.tcedigitalinvestments.com/api/payment/ipn";

    console.log("📝 Registering IPN URL:", ipnUrl);

    const ipnBody = {
      url: ipnUrl,
      ipn_notification_type: "GET",
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

    const ipnData = await ipnRes.json();

    console.log("📦 IPN Response:", JSON.stringify(ipnData, null, 2));

    if (ipnData.error) {
      console.error("❌ Failed to register IPN:", ipnData);
      return NextResponse.json(
        {
          error: "Failed to register IPN",
          details: ipnData,
        },
        { status: 400 },
      );
    }

    console.log("✅ IPN URL Registered Successfully!");
    console.log("📌 IPN ID:", ipnData.ipn_id);
    console.log("\n=== ✅ REGISTRATION COMPLETE ===\n");

    return NextResponse.json({
      success: true,
      message: "✅ IPN URL registered successfully!",
      ipn_id: ipnData.ipn_id,
      url: ipnData.url,
      created_date: ipnData.created_date,
      instructions: [
        "1. Copy the IPN ID above",
        "2. Open your .env.local file",
        "3. Add this line: PESAPAL_IPN_ID=" + ipnData.ipn_id,
        "4. Restart your dev server (npm run dev)",
        "5. You can now process payments!",
      ],
    });
  } catch (error) {
    console.error("❌ Error:", error);
    return NextResponse.json(
      {
        error: "Server error",
        message: error.message,
      },
      { status: 500 },
    );
  }
}
