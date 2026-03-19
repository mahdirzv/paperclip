import { describe, expect, it } from "vitest";
import sitemap from "./sitemap";
import robots from "./robots";
import { siteUrl } from "@/lib/seo";

describe("metadata routes", () => {
  it("returns sitemap entries for home and about", () => {
    const entries = sitemap();
    const urls = entries.map((entry) => entry.url);

    expect(urls).toContain(siteUrl);
    expect(urls).toContain(`${siteUrl}/about`);
  });

  it("returns robots config with sitemap", () => {
    const config = robots();

    expect(config.sitemap).toBe(`${siteUrl}/sitemap.xml`);
    expect(config.rules).toEqual({ userAgent: "*", allow: "/" });
  });
});

