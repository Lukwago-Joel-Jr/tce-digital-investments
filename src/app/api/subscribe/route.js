// import { NextResponse } from "next/server";

// export async function POST(req) {
//   const { email, firstName } = await req.json();

//   if (!email) {
//     return NextResponse.json({ error: "Email is required" }, { status: 400 });
//   }

//   // ⚠️ Hardcoded Mailchimp values (not secure if repo is public)
//   const API_KEY = "25cae9632cc9300def3d1d6e18a381d9-us20"; // e.g. xxxxxxxx-us20
//   const AUDIENCE_ID = "7edceae3ce"; // e.g. a1b2c3d4e5
//   const DATACENTER = "us20"; // suffix of your API key

//   const response = await fetch(
//     `https://${DATACENTER}.api.mailchimp.com/3.0/lists/${AUDIENCE_ID}/members`,
//     {
//       method: "POST",
//       headers: {
//         Authorization: `apikey ${API_KEY}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         email_address: email,
//         status: "subscribed",
//         merge_fields: { FNAME: firstName },
//       }),
//     },
//   );

//   const data = await response.json();

//   if (response.status >= 400) {
//     return NextResponse.json(
//       { error: data.detail || "Something went wrong" },
//       { status: 400 },
//     );
//   }

//   return NextResponse.json({ message: "Success" }, { status: 201 });
// }

import { NextResponse } from "next/server";
import { Resend } from "resend";

// ⚠️ Hardcoded values (for demo only – secure them later with env vars)
const API_KEY = "25cae9632cc9300def3d1d6e18a381d9-us20"; // Mailchimp API Key
const AUDIENCE_ID = "7edceae3ce"; // Mailchimp Audience ID
const DATACENTER = "us20"; // From API key suffix
const resend = new Resend("re_19DUmfB7_AUuKTtcUksxxmvk9wgFQEjYX"); // Resend API key

export async function POST(req) {
  const { email, firstName } = await req.json();

  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  try {
    // 1. Add to Mailchimp list
    const mcRes = await fetch(
      `https://${DATACENTER}.api.mailchimp.com/3.0/lists/${AUDIENCE_ID}/members`,
      {
        method: "POST",
        headers: {
          Authorization: `apikey ${API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email_address: email,
          status: "subscribed",
          merge_fields: { FNAME: firstName },
        }),
      },
    );

    const mcData = await mcRes.json();
    if (mcRes.status >= 400) {
      return NextResponse.json(
        { error: mcData.detail || "Mailchimp error" },
        { status: 400 },
      );
    }

    // 2. Send welcome email via Resend
    await resend.emails.send({
      from: "Wealth Coaching <no-reply@tcedigitalinvestments.com>",
      to: email,
      subject:
        "🎉 Welcome to the Wealth Coaching Program – Your Early Access Bonus",
      html: `
        <h2>Hi ${firstName || "there"}, welcome aboard 🚀</h2>
        <p>You’ve successfully joined the <b>Wealth Coaching Program Waitlist</b>.</p>
        <p>As a thank-you for signing up early, you’ll get <b>exclusive early access</b> plus a <b>special discount</b> when enrollment opens.</p>
        <p>👉 Stay tuned — your discount code and launch details will be in your inbox soon!</p>
        <br/>
        <p>With gratitude,</p>
        <p><b>The Wealth Coaching Team</b></p>
      `,
    });

    return NextResponse.json(
      { message: "Subscribed + Email Sent" },
      { status: 201 },
    );
  } catch (err) {
    return NextResponse.json(
      { error: err.message || "Something went wrong" },
      { status: 500 },
    );
  }
}
