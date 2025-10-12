import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { doc, setDoc } from "firebase/firestore";

export async function GET() {
  try {
    const id = `TEST-${Date.now()}`;

    await setDoc(doc(db, "payments", id), {
      email: "test@example.com",
      name: "Golden",
      amount: 10000,
      status: "PENDING",
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json({ message: "✅ Test document added!", id });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
