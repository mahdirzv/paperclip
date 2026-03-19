import { describe, expect, it } from "vitest";
import { buildStructuredData, resolveAnalyticsConfig, seoKeywords, siteName, siteUrl } from "./seo";

describe("seo config", () => {
  it("includes target keywords", () => {
    expect(seoKeywords).toContain("json formatter");
    expect(seoKeywords).toContain("json validator");
    expect(seoKeywords).toContain("json beautifier");
    expect(seoKeywords).toContain("json to yaml");
  });

  it("builds structured data with required fields", () => {
    const structured = buildStructuredData();
    expect(structured["@type"]).toBe("WebApplication");
    expect(structured.name).toBe(siteName);
    expect(structured.url).toBe(siteUrl);
    expect(structured.featureList).toContain("JSON to YAML conversion");
  });
});

describe("resolveAnalyticsConfig", () => {
  it("returns null when domain is missing", () => {
    expect(resolveAnalyticsConfig({})).toBeNull();
  });

  it("uses default plausible script source", () => {
    expect(resolveAnalyticsConfig({ NEXT_PUBLIC_PLAUSIBLE_DOMAIN: "jsonpretty.app" })).toEqual({
      scriptSrc: "https://plausible.io/js/script.js",
      domain: "jsonpretty.app",
    });
  });

  it("uses custom script source when provided", () => {
    expect(
      resolveAnalyticsConfig({
        NEXT_PUBLIC_PLAUSIBLE_DOMAIN: "jsonpretty.app",
        NEXT_PUBLIC_PLAUSIBLE_SRC: "https://analytics.example/js/script.js",
      }),
    ).toEqual({
      scriptSrc: "https://analytics.example/js/script.js",
      domain: "jsonpretty.app",
    });
  });
});

