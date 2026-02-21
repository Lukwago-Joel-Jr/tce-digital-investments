import { products } from "@/components/Data/ebooks";

const SITE_URL =
  process.env.SITE_URL || "https://www.tcedigitalinvestments.com";

function escapeXml(str = "") {
  return str
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

export async function GET() {
  const pages = [
    "",
    "about",
    "community",
    "contact",
    "waitlist",
    "wealth-builder-program",
    "cart",
    "checkout",
    "payment/success",
    "payment/failed",
  ];

  const now = new Date().toISOString();

  const staticUrls = pages
    .map((p) => {
      const loc = p === "" ? SITE_URL : `${SITE_URL}/${p}`;
      const priority = p === "" ? "1.0" : "0.7";
      return `
    <url>
      <loc>${escapeXml(loc)}</loc>
      <lastmod>${now}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>${priority}</priority>
    </url>`;
    })
    .join("");

  // include ebook product pages (products with type === 'ebook')
  const ebooks = (products || []).filter((p) => p.type === "ebook");

  const ebookUrls = ebooks
    .map((book) => {
      const path = `${SITE_URL}/ebook/${encodeURIComponent(book.id)}`;
      const lastmod = book.releaseDate || now;
      const image = book.cover ? `${SITE_URL}${book.cover}` : null;

      return `
    <url>
      <loc>${escapeXml(path)}</loc>
      <lastmod>${escapeXml(lastmod)}</lastmod>
      <changefreq>monthly</changefreq>
      <priority>0.8</priority>
      ${image ? `<image:image><image:loc>${escapeXml(image)}</image:loc></image:image>` : ""}
    </url>`;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  ${staticUrls}
  ${ebookUrls}
  </urlset>`;

  return new Response(xml, {
    status: 200,
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=0, s-maxage=3600",
    },
  });
}
