import { useEffect, useRef, type RefObject } from "react";

/**
 * Modal focus behaviour, shared by every dialog: focus moves to the first
 * control on open (the container as fallback), Tab wraps at both ends, Esc
 * calls onClose, and the opener gets focus back on close. onClose lives in a
 * ref so parent re-renders never re-run the trap.
 */
export function useFocusTrap(ref: RefObject<HTMLElement | null>, active: boolean, onClose: () => void) {
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    if (!active) return;
    const opener = document.activeElement as HTMLElement | null;
    const focusables = () => ref.current?.querySelectorAll<HTMLElement>("button, [href], input, select, textarea");
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
      if (e.shiftKey && (at === first || at === ref.current)) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && at === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      opener?.focus();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);
}
