import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

// Initialize Firebase Storage
const storage = getStorage();

export async function POST(req) {
  try {
    const { orderId, ebookId } = await req.json();

    if (!orderId || !ebookId) {
      return NextResponse.json(
        { error: "Missing orderId or ebookId" },
        { status: 400 },
      );
    }

    // 1. Verify the order exists and is paid
    const orderRef = doc(db, "payments", orderId);
    const orderDoc = await getDoc(orderRef);

    if (!orderDoc.exists()) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    const orderData = orderDoc.data();

    // Check if order is paid
    if (orderData.status !== "COMPLETED") {
      return NextResponse.json({ error: "Order not paid" }, { status: 403 });
    }

    // 2. Check if the ebook ID matches the order
    const orderItems = Array.isArray(orderData.items) ? orderData.items : [];
    const hasAccess = orderItems.some((item) => item.id === ebookId);

    if (!hasAccess) {
      return NextResponse.json(
        { error: "No access to this ebook" },
        { status: 403 },
      );
    }

    // 3. Generate a temporary download URL from Firebase Storage
    try {
      const pdfRef = ref(storage, `ebooks/${ebookId}.pdf`);
      const downloadURL = await getDownloadURL(pdfRef);

      // Return the temporary download URL
      return NextResponse.json({
        downloadUrl: downloadURL,
        expires: "URL expires in 1 hour",
      });
    } catch (error) {
      console.error("PDF access error:", error);
      return NextResponse.json(
        { error: "Could not access PDF file" },
        { status: 500 },
      );
    }
  } catch (error) {
    console.error("Download error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
