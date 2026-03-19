"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import QRCode from "qrcode";
import {
  QR_TYPES,
  type QRType,
  type WifiData,
  type VCardData,
  type EmailData,
  type SmsData,
} from "@/lib/qr-types";
import {
  encodeWifi,
  encodeVCard,
  encodeEmail,
  encodePhone,
  encodeSms,
} from "@/lib/encoders";
import { featureCards, proFeatures } from "@/lib/marketing-content";

type ErrorCorrectionLevel = "L" | "M" | "Q" | "H";
type Toast = { message: string; type: "success" | "error" } | null;

const DEFAULT_FG = "#000000";
const DEFAULT_BG = "#ffffff";

export default function QRCraftPage() {
  const [activeType, setActiveType] = useState<QRType>("url");
  const [simpleInput, setSimpleInput] = useState("https://");
  const [wifiData, setWifiData] = useState<WifiData>({
    ssid: "",
    password: "",
    encryption: "WPA",
    hidden: false,
  });
  const [vcardData, setVcardData] = useState<VCardData>({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    organization: "",
    title: "",
    url: "",
  });
  const [emailData, setEmailData] = useState<EmailData>({
    address: "",
    subject: "",
    body: "",
  });
  const [smsData, setSmsData] = useState<SmsData>({
    phone: "",
    message: "",
  });

  const [fgColor, setFgColor] = useState(DEFAULT_FG);
  const [bgColor, setBgColor] = useState(DEFAULT_BG);
  const [ecLevel, setEcLevel] = useState<ErrorCorrectionLevel>("M");
  const [size, setSize] = useState(300);
  const [qrDataUrl, setQrDataUrl] = useState<string>("");
  const [toast, setToast] = useState<Toast>(null);
  const [waitlistEmail, setWaitlistEmail] = useState("");

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const getQRContent = useCallback((): string => {
    switch (activeType) {
      case "url":
      case "text":
        return simpleInput;
      case "wifi":
        return wifiData.ssid ? encodeWifi(wifiData) : "";
      case "vcard":
        return vcardData.firstName || vcardData.lastName
          ? encodeVCard(vcardData)
          : "";
      case "email":
        return emailData.address ? encodeEmail(emailData) : "";
      case "phone":
        return simpleInput ? encodePhone(simpleInput) : "";
      case "sms":
        return smsData.phone ? encodeSms(smsData) : "";
      default:
        return simpleInput;
    }
  }, [activeType, simpleInput, wifiData, vcardData, emailData, smsData]);

  useEffect(() => {
    const content = getQRContent();
    if (!content || content === "https://") {
      setQrDataUrl("");
      return;
    }

    QRCode.toDataURL(content, {
      width: size,
      margin: 2,
      errorCorrectionLevel: ecLevel,
      color: {
        dark: fgColor,
        light: bgColor,
      },
    })
      .then(setQrDataUrl)
      .catch(() => setQrDataUrl(""));
  }, [getQRContent, fgColor, bgColor, ecLevel, size]);

  const showToast = useCallback((message: string, type: "success" | "error") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 2000);
  }, []);

  const handleDownload = useCallback(() => {
    if (!qrDataUrl) return;
    const link = document.createElement("a");
    link.download = `qrcraft-${activeType}-${Date.now()}.png`;
    link.href = qrDataUrl;
    link.click();
    showToast("Downloaded!", "success");
  }, [qrDataUrl, activeType, showToast]);

  const handleCopy = useCallback(async () => {
    if (!qrDataUrl) return;
    try {
      const res = await fetch(qrDataUrl);
      const blob = await res.blob();
      await navigator.clipboard.write([
        new ClipboardItem({ "image/png": blob }),
      ]);
      showToast("Copied to clipboard!", "success");
    } catch {
      showToast("Copy failed — try downloading instead", "error");
    }
  }, [qrDataUrl, showToast]);

  const handleTypeChange = useCallback(
    (type: QRType) => {
      setActiveType(type);
      const config = QR_TYPES.find((t) => t.id === type);
      if (type === "url") setSimpleInput("https://");
      else if (type === "text") setSimpleInput("");
      else if (type === "phone") setSimpleInput(config?.placeholder || "");
      else setSimpleInput("");
    },
    [],
  );

  const handleWaitlistSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(waitlistEmail)) {
        showToast("Please enter a valid email", "error");
        return;
      }
      const existing = JSON.parse(
        localStorage.getItem("qrcraft-waitlist") || "[]",
      );
      existing.push({
        email: waitlistEmail,
        timestamp: new Date().toISOString(),
      });
      localStorage.setItem("qrcraft-waitlist", JSON.stringify(existing));
      setWaitlistEmail("");
      showToast("You're on the list!", "success");
    },
    [waitlistEmail, showToast],
  );

  const typeConfig = QR_TYPES.find((t) => t.id === activeType)!;

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="px-6 py-8 text-center max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">
          Free QR Code Generator
        </h1>
        <p className="text-[var(--text-secondary)] text-sm">
          Create QR codes for URLs, WiFi, contacts, and more. Instant preview,
          custom colors, high-res download. 100% private — nothing leaves your
          browser.
        </p>
      </header>

      {/* Main Tool */}
      <main className="max-w-5xl mx-auto px-4 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-6">
          {/* Left: Input Panel */}
          <div className="space-y-5">
            {/* Type Selector */}
            <div className="tab-bar">
              {QR_TYPES.map((type) => (
                <button
                  key={type.id}
                  onClick={() => handleTypeChange(type.id)}
                  className={`btn text-xs px-3 py-1.5 ${
                    activeType === type.id ? "active" : ""
                  }`}
                >
                  {type.label}
                </button>
              ))}
            </div>

            {/* Dynamic Input Area */}
            <div className="bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg p-5 space-y-4">
              <div className="text-xs text-[var(--text-secondary)] mb-2">
                {typeConfig.description}
              </div>

              {(activeType === "url" ||
                activeType === "text" ||
                activeType === "phone") && (
                <input
                  type={activeType === "url" ? "url" : "text"}
                  value={simpleInput}
                  onChange={(e) => setSimpleInput(e.target.value)}
                  placeholder={typeConfig.placeholder}
                  className="input-field"
                  aria-label={typeConfig.label}
                />
              )}

              {activeType === "wifi" && (
                <div className="space-y-3">
                  <input
                    value={wifiData.ssid}
                    onChange={(e) =>
                      setWifiData({ ...wifiData, ssid: e.target.value })
                    }
                    placeholder="Network name (SSID)"
                    className="input-field"
                    aria-label="WiFi SSID"
                  />
                  <input
                    type="password"
                    value={wifiData.password}
                    onChange={(e) =>
                      setWifiData({ ...wifiData, password: e.target.value })
                    }
                    placeholder="Password"
                    className="input-field"
                    aria-label="WiFi password"
                  />
                  <div className="flex gap-3 items-center">
                    <select
                      value={wifiData.encryption}
                      onChange={(e) =>
                        setWifiData({
                          ...wifiData,
                          encryption: e.target.value as WifiData["encryption"],
                        })
                      }
                      className="input-field"
                      aria-label="Encryption type"
                    >
                      <option value="WPA">WPA/WPA2</option>
                      <option value="WEP">WEP</option>
                      <option value="nopass">None</option>
                    </select>
                    <label className="flex items-center gap-2 text-sm text-[var(--text-secondary)] whitespace-nowrap">
                      <input
                        type="checkbox"
                        checked={wifiData.hidden}
                        onChange={(e) =>
                          setWifiData({
                            ...wifiData,
                            hidden: e.target.checked,
                          })
                        }
                      />
                      Hidden
                    </label>
                  </div>
                </div>
              )}

              {activeType === "vcard" && (
                <div className="grid grid-cols-2 gap-3">
                  <input
                    value={vcardData.firstName}
                    onChange={(e) =>
                      setVcardData({ ...vcardData, firstName: e.target.value })
                    }
                    placeholder="First name"
                    className="input-field"
                    aria-label="First name"
                  />
                  <input
                    value={vcardData.lastName}
                    onChange={(e) =>
                      setVcardData({ ...vcardData, lastName: e.target.value })
                    }
                    placeholder="Last name"
                    className="input-field"
                    aria-label="Last name"
                  />
                  <input
                    value={vcardData.phone}
                    onChange={(e) =>
                      setVcardData({ ...vcardData, phone: e.target.value })
                    }
                    placeholder="Phone"
                    className="input-field"
                    aria-label="Phone"
                  />
                  <input
                    type="email"
                    value={vcardData.email}
                    onChange={(e) =>
                      setVcardData({ ...vcardData, email: e.target.value })
                    }
                    placeholder="Email"
                    className="input-field"
                    aria-label="Email"
                  />
                  <input
                    value={vcardData.organization}
                    onChange={(e) =>
                      setVcardData({
                        ...vcardData,
                        organization: e.target.value,
                      })
                    }
                    placeholder="Organization"
                    className="input-field"
                    aria-label="Organization"
                  />
                  <input
                    value={vcardData.title}
                    onChange={(e) =>
                      setVcardData({ ...vcardData, title: e.target.value })
                    }
                    placeholder="Title"
                    className="input-field"
                    aria-label="Title"
                  />
                  <input
                    type="url"
                    value={vcardData.url}
                    onChange={(e) =>
                      setVcardData({ ...vcardData, url: e.target.value })
                    }
                    placeholder="Website URL"
                    className="input-field col-span-2"
                    aria-label="Website URL"
                  />
                </div>
              )}

              {activeType === "email" && (
                <div className="space-y-3">
                  <input
                    type="email"
                    value={emailData.address}
                    onChange={(e) =>
                      setEmailData({ ...emailData, address: e.target.value })
                    }
                    placeholder="Email address"
                    className="input-field"
                    aria-label="Email address"
                  />
                  <input
                    value={emailData.subject}
                    onChange={(e) =>
                      setEmailData({ ...emailData, subject: e.target.value })
                    }
                    placeholder="Subject (optional)"
                    className="input-field"
                    aria-label="Email subject"
                  />
                  <textarea
                    value={emailData.body}
                    onChange={(e) =>
                      setEmailData({ ...emailData, body: e.target.value })
                    }
                    placeholder="Body (optional)"
                    className="input-field resize-none h-20"
                    aria-label="Email body"
                  />
                </div>
              )}

              {activeType === "sms" && (
                <div className="space-y-3">
                  <input
                    value={smsData.phone}
                    onChange={(e) =>
                      setSmsData({ ...smsData, phone: e.target.value })
                    }
                    placeholder="Phone number"
                    className="input-field"
                    aria-label="SMS phone number"
                  />
                  <textarea
                    value={smsData.message}
                    onChange={(e) =>
                      setSmsData({ ...smsData, message: e.target.value })
                    }
                    placeholder="Message (optional)"
                    className="input-field resize-none h-20"
                    aria-label="SMS message"
                  />
                </div>
              )}
            </div>

            {/* Customization */}
            <div className="bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg p-5">
              <div className="text-sm font-medium mb-3">Customize</div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div>
                  <label className="text-xs text-[var(--text-secondary)] block mb-1">
                    Foreground
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={fgColor}
                      onChange={(e) => setFgColor(e.target.value)}
                      className="w-8 h-8 rounded cursor-pointer border border-[var(--border)]"
                    />
                    <span className="text-xs text-[var(--text-tertiary)]">
                      {fgColor}
                    </span>
                  </div>
                </div>
                <div>
                  <label className="text-xs text-[var(--text-secondary)] block mb-1">
                    Background
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={bgColor}
                      onChange={(e) => setBgColor(e.target.value)}
                      className="w-8 h-8 rounded cursor-pointer border border-[var(--border)]"
                    />
                    <span className="text-xs text-[var(--text-tertiary)]">
                      {bgColor}
                    </span>
                  </div>
                </div>
                <div>
                  <label className="text-xs text-[var(--text-secondary)] block mb-1">
                    Error Correction
                  </label>
                  <select
                    value={ecLevel}
                    onChange={(e) =>
                      setEcLevel(e.target.value as ErrorCorrectionLevel)
                    }
                    className="input-field text-xs py-2"
                    aria-label="Error correction level"
                  >
                    <option value="L">Low (7%)</option>
                    <option value="M">Medium (15%)</option>
                    <option value="Q">Quartile (25%)</option>
                    <option value="H">High (30%)</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs text-[var(--text-secondary)] block mb-1">
                    Size ({size}px)
                  </label>
                  <input
                    type="range"
                    min="128"
                    max="1024"
                    step="64"
                    value={size}
                    onChange={(e) => setSize(Number(e.target.value))}
                    className="w-full mt-2"
                    aria-label="QR code size"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right: Preview + Actions */}
          <div className="space-y-4">
            <div className="bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg p-6 flex flex-col items-center">
              <div
                className="qr-preview mb-4"
                style={{ backgroundColor: bgColor }}
              >
                {qrDataUrl ? (
                  <img
                    src={qrDataUrl}
                    alt="Generated QR Code"
                    width={Math.min(size, 280)}
                    height={Math.min(size, 280)}
                    style={{ imageRendering: "pixelated" }}
                  />
                ) : (
                  <div className="w-[200px] h-[200px] flex items-center justify-center text-sm text-[var(--text-tertiary)]">
                    Enter content to generate QR code
                  </div>
                )}
              </div>
              <canvas ref={canvasRef} className="hidden" />

              <div className="flex gap-2 w-full">
                <button
                  onClick={handleDownload}
                  disabled={!qrDataUrl}
                  className="btn btn-primary flex-1 text-center disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  Download PNG
                </button>
                <button
                  onClick={handleCopy}
                  disabled={!qrDataUrl}
                  className="btn flex-1 text-center disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  Copy
                </button>
              </div>
            </div>

            <div className="bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg p-4 text-xs text-[var(--text-secondary)]">
              <div className="font-medium text-[var(--text-primary)] mb-1">
                Privacy
              </div>
              QR codes are generated entirely in your browser. No data is sent to
              any server. Your content stays on your device.
            </div>
          </div>
        </div>

        {/* Features Section */}
        <section className="mt-16">
          <h2 className="text-xl font-bold text-center mb-8">
            Why QRCraft?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {featureCards.map((feature) => (
              <article
                key={feature.title}
                className="bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg p-5"
              >
                <h3 className="font-medium text-sm mb-1">{feature.title}</h3>
                <p className="text-xs text-[var(--text-secondary)]">
                  {feature.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        {/* Pro Waitlist */}
        <section className="mt-16 max-w-lg mx-auto text-center">
          <h2 className="text-xl font-bold mb-2">QRCraft Pro (Coming Soon)</h2>
          <p className="text-sm text-[var(--text-secondary)] mb-4">
            SVG downloads, logo overlays, custom shapes, batch generation, and
            scan analytics.
          </p>
          <ul className="text-xs text-[var(--text-secondary)] mb-6 space-y-1">
            {proFeatures.map((f) => (
              <li key={f}>&#x2713; {f}</li>
            ))}
          </ul>
          <form
            onSubmit={handleWaitlistSubmit}
            className="flex gap-2 max-w-sm mx-auto"
          >
            <input
              type="email"
              value={waitlistEmail}
              onChange={(e) => setWaitlistEmail(e.target.value)}
              placeholder="your@email.com"
              className="input-field flex-1"
              aria-label="Email for waitlist"
            />
            <button type="submit" className="btn btn-primary whitespace-nowrap">
              Notify Me
            </button>
          </form>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-[var(--border)] mt-16 py-8 px-6 text-center text-xs text-[var(--text-secondary)]">
        <div className="mb-2">
          <a
            href="/"
            className="text-[var(--text-primary)] hover:text-[var(--accent)] mx-2"
          >
            Generator
          </a>
          <a
            href="/wifi"
            className="hover:text-[var(--accent)] mx-2"
          >
            WiFi QR Code
          </a>
          <a
            href="/vcard"
            className="hover:text-[var(--accent)] mx-2"
          >
            vCard QR Code
          </a>
          <a
            href="/about"
            className="hover:text-[var(--accent)] mx-2"
          >
            About
          </a>
        </div>
        <p>
          QRCraft &mdash; Free QR code generator. 100% client-side. No data
          leaves your browser.
        </p>
      </footer>

      {/* Toast */}
      {toast && (
        <div
          className={`toast ${
            toast.type === "success" ? "toast-success" : "toast-error"
          }`}
        >
          {toast.message}
        </div>
      )}
    </div>
  );
}
