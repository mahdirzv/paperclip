import type { Metadata } from "next";
import { siteName, siteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: `About ${siteName} - Free QR Code Generator`,
  description:
    "QRCraft is a free, open QR code generator that runs entirely in your browser. No data is sent to any server. Create QR codes for URLs, WiFi, contacts, and more.",
  alternates: { canonical: `${siteUrl}/about` },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <main className="max-w-2xl mx-auto px-6 py-12">
        <h1 className="text-2xl font-bold mb-6">About QRCraft</h1>

        <section className="space-y-4 text-sm text-[var(--text-secondary)]">
          <p>
            <strong className="text-[var(--text-primary)]">QRCraft</strong> is a
            free QR code generator built for speed and privacy. Every QR code is
            generated entirely in your browser &mdash; no data ever leaves your
            device.
          </p>

          <h2 className="text-lg font-semibold text-[var(--text-primary)] mt-8">
            What You Can Create
          </h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              <strong>URL QR Codes</strong> &mdash; Link to any website
            </li>
            <li>
              <strong>WiFi QR Codes</strong> &mdash; Share WiFi credentials
              instantly
            </li>
            <li>
              <strong>vCard QR Codes</strong> &mdash; Share contact info
            </li>
            <li>
              <strong>Email QR Codes</strong> &mdash; Pre-filled email composer
            </li>
            <li>
              <strong>Phone QR Codes</strong> &mdash; Quick dial from a scan
            </li>
            <li>
              <strong>SMS QR Codes</strong> &mdash; Pre-filled text message
            </li>
            <li>
              <strong>Plain Text</strong> &mdash; Any text you need
            </li>
          </ul>

          <h2 className="text-lg font-semibold text-[var(--text-primary)] mt-8">
            Customization
          </h2>
          <p>
            Customize foreground and background colors to match your brand. Choose
            from four error correction levels (Low, Medium, Quartile, High) and
            set the output size from 128px to 1024px.
          </p>

          <h2 className="text-lg font-semibold text-[var(--text-primary)] mt-8">
            Privacy
          </h2>
          <p>
            QRCraft processes everything client-side using JavaScript. No server
            calls, no tracking of your QR code content, no cookies. Your data
            stays on your device.
          </p>

          <h2 className="text-lg font-semibold text-[var(--text-primary)] mt-8">
            Technology
          </h2>
          <p>
            Built with Next.js, TypeScript, and Tailwind CSS. QR code generation
            powered by the open-source{" "}
            <code className="bg-[var(--bg-tertiary)] px-1 rounded">qrcode</code>{" "}
            library.
          </p>
        </section>

        <div className="mt-12">
          <a href="/" className="text-[var(--accent)] text-sm hover:underline">
            &larr; Back to QR Code Generator
          </a>
        </div>
      </main>
    </div>
  );
}
