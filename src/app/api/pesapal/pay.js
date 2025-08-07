// pages/api/pesapal/pay.js
import axios from "axios";
import crypto from "crypto";

// Hardcoded Pesapal credentials (for testing only)
const CONSUMER_KEY = "h4bqR749515z64EVjMmdQxN8H2GHtrJl";
const CONSUMER_SECRET = "xUN9sR0nstcDHdwQTM8r4dg6uT0=";

const PESAPAL_BASE = "https://pay.pesapal.com/v3";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  const { amount, email, phone, firstName, lastName, ebookId } = req.body;

  try {
    // STEP 1: Get OAuth Token
    const tokenRes = await axios.post(`${PESAPAL_BASE}/api/Auth/RequestToken`, {
      consumer_key: CONSUMER_KEY,
      consumer_secret: CONSUMER_SECRET,
    });

    const token = tokenRes.data.token;

    // STEP 2: Prepare Order
    const order = {
      id: crypto.randomUUID(),
      currency: "UGX",
      amount,
      description: `Purchase of eBook: ${ebookId}`,
      callback_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/pesapal/callback`,
      notification_id: "",
      billing_address: {
        email_address: email,
        phone_number: phone,
        first_name: firstName,
        last_name: lastName,
        line_1: "Online",
        city: "Kampala",
        country_code: "UGA",
      },
    };

    // STEP 3: Submit Order
    const response = await axios.post(
      `${PESAPAL_BASE}/api/Transactions/SubmitOrderRequest`,
      order,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    const redirectUrl = response.data.redirect_url;
    return res.status(200).json({ url: redirectUrl });
  } catch (error) {
    console.error(error.response?.data || error.message);
    return res.status(500).json({ error: "Payment initiation failed" });
  }
}
