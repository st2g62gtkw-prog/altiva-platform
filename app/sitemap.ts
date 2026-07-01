import type { MetadataRoute } from "next";

import { getAbsoluteUrl } from "@/lib/utils/urls";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: getAbsoluteUrl("/"),
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1
    },
    {
      url: getAbsoluteUrl("/apus"),
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8
    },
    {
      url: getAbsoluteUrl("/cubicar"),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5
    },
    {
      url: getAbsoluteUrl("/documentacion-tecnica"),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5
    },
    {
      url: getAbsoluteUrl("/documentacion-administrativa"),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5
    }
  ];
}
