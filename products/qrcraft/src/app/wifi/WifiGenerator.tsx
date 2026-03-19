"use client";

import { useState, useEffect, useCallback } from "react";
import QRCode from "qrcode";
import { type WifiData } from "@/lib/qr-types";
import { encodeWifi } from "@/lib/encoders";

export default function WifiGenerator() {
  const [wifiData, setWifiData] = useState<WifiData>({
    ssid: "",
    password: "",
    encryption: "WPA",
    hidden: false,
  });
  const [qrDataUrl, setQrDataUrl] = useState("");
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    if (!wifiData.ssid) {
      setQrDataUrl("");
      return;
    }
    const content = encodeWifi(wifiData);
    QRCode.toDataURL(content, {
      width: 400,
      margin: 2,
      errorCorrectionLevel: "M",
    })
      .then(setQrDataUrl)
      .catch(() => setQrDataUrl(""));
  }, [wifiData]);

  const handleDownload = useCallback(() => {
    if (!qrDataUrl) return;
    const link = document.createElement("a");
    link.download = `wifi-qr-${wifiData.ssid || "network"}.png`;
    link.href = qrDataUrl;
    link.click();
    setToast("Downloaded!");
    setTimeout(() => setToast(null), 2000);
  }, [qrDataUrl, wifiData.ssid]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-[1fr_300px] gap-6">
      <div className="bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg p-5 space-y-4">
        <input
          value={wifiData.ssid}
          onChange={(e) => setWifiData({ ...wifiData, ssid: e.target.value })}
          placeholder="Network name (SSID)"
          className="input-field"
          aria-label="WiFi network name"
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
            <option value="nopass">None (Open)</option>
          </select>
          <label className="flex items-center gap-2 text-sm text-[var(--text-secondary)] whitespace-nowrap">
            <input
              type="checkbox"
              checked={wifiData.hidden}
              onChange={(e) =>
                setWifiData({ ...wifiData, hidden: e.target.checked })
              }
            />
            Hidden network
          </label>
        </div>
      </div>

      <div className="bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg p-6 flex flex-col items-center">
        <div className="qr-preview mb-4">
          {qrDataUrl ? (
            <img
              src={qrDataUrl}
              alt="WiFi QR Code"
              width={250}
              height={250}
              style={{ imageRendering: "pixelated" }}
            />
          ) : (
            <div className="w-[200px] h-[200px] flex items-center justify-center text-sm text-[var(--text-tertiary)]">
              Enter your WiFi details
            </div>
          )}
        </div>
        <button
          onClick={handleDownload}
          disabled={!qrDataUrl}
          className="btn btn-primary w-full text-center disabled:opacity-30 disabled:cursor-not-allowed"
        >
          Download WiFi QR Code
        </button>
      </div>

      {toast && <div className="toast toast-success">{toast}</div>}
    </div>
  );
}
