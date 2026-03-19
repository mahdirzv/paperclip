import type { Metadata } from "next";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import FeedbackWidget from "./components/FeedbackWidget";
import { buildStructuredData, resolveAnalyticsConfig, seoKeywords, siteName, siteUrl } from "@/lib/seo";

const analytics = resolveAnalyticsConfig();
const structuredDataJson = JSON.stringify(buildStructuredData()).replace(/</g, "\\u003c");

export const metadata: Metadata = {
  title: "JSONPretty - Fast JSON Formatter, Validator, Beautifier & Converter",
  description:
    "JSON formatter, JSON validator, and JSON beautifier in one fast browser tool. Convert JSON to YAML, minify payloads, and keep everything local.",
  keywords: seoKeywords,
  applicationName: siteName,
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: "JSONPretty - JSON Formatter, Validator, Beautifier & JSON to YAML",
    description:
      "Use JSONPretty to format JSON, validate errors, beautify JSON, minify payloads, and convert JSON to YAML instantly.",
    url: siteUrl,
    siteName,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    title: "JSONPretty - JSON Formatter, Validator & JSON to YAML",
    description:
      "Format, validate, beautify, and convert JSON to YAML quickly. Privacy-first and browser-based.",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: siteUrl,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {analytics && <Script defer data-domain={analytics.domain} src={analytics.scriptSrc} />}
        <Script id="jsonpretty-structured-data" type="application/ld+json">
          {structuredDataJson}
        </Script>
        {children}
        <Analytics />
        <FeedbackWidget />
      </body>
    </html>
  );
}
