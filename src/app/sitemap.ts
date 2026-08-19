import type { MetadataRoute } from "next";

import { site } from "@/data/site.config";
import { getSlugs } from "@/lib/catalogo";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const fixas = ["", "/catalogo", "/garantia", "/sobre"].map((rota) => ({
    url: `${site.url}${rota}`,
    changeFrequency: "monthly" as const,
    priority: rota === "" ? 1 : 0.8,
  }));

  const produtos = (await getSlugs()).map((slug) => ({
    url: `${site.url}/produto/${slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...fixas, ...produtos];
}
