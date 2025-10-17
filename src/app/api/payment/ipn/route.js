import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { Resend } from "resend";

/**
 * Server-safe Pesapal IPN route that:
 * - accepts GET and POST notifications,
 * - verifies transaction status with Pesapal,
 * - updates Firestore payment record,
 * - sends a product-specific email via Resend (always attempts to send),
 * - attaches PDF from a public URL (base64) when available; falls back to link.
 *
 * NOTE: Keys are in-file as requested (no .env). Change them when needed.
 */

// --------------------------- CONFIG ---------------------------------
const PESAPAL_CONSUMER_KEY = "h4bqR749515z64EVjMmdQxN8H2GHtrJl";
const PESAPAL_CONSUMER_SECRET = "xUN9sR0nstcDHdwQTM8r4dg6uT0=";

const PESAPAL_TOKEN_URL = "https://pay.pesapal.com/v3/api/Auth/RequestToken";
const PESAPAL_STATUS_URL =
  "https://pay.pesapal.com/v3/api/Transactions/GetTransactionStatus";

const RESEND_API_KEY = "re_19DUmfB7_AUuKTtcUksxxmvk9wgFQEjYX";

// Site base used for public file links if you store PDFs in /public/ebooks
const SITE_BASE_URL = "https://www.tcedigitalinvestments.com"; // change if needed

// --------------------------- PRODUCTS (server-safe copy) -------------
// Instead of importing from /components, we include a server-safe mapping.
// Keep product.id, product.title, product.type ("ebook" | "course"), and ebookLink or enrollmentLink.
const products = [
  {
    id: "KINGDOM-LENDING",
    title: "Kingdom Lending Guide",
    type: "ebook",
    // public URL to the PDF hosted (recommended). Make sure this is reachable.
    ebookLink: `${SITE_BASE_URL}/ebooks/KINGDOM-LENDING.pdf`,
  },
  {
    id: "DIGITAL-ENTREPRENEURSHIP",
    title: "Digital Entrepreneurship Guide",
    type: "ebook",
    // for digital entrepreneurship we prefer a link rather than an attachment
    ebookLink:
      "https://www.canva.com/design/DAGL1v3dPa8/71PPGveN4HWg_RKPj4E7OA/view",
  },
  {
    id: "WEALTH-ACADEMY",
    title: "Wealth Builder's Academy",
    type: "course",
    enrollmentLink: "https://academy.tcedigitalinvestments.com/enroll/ABC123",
  },
];

// --------------------------- HELPERS --------------------------------
function createResend() {
  return new Resend(RESEND_API_KEY);
}

async function fetchPesapalToken() {
  const res = await fetch(PESAPAL_TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      consumer_key: PESAPAL_CONSUMER_KEY,
      consumer_secret: PESAPAL_CONSUMER_SECRET,
    }),
  });
  if (!res.ok) {
    const txt = await res.text().catch(() => null);
    throw new Error(`Pesapal token request failed: ${res.status} ${txt || ""}`);
  }
  const data = await res.json();
  if (!data?.token) throw new Error("Pesapal token not returned");
  return data.token;
}

async function verifyPaymentStatus(orderTrackingId) {
  const token = await fetchPesapalToken();
  const statusRes = await fetch(
    `${PESAPAL_STATUS_URL}?orderTrackingId=${orderTrackingId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    },
  );
  if (!statusRes.ok) {
    const txt = await statusRes.text().catch(() => null);
    throw new Error(
      `Pesapal status request failed: ${statusRes.status} ${txt || ""}`,
    );
  }
  const statusData = await statusRes.json();
  return statusData;
}

/**
 * Try to fetch a public file and return { filename, base64 } or null on failure.
 * We do this to avoid relying on process.cwd() or local filesystem.
 */
async function fetchAttachmentBase64(url) {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Failed to fetch file: ${res.status}`);
    const buffer = await res.arrayBuffer();
    const bytes = new Uint8Array(buffer);
    // Convert to base64
    let binary = "";
    const chunkSize = 0x8000;
    for (let i = 0; i < bytes.length; i += chunkSize) {
      binary += String.fromCharCode.apply(
        null,
        Array.prototype.slice.call(
          bytes,
          i,
          Math.min(i + chunkSize, bytes.length),
        ),
      );
    }
    const base64 =
      typeof btoa === "function"
        ? btoa(binary)
        : Buffer.from(binary, "binary").toString("base64");
    // derive filename from url
    const filename = url.split("/").pop().split("?")[0] || "attachment.pdf";
    return { filename, content: base64 };
  } catch (err) {
    console.warn("⚠️ fetchAttachmentBase64 failed:", err.message || err);
    return null;
  }
}

// --------------------------- EMAILS ---------------------------------
async function sendEbookEmail({ to, name, amount, orderId, product }) {
  const resend = createResend();
  const subject = `Your ${product.title} is ready — TCEDigital`;
  let html = `
    <div style="font-family: Arial, sans-serif; max-width:600px; margin:0 auto;">
      <h2 style="color:#16a34a">Your ${product.title} is Ready!</h2>
      <p>Hi ${name || "there"},</p>
      <p>Thank you for your purchase. Your order ID is <strong>${orderId}</strong>.</p>
      <p>Amount: $${(amount || 0).toFixed(2)} USD</p>
  `;

  // If we have an ebookLink, show an access button and attempt to attach if public
  if (product.ebookLink) {
    html += `
      <p>Please use the link below to access your guide:</p>
      <div style="text-align:center; margin:20px 0;">
        <a href="${product.ebookLink}" style="background-color:#16a34a;color:#fff;padding:12px 20px;border-radius:6px;text-decoration:none;font-weight:bold;">Access Your Guide</a>
      </div>
    `;
  }

  html += `
      <p>Start with the first module and take action immediately.</p>
      <p>With excitement,<br/><strong>Sandra Nanyonga</strong></p>
    </div>
  `;

  // Attempt to fetch & attach file if product has an ebookLink that looks like a direct PDF URL
  let attachments;
  if (product.ebookLink && product.ebookLink.toLowerCase().endsWith(".pdf")) {
    const fetched = await fetchAttachmentBase64(product.ebookLink);
    if (fetched) {
      attachments = [
        {
          filename: fetched.filename,
          // Resend accepts base64 in `content`.
          content: fetched.content,
          // optional contentType:
          // contentType: "application/pdf"
        },
      ];
    }
  }

  // send (attachment if available)
  await resend.emails.send({
    from: "TCEDigital <no-reply@tcedigitalinvestments.com>",
    to,
    subject,
    html,
    ...(attachments ? { attachments } : {}),
  });
  return true;
}

async function sendCourseEmail({ to, name, amount, orderId, product }) {
  const resend = createResend();
  const subject = `Welcome to ${product.title} — TCEDigital`;
  const html = `
    <div style="font-family: Arial, sans-serif; max-width:600px; margin:0 auto;">
      <h2 style="color:#16a34a">Welcome to ${product.title}!</h2>
      <p>Hi ${name || "there"},</p>
      <p>Thank you for enrolling. Order ID: <strong>${orderId}</strong>.</p>
      <p>Amount: $${(amount || 0).toFixed(2)} USD</p>
      <div style="text-align:center; margin:20px 0;">
        <a href="${product.enrollmentLink}" style="background-color:#16a34a;color:#fff;padding:12px 20px;border-radius:6px;text-decoration:none;font-weight:bold;">Begin Your Journey</a>
      </div>
      <p>Our team will activate your account if any manual steps are required.</p>
      <p>With excitement,<br/><strong>Sandra Nanyonga</strong></p>
    </div>
  `;
  await resend.emails.send({
    from: "TCEDigital <no-reply@tcedigitalinvestments.com>",
    to,
    subject,
    html,
  });
  return true;
}

// Unified email sender; guarantees an attempt is made, logs result and writes to Firestore.
async function sendProductEmail(paymentDocRef, paymentData, product) {
  const to = paymentData.email;
  const name = paymentData.name || paymentData.firstName || "";
  const amount = paymentData.amount || 0;
  const orderId =
    paymentDocRef.id || paymentData.merchantReference || paymentData.orderId;

  if (!to) throw new Error("No recipient email on payment record");

  try {
    if (product.type === "course") {
      await sendCourseEmail({ to, name, amount, orderId, product });
    } else {
      await sendEbookEmail({ to, name, amount, orderId, product });
    }
    // mark email sent in Firestore
    await updateDoc(paymentDocRef, {
      emailSent: true,
      emailSentAt: new Date().toISOString(),
    });
    console.log("📩 Product email sent to", to);
    return true;
  } catch (err) {
    console.error("❌ sendProductEmail failed:", err.message || err);
    // update Firestore so you can see the failure
    await updateDoc(paymentDocRef, {
      emailSent: false,
      emailError: (err && err.message) || String(err),
      updatedAt: new Date().toISOString(),
    });
    // rethrow so caller can handle if needed
    throw err;
  }
}

// --------------------------- ROUTE HANDLERS -------------------------
async function handleIpn({ OrderTrackingId, OrderMerchantReference }) {
  if (!OrderMerchantReference || !OrderTrackingId) {
    throw new Error("Missing OrderMerchantReference or OrderTrackingId");
  }

  // load payment record from Firestore
  const paymentRef = doc(db, "payments", OrderMerchantReference);
  const snap = await getDoc(paymentRef);
  if (!snap.exists()) {
    throw new Error(`Payment record not found: ${OrderMerchantReference}`);
  }
  const paymentData = snap.data();

  // if already completed, still attempt to send email if not sent
  if (paymentData.status === "COMPLETED") {
    console.log("ℹ️ Payment already completed:", OrderMerchantReference);
    // if email not sent, try to send
    const productTitle = paymentData.productTitle;
    const product =
      products.find((p) => p.title === productTitle) ||
      products.find((p) => p.id === paymentData.productId);
    if (product && !paymentData.emailSent) {
      await sendProductEmail(paymentRef, paymentData, product).catch((err) => {
        console.warn(
          "⚠️ Could not send email for already-completed payment:",
          err.message || err,
        );
      });
    }
    return { alreadyCompleted: true };
  }

  // verify with Pesapal
  const statusData = await verifyPaymentStatus(OrderTrackingId);
  console.log("🔎 Pesapal statusData:", statusData);

  // Determining payment status: Pesapal returns payment_status_description or status_code etc.
  const payment_status_description =
    statusData.payment_status_description ||
    statusData.payment_status ||
    statusData.status_description;
  const status_code =
    statusData.status_code ??
    statusData.payment_status_code ??
    statusData.status;
  const isCompleted =
    payment_status_description === "COMPLETED" ||
    payment_status_description === "Completed" ||
    status_code === 1 ||
    String(status_code) === "1" ||
    String(payment_status_description).toLowerCase() === "completed";

  const newDocData = {
    pesapalTrackingId: OrderTrackingId,
    paymentStatusRaw: statusData,
    paymentStatus: payment_status_description ?? status_code,
    updatedAt: new Date().toISOString(),
  };

  if (isCompleted) {
    newDocData.status = "COMPLETED";
    newDocData.completedAt = new Date().toISOString();
  } else {
    newDocData.status =
      payment_status_description === "PENDING" || status_code === 0
        ? "PENDING"
        : "FAILED";
  }

  // Update Firestore with status
  await updateDoc(paymentRef, newDocData);

  // If completed, send the appropriate email (this is NOT optional)
  if (isCompleted) {
    // choose product by productTitle, productId, or fallback to 'ebook'
    const productTitle = paymentData.productTitle || paymentData.product_name;
    const productId = paymentData.productId;
    let product = null;
    if (productTitle) product = products.find((p) => p.title === productTitle);
    if (!product && productId)
      product = products.find((p) => p.id === productId);
    if (!product) {
      // fallback to generic ebook if nothing matched
      product = products.find((p) => p.type === "ebook") || products[0];
      console.warn(
        "⚠️ Product not found by title/id; defaulting to:",
        product.title,
      );
    }

    // ensure we attempt to send email and capture result in Firestore
    try {
      await sendProductEmail(paymentRef, paymentData, product);
    } catch (emailErr) {
      // already recorded in sendProductEmail; continue
      console.error(
        "⚠️ Email attempt failed after successful payment:",
        emailErr.message || emailErr,
      );
    }
  }

  return { processed: true, isCompleted };
}

// Accept both GET (Pesapal sometimes uses GET) and POST bodies.
export async function GET(req) {
  try {
    const url = new URL(req.url);
    const OrderTrackingId =
      url.searchParams.get("OrderTrackingId") ||
      url.searchParams.get("orderTrackingId");
    const OrderMerchantReference =
      url.searchParams.get("OrderMerchantReference") ||
      url.searchParams.get("merchantReference") ||
      url.searchParams.get("orderMerchantReference");

    console.log("📥 IPN GET:", { OrderTrackingId, OrderMerchantReference });

    if (!OrderTrackingId || !OrderMerchantReference) {
      return NextResponse.json(
        { error: "Missing parameters" },
        { status: 400 },
      );
    }

    const result = await handleIpn({ OrderTrackingId, OrderMerchantReference });
    return NextResponse.json({ ok: true, result }, { status: 200 });
  } catch (err) {
    console.error("🔥 GET IPN ERROR:", err);
    return NextResponse.json(
      { error: (err && err.message) || String(err) },
      { status: 500 },
    );
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    console.log("📥 IPN POST raw body:", body);

    // Body shape may vary — check multiple keys
    const OrderTrackingId =
      body.OrderTrackingId ||
      body.order_tracking_id ||
      body.tracking_id ||
      body.orderTrackingId;
    const OrderMerchantReference =
      body.OrderMerchantReference ||
      body.order_merchant_reference ||
      body.merchant_reference ||
      body.merchantReference;

    if (!OrderTrackingId || !OrderMerchantReference) {
      console.warn("⚠️ IPN POST missing tracking or merchant ref", {
        OrderTrackingId,
        OrderMerchantReference,
        body,
      });
      return NextResponse.json(
        { error: "Missing parameters" },
        { status: 400 },
      );
    }

    const result = await handleIpn({ OrderTrackingId, OrderMerchantReference });
    return NextResponse.json({ ok: true, result }, { status: 200 });
  } catch (err) {
    console.error("🔥 POST IPN ERROR:", err);
    return NextResponse.json(
      { error: (err && err.message) || String(err) },
      { status: 500 },
    );
  }
}
