import { NextResponse } from "next/server";

// Hard-coded Pesapal sandbox credentials (temporary for testing only)
const PESAPAL_CONSUMER_KEY = "TDpigBOOhs+zAl8cwH2Fl82jJGyD8xev";
const PESAPAL_CONSUMER_SECRET = "1KpqkfsMaihIcOlhnBo/gBZ5smw=";
const PESAPAL_BASE_URL = "https://cybqa.pesapal.com/pesapalv3";
const PESAPAL_IPN_ID = "ddf4c285-9321-4906-b9b8-dbc7134ccc82";

export async function POST(req) {
  try {
    const { amount, email, phone, firstName, lastName, ebookId } =
      await req.json();

    if (!amount || Number(amount) <= 0) {
      return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
    }

    // Request token
    const tokenRes = await fetch(`${PESAPAL_BASE_URL}/api/Auth/RequestToken`, {
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
      const text = await tokenRes.text();
      console.error("Token request failed:", text);
      return NextResponse.json(
        { error: "Auth failed", details: text },
        { status: 500 },
      );
    }

    const tokenData = await tokenRes.json();
    const token = tokenData.token;
    if (!token)
      return NextResponse.json({ error: "No token" }, { status: 500 });

    // Submit order
    const orderId = `ORD-${Date.now()}`;
    const orderPayload = {
      id: orderId,
      currency: "USD",
      amount: Number(amount),
      description: `Ebook Purchase - ${ebookId || orderId}`,
      callback_url: `https://www.tcedigitalinvestments.com/api/payment/callback`,
      notification_id: PESAPAL_IPN_ID,
      branch: "Main",
      billing_address: {
        email_address: email,
        phone_number: phone,
        country_code: "US",
        first_name: firstName,
        last_name: lastName,
      },
    };

    const orderRes = await fetch(
      `${PESAPAL_BASE_URL}/api/Transactions/SubmitOrderRequest`,
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

    if (!orderRes.ok) {
      const text = await orderRes.text();
      console.error("Order submit failed:", text);
      return NextResponse.json(
        { error: "Order submit failed", details: text },
        { status: 500 },
      );
    }

    const orderData = await orderRes.json();
    const redirectUrl =
      orderData.redirect_url ||
      orderData.redirectUrl ||
      orderData.payment_url ||
      orderData.paymentUrl;

    return NextResponse.json({
      paymentUrl: redirectUrl,
      orderId,
      orderTrackingId: orderData.order_tracking_id || orderData.tracking_id,
    });
  } catch (err) {
    console.error("Pesapal error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
