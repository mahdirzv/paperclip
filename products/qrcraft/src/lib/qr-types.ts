export type QRType = "url" | "text" | "wifi" | "vcard" | "email" | "phone" | "sms";

export interface QRTypeConfig {
  id: QRType;
  label: string;
  description: string;
  placeholder: string;
}

export const QR_TYPES: QRTypeConfig[] = [
  {
    id: "url",
    label: "URL",
    description: "Link to a website",
    placeholder: "https://example.com",
  },
  {
    id: "text",
    label: "Text",
    description: "Plain text message",
    placeholder: "Enter your text here...",
  },
  {
    id: "wifi",
    label: "WiFi",
    description: "WiFi network credentials",
    placeholder: "",
  },
  {
    id: "vcard",
    label: "Contact",
    description: "Contact card (vCard)",
    placeholder: "",
  },
  {
    id: "email",
    label: "Email",
    description: "Email address with optional subject",
    placeholder: "hello@example.com",
  },
  {
    id: "phone",
    label: "Phone",
    description: "Phone number",
    placeholder: "+1234567890",
  },
  {
    id: "sms",
    label: "SMS",
    description: "SMS message",
    placeholder: "+1234567890",
  },
];

export type WifiEncryption = "WPA" | "WEP" | "nopass";

export interface WifiData {
  ssid: string;
  password: string;
  encryption: WifiEncryption;
  hidden: boolean;
}

export interface VCardData {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  organization: string;
  title: string;
  url: string;
}

export interface EmailData {
  address: string;
  subject: string;
  body: string;
}

export interface SmsData {
  phone: string;
  message: string;
}
