import { describe, expect, it } from "vitest";
import { featureCards, footerLinks, proFeatureList } from "./marketing-content";

describe("marketing content", () => {
  it("includes requested core feature sections", () => {
    const titles = featureCards.map((feature) => feature.title);

    expect(titles).toContain("Format JSON");
    expect(titles).toContain("Minify JSON");
    expect(titles).toContain("Validate JSON");
    expect(titles).toContain("Convert JSON to YAML");
  });

  it("defines pro waitlist feature bullets", () => {
    expect(proFeatureList).toContain("Large file support (>1MB)");
    expect(proFeatureList).toContain("JSON schema validation");
    expect(proFeatureList).toContain("CSV and XML conversion");
    expect(proFeatureList).toContain("API access");
  });

  it("contains footer links for key pages", () => {
    const hrefs = footerLinks.map((link) => link.href);

    expect(hrefs).toContain("/about");
    expect(hrefs).toContain("#pro-waitlist");
    expect(hrefs).toContain("/about#privacy");
  });
});

