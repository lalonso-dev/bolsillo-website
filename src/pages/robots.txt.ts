import type { APIRoute } from "astro";

export const GET: APIRoute = ({ site }) => {
  const siteUrl = (site ?? new URL("https://bolsillo.site")).toString().replace(/\/$/, "");

  const content = `User-agent: *
Allow: /

# Bloquear rutas que no aportan SEO
Disallow: /cdn-cgi/

Sitemap: ${siteUrl}/sitemap.xml
`;

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400",
    },
  });
};
