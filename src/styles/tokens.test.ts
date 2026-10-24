import { describe, expect, it } from "vitest";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { ACCENTS, BASES, TOKENS, hex, mix, ratio, resolve, type Theme } from "@/test/contrast";

const THEMES: Theme[] = ["light", "dark"];

describe("token contrast (WCAG 2.2 AA)", () => {
  for (const theme of THEMES) {
    for (const gray of BASES)
      describe(`${theme} / ${gray}`, () => {
        const base = resolve(theme, "ink", gray);

        it("body and muted text pass 4.5:1 on every surface", () => {
          for (const fg of ["--text", "--muted"]) {
            for (const bg of ["--bg", "--surface", "--surface-2"]) {
              expect(ratio(hex(base, fg), hex(base, bg)), `${fg} on ${bg}`).toBeGreaterThanOrEqual(4.5);
            }
          }
        });

        it("status colors pass 4.5:1 as text", () => {
          for (const fg of ["--ok", "--warn", "--stop"]) {
            for (const bg of ["--bg", "--surface"]) {
              expect(ratio(hex(base, fg), hex(base, bg)), `${fg} on ${bg}`).toBeGreaterThanOrEqual(4.5);
            }
          }
        });

        it("category hues pass 4.5:1 on the surface (icon chips)", () => {
          for (const h of ["blue", "teal", "amber", "violet"]) {
            expect(ratio(hex(base, `--hue-${h}`), hex(base, "--surface")), h).toBeGreaterThanOrEqual(4.5);
          }
        });

        it("control borders are perceivable (>= 3:1)", () => {
          for (const bg of ["--bg", "--surface"]) {
            expect(ratio(hex(base, "--border-strong"), hex(base, bg)), bg).toBeGreaterThanOrEqual(3);
          }
        });

        for (const accent of ACCENTS) {
          it(`accent "${accent}": all three layers pass`, () => {
            const v = resolve(theme, accent, gray);
            const on = ratio(hex(v, "--on-accent"), hex(v, "--accent-fill"));
            expect(on, "on-accent on accent-fill").toBeGreaterThanOrEqual(4.5);
            for (const bg of ["--bg", "--surface"]) {
              expect(ratio(hex(v, "--accent-text"), hex(v, bg)), `accent-text on ${bg}`).toBeGreaterThanOrEqual(4.5);
            }
            const tint = mix(hex(v, "--accent-fill"), hex(v, "--surface"), 0.09);
            expect(ratio(hex(v, "--accent-text"), tint), "accent-text on the active-row wash").toBeGreaterThanOrEqual(
              4.5,
            );
            expect(
              ratio(hex(v, "--accent-fill"), hex(v, "--surface")),
              "accent-fill as a UI edge",
            ).toBeGreaterThanOrEqual(3);
          });
        }
      });
  }
});

describe("typography tokens", () => {
  const v = resolve("light", "ink");
  const px = (name: string) => parseFloat(v[name]);
  it("keeps Thai-safe minimums", () => {
    expect(px("--fs-micro")).toBeGreaterThanOrEqual(12);
    expect(px("--fs-small")).toBeGreaterThanOrEqual(14);
    expect(px("--fs-body")).toBeGreaterThanOrEqual(14);
  });
});

describe("house rule: tokens only", () => {
  const SRC = join(process.cwd(), "src");
  const files: string[] = [];
  (function walk(dir: string) {
    for (const name of readdirSync(dir)) {
      const full = join(dir, name);
      if (statSync(full).isDirectory()) walk(full);
      else if (
        /\.(css|tsx?)$/.test(name) &&
        full !== TOKENS &&
        !/\.test\.tsx?$/.test(name) &&
        !full.includes(join("src", "test"))
      ) {
        files.push(full);
      }
    }
  })(SRC);

  it("has no hex color outside tokens.css", () => {
    const offenders = files.filter((f) =>
      /#[0-9a-fA-F]{3,8}\b/.test(readFileSync(f, "utf8").replace(/href="#[^"]*"/g, "")),
    );
    expect(offenders.map((f) => relative(SRC, f))).toEqual([]);
  });

  it("has no inline style attributes", () => {
    const offenders = files.filter((f) => /\sstyle=\{/.test(readFileSync(f, "utf8")));
    expect(offenders.map((f) => relative(SRC, f))).toEqual([]);
  });
  it("has no literal font size below 14px (use --fs-micro for the 12px floor)", () => {
    const offenders = files
      .filter((f) => f.endsWith(".css") && f !== TOKENS)
      .filter((f) =>
        [...readFileSync(f, "utf8").matchAll(/font-size:\s*([\d.]+)px/g)].some((m) => parseFloat(m[1]) < 14),
      );
    expect(offenders.map((f) => relative(SRC, f))).toEqual([]);
  });
});
