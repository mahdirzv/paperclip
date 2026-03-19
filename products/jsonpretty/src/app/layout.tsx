import type { Metadata } from "next";
import "./globals.css";
import FeedbackWidget from "./components/FeedbackWidget";

const siteUrl = "https://jsonpretty-teal.vercel.app";

export const metadata: Metadata = {
  title: "JSONPretty - Fast JSON Formatter, Validator & Converter",
  description:
    "Format, validate, minify, and convert JSON instantly. Privacy-first - all processing happens in your browser.",
  keywords: [
    "json formatter",
    "json validator",
    "json beautifier",
    "json minifier",
    "json to yaml",
    "json tools",
  ],
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: "JSONPretty - Fast JSON Formatter, Validator & Converter",
    description:
      "Format, validate, minify, and convert JSON instantly. 100% client-side, zero data collection.",
    url: siteUrl,
    siteName: "JSONPretty",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    title: "JSONPretty - Fast JSON Formatter & Converter",
    description:
      "Format, validate, minify, and convert JSON instantly. Privacy-first, runs entirely in your browser.",
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
        {children}
        <FeedbackWidget />
      </body>
    </html>
  );
}
