import type { Metadata } from "next";

import { siteConfig } from "@/config/site";
import { getAbsoluteUrl } from "@/lib/utils/urls";

type PageMetadataInput = {
  title: string;
  description: string;
  path: string;
  image?: string;
  noIndex?: boolean;
};

export function createPageMetadata({
  title,
  description,
  path,
  image = "/og-default.svg",
  noIndex = false
}: PageMetadataInput): Metadata {
  const url = getAbsoluteUrl(path);
  const imageUrl = getAbsoluteUrl(image);

  return {
    title,
    description,
    alternates: {
      canonical: url
    },
    robots: noIndex ? { index: false, follow: false } : undefined,
    openGraph: {
      type: "website",
      locale: siteConfig.locale,
      url,
      siteName: siteConfig.name,
      title,
      description,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `${siteConfig.name} - ${title}`
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl]
    }
  };
}
