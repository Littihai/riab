import { useRef, type ReactNode } from "react";
import { useFocusTrap } from "@/hooks/useFocusTrap";
import { Icon } from "./Icon";

/**
 * A modal side panel for longer tasks than Modal suits (filters, details,
 * a form). Same behaviour as Modal: focus is trapped, Esc or the scrim
 * closes, the opener gets focus back. `closeLabel` names the close button.
 */
export function Drawer({
  open,
  onClose,
  title,
  closeLabel,
  children,
  footer,
  side = "end",
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  closeLabel: string;
  children: ReactNode;
  footer?: ReactNode;
  side?: "start" | "end";
}) {
  const ref = useRef<HTMLDivElement>(null);
  useFocusTrap(ref, open, onClose);

  if (!open) return null;
  return (
    <div
      className="scrim drawer-scrim"
      data-side={side}
      role="presentation"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div ref={ref} tabIndex={-1} role="dialog" aria-modal="true" aria-label={title} className="drawer">
        <div className="drawer-head">
          <h2>{title}</h2>
          <button type="button" className="icon-btn" aria-label={closeLabel} onClick={onClose}>
            <Icon name="close" size={18} />
          </button>
        </div>
        <div className="drawer-body">{children}</div>
        {footer && <div className="drawer-foot">{footer}</div>}
      </div>
    </div>
  );
}
