import { useState } from "react";
import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Modal } from "./Modal";

function Harness({ onClose = () => {} }: { onClose?: () => void }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button onClick={() => setOpen(true)}>opener</button>
      <Modal
        open={open}
        title="Confirm"
        onClose={() => {
          onClose();
          setOpen(false);
        }}
        footer={
          <>
            <button>cancel</button>
            <button>ok</button>
          </>
        }
      >
        <p>body</p>
      </Modal>
    </>
  );
}

describe("Modal", () => {
  it("is a labelled modal dialog and moves focus inside on open", async () => {
    const user = userEvent.setup();
    render(<Harness />);
    await user.click(screen.getByText("opener"));
    const dialog = screen.getByRole("dialog", { name: "Confirm" });
    expect(dialog).toHaveAttribute("aria-modal", "true");
    expect(screen.getByText("cancel")).toHaveFocus();
  });

  it("wraps Tab and Shift+Tab at both ends", async () => {
    const user = userEvent.setup();
    render(<Harness />);
    await user.click(screen.getByText("opener"));
    await user.tab();
    expect(screen.getByText("ok")).toHaveFocus();
    await user.tab();
    expect(screen.getByText("cancel")).toHaveFocus();
    await user.tab({ shift: true });
    expect(screen.getByText("ok")).toHaveFocus();
  });

  it("closes on Escape and gives focus back to the opener", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(<Harness onClose={onClose} />);
    await user.click(screen.getByText("opener"));
    await user.keyboard("{Escape}");
    expect(onClose).toHaveBeenCalledTimes(1);
    expect(screen.queryByRole("dialog")).toBeNull();
    expect(screen.getByText("opener")).toHaveFocus();
  });

  it("closes when the scrim is pressed but not when the dialog is", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(<Harness onClose={onClose} />);
    await user.click(screen.getByText("opener"));
    await user.click(screen.getByText("body"));
    expect(onClose).not.toHaveBeenCalled();
    await user.click(screen.getByRole("dialog").parentElement!);
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
