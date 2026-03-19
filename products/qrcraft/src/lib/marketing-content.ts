export interface FeatureCard {
  title: string;
  description: string;
  icon: string;
}

export const featureCards: FeatureCard[] = [
  {
    title: "7 QR Code Types",
    description:
      "Generate QR codes for URLs, text, WiFi, contacts, email, phone, and SMS.",
    icon: "grid",
  },
  {
    title: "Custom Colors",
    description:
      "Customize foreground and background colors to match your brand.",
    icon: "palette",
  },
  {
    title: "Instant Preview",
    description:
      "See your QR code update in real-time as you type. No generate button needed.",
    icon: "zap",
  },
  {
    title: "High-Res Download",
    description:
      "Download your QR code as a high-resolution PNG up to 1024px.",
    icon: "download",
  },
  {
    title: "100% Private",
    description:
      "Everything runs in your browser. No data is sent to any server.",
    icon: "lock",
  },
  {
    title: "No Signup Required",
    description:
      "Use all features instantly. No account, no limits, no ads.",
    icon: "user",
  },
];

export const proFeatures = [
  "SVG vector download",
  "Logo overlay on QR code",
  "Custom dot and eye shapes",
  "Gradient colors",
  "Batch generation (50+ codes)",
  "Dynamic QR codes with analytics",
];
