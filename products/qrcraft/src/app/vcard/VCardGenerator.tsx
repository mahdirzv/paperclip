"use client";

import { useState, useEffect, useCallback } from "react";
import QRCode from "qrcode";
import { type VCardData } from "@/lib/qr-types";
import { encodeVCard } from "@/lib/encoders";

export default function VCardGenerator() {
  const [vcardData, setVcardData] = useState<VCardData>({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    organization: "",
    title: "",
    url: "",
  });
  const [qrDataUrl, setQrDataUrl] = useState("");
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    if (!vcardData.firstName && !vcardData.lastName) {
      setQrDataUrl("");
      return;
    }
    const content = encodeVCard(vcardData);
    QRCode.toDataURL(content, {
      width: 400,
      margin: 2,
      errorCorrectionLevel: "M",
    })
      .then(setQrDataUrl)
      .catch(() => setQrDataUrl(""));
  }, [vcardData]);

  const handleDownload = useCallback(() => {
    if (!qrDataUrl) return;
    const link = document.createElement("a");
    const name = [vcardData.firstName, vcardData.lastName]
      .filter(Boolean)
      .join("-")
      .toLowerCase();
    link.download = `vcard-qr-${name || "contact"}.png`;
    link.href = qrDataUrl;
    link.click();
    setToast("Downloaded!");
    setTimeout(() => setToast(null), 2000);
  }, [qrDataUrl, vcardData.firstName, vcardData.lastName]);

  const update = (field: keyof VCardData, value: string) =>
    setVcardData({ ...vcardData, [field]: value });

  return (
    <div className="grid grid-cols-1 md:grid-cols-[1fr_300px] gap-6">
      <div className="bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg p-5">
        <div className="grid grid-cols-2 gap-3">
          <input
            value={vcardData.firstName}
            onChange={(e) => update("firstName", e.target.value)}
            placeholder="First name"
            className="input-field"
            aria-label="First name"
          />
          <input
            value={vcardData.lastName}
            onChange={(e) => update("lastName", e.target.value)}
            placeholder="Last name"
            className="input-field"
            aria-label="Last name"
          />
          <input
            value={vcardData.phone}
            onChange={(e) => update("phone", e.target.value)}
            placeholder="Phone"
            className="input-field"
            aria-label="Phone"
          />
          <input
            type="email"
            value={vcardData.email}
            onChange={(e) => update("email", e.target.value)}
            placeholder="Email"
            className="input-field"
            aria-label="Email"
          />
          <input
            value={vcardData.organization}
            onChange={(e) => update("organization", e.target.value)}
            placeholder="Organization"
            className="input-field"
            aria-label="Organization"
          />
          <input
            value={vcardData.title}
            onChange={(e) => update("title", e.target.value)}
            placeholder="Job title"
            className="input-field"
            aria-label="Job title"
          />
          <input
            type="url"
            value={vcardData.url}
            onChange={(e) => update("url", e.target.value)}
            placeholder="Website URL"
            className="input-field col-span-2"
            aria-label="Website URL"
          />
        </div>
      </div>

      <div className="bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg p-6 flex flex-col items-center">
        <div className="qr-preview mb-4">
          {qrDataUrl ? (
            <img
              src={qrDataUrl}
              alt="vCard QR Code"
              width={250}
              height={250}
              style={{ imageRendering: "pixelated" }}
            />
          ) : (
            <div className="w-[200px] h-[200px] flex items-center justify-center text-sm text-[var(--text-tertiary)]">
              Enter a name to start
            </div>
          )}
        </div>
        <button
          onClick={handleDownload}
          disabled={!qrDataUrl}
          className="btn btn-primary w-full text-center disabled:opacity-30 disabled:cursor-not-allowed"
        >
          Download Contact QR Code
        </button>
      </div>

      {toast && <div className="toast toast-success">{toast}</div>}
    </div>
  );
}
