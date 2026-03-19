import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About JSONPretty - Free JSON Formatter & Converter",
  description:
    "JSONPretty is a free, privacy-first JSON formatting tool. Format, validate, minify, and convert JSON to YAML — entirely in your browser.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-[var(--border)] px-6 py-4">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <Link href="/" className="text-xl font-bold tracking-tight hover:opacity-80">
            <span className="text-[var(--accent)]">{"{"}</span>
            {" JSON"}
            <span className="text-[var(--text-secondary)]">Pretty</span>
          </Link>
          <Link href="/" className="btn text-sm">
            Open Tool
          </Link>
        </div>
      </header>

      <main className="flex-1 px-6 py-12">
        <article className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">About JSONPretty</h1>

          <div className="space-y-6 text-[var(--text-secondary)] leading-relaxed">
            <p>
              <strong className="text-[var(--text-primary)]">JSONPretty</strong> is a free,
              fast JSON formatting tool built for developers. It runs entirely in your browser
              — no data is ever sent to a server.
            </p>

            <h2 className="text-xl font-semibold text-[var(--text-primary)] pt-4">
              What you can do
            </h2>
            <ul className="list-disc list-inside space-y-2">
              <li>
                <strong className="text-[var(--text-primary)]">Format & Beautify</strong> —
                Pretty-print JSON with 2, 4, or 8-space indentation.
              </li>
              <li>
                <strong className="text-[var(--text-primary)]">Minify</strong> — Compress
                JSON to a single line for APIs and configs.
              </li>
              <li>
                <strong className="text-[var(--text-primary)]">Validate</strong> — Instantly
                check if your JSON is valid, with error location details.
              </li>
              <li>
                <strong className="text-[var(--text-primary)]">Convert to YAML</strong> —
                Transform JSON into YAML with one click.
              </li>
            </ul>

            <h2 className="text-xl font-semibold text-[var(--text-primary)] pt-4">
              Privacy first
            </h2>
            <p>
              All processing happens client-side in your browser. JSONPretty never sends your
              data anywhere. There are no accounts, no tracking cookies, and no analytics that
              capture your input. Your JSON stays on your machine.
            </p>

            <h2 className="text-xl font-semibold text-[var(--text-primary)] pt-4">
              Who is this for?
            </h2>
            <p>
              Anyone who works with JSON: backend developers debugging API responses, frontend
              engineers inspecting payloads, DevOps teams working with config files, or students
              learning data formats. If you paste JSON regularly, JSONPretty saves you time.
            </p>

            <h2 className="text-xl font-semibold text-[var(--text-primary)] pt-4">
              Open & free
            </h2>
            <p>
              JSONPretty is free to use with no limits. No sign-up, no paywall, no ads.
              Built as part of the{" "}
              <a
                href="https://paperclip.ing"
                className="text-[var(--accent)] hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Paperclip
              </a>{" "}
              project.
            </p>
          </div>
        </article>
      </main>

      <footer className="border-t border-[var(--border)] px-6 py-3">
        <div className="max-w-3xl mx-auto flex items-center justify-between text-xs text-[var(--text-secondary)]">
          <span>JSONPretty &mdash; Free, fast, private JSON tools</span>
          <Link href="/" className="hover:text-[var(--text-primary)]">
            Back to tool
          </Link>
        </div>
      </footer>
    </div>
  );
}
