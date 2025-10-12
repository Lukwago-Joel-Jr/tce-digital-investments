import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { doc, setDoc } from "firebase/firestore";

export async function POST(req) {
  const { email, name, amount } = await req.json();

  // 🔹 Step 1: Call Pesapal API to create order
  // (You’d normally use your consumer key/secret here)
  const order_reference = `ORDER-${Date.now()}`;

  // 🔹 Step 2: Save user data to Firestore
  await setDoc(doc(db, "payments", order_reference), {
    email,
    name,
    amount,
    status: "PENDING",
    createdAt: new Date().toISOString(),
  });

  // 🔹 Step 3: Return redirect URL to frontend
  return NextResponse.json({
    redirect_url: "https://pesapal.com/checkout/" + order_reference,
  });
}
