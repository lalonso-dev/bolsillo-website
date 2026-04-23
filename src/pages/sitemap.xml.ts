import type { APIRoute } from "astro";

// ─── Rutas estáticas actuales ────────────────────────────────────────────────
// Agrega aquí cada nueva página que crees.
// Cuando agregues colecciones (blog, changelog, etc.) añade su bloque
// igual que en lalonso.dev: getCollection(...) + posts.map(...)
// ─────────────────────────────────────────────────────────────────────────────

interface UrlEntry {
  loc: string;
  lastmod?: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: number;
}

const STATIC_ROUTES: Omit<UrlEntry, "loc"> & { path: string }[] = [
  { path: "/",           changefreq: "weekly",  priority: 1.0  },
  { path: "/privacidad", changefreq: "monthly", priority: 0.4  },
  { path: "/terminos",   changefreq: "monthly", priority: 0.4  },
];

const toIsoDate = (value?: Date) =>
  value ? new Date(value).toISOString().split("T")[0] : undefined;

export const GET: APIRoute = async ({ site }) => {
  const siteUrl = site ?? new URL("https://bolsillo.site");

  // ── Rutas estáticas ──────────────────────────────────────────────────────
  const urls: UrlEntry[] = STATIC_ROUTES.map(({ path, ...rest }) => ({
    loc: new URL(path, siteUrl).toString(),
    lastmod: toIsoDate(new Date()),
    ...rest,
  }));

  // ── Colecciones dinámicas (agregar aquí cuando existan) ──────────────────
  // Ejemplo cuando añadas un blog:
  //
  // const posts = await getCollection("blog", ({ data }) => !data.draft);
  // urls.push(
  //   ...posts.map((post) => ({
  //     loc: new URL(`/blog/${post.slug}`, siteUrl).toString(),
  //     lastmod: toIsoDate(post.data.updatedAt ?? post.data.date),
  //     changefreq: "monthly" as const,
  //     priority: 0.7,
  //   }))
  // );
  // ─────────────────────────────────────────────────────────────────────────

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    ({ loc, lastmod, changefreq, priority }) => `  <url>
    <loc>${loc}</loc>
    ${lastmod    ? `<lastmod>${lastmod}</lastmod>` : ""}
    ${changefreq ? `<changefreq>${changefreq}</changefreq>` : ""}
    ${priority   ? `<priority>${priority.toFixed(1)}</priority>` : ""}
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
