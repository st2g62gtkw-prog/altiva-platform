import type { MetadataRoute } from "next";

import { getSiteUrl } from "@/lib/utils/urls";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/app", "/login"]
    },
    sitemap: `${getSiteUrl()}/sitemap.xml`
  };
}
