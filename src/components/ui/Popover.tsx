import { useId, useRef, useState, type ReactNode } from "react";
import { useDismiss } from "@/hooks/useDismiss";
import { usePlacement } from "@/hooks/usePlacement";

/**
 * A non-modal panel anchored to its trigger, for small bits of content or a
 * mini form. Focus moves into the panel on open; Esc closes and returns focus
 * to the trigger; a press outside, or Tab leaving the panel, closes it. The
 * page behind stays usable. For a blocking choice use Modal; for a list of
 * commands use Menu.
 */
export function Popover({
  trigger,
  label,
  children,
  align = "start",
}: {
  trigger: ReactNode;
  /** accessible name of the panel */
  label: string;
  children: ReactNode;
  align?: "start" | "end";
}) {
  const id = useId();
  const [open, setOpen] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);
  const button = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const place = usePlacement(panel, open, align);

  const close = (refocus: boolean) => {
    setOpen(false);
    if (refocus) button.current?.focus();
  };

  useDismiss([wrap], open, (reason) => close(reason === "escape"));

  return (
    <div
      className="popover"
      ref={wrap}
      onBlur={(e) => {
        if (open && !wrap.current?.contains(e.relatedTarget as Node | null) && e.relatedTarget) setOpen(false);
      }}
    >
      <button
        ref={button}
        type="button"
        className="btn ghost"
        aria-expanded={open}
        aria-controls={open ? id : undefined}
        onClick={() => {
          if (open) return close(false);
          setOpen(true);
          requestAnimationFrame(() => panel.current?.focus());
        }}
      >
        {trigger}
      </button>
      {open && (
        <div
          ref={panel}
          id={id}
          role="dialog"
          aria-label={label}
          tabIndex={-1}
          className="popup popover-panel"
          data-v={place.v}
          data-h={place.h}
        >
          {children}
        </div>
      )}
    </div>
  );
}
