function normalizeUrl(url: string) {
  return url.replace(/\/+$/, "");
}

export function getSiteUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return normalizeUrl(process.env.NEXT_PUBLIC_SITE_URL);
  }

  if (process.env.VERCEL_URL) {
    return `https://${normalizeUrl(process.env.VERCEL_URL)}`;
  }

  return "http://localhost:3000";
}

export function getAbsoluteUrl(path = "/") {
  const siteUrl = getSiteUrl();
  const cleanPath = path.startsWith("/") ? path : `/${path}`;

  return `${siteUrl}${cleanPath}`;
}
