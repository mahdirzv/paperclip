const defaultSiteUrl = "https://jsonpretty-teal.vercel.app";

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim() || defaultSiteUrl;
export const siteName = "JSONPretty";

export const seoKeywords = [
  "json formatter",
  "json validator",
  "json beautifier",
  "json to yaml",
  "json minifier",
  "json tools",
];

export function buildStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: siteName,
    description:
      "Free JSON formatter, validator, beautifier, minifier, and JSON to YAML converter.",
    url: siteUrl,
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    featureList: [
      "JSON formatter",
      "JSON validator",
      "JSON beautifier",
      "JSON minifier",
      "JSON to YAML conversion",
    ],
  };
}

export function resolveAnalyticsConfig(
  env: Record<string, string | undefined> = process.env,
): { scriptSrc: string; domain: string } | null {
  const domain = env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN?.trim();
  if (!domain) {
    return null;
  }

  const scriptSrc = env.NEXT_PUBLIC_PLAUSIBLE_SRC?.trim() || "https://plausible.io/js/script.js";
  return { scriptSrc, domain };
}

