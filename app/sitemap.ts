import type { MetadataRoute } from "next";
import { allSitePaths, site } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return allSitePaths().map((path) => ({
    url: `${site.url}${path === "/" ? "" : path}`,
    lastModified: new Date("2026-06-13"),
    changeFrequency: path.includes("/insights/") ? "monthly" : "weekly",
    priority: path === "/" ? 1 : path.includes("/free-digital-audit") ? 0.95 : 0.75
  }));
}
