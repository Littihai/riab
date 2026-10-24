import { describe, expect, it, vi } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderApp } from "@/test/render";
import { CmdK } from "./CmdK";

const make = () => {
  const run = { home: vi.fn(), form: vi.fn(), table: vi.fn() };
  const commands = [
    { id: "home", label: "Home", run: run.home },
    { id: "form", label: "Form", run: run.form },
    { id: "table", label: "Table", run: run.table },
  ];
  return { run, commands };
};

describe("CmdK", () => {
  it("is a combobox over a listbox and focuses the input", () => {
    const { commands } = make();
    renderApp(<CmdK open onClose={() => {}} commands={commands} />);
    expect(screen.getByRole("combobox")).toHaveFocus();
    expect(screen.getAllByRole("option")).toHaveLength(3);
  });

  it("filters as you type and runs the highlighted command with Enter", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    const { commands, run } = make();
    renderApp(<CmdK open onClose={onClose} commands={commands} />);
    await user.keyboard("ta");
    expect(screen.getAllByRole("option")).toHaveLength(1);
    await user.keyboard("{Enter}");
    expect(run.table).toHaveBeenCalledTimes(1);
    expect(onClose).toHaveBeenCalled();
  });

  it("moves the active option with the arrow keys and wraps", async () => {
    const user = userEvent.setup();
    const { commands, run } = make();
    renderApp(<CmdK open onClose={() => {}} commands={commands} />);
    await user.keyboard("{ArrowUp}{Enter}");
    expect(run.table).toHaveBeenCalledTimes(1);
  });

  it("closes on Escape", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    const { commands } = make();
    renderApp(<CmdK open onClose={onClose} commands={commands} />);
    await user.keyboard("{Escape}");
    expect(onClose).toHaveBeenCalled();
  });
});
