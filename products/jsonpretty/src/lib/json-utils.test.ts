import { describe, it, expect } from "vitest";
import { jsonToYaml, formatJson, minifyJson, validateJson } from "./json-utils";

describe("formatJson", () => {
  it("formats with 2 spaces by default", () => {
    const result = formatJson('{"a":1,"b":2}');
    expect(result).toBe('{\n  "a": 1,\n  "b": 2\n}');
  });

  it("formats with 4 spaces", () => {
    const result = formatJson('{"a":1}', 4);
    expect(result).toBe('{\n    "a": 1\n}');
  });

  it("handles nested objects", () => {
    const result = formatJson('{"a":{"b":1}}');
    expect(result).toContain('"b": 1');
  });

  it("throws on invalid JSON", () => {
    expect(() => formatJson("{invalid}")).toThrow();
  });

  it("formats deeply nested objects", () => {
    const nested = {
      level1: {
        level2: {
          level3: {
            level4: {
              value: "done",
            },
          },
        },
      },
    };

    const result = formatJson(JSON.stringify(nested));
    expect(result).toContain('"level4": {');
    expect(result).toContain('"value": "done"');
  });

  it("formats large JSON payloads", () => {
    const payload = {
      items: Array.from({ length: 1000 }, (_, index) => ({
        id: index,
        name: `item-${index}`,
        active: index % 2 === 0,
      })),
    };

    const result = formatJson(JSON.stringify(payload));
    expect(result).toContain('"items": [');
    expect(result).toContain('"id": 999');
  });
});

describe("minifyJson", () => {
  it("removes whitespace", () => {
    const result = minifyJson('{\n  "a": 1,\n  "b": 2\n}');
    expect(result).toBe('{"a":1,"b":2}');
  });

  it("handles arrays", () => {
    const result = minifyJson('[1, 2, 3]');
    expect(result).toBe("[1,2,3]");
  });

  it("minifies large multi-line JSON payloads", () => {
    const source = JSON.stringify(
      {
        records: Array.from({ length: 250 }, (_, index) => ({
          index,
          tags: ["alpha", "beta", "gamma"],
          nested: { enabled: true, score: index / 10 },
        })),
      },
      null,
      2,
    );

    const result = minifyJson(source);
    expect(result).not.toContain("\n");
    expect(result).toContain('"index":249');
  });
});

describe("validateJson", () => {
  it("returns valid for valid JSON", () => {
    expect(validateJson('{"a":1}')).toEqual({ valid: true });
  });

  it("returns valid for arrays", () => {
    expect(validateJson("[1,2,3]")).toEqual({ valid: true });
  });

  it("returns valid for primitives", () => {
    expect(validateJson('"hello"')).toEqual({ valid: true });
    expect(validateJson("42")).toEqual({ valid: true });
    expect(validateJson("true")).toEqual({ valid: true });
    expect(validateJson("null")).toEqual({ valid: true });
  });

  it("returns error for invalid JSON", () => {
    const result = validateJson("{invalid}");
    expect(result.valid).toBe(false);
    expect(result.error).toBeDefined();
  });

  it("returns error for trailing comma", () => {
    const result = validateJson('{"a":1,}');
    expect(result.valid).toBe(false);
  });

  it("returns error for malformed large JSON", () => {
    const validPrefix = JSON.stringify({
      rows: Array.from({ length: 600 }, (_, index) => ({ id: index, value: `v-${index}` })),
    });
    const malformed = `${validPrefix.slice(0, -1)},`;

    const result = validateJson(malformed);
    expect(result.valid).toBe(false);
    expect(result.error).toBeDefined();
  });
});

describe("jsonToYaml", () => {
  it("converts simple object", () => {
    const result = jsonToYaml({ name: "test", version: "1.0" });
    expect(result).toContain("name: test");
    expect(result).toContain('version: "1.0"');
  });

  it("converts arrays", () => {
    const result = jsonToYaml({ items: [1, 2, 3] });
    expect(result).toContain("items:");
    expect(result).toContain("- 1");
    expect(result).toContain("- 2");
    expect(result).toContain("- 3");
  });

  it("handles null", () => {
    expect(jsonToYaml(null)).toBe("null");
  });

  it("handles booleans", () => {
    expect(jsonToYaml(true)).toBe("true");
    expect(jsonToYaml(false)).toBe("false");
  });

  it("handles numbers", () => {
    expect(jsonToYaml(42)).toBe("42");
    expect(jsonToYaml(3.14)).toBe("3.14");
  });

  it("handles empty array", () => {
    expect(jsonToYaml([])).toBe("[]");
  });

  it("handles empty object", () => {
    expect(jsonToYaml({})).toBe("{}");
  });

  it("quotes strings with special chars", () => {
    const result = jsonToYaml({ key: "value: with colon" });
    expect(result).toContain('"value: with colon"');
  });

  it("handles nested objects", () => {
    const result = jsonToYaml({ outer: { inner: "value" } });
    expect(result).toContain("outer:");
    expect(result).toContain("inner: value");
  });

  it("handles deeply nested mixed structures", () => {
    const input = {
      service: {
        name: "jsonpretty",
        environments: [
          { name: "dev", flags: { beta: true } },
          { name: "prod", flags: { beta: false } },
        ],
      },
    };

    const result = jsonToYaml(input);
    expect(result).toContain("service:");
    expect(result).toContain("environments:");
    expect(result).toContain("- name: dev");
    expect(result).toContain("beta: false");
  });
});
