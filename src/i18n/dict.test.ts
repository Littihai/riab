import { describe, expect, it } from "vitest";
import { DICT } from "./dict";

const entries = Object.entries(DICT) as [string, { th: string; en: string }][];

describe("dictionary", () => {
  it("has both languages for every key", () => {
    for (const [key, e] of entries) {
      expect(e.th.trim(), `${key} (th)`).not.toBe("");
      expect(e.en.trim(), `${key} (en)`).not.toBe("");
    }
  });

  it("uses the same placeholders in both languages", () => {
    const marks = (s: string) => (s.match(/%[a-z]/g) ?? []).sort().join(",");
    for (const [key, e] of entries) expect(marks(e.th), key).toBe(marks(e.en));
  });
});
