import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const site = getSiteUrl();
  return [
    {
      url: site,
      lastModified: new Date(),
    },
    {
      url: `${site}/primer`,
      lastModified: new Date(),
    },
  ];
}
