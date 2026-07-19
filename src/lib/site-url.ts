function withProtocol(url: string) {
  return /^https?:\/\//i.test(url) ? url : `https://${url}`;
}

const configuredSiteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  process.env.SITE_URL ??
  process.env.VERCEL_PROJECT_PRODUCTION_URL ??
  "http://localhost:3000";

export const siteUrl = new URL(withProtocol(configuredSiteUrl));
