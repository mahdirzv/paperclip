import { describe, it, expect } from "vitest";
import {
  siteUrl,
  siteName,
  seoKeywords,
  buildStructuredData,
  buildWifiPageStructuredData,
  buildVCardPageStructuredData,
  resolveAnalyticsConfig,
} from "./seo";

describe("SEO config", () => {
  it("has valid site URL", () => {
    expect(siteUrl).toMatch(/^https?:\/\//);
  });

  it("has site name", () => {
    expect(siteName).toBe("QRCraft");
  });

  it("has keywords", () => {
    expect(seoKeywords.length).toBeGreaterThan(0);
    expect(seoKeywords).toContain("qr code generator");
  });
});

describe("buildStructuredData", () => {
  it("returns valid schema.org WebApplication", () => {
    const data = buildStructuredData();
    expect(data["@context"]).toBe("https://schema.org");
    expect(data["@type"]).toBe("WebApplication");
    expect(data.name).toBe("QRCraft");
    expect(data.offers.price).toBe("0");
    expect(data.featureList.length).toBeGreaterThan(0);
  });
});

describe("page structured data", () => {
  it("returns valid WiFi page JSON-LD", () => {
    const data = buildWifiPageStructuredData();
    expect(data["@context"]).toBe("https://schema.org");
    expect(data["@type"]).toBe("WebPage");
    expect(data.name).toContain("WiFi");
    expect(data.url).toBe(`${siteUrl}/wifi`);
    expect(data.mainEntity["@type"]).toBe("SoftwareApplication");
  });

  it("returns valid vCard page JSON-LD", () => {
    const data = buildVCardPageStructuredData();
    expect(data["@context"]).toBe("https://schema.org");
    expect(data["@type"]).toBe("WebPage");
    expect(data.name).toContain("vCard");
    expect(data.url).toBe(`${siteUrl}/vcard`);
    expect(data.mainEntity["@type"]).toBe("SoftwareApplication");
  });
});

describe("resolveAnalyticsConfig", () => {
  it("returns null when no domain configured", () => {
    expect(resolveAnalyticsConfig({})).toBeNull();
  });

  it("returns config when domain is set", () => {
    const result = resolveAnalyticsConfig({
      NEXT_PUBLIC_PLAUSIBLE_DOMAIN: "qrcraft.app",
    });
    expect(result).toEqual({
      domain: "qrcraft.app",
      scriptSrc: "https://plausible.io/js/script.js",
    });
  });

  it("uses custom script src when provided", () => {
    const result = resolveAnalyticsConfig({
      NEXT_PUBLIC_PLAUSIBLE_DOMAIN: "qrcraft.app",
      NEXT_PUBLIC_PLAUSIBLE_SRC: "https://custom.plausible.io/js/script.js",
    });
    expect(result!.scriptSrc).toBe(
      "https://custom.plausible.io/js/script.js",
    );
  });
});
