import type { APIRoute } from "astro";


interface UrlEntry {
  loc: string;
  lastmod?: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: number;
}

const STATIC_ROUTES: Omit<UrlEntry, "loc"> & { path: string }[] = [
  { path: "/", changefreq: "weekly", priority: 1.0 },
  { path: "/privacidad", changefreq: "monthly", priority: 0.4 },
  { path: "/terminos", changefreq: "monthly", priority: 0.4 },
];

const toIsoDate = (value?: Date) =>
  value ? new Date(value).toISOString().split("T")[0] : undefined;

export const GET: APIRoute = async ({ site }) => {
  const siteUrl = site ?? new URL("https://bolsillo.site");

  const urls: UrlEntry[] = STATIC_ROUTES.map(({ path, ...rest }) => ({
    loc: new URL(path, siteUrl).toString(),
    lastmod: toIsoDate(new Date()),
    ...rest,
  }));

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
      .map(
        ({ loc, lastmod, changefreq, priority }) => `  <url>
    <loc>${loc}</loc>
    ${lastmod ? `<lastmod>${lastmod}</lastmod>` : ""}
    ${changefreq ? `<changefreq>${changefreq}</changefreq>` : ""}
    ${priority ? `<priority>${priority.toFixed(1)}</priority>` : ""}
  </url>`
      )
      .join("\n")}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
};
