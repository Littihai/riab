import { describe, expect, it } from "vitest";
import { act, render } from "@testing-library/react";
import axe from "axe-core";
import { App } from "@/App";

/**
 * Automated accessibility pass over every demo page with axe-core. It catches
 * structure problems (names, roles, labels, landmarks); it cannot judge color
 * contrast in jsdom (tokens.test.ts measures that) and it is no substitute for
 * trying the pages with a real screen reader.
 */

const ROUTES = ["#/", "#/components", "#/form", "#/table", "#/login", "#/404"];

describe.each(["th", "en"] as const)("axe (%s)", (lang) => {
  it.each(ROUTES)("%s has no violations", async (hash) => {
    localStorage.setItem("riab.lang", lang);
    window.location.hash = hash;
    const { container } = render(<App />);
    await act(async () => {});
    const results = await axe.run(container, { rules: { "color-contrast": { enabled: false } } });
    const summary = results.violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(" ")).join(" | ")}`);
    expect(summary).toEqual([]);
  });
});
