"use client";

import { useState, useCallback, useEffect, type FormEvent } from "react";
import { jsonToYaml, formatJson, minifyJson, validateJson } from "@/lib/json-utils";
import { featureCards, footerLinks, proFeatureList } from "@/lib/marketing-content";

type Mode = "format" | "minify" | "validate" | "yaml";
type Toast = { message: string; type: "success" | "error" } | null;

const SAMPLE_JSON = `{
  "name": "JSONPretty",
  "version": "1.0.0",
  "features": ["format", "validate", "minify", "yaml"],
  "config": {
    "theme": "dark",
    "privacy": true
  }
}`;

function getErrorPosition(error: string): { line: number; col: number } | null {
  const posMatch = error.match(/position\s+(\d+)/i);
  const lineMatch = error.match(/line\s+(\d+)/i);
  const colMatch = error.match(/column\s+(\d+)/i);
  if (lineMatch) {
    return { line: parseInt(lineMatch[1]), col: colMatch ? parseInt(colMatch[1]) : 0 };
  }
  if (posMatch) {
    return { line: 0, col: parseInt(posMatch[1]) };
  }
  return null;
}

export default function Home() {
  const [input, setInput] = useState(SAMPLE_JSON);
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<Mode>("format");
  const [error, setError] = useState<string | null>(null);
  const [toast, setToast] = useState<Toast>(null);
  const [indentSize, setIndentSize] = useState(2);
  const [waitlistEmail, setWaitlistEmail] = useState("");

  const showToast = useCallback((message: string, type: "success" | "error") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 2000);
  }, []);

  const processJson = useCallback(
    (text: string, currentMode: Mode) => {
      if (!text.trim()) {
        setOutput("");
        setError(null);
        return;
      }

      const validation = validateJson(text);
      if (validation.valid) {
        setError(null);

        switch (currentMode) {
          case "format":
            setOutput(formatJson(text, indentSize));
            break;
          case "minify":
            setOutput(minifyJson(text));
            break;
          case "validate":
            setOutput("Valid JSON");
            break;
          case "yaml":
            setOutput(jsonToYaml(JSON.parse(text)));
            break;
        }
      } else {
        const msg = validation.error ?? "Invalid JSON";
        setError(msg);

        if (currentMode === "validate") {
          const pos = getErrorPosition(msg);
          const detail = pos
            ? `Invalid JSON at line ${pos.line || "?"}, column ${pos.col || "?"}`
            : `Invalid JSON`;
          setOutput(`${detail}\n\n${msg}`);
        } else {
          setOutput("");
        }
      }
    },
    [indentSize]
  );

  useEffect(() => {
    processJson(input, mode);
  }, [input, mode, processJson]);

  const handleCopy = useCallback(() => {
    if (!output || error) return;
    navigator.clipboard
      .writeText(output)
      .then(() => {
        showToast("Copied to clipboard", "success");
      })
      .catch(() => {
        showToast("Could not copy to clipboard", "error");
      });
  }, [output, error, showToast]);

  const handleDownload = useCallback(() => {
    if (!output || error) return;
    try {
      const ext = mode === "yaml" ? "yaml" : "json";
      const blob = new Blob([output], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `output.${ext}`;
      a.click();
      URL.revokeObjectURL(url);
      showToast("File downloaded", "success");
    } catch {
      showToast("Could not download file", "error");
    }
  }, [output, error, mode, showToast]);

  const handleClear = useCallback(() => {
    setInput("");
    setOutput("");
    setError(null);
  }, []);

  const handlePaste = useCallback(async () => {
    try {
      const text = await navigator.clipboard.readText();
      setInput(text);
    } catch {
      showToast("Could not read clipboard", "error");
    }
  }, [showToast]);

  const handleSample = useCallback(() => {
    setInput(SAMPLE_JSON);
  }, []);

  const handleWaitlistSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const normalizedEmail = waitlistEmail.trim().toLowerCase();

      if (!normalizedEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
        showToast("Enter a valid email to join the waitlist", "error");
        return;
      }

      try {
        const storageKey = "jsonpretty:pro-waitlist";
        const existing = localStorage.getItem(storageKey);
        let savedEmails: string[] = [];
        try {
          const parsed = existing ? JSON.parse(existing) : [];
          savedEmails = Array.isArray(parsed) ? parsed : [];
        } catch {
          savedEmails = [];
        }
        if (!savedEmails.includes(normalizedEmail)) {
          savedEmails.push(normalizedEmail);
          localStorage.setItem(storageKey, JSON.stringify(savedEmails));
        }

        setWaitlistEmail("");
        showToast("You’re on the waitlist — we’ll email launch updates", "success");
      } catch {
        showToast("Could not save waitlist signup", "error");
      }
    },
    [waitlistEmail, showToast]
  );

  const modes: { key: Mode; label: string; desc: string }[] = [
    { key: "format", label: "Format", desc: "Beautify JSON with indentation" },
    { key: "minify", label: "Minify", desc: "Compress JSON to single line" },
    { key: "validate", label: "Validate", desc: "Check if JSON is valid" },
    { key: "yaml", label: "To YAML", desc: "Convert JSON to YAML" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b border-[var(--border)] px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between flex-wrap gap-2">
          <div>
            <h1 className="text-xl font-bold tracking-tight">
              <span className="text-[var(--accent)]">{"{"}</span>
              {" JSON"}
              <span className="text-[var(--text-secondary)]">Pretty</span>
            </h1>
            <p className="text-xs text-[var(--text-secondary)] mt-0.5">
              Format &middot; Validate &middot; Minify &middot; Convert
            </p>
          </div>
          <div className="text-xs text-[var(--text-secondary)]">
            100% client-side &middot; No data sent to servers
          </div>
        </div>
      </header>

      {/* Toolbar */}
      <div className="border-b border-[var(--border)] px-6 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between flex-wrap gap-3">
          <div className="tab-bar">
            {modes.map((m) => (
              <button
                key={m.key}
                className={`btn ${mode === m.key ? "active" : ""}`}
                onClick={() => setMode(m.key)}
                title={m.desc}
              >
                {m.label}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            {mode === "format" && (
              <select
                value={indentSize}
                onChange={(e) => setIndentSize(Number(e.target.value))}
                className="btn bg-[var(--bg-tertiary)] text-[var(--text-primary)]"
              >
                <option value={2}>2 spaces</option>
                <option value={4}>4 spaces</option>
                <option value={8}>Tab (8)</option>
              </select>
            )}
            <button className="btn" onClick={handlePaste}>
              Paste
            </button>
            <button className="btn" onClick={handleSample}>
              Sample
            </button>
            <button className="btn" onClick={handleClear}>
              Clear
            </button>
          </div>
        </div>
      </div>

      {/* Editor */}
      <main className="flex-1 px-4 sm:px-6 py-4 space-y-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-4 lg:h-[calc(100vh-180px)]">
          {/* Input */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-medium text-[var(--text-secondary)] uppercase tracking-wider">
                Input
              </label>
              <span className="text-xs text-[var(--text-secondary)]">
                {input.length.toLocaleString()} chars
              </span>
            </div>
            <textarea
              className={`editor-area flex-1 w-full p-4 ${error ? "error" : input.trim() ? "success" : ""}`}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Paste your JSON here..."
              spellCheck={false}
              autoComplete="off"
              autoCorrect="off"
              aria-invalid={!!error}
              rows={14}
            />
          </div>

          {/* Output */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-medium text-[var(--text-secondary)] uppercase tracking-wider">
                {mode === "yaml" ? "YAML Output" : mode === "validate" ? "Validation Result" : "Output"}
              </label>
              <div className="flex items-center gap-2">
                <span className="text-xs text-[var(--text-secondary)]">
                  {output.length.toLocaleString()} chars
                </span>
                <button
                  className="btn text-xs py-1 px-3"
                  onClick={handleCopy}
                  disabled={!output || !!error}
                >
                  Copy
                </button>
                <button
                  className="btn text-xs py-1 px-3"
                  onClick={handleDownload}
                  disabled={!output || !!error}
                >
                  Download
                </button>
              </div>
            </div>
            <textarea
              className={`editor-area flex-1 w-full p-4 ${error ? "error" : ""} ${
                mode === "validate" && !error && input.trim() ? "success" : ""
              }`}
              value={output}
              readOnly
              placeholder="Output will appear here..."
              spellCheck={false}
              rows={14}
            />
            {error && mode !== "validate" && (
              <div role="alert" className="text-xs text-[var(--error)] bg-[var(--error)]/10 px-3 py-2 rounded-md">
                {error}
              </div>
            )}
          </div>
        </div>

        <section className="max-w-7xl mx-auto border border-[var(--border)] rounded-xl bg-[var(--bg-secondary)] p-6 sm:p-8">
          <h2 className="text-2xl font-semibold text-[var(--text-primary)]">
            What JSONPretty does
          </h2>
          <p className="text-sm text-[var(--text-secondary)] mt-3 leading-6 max-w-4xl">
            JSONPretty helps developers inspect and clean JSON in seconds. Paste any payload,
            switch modes instantly, and copy or download the result without leaving the browser.
            Everything runs locally, so sensitive data never gets uploaded.
          </p>
        </section>

        <section className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-semibold text-[var(--text-primary)]">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            {featureCards.map((feature) => (
              <article
                key={feature.title}
                className="border border-[var(--border)] rounded-xl bg-[var(--bg-secondary)] p-5"
              >
                <h3 className="text-base font-semibold text-[var(--text-primary)]">{feature.title}</h3>
                <p className="text-sm text-[var(--text-secondary)] mt-2 leading-6">
                  {feature.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section
          id="pro-waitlist"
          className="max-w-7xl mx-auto border border-[var(--accent)]/35 rounded-xl bg-[var(--bg-secondary)] p-6 sm:p-8"
        >
          <h2 className="text-2xl font-semibold text-[var(--text-primary)]">JSONPretty Pro (Coming Soon)</h2>
          <p className="text-sm text-[var(--text-secondary)] mt-3 leading-6 max-w-4xl">
            We’re planning a Pro tier for teams working with larger payloads and stricter
            validation needs. Join the waitlist for launch updates.
          </p>
          <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-[var(--text-secondary)]">
            {proFeatureList.map((feature) => (
              <li key={feature}>• {feature}</li>
            ))}
          </ul>

          <form className="mt-6 flex flex-col sm:flex-row gap-3" onSubmit={handleWaitlistSubmit}>
            <input
              type="email"
              value={waitlistEmail}
              onChange={(event) => setWaitlistEmail(event.target.value)}
              placeholder="you@company.com"
              className="editor-area w-full sm:max-w-sm px-4 py-2"
              aria-label="Email address"
              required
            />
            <button type="submit" className="btn active">
              Join Pro waitlist
            </button>
          </form>
          <p className="text-xs text-[var(--text-secondary)] mt-2">
            Waitlist signups are stored only in your browser in this version.
          </p>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-[var(--border)] px-6 py-5">
        <div className="max-w-7xl mx-auto flex items-center justify-between flex-wrap gap-3 text-xs text-[var(--text-secondary)]">
          <span>JSONPretty &mdash; Free, fast, private JSON tools</span>
          <div className="flex items-center gap-4 flex-wrap">
            {footerLinks.map((link) => (
              <a key={link.href} href={link.href} className="hover:text-[var(--text-primary)]">
                {link.label}
              </a>
            ))}
            <span>All processing happens in your browser.</span>
          </div>
        </div>
      </footer>

      {/* Toast */}
      {toast && <div role="alert" aria-live="polite" className={`toast toast-${toast.type}`}>{toast.message}</div>}
    </div>
  );
}
