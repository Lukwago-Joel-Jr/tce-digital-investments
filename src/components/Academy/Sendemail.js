import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend("re_19DUmfB7_AUuKTtcUksxxmvk9wgFQEjYX");

export async function POST(req) {
  const { email, firstName } = await req.json();

  // 1. Subscribe user to Mailchimp (same as before)...

  // 2. Send welcome email via Resend
  try {
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
      { message: "Subscribed + Email sent" },
      { status: 201 },
    );
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
