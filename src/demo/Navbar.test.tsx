import { describe, expect, it } from "vitest";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderApp } from "@/test/render";
import { Shell } from "./Shell";

const setup = (route: "home" | "table" = "home") =>
  renderApp(
    <Shell route={route}>
      <main>
        <h1>content</h1>
      </main>
    </Shell>,
  );

describe("top navigation", () => {
  it("marks the current page and groups Form and Table under an Apps menu", async () => {
    const user = userEvent.setup();
    setup("table");
    expect(screen.getByRole("link", { name: "หน้าแรก" })).not.toHaveAttribute("aria-current");
    const apps = screen.getByRole("button", { name: "แอป" });
    expect(apps).toHaveAttribute("aria-current", "page");
    await user.click(apps);
    expect(screen.getAllByRole("menuitem").map((m) => m.textContent)).toEqual(["ฟอร์ม", "ตาราง"]);
    await user.click(screen.getByRole("menuitem", { name: "ฟอร์ม" }));
    expect(window.location.hash).toBe("#/form");
  });

  it("opens notifications in a labelled popover with a count", async () => {
    const user = userEvent.setup();
    setup();
    const bell = screen.getByRole("button", { name: "การแจ้งเตือน 3 รายการ" });
    await user.click(bell);
    const panel = screen.getByRole("dialog", { name: "การแจ้งเตือน" });
    expect(panel).toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(3);
    await user.keyboard("{Escape}");
    expect(screen.queryByRole("dialog", { name: "การแจ้งเตือน" })).toBeNull();
    expect(bell).toHaveFocus();
  });

  it("has a user menu with settings and sign out", async () => {
    const user = userEvent.setup();
    setup();
    await user.click(screen.getByRole("button", { name: "เมนูผู้ใช้" }));
    await user.click(screen.getByRole("menuitem", { name: "ออกจากระบบ" }));
    expect(window.location.hash).toBe("#/login");
  });

  it("opens settings from the user menu", async () => {
    const user = userEvent.setup();
    setup();
    await user.click(screen.getByRole("button", { name: "เมนูผู้ใช้" }));
    await user.click(screen.getByRole("menuitem", { name: "การตั้งค่า" }));
    await waitFor(() => expect(screen.getByRole("dialog", { name: "การตั้งค่า" })).toBeInTheDocument());
  });
});
