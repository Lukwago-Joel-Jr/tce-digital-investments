import { readFile } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const ebook =
      req.nextUrl.searchParams.get("ebook") || "KINGDOM-LENDING-GUIDE";

    const filePath = path.join(process.cwd(), "public/ebooks", `${ebook}.pdf`);

    const fileBuffer = await readFile(filePath);

    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${ebook}.pdf"`,
        "Content-Length": fileBuffer.length.toString(),
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
        Expires: "0",
      },
    });
  } catch (error) {
    console.error("❌ PDF download error:", error);
    return NextResponse.json(
      { error: "Failed to download ebook" },
      { status: 500 },
    );
  }
}
