import { readFile } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const ebook =
      req.nextUrl.searchParams.get("ebook") || "KINGDOM-LENDING-GUIDE";

    // Validate ebook name to prevent directory traversal
    if (!ebook.match(/^[a-zA-Z0-9\-_]+$/)) {
      return NextResponse.json(
        { error: "Invalid ebook name" },
        { status: 400 },
      );
    }

    const filePath = path.join(process.cwd(), "public/ebooks", `${ebook}.pdf`);

    const fileBuffer = await readFile(filePath);

    const response = new NextResponse(fileBuffer, {
      status: 200,
    });

    response.headers.set("Content-Type", "application/pdf");
    response.headers.set(
      "Content-Disposition",
      `attachment; filename="${ebook}.pdf"`,
    );
    response.headers.set("Content-Length", fileBuffer.length.toString());

    return response;
  } catch (error) {
    console.error("❌ PDF download error:", error);
    return NextResponse.json(
      { error: "Failed to download ebook: " + error.message },
      { status: 500 },
    );
  }
}
