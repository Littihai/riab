import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/react";
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
});
