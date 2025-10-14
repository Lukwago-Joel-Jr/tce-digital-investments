import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { doc, setDoc } from "firebase/firestore";

export async function POST(req) {
  try {
    const { email, name, amount } = await req.json();
    const order_reference = `ORDER-${Date.now()}`;

    await setDoc(doc(db, "payments", order_reference), {
      email,
      name,
      amount,
      status: "PENDING",
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json({ message: "✅ Data saved!", order_reference });
  } catch (err) {
    console.error("❌ Error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
