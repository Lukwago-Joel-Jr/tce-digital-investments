import { NextResponse } from "next/server";

export async function POST(req) {
  const { email, firstName } = await req.json();

  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  // ⚠️ Hardcoded Mailchimp values (not secure if repo is public)
  const API_KEY = "25cae9632cc9300def3d1d6e18a381d9-us20"; // e.g. xxxxxxxx-us20
  const AUDIENCE_ID = "7edceae3ce"; // e.g. a1b2c3d4e5
  const DATACENTER = "us20"; // suffix of your API key

  const response = await fetch(
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

  const data = await response.json();

  if (response.status >= 400) {
    return NextResponse.json(
      { error: data.detail || "Something went wrong" },
      { status: 400 },
    );
  }

  return NextResponse.json({ message: "Success" }, { status: 201 });
}
