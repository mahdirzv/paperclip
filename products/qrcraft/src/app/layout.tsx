import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import FeedbackWidget from "./components/FeedbackWidget";
import {
  buildStructuredData,
  resolveAnalyticsConfig,
  seoKeywords,
  siteName,
  siteUrl,
} from "@/lib/seo";

const analytics = resolveAnalyticsConfig();
const structuredDataJson = JSON.stringify(buildStructuredData()).replace(
  /</g,
  "\\u003c",
);

export const metadata: Metadata = {
  title: "QRCraft - Free QR Code Generator | URL, WiFi, vCard, Email & More",
  description:
    "Create beautiful QR codes for free. Generate QR codes for URLs, WiFi networks, contacts, email, phone, and SMS. Customize colors, download high-res PNG. No signup required. 100% client-side.",
  keywords: seoKeywords,
  applicationName: siteName,
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: "QRCraft - Free QR Code Generator",
    description:
      "Create QR codes for URLs, WiFi, contacts, email, phone, and SMS. Customize colors, download PNG. Free, no signup, 100% private.",
    url: siteUrl,
    siteName,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "QRCraft - Free QR Code Generator",
    description:
      "Create QR codes for URLs, WiFi, contacts, and more. Free, instant, private.",
  },
  robots: { index: true, follow: true },
  alternates: { canonical: siteUrl },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {analytics && (
          <Script
            defer
            data-domain={analytics.domain}
            src={analytics.scriptSrc}
          />
        )}
        <Script id="qrcraft-structured-data" type="application/ld+json">
          {structuredDataJson}
        </Script>
        {children}
        <FeedbackWidget />
      </body>
    </html>
  );
}
