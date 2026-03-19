import type { Metadata } from "next";
import Script from "next/script";
import { buildWifiPageStructuredData, siteName, siteUrl } from "@/lib/seo";
import WifiGenerator from "./WifiGenerator";

const wifiStructuredDataJson = JSON.stringify(
  buildWifiPageStructuredData(),
).replace(/</g, "\\u003c");

export const metadata: Metadata = {
  title: `WiFi QR Code Generator - Free | ${siteName}`,
  description:
    "Generate a WiFi QR code for free. Guests scan the code and connect instantly — no typing passwords. Supports WPA, WPA2, WEP, and open networks. 100% private.",
  keywords: [
    "wifi qr code generator",
    "wifi qr code",
    "share wifi password qr code",
    "wifi network qr code",
    "free wifi qr generator",
  ],
  alternates: { canonical: `${siteUrl}/wifi` },
  openGraph: {
    title: `WiFi QR Code Generator - Free | ${siteName}`,
    description:
      "Generate a WiFi QR code for free. Guests scan and connect instantly without typing passwords.",
    url: `${siteUrl}/wifi`,
    siteName,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `WiFi QR Code Generator - Free | ${siteName}`,
    description:
      "Generate a WiFi QR code for free. Guests scan and connect instantly without typing passwords.",
  },
};

export default function WifiPage() {
  return (
    <div className="min-h-screen">
      <header className="px-6 py-8 text-center max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">WiFi QR Code Generator</h1>
        <p className="text-[var(--text-secondary)] text-sm">
          Generate a QR code for your WiFi network. Guests scan it and connect
          instantly &mdash; no typing passwords. Free, private, runs in your
          browser.
        </p>
      </header>

      <main className="max-w-3xl mx-auto px-4 pb-12">
        <Script id="qrcraft-wifi-structured-data" type="application/ld+json">
          {wifiStructuredDataJson}
        </Script>
        <WifiGenerator />

        <section className="mt-12 space-y-4 text-sm text-[var(--text-secondary)]">
          <h2 className="text-lg font-semibold text-[var(--text-primary)]">
            How WiFi QR Codes Work
          </h2>
          <p>
            WiFi QR codes encode your network name (SSID), password, and
            encryption type in a standard format. When scanned with a phone
            camera, the device automatically offers to join the network. Supported
            on iOS 11+ and all modern Android devices.
          </p>
          <h2 className="text-lg font-semibold text-[var(--text-primary)]">
            Common Uses
          </h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>Print and display in your home for guests</li>
            <li>Hotels, cafes, and restaurants — no more asking for the password</li>
            <li>Office visitor WiFi access</li>
            <li>Airbnb and rental properties</li>
          </ul>
        </section>

        <div className="mt-8">
          <a href="/" className="text-[var(--accent)] text-sm hover:underline">
            &larr; Back to QR Code Generator
          </a>
        </div>
      </main>

      <footer className="border-t border-[var(--border)] mt-16 py-8 px-6 text-center text-xs text-[var(--text-secondary)]">
        <p>
          QRCraft &mdash; Free QR code generator. 100% client-side. No data
          leaves your browser.
        </p>
      </footer>
    </div>
  );
}
