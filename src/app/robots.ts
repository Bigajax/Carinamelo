import type { MetadataRoute } from "next";

import { site } from "@/data/site.config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Combinação de filtros não é página: evita rastreio de conteúdo duplicado.
      disallow: "/catalogo?",
    },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
