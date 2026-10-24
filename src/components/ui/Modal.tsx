import { useEffect, useRef, type ReactNode } from "react";

/**
 * The one dialog style. Modal: Esc or the scrim closes, focus moves in,
 * Tab wraps inside, and the opener gets focus back on close.
 */
export function Modal({ open, onClose, title, children, footer }: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  footer?: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  // the latest onClose without re-running the effect: a parent re-render while the
  // dialog is open must not re-capture the opener or yank focus (QA M2)
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    if (!open) return;
    const opener = document.activeElement as HTMLElement | null;
    const focusables = () => ref.current?.querySelectorAll<HTMLElement>("button, [href], input, select, textarea");
    // initial focus goes to the first control, so Shift+Tab has a defined edge (QA M1)
    const items = focusables();
    (items && items.length > 0 ? items[0] : ref.current)?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCloseRef.current();
      if (e.key !== "Tab") return;
      const list = focusables();
      if (!list || list.length === 0) return;
      const first = list[0];
      const last = list[list.length - 1];
      const at = document.activeElement;
      if (e.shiftKey && (at === first || at === ref.current)) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && at === last) { e.preventDefault(); first.focus(); }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      opener?.focus();
    };
  }, [open]);

  if (!open) return null;
  return (
    <div className="scrim" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div ref={ref} tabIndex={-1} role="dialog" aria-modal="true" aria-label={title} className="modal">
        <h3 className="modal-title">{title}</h3>
        {children}
        {footer && <div className="modal-foot">{footer}</div>}
      </div>
    </div>
  );
}
