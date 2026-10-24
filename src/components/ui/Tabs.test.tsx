import { useState } from "react";
import { describe, expect, it } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Tabs } from "./Tabs";

const TABS = [
  { id: "a", label: "Alpha" },
  { id: "b", label: "Beta" },
  { id: "c", label: "Gamma" },
];

function Harness() {
  const [v, setV] = useState("a");
  return <Tabs tabs={TABS} value={v} onChange={setV} ariaLabel="letters" idBase="t" />;
}

describe("Tabs", () => {
  it("exposes a tablist with one tab in the tab order", () => {
    render(<Harness />);
    expect(screen.getByRole("tablist", { name: "letters" })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: "Alpha" })).toHaveAttribute("aria-selected", "true");
    expect(screen.getByRole("tab", { name: "Beta" })).toHaveAttribute("tabindex", "-1");
  });

  it("walks with arrow keys, wraps, and jumps with Home/End", async () => {
    const user = userEvent.setup();
    render(<Harness />);
    await user.tab();
    expect(screen.getByRole("tab", { name: "Alpha" })).toHaveFocus();

    await user.keyboard("{ArrowRight}");
    await waitFor(() => expect(screen.getByRole("tab", { name: "Beta" })).toHaveFocus());
    expect(screen.getByRole("tab", { name: "Beta" })).toHaveAttribute("aria-selected", "true");

    await user.keyboard("{End}");
    await waitFor(() => expect(screen.getByRole("tab", { name: "Gamma" })).toHaveFocus());

    await user.keyboard("{ArrowRight}");
    await waitFor(() => expect(screen.getByRole("tab", { name: "Alpha" })).toHaveFocus());

    await user.keyboard("{ArrowLeft}");
    await waitFor(() => expect(screen.getByRole("tab", { name: "Gamma" })).toHaveFocus());

    await user.keyboard("{Home}");
    await waitFor(() => expect(screen.getByRole("tab", { name: "Alpha" })).toHaveFocus());
  });
});
