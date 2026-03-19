const defaultSiteUrl = "https://qrcraft-teal.vercel.app";

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.trim() || defaultSiteUrl;
export const siteName = "QRCraft";

export const seoKeywords = [
  "qr code generator",
  "free qr code generator",
  "qr code maker",
  "qr code generator online",
  "wifi qr code generator",
  "vcard qr code generator",
  "qr code creator",
  "custom qr code",
];

export function buildStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: siteName,
    description:
      "Free QR code generator. Create QR codes for URLs, WiFi, contacts, email, phone, and SMS. Customize colors, download as PNG. No signup required.",
    url: siteUrl,
    applicationCategory: "UtilityApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    featureList: [
      "URL QR code generator",
      "WiFi QR code generator",
      "vCard QR code generator",
      "Email QR code generator",
      "Phone QR code generator",
      "SMS QR code generator",
      "Custom colors",
      "PNG download",
      "100% client-side processing",
    ],
  };
}

export function buildWifiPageStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "WiFi QR Code Generator",
    description:
      "Generate a WiFi QR code for free. Guests scan and connect instantly without typing passwords.",
    url: `${siteUrl}/wifi`,
    isPartOf: {
      "@type": "WebSite",
      name: siteName,
      url: siteUrl,
    },
    about: {
      "@type": "Thing",
      name: "WiFi QR Code Generator",
    },
    mainEntity: {
      "@type": "SoftwareApplication",
      name: "QRCraft WiFi QR Generator",
      applicationCategory: "UtilityApplication",
      operatingSystem: "Any",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
    },
  };
}

export function buildVCardPageStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "vCard QR Code Generator",
    description:
      "Generate a vCard QR code for free to share contact details instantly by scan.",
    url: `${siteUrl}/vcard`,
    isPartOf: {
      "@type": "WebSite",
      name: siteName,
      url: siteUrl,
    },
    about: {
      "@type": "Thing",
      name: "vCard QR Code Generator",
    },
    mainEntity: {
      "@type": "SoftwareApplication",
      name: "QRCraft vCard QR Generator",
      applicationCategory: "UtilityApplication",
      operatingSystem: "Any",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
    },
  };
}

export function resolveAnalyticsConfig(
  env = process.env,
): { scriptSrc: string; domain: string } | null {
  const domain = env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN?.trim();
  if (!domain) return null;
  const scriptSrc =
    env.NEXT_PUBLIC_PLAUSIBLE_SRC?.trim() ||
    "https://plausible.io/js/script.js";
  return { scriptSrc, domain };
}
