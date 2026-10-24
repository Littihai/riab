import { useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { useDismiss } from "@/hooks/useDismiss";
import { usePlacement } from "@/hooks/usePlacement";
import { Icon } from "./Icon";

export interface MenuItem {
  id: string;
  label: string;
  onSelect: () => void;
  disabled?: boolean;
  /** destructive action: shown with the stop color and always paired with its text */
  danger?: boolean;
}

/**
 * Action menu (WAI-ARIA menu button): the trigger opens a menu of commands.
 * Arrows, Home/End move, Enter/Space choose, Esc closes and returns focus to
 * the trigger, Tab closes. The panel flips above or end-aligns to stay on
 * screen. Use it for actions; to reveal content or a form use Popover.
 */
export function Menu({
  label,
  items,
  align = "start",
  triggerClassName = "btn ghost",
  triggerLabel,
  chevron = true,
  current,
}: {
  label: ReactNode;
  items: MenuItem[];
  align?: "start" | "end";
  /** replaces the default ghost-button look of the trigger (for nav items, avatars) */
  triggerClassName?: string;
  /** accessible name when the trigger content is not text */
  triggerLabel?: string;
  chevron?: boolean;
  /** marks the trigger as the current section of the page (aria-current) */
  current?: boolean;
}) {
  const id = useId();
  const [open, setOpen] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const place = usePlacement(panel, open, align);

  const enabled = () => Array.from(panel.current?.querySelectorAll<HTMLButtonElement>("button:not(:disabled)") ?? []);
  const focusAt = (i: number) => {
    const list = enabled();
    list[(i + list.length) % list.length]?.focus();
  };
  const close = (refocus: boolean) => {
    setOpen(false);
    if (refocus) trigger.current?.focus();
  };
  const openAt = (edge: "first" | "last") => {
    setOpen(true);
    requestAnimationFrame(() => focusAt(edge === "first" ? 0 : -1));
  };

  useDismiss([wrap], open, (reason) => close(reason === "escape"));

  const onTriggerKey = (e: KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      openAt("first");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      openAt("last");
    }
  };

  const onPanelKey = (e: KeyboardEvent) => {
    const list = enabled();
    const at = list.indexOf(document.activeElement as HTMLButtonElement);
    if (e.key === "ArrowDown") {
      e.preventDefault();
      focusAt(at + 1);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      focusAt(at - 1);
    } else if (e.key === "Home") {
      e.preventDefault();
      focusAt(0);
    } else if (e.key === "End") {
      e.preventDefault();
      focusAt(-1);
    } else if (e.key === "Tab") {
      setOpen(false);
    }
  };

  return (
    <div className="menu" ref={wrap}>
      <button
        ref={trigger}
        type="button"
        className={triggerClassName}
        aria-label={triggerLabel}
        aria-current={current ? "page" : undefined}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={open ? id : undefined}
        onClick={() => (open ? close(false) : openAt("first"))}
        onKeyDown={onTriggerKey}
      >
        {label}
        {chevron && <Icon name="chevronDown" size={16} />}
      </button>
      {open && (
        <div
          ref={panel}
          id={id}
          role="menu"
          tabIndex={-1}
          className="popup menu-panel"
          data-v={place.v}
          data-h={place.h}
          onKeyDown={onPanelKey}
        >
          {items.map((it) => (
            <button
              key={it.id}
              type="button"
              role="menuitem"
              tabIndex={-1}
              disabled={it.disabled}
              className={it.danger ? "menu-item danger" : "menu-item"}
              onClick={() => {
                close(true);
                it.onSelect();
              }}
            >
              {it.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
