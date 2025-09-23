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

    //   await resend.emails.send({
    //     from: "Wealth Coaching <no-reply@tcedigitalinvestments.com>",
    //     to: email,
    //     subject:
    //       "🎉 Welcome to the Wealth Coaching Program – Your Early Access Bonus",
    //     html: `
    // <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border-radius: 15px; overflow: hidden; border: 1px solid #e0e0e0;">

    //   <!-- Hero Image -->
    //   <div style="width: 100%; background: #f0f0f0;">
    //     <img src="https://res.cloudinary.com/dgdxb5nqt/image/upload/v1758626478/sandra-seated_ndr1qd.jpg" alt="Wealth Coaching Program" style="width: 100%; display: block; border-bottom-left-radius: 15px; border-bottom-right-radius: 15px;">
    //   </div>

    //   <!-- Body -->
    //   <div style="padding: 30px; background-color: #ffffff;">
    //     <h2 style="color: #064e3b; font-size: 24px; margin-bottom: 15px;">Hi ${firstName || "there"}, welcome aboard 🚀</h2>

    //     <p style="color: #374151; font-size: 16px; line-height: 1.5;">
    //       You’ve successfully joined the <strong>Wealth Coaching Program Waitlist</strong>.
    //     </p>

    //     <p style="color: #374151; font-size: 16px; line-height: 1.5;">
    //       As a thank-you for signing up early, you’ll get <strong>exclusive early access</strong> plus a <strong>special discount</strong> when enrollment opens.
    //     </p>

    //     <div style="text-align: center; margin: 25px 0;">
    //       <a href="https://store.pesapal.com/shop/yb8tkz-tcedigitalinvestmentsltd?productCode=21921f16-1f79-433b-9079-8e2114790e9a"
    //          style="background-color: #064e3b; color: #ffffff; padding: 15px 25px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">
    //          Claim Your Early Access
    //       </a>
    //     </div>

    //     <p style="color: #6b7280; font-size: 14px; line-height: 1.5;">
    //       Stay tuned — your discount code and launch details will be in your inbox soon!
    //     </p>

    //     <p style="color: #064e3b; font-size: 16px; font-weight: bold; margin-top: 20px;">
    //       With gratitude,<br/>
    //       The Wealth Coaching Team
    //     </p>
    //   </div>

    //   <!-- Footer -->
    //   <div style="background-color: #f0f0f0; padding: 20px; text-align: center; font-size: 12px; color: #9ca3af;">
    //     You are receiving this email because you signed up for the Wealth Coaching Program Waitlist.<br/>
    //     <a href="https://tcedigitalinvestments.com/unsubscribe" style="color: #064e3b; text-decoration: underline;">Unsubscribe</a>
    //   </div>
    // </div>
    // `,
    //   });

    await resend.emails.send({
      from: "Wealth Coaching <no-reply@tcedigitalinvestments.com>",
      to: email,
      subject:
        "🎉 Welcome to the Wealth Coaching Program – Your Early Access Bonus",
      html: `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border-radius: 15px; overflow: hidden; border: 1px solid #e0e0e0;">
    
    <!-- Hero Image -->
    <div style="width: 100%; background: #f0f0f0;">
      <img src="https://res.cloudinary.com/dgdxb5nqt/image/upload/v1758626478/sandra-seated_ndr1qd.jpg" alt="Wealth Coaching Program" style="width: 100%; display: block; border-bottom-left-radius: 15px; border-bottom-right-radius: 15px;">
    </div>

    <!-- Body -->
    <div style="padding: 30px; background-color: #ffffff;">
      <h2 style="color: #064e3b; font-size: 24px; margin-bottom: 15px;">Hi ${firstName || "there"}, welcome aboard 🚀</h2>

      <p style="color: #374151; font-size: 16px; line-height: 1.5;">
        You’ve successfully joined the <strong>Wealth Coaching Program Waitlist</strong>.
      </p>

      <p style="color: #374151; font-size: 16px; line-height: 1.5;">
        As an <strong>early access member</strong>, you’ll be among the first to unlock:
      </p>

      <ul style="color: #374151; font-size: 15px; line-height: 1.6; margin: 15px 0; padding-left: 20px;">
        <li>✨ <strong>Exclusive discounts</strong> available only to early sign-ups</li>
        <li>📘 Priority access to the <strong>first modules & coaching sessions</strong></li>
        <li>🤝 A chance to <strong>connect directly with our coaches</strong> before launch</li>
        <li>🎁 Special <strong>bonus resources & templates</strong> for early birds</li>
      </ul>

      <div style="text-align: center; margin: 25px 0;">
        <a href="https://store.pesapal.com/shop/yb8tkz-tcedigitalinvestmentsltd?productCode=21921f16-1f79-433b-9079-8e2114790e9a"
           style="background-color: #064e3b; color: #ffffff; padding: 15px 25px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">
           Claim Your Early Access
        </a>
      </div>

      <p style="color: #6b7280; font-size: 14px; line-height: 1.5;">
        Stay tuned — your personal discount code and full launch details will be in your inbox soon!
      </p>

      <p style="color: #064e3b; font-size: 16px; font-weight: bold; margin-top: 20px;">
        With gratitude,<br/>
        The Wealth Coaching Team
      </p>
    </div>

    <!-- Footer -->
    <div style="background-color: #f0f0f0; padding: 20px; text-align: center; font-size: 12px; color: #9ca3af;">
      You are receiving this email because you signed up for the Wealth Coaching Program Waitlist.<br/>
      <a href="https://tcedigitalinvestments.com/unsubscribe" style="color: #064e3b; text-decoration: underline;">Unsubscribe</a>
    </div>
  </div>
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
