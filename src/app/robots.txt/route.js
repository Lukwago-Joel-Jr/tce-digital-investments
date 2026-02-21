const SITE_URL =
  process.env.SITE_URL || "https://www.tcedigitalinvestments.com";

export async function GET() {
  const sitemap = `${SITE_URL.replace(/\/$/, "")}/sitemap.xml`;
  const robots = `User-agent: *\nAllow: /\nSitemap: ${sitemap}\n`;

  return new Response(robots, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600",
    },
  });
}
