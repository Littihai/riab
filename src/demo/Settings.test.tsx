import { describe, expect, it, vi } from "vitest";
import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axe from "axe-core";
import { renderApp } from "@/test/render";
import { OptionCards } from "@/components/ui/OptionCards";
import { SettingsDialog } from "./SettingsDialog";

const saved = () => JSON.parse(localStorage.getItem("riab.app") ?? "{}");

describe("SettingsDialog", () => {
  it("is a named modal dialog with grouped sections and closes on Escape", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    renderApp(<SettingsDialog open onClose={onClose} />);
    const dialog = screen.getByRole("dialog", { name: "การตั้งค่า" });
    expect(dialog).toHaveAttribute("aria-modal", "true");
    expect(within(dialog).getByRole("button", { name: "ทั่วไป" })).toHaveAttribute("aria-current", "true");
    expect(within(dialog).getByRole("button", { name: "บัญชี" })).toBeInTheDocument();
    await user.keyboard("{Escape}");
    expect(onClose).toHaveBeenCalled();
  });

  it("applies and remembers each choice as it is picked", async () => {
    const user = userEvent.setup();
    renderApp(<SettingsDialog open onClose={() => {}} />);

    await user.click(screen.getByRole("radio", { name: "ม่วง" }));
    expect(document.documentElement.dataset.accent).toBe("violet");
    expect(saved().accent).toBe("violet");

    await user.click(screen.getByRole("radio", { name: "IBM Plex" }));
    expect(document.documentElement.dataset.font).toBe("plex");

    await user.click(screen.getByRole("radio", { name: "Slate" }));
    expect(document.documentElement.dataset.base).toBe("slate");

    await user.click(screen.getByRole("radio", { name: "โค้ง" }));
    expect(document.documentElement.dataset.radius).toBe("round");

    await user.click(screen.getByRole("radio", { name: "แถบข้าง" }));
    expect(saved().nav).toBe("side");

    // going back to the defaults removes the attribute again
    await user.click(screen.getByRole("radio", { name: "หมึกดำ" }));
    expect(document.documentElement.dataset.accent).toBeUndefined();
  });

  it("walks the accent swatches with the arrow keys as one tab stop", async () => {
    const user = userEvent.setup();
    renderApp(<SettingsDialog open onClose={() => {}} />);
    const first = screen.getByRole("radio", { name: "หมึกดำ" });
    first.focus();
    await user.keyboard("{ArrowRight}");
    expect(document.documentElement.dataset.accent).toBe("blue");
    expect(screen.getByRole("radio", { name: "น้ำเงิน" })).toHaveAttribute("tabindex", "0");
    expect(screen.getByRole("radio", { name: "ฟ้า" })).toHaveAttribute("tabindex", "-1");
  });

  it("switches sections", async () => {
    const user = userEvent.setup();
    renderApp(<SettingsDialog open onClose={() => {}} />);
    await user.click(screen.getByRole("button", { name: "การแจ้งเตือน" }));
    expect(screen.getByRole("switch", { name: "อีเมลสรุปประจำวัน" })).toBeChecked();
    await user.click(screen.getByRole("button", { name: "บัญชี" }));
    expect(screen.getByText("สมหมาย ใจดี")).toBeInTheDocument();
  });

  it("has no axe violations in any section", async () => {
    const user = userEvent.setup();
    renderApp(<SettingsDialog open onClose={() => {}} />);
    for (const name of ["ทั่วไป", "บัญชี", "การแจ้งเตือน", "เกี่ยวกับ"]) {
      await user.click(screen.getByRole("button", { name }));
      const results = await axe.run(screen.getByRole("dialog"), { rules: { "color-contrast": { enabled: false } } });
      expect(
        results.violations.map((v) => `${name}: ${v.id} ${v.nodes.map((n) => n.target.join(" ")).join(" | ")}`),
      ).toEqual([]);
    }
  });

  it("migrates the v0.2 clay and pine accents on load", () => {
    localStorage.setItem("riab.app", JSON.stringify({ accent: "pine" }));
    renderApp(<SettingsDialog open onClose={() => {}} />);
    expect(screen.getByRole("radio", { name: "เขียว" })).toBeChecked();
  });
});

describe("OptionCards", () => {
  it("is a radiogroup; the chosen card is checked and arrows walk and wrap", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    renderApp(
      <OptionCards
        ariaLabel="Scheme"
        value="a"
        onChange={onChange}
        options={[
          { value: "a", label: "Alpha", preview: <i /> },
          { value: "b", label: "Beta", preview: <i /> },
        ]}
      />,
    );
    expect(screen.getByRole("radiogroup", { name: "Scheme" })).toBeInTheDocument();
    expect(screen.getByRole("radio", { name: "Alpha" })).toBeChecked();
    screen.getByRole("radio", { name: "Alpha" }).focus();
    await user.keyboard("{ArrowLeft}");
    expect(onChange).toHaveBeenCalledWith("b");
  });
});
