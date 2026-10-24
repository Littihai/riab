import { useState } from "react";
import { describe, expect, it, vi } from "vitest";
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Breadcrumb } from "./Breadcrumb";
import { Drawer } from "./Drawer";
import { Menu } from "./Menu";
import { Popover } from "./Popover";
import { ToastHost, toast } from "./Toast";
import { Tooltip } from "./Tooltip";

describe("Menu", () => {
  const setup = () => {
    const onEdit = vi.fn();
    const onDelete = vi.fn();
    render(
      <Menu
        label="Actions"
        items={[
          { id: "edit", label: "Edit", onSelect: onEdit },
          { id: "arc", label: "Archive", onSelect: () => {}, disabled: true },
          { id: "del", label: "Delete", onSelect: onDelete, danger: true },
        ]}
      />,
    );
    return { onEdit, onDelete };
  };

  it("is a menu button: collapsed by default, expanded when open", async () => {
    const user = userEvent.setup();
    setup();
    const trigger = screen.getByRole("button", { name: "Actions" });
    expect(trigger).toHaveAttribute("aria-haspopup", "menu");
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    await user.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("menu")).toBeInTheDocument();
  });

  it("opens with ArrowDown on the first item, walks past disabled items and wraps", async () => {
    const user = userEvent.setup();
    setup();
    screen.getByRole("button", { name: "Actions" }).focus();
    await user.keyboard("{ArrowDown}");
    await waitFor(() => expect(screen.getByRole("menuitem", { name: "Edit" })).toHaveFocus());
    await user.keyboard("{ArrowDown}");
    expect(screen.getByRole("menuitem", { name: "Delete" })).toHaveFocus();
    await user.keyboard("{ArrowDown}");
    expect(screen.getByRole("menuitem", { name: "Edit" })).toHaveFocus();
    await user.keyboard("{End}");
    expect(screen.getByRole("menuitem", { name: "Delete" })).toHaveFocus();
    await user.keyboard("{Home}");
    expect(screen.getByRole("menuitem", { name: "Edit" })).toHaveFocus();
  });

  it("opens on the last item with ArrowUp", async () => {
    const user = userEvent.setup();
    setup();
    screen.getByRole("button", { name: "Actions" }).focus();
    await user.keyboard("{ArrowUp}");
    await waitFor(() => expect(screen.getByRole("menuitem", { name: "Delete" })).toHaveFocus());
  });

  it("Enter chooses the item, closes the menu and returns focus to the trigger", async () => {
    const user = userEvent.setup();
    const { onDelete } = setup();
    screen.getByRole("button", { name: "Actions" }).focus();
    await user.keyboard("{ArrowUp}");
    await waitFor(() => expect(screen.getByRole("menuitem", { name: "Delete" })).toHaveFocus());
    await user.keyboard("{Enter}");
    expect(onDelete).toHaveBeenCalledTimes(1);
    expect(screen.queryByRole("menu")).toBeNull();
    expect(screen.getByRole("button", { name: "Actions" })).toHaveFocus();
  });

  it("Escape closes and returns focus; a press outside closes", async () => {
    const user = userEvent.setup();
    setup();
    const trigger = screen.getByRole("button", { name: "Actions" });
    await user.click(trigger);
    await user.keyboard("{Escape}");
    expect(screen.queryByRole("menu")).toBeNull();
    expect(trigger).toHaveFocus();
    await user.click(trigger);
    await user.click(document.body);
    expect(screen.queryByRole("menu")).toBeNull();
  });

  it("does not run a disabled item", async () => {
    const user = userEvent.setup();
    setup();
    await user.click(screen.getByRole("button", { name: "Actions" }));
    expect(screen.getByRole("menuitem", { name: "Archive" })).toBeDisabled();
  });
});

describe("Popover", () => {
  it("opens as a named non-modal dialog, Escape closes and returns focus", async () => {
    const user = userEvent.setup();
    render(
      <Popover trigger="Filters" label="Document filters">
        <button>inside</button>
      </Popover>,
    );
    const trigger = screen.getByRole("button", { name: "Filters" });
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    await user.click(trigger);
    const dialog = screen.getByRole("dialog", { name: "Document filters" });
    expect(dialog).not.toHaveAttribute("aria-modal");
    await waitFor(() => expect(dialog).toHaveFocus());
    await user.keyboard("{Escape}");
    expect(screen.queryByRole("dialog")).toBeNull();
    expect(trigger).toHaveFocus();
  });

  it("closes when focus tabs out of it", async () => {
    const user = userEvent.setup();
    render(
      <>
        <Popover trigger="Filters" label="Filters panel">
          <button>inside</button>
        </Popover>
        <button>after</button>
      </>,
    );
    await user.click(screen.getByRole("button", { name: "Filters" }));
    await waitFor(() => expect(screen.getByRole("dialog")).toHaveFocus());
    await user.tab();
    expect(screen.getByText("inside")).toHaveFocus();
    await user.tab();
    expect(screen.queryByRole("dialog")).toBeNull();
  });
});

describe("Tooltip", () => {
  it("describes its control, shows on focus and hides on Escape", async () => {
    const user = userEvent.setup();
    render(
      <Tooltip label="Includes VAT">
        <button>Price</button>
      </Tooltip>,
    );
    const button = screen.getByRole("button", { name: "Price" });
    const tip = screen.getByRole("tooltip", { hidden: true });
    expect(button).toHaveAccessibleDescription("Includes VAT");
    expect(tip).toHaveAttribute("data-open", "false");
    await user.tab();
    expect(button).toHaveFocus();
    await waitFor(() => expect(tip).toHaveAttribute("data-open", "true"));
    await user.keyboard("{Escape}");
    expect(tip).toHaveAttribute("data-open", "false");
  });
});

describe("Drawer", () => {
  function Harness() {
    const [open, setOpen] = useState(false);
    return (
      <>
        <button onClick={() => setOpen(true)}>opener</button>
        <Drawer open={open} onClose={() => setOpen(false)} title="Details" closeLabel="Close drawer">
          <button>field</button>
        </Drawer>
      </>
    );
  }

  it("is a modal dialog with a named close button, traps focus and returns it", async () => {
    const user = userEvent.setup();
    render(<Harness />);
    await user.click(screen.getByText("opener"));
    expect(screen.getByRole("dialog", { name: "Details" })).toHaveAttribute("aria-modal", "true");
    expect(screen.getByRole("button", { name: "Close drawer" })).toHaveFocus();
    await user.tab();
    expect(screen.getByText("field")).toHaveFocus();
    await user.tab();
    expect(screen.getByRole("button", { name: "Close drawer" })).toHaveFocus();
    await user.keyboard("{Escape}");
    expect(screen.queryByRole("dialog")).toBeNull();
    expect(screen.getByText("opener")).toHaveFocus();
  });
});

describe("Breadcrumb", () => {
  it("is a labelled nav; only the last item is the current page and not a link", () => {
    render(
      <Breadcrumb
        ariaLabel="You are here"
        items={[{ label: "Home", href: "#/" }, { label: "Components", href: "#/components" }, { label: "Details" }]}
      />,
    );
    expect(screen.getByRole("navigation", { name: "You are here" })).toBeInTheDocument();
    expect(screen.getAllByRole("link").map((a) => a.textContent)).toEqual(["Home", "Components"]);
    expect(screen.getByText("Details")).toHaveAttribute("aria-current", "page");
  });
});

describe("Toast", () => {
  it("shows a message with a close button, and dismisses it", async () => {
    const user = userEvent.setup();
    render(<ToastHost closeLabel="Dismiss" />);
    act(() => toast("Saved", "ok"));
    expect(screen.getByText("Saved")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Dismiss" }));
    expect(screen.queryByText("Saved")).toBeNull();
  });

  it("announces failures assertively and pauses its timer while hovered", () => {
    vi.useFakeTimers();
    try {
      render(<ToastHost closeLabel="Dismiss" />);
      act(() => toast("Could not save", "stop"));
      const item = screen.getByRole("alert");
      expect(item).toHaveTextContent("Could not save");

      fireEvent.mouseEnter(item);
      act(() => {
        vi.advanceTimersByTime(20000);
      });
      expect(screen.getByText("Could not save")).toBeInTheDocument();

      fireEvent.mouseLeave(item);
      act(() => {
        vi.advanceTimersByTime(20000);
      });
      expect(screen.queryByText("Could not save")).toBeNull();
    } finally {
      vi.useRealTimers();
    }
  });
});
