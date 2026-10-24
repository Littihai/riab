import { cloneElement, useEffect, useId, useRef, useState, type ReactElement } from "react";

/**
 * A short text hint for a control. It shows on hover (after a beat) and on
 * keyboard focus, stays while the pointer moves onto it, and Esc dismisses it
 * (WCAG 1.4.13). The wrapped child gets aria-describedby, so the hint is read
 * as its description. Tooltips only repeat or clarify: never put the only copy
 * of important information, or anything interactive, in one.
 */
export function Tooltip({
  label,
  children,
}: {
  label: string;
  children: ReactElement<{ "aria-describedby"?: string }>;
}) {
  const id = useId();
  const [open, setOpen] = useState(false);
  const timer = useRef<number>(0);

  const show = (delay: number) => {
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setOpen(true), delay);
  };
  const hide = () => {
    window.clearTimeout(timer.current);
    setOpen(false);
  };

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") hide();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  return (
    <span className="tip" onMouseEnter={() => show(350)} onMouseLeave={hide} onFocus={() => show(0)} onBlur={hide}>
      {cloneElement(children, { "aria-describedby": id })}
      <span id={id} role="tooltip" className="tip-bubble" data-open={open}>
        {label}
      </span>
    </span>
  );
}
