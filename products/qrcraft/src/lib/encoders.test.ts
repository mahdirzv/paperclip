import { describe, it, expect } from "vitest";
import {
  encodeWifi,
  encodeVCard,
  encodeEmail,
  encodePhone,
  encodeSms,
} from "./encoders";

describe("encodeWifi", () => {
  it("encodes WPA network", () => {
    const result = encodeWifi({
      ssid: "MyNetwork",
      password: "secret123",
      encryption: "WPA",
      hidden: false,
    });
    expect(result).toBe("WIFI:T:WPA;S:MyNetwork;P:secret123;;");
  });

  it("encodes open network without password", () => {
    const result = encodeWifi({
      ssid: "FreeWifi",
      password: "",
      encryption: "nopass",
      hidden: false,
    });
    expect(result).toBe("WIFI:T:nopass;S:FreeWifi;;");
  });

  it("encodes hidden network", () => {
    const result = encodeWifi({
      ssid: "HiddenNet",
      password: "pass",
      encryption: "WPA",
      hidden: true,
    });
    expect(result).toBe("WIFI:T:WPA;S:HiddenNet;P:pass;H:true;;");
  });

  it("escapes special characters in SSID and password", () => {
    const result = encodeWifi({
      ssid: "My;Net:work",
      password: "p;a:ss",
      encryption: "WPA",
      hidden: false,
    });
    expect(result).toBe("WIFI:T:WPA;S:My\\;Net\\:work;P:p\\;a\\:ss;;");
  });

  it("encodes WEP network", () => {
    const result = encodeWifi({
      ssid: "OldNet",
      password: "wepkey",
      encryption: "WEP",
      hidden: false,
    });
    expect(result).toBe("WIFI:T:WEP;S:OldNet;P:wepkey;;");
  });
});

describe("encodeVCard", () => {
  it("encodes basic contact", () => {
    const result = encodeVCard({
      firstName: "John",
      lastName: "Doe",
      phone: "+1234567890",
      email: "john@example.com",
      organization: "",
      title: "",
      url: "",
    });
    expect(result).toContain("BEGIN:VCARD");
    expect(result).toContain("VERSION:3.0");
    expect(result).toContain("N:Doe;John;;;");
    expect(result).toContain("FN:John Doe");
    expect(result).toContain("TEL:+1234567890");
    expect(result).toContain("EMAIL:john@example.com");
    expect(result).toContain("END:VCARD");
  });

  it("encodes full contact", () => {
    const result = encodeVCard({
      firstName: "Jane",
      lastName: "Smith",
      phone: "+1987654321",
      email: "jane@corp.com",
      organization: "Acme Inc",
      title: "CTO",
      url: "https://jane.dev",
    });
    expect(result).toContain("ORG:Acme Inc");
    expect(result).toContain("TITLE:CTO");
    expect(result).toContain("URL:https://jane.dev");
  });

  it("handles first name only", () => {
    const result = encodeVCard({
      firstName: "Alice",
      lastName: "",
      phone: "",
      email: "",
      organization: "",
      title: "",
      url: "",
    });
    expect(result).toContain("N:;Alice;;;");
    expect(result).toContain("FN:Alice");
    expect(result).not.toContain("TEL:");
    expect(result).not.toContain("EMAIL:");
  });

  it("omits empty optional fields", () => {
    const result = encodeVCard({
      firstName: "Bob",
      lastName: "Jones",
      phone: "",
      email: "",
      organization: "",
      title: "",
      url: "",
    });
    const lines = result.split("\n");
    expect(lines).not.toContain(expect.stringContaining("TEL:"));
    expect(lines).not.toContain(expect.stringContaining("EMAIL:"));
    expect(lines).not.toContain(expect.stringContaining("ORG:"));
  });
});

describe("encodeEmail", () => {
  it("encodes email address only", () => {
    const result = encodeEmail({
      address: "hello@example.com",
      subject: "",
      body: "",
    });
    expect(result).toBe("mailto:hello@example.com");
  });

  it("encodes email with subject", () => {
    const result = encodeEmail({
      address: "support@example.com",
      subject: "Help needed",
      body: "",
    });
    expect(result).toBe("mailto:support@example.com?subject=Help%20needed");
  });

  it("encodes email with subject and body", () => {
    const result = encodeEmail({
      address: "info@test.com",
      subject: "Hello",
      body: "Hi there",
    });
    expect(result).toBe(
      "mailto:info@test.com?subject=Hello&body=Hi%20there",
    );
  });
});

describe("encodePhone", () => {
  it("encodes phone number", () => {
    expect(encodePhone("+1234567890")).toBe("tel:+1234567890");
  });

  it("handles plain number", () => {
    expect(encodePhone("5551234")).toBe("tel:5551234");
  });
});

describe("encodeSms", () => {
  it("encodes phone only", () => {
    const result = encodeSms({ phone: "+1234567890", message: "" });
    expect(result).toBe("smsto:+1234567890");
  });

  it("encodes phone with message", () => {
    const result = encodeSms({
      phone: "+1234567890",
      message: "Hello!",
    });
    expect(result).toBe("smsto:+1234567890:Hello!");
  });
});
