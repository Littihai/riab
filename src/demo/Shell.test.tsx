import { describe, expect, it } from "vitest";
import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderApp } from "@/test/render";
import { Shell } from "./Shell";

describe("Shell", () => {
  it("offers a skip link as the first tab stop that moves focus to the page", async () => {
    const user = userEvent.setup();
    renderApp(
      <Shell route="home">
        <main>
          <h1>content</h1>
        </main>
      </Shell>,
    );
    await user.tab();
    const skip = screen.getByRole("link", { name: "ข้ามไปยังเนื้อหา" });
    expect(skip).toHaveFocus();
    await user.keyboard("{Enter}");
    expect(screen.getByRole("main")).toHaveFocus();
  });
  it("has footer links to GitHub, docs, changelog and contact that open safely in a new tab", () => {
    renderApp(
      <Shell route="home">
        <main>
          <h1>content</h1>
        </main>
      </Shell>,
    );
    const nav = screen.getByRole("navigation", { name: "ลิงก์ท้ายหน้า" });
    const links = within(nav).getAllByRole("link");
    expect(links.map((a) => a.textContent?.replace(/\s+/g, " ").trim())).toEqual([
      "GitHub (เปิดแท็บใหม่)",
      "เอกสาร (เปิดแท็บใหม่)",
      "บันทึกการเปลี่ยนแปลง (เปิดแท็บใหม่)",
      "ติดต่อและแจ้งปัญหา (เปิดแท็บใหม่)",
    ]);
    for (const a of links) {
      expect(a).toHaveAttribute("target", "_blank");
      expect(a.getAttribute("rel")).toContain("noopener");
      expect(a.getAttribute("href")).toMatch(/^https:\/\/github\.com\/Littihai\/riab/);
    }
  });
});
