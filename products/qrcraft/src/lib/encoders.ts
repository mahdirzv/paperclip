import type { WifiData, VCardData, EmailData, SmsData } from "./qr-types";

/**
 * Encode WiFi credentials into the standard WiFi QR code format.
 * Format: WIFI:T:<encryption>;S:<ssid>;P:<password>;H:<hidden>;;
 */
export function encodeWifi(data: WifiData): string {
  const escaped = (s: string) =>
    s.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/:/g, "\\:").replace(/"/g, '\\"');

  const parts = [
    `WIFI:T:${data.encryption}`,
    `S:${escaped(data.ssid)}`,
  ];

  if (data.encryption !== "nopass" && data.password) {
    parts.push(`P:${escaped(data.password)}`);
  }

  if (data.hidden) {
    parts.push("H:true");
  }

  return parts.join(";") + ";;";
}

/**
 * Encode contact info into vCard 3.0 format.
 */
export function encodeVCard(data: VCardData): string {
  const lines = [
    "BEGIN:VCARD",
    "VERSION:3.0",
  ];

  if (data.lastName || data.firstName) {
    lines.push(`N:${data.lastName};${data.firstName};;;`);
    lines.push(`FN:${[data.firstName, data.lastName].filter(Boolean).join(" ")}`);
  }

  if (data.organization) lines.push(`ORG:${data.organization}`);
  if (data.title) lines.push(`TITLE:${data.title}`);
  if (data.phone) lines.push(`TEL:${data.phone}`);
  if (data.email) lines.push(`EMAIL:${data.email}`);
  if (data.url) lines.push(`URL:${data.url}`);

  lines.push("END:VCARD");
  return lines.join("\n");
}

/**
 * Encode email into a mailto: URI.
 */
export function encodeEmail(data: EmailData): string {
  const params: string[] = [];
  if (data.subject) params.push(`subject=${encodeURIComponent(data.subject)}`);
  if (data.body) params.push(`body=${encodeURIComponent(data.body)}`);
  const query = params.length > 0 ? `?${params.join("&")}` : "";
  return `mailto:${data.address}${query}`;
}

/**
 * Encode phone number into tel: URI.
 */
export function encodePhone(phone: string): string {
  return `tel:${phone}`;
}

/**
 * Encode SMS into smsto: URI.
 */
export function encodeSms(data: SmsData): string {
  if (data.message) {
    return `smsto:${data.phone}:${data.message}`;
  }
  return `smsto:${data.phone}`;
}
