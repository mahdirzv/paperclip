import type { Metadata } from "next";
import Script from "next/script";
import { buildVCardPageStructuredData, siteName, siteUrl } from "@/lib/seo";
import VCardGenerator from "./VCardGenerator";

const vcardStructuredDataJson = JSON.stringify(
  buildVCardPageStructuredData(),
).replace(/</g, "\\u003c");

export const metadata: Metadata = {
  title: `vCard QR Code Generator - Free | ${siteName}`,
  description:
    "Generate a vCard QR code for free. Share your contact information instantly — name, phone, email, organization, and website. Scan to add to contacts. 100% private.",
  keywords: [
    "vcard qr code generator",
    "contact qr code",
    "business card qr code",
    "qr code contact information",
    "free vcard qr generator",
  ],
  alternates: { canonical: `${siteUrl}/vcard` },
  openGraph: {
    title: `vCard QR Code Generator - Free | ${siteName}`,
    description:
      "Generate a vCard QR code for free to share contact details instantly by scan.",
    url: `${siteUrl}/vcard`,
    siteName,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `vCard QR Code Generator - Free | ${siteName}`,
    description:
      "Generate a vCard QR code for free to share contact details instantly by scan.",
  },
};

export default function VCardPage() {
  return (
    <div className="min-h-screen">
      <header className="px-6 py-8 text-center max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">vCard QR Code Generator</h1>
        <p className="text-[var(--text-secondary)] text-sm">
          Create a QR code with your contact information. When scanned, it adds
          your details directly to the phone&apos;s contacts. Free and private.
        </p>
      </header>

      <main className="max-w-3xl mx-auto px-4 pb-12">
        <Script id="qrcraft-vcard-structured-data" type="application/ld+json">
          {vcardStructuredDataJson}
        </Script>
        <VCardGenerator />

        <section className="mt-12 space-y-4 text-sm text-[var(--text-secondary)]">
          <h2 className="text-lg font-semibold text-[var(--text-primary)]">
            What Is a vCard QR Code?
          </h2>
          <p>
            A vCard (Virtual Contact File) QR code contains contact information in
            a standardized format. When scanned, the phone&apos;s contact app
            opens with all fields pre-filled — the user just taps &ldquo;Save.&rdquo;
          </p>
          <h2 className="text-lg font-semibold text-[var(--text-primary)]">
            Common Uses
          </h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>Business cards &mdash; add a QR code for instant digital contact sharing</li>
            <li>Email signatures &mdash; link to your contact QR code</li>
            <li>Conference badges and event materials</li>
            <li>Resumes and portfolios</li>
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
