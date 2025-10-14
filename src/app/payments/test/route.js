import { NextResponse } from "next/server";

export async function POST(req) {
  const body = await req.text();
  console.log("🔥 Received IPN TEST:", body);

  return NextResponse.json({ message: "IPN received OK" });
}
