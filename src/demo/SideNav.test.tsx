import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderApp } from "@/test/render";
import { useAppearance } from "@/providers/AppearanceProvider";
import { SideNav } from "./SideNav";

function Probe() {
  const { nav } = useAppearance();
  return <SideNav rail={nav === "rail"} route="table" />;
}

describe("SideNav", () => {
  it("marks the current page and keeps every link named in both modes", async () => {
    const user = userEvent.setup();
    renderApp(<Probe />);
    expect(screen.getByRole("link", { name: "ตาราง" })).toHaveAttribute("aria-current", "page");
    await user.click(screen.getByRole("button", { name: "ย่อเมนู" }));
    expect(document.querySelector(".side")).toHaveClass("rail");
    expect(screen.getByRole("link", { name: "ตาราง" })).toHaveAttribute("aria-current", "page");
    expect(screen.getByRole("link", { name: "หน้าแรก" })).toBeInTheDocument();
  });

  it("remembers the choice and the toggle label follows the mode", async () => {
    const user = userEvent.setup();
    renderApp(<Probe />);
    await user.click(screen.getByRole("button", { name: "ย่อเมนู" }));
    expect(JSON.parse(localStorage.getItem("riab.app")!).nav).toBe("rail");
    expect(screen.getByRole("button", { name: "ขยายเมนู" })).toBeInTheDocument();
  });
});
