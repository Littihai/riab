import { useEffect, useRef, type RefObject } from "react";

/**
 * Light dismissal for non-modal layers (menu, popover): a press outside every
 * given element, or Escape, calls onDismiss. onDismiss lives in a ref so a
 * parent re-render never re-binds the listeners.
 */
export function useDismiss(
  refs: RefObject<HTMLElement | null>[],
  active: boolean,
  onDismiss: (reason: "outside" | "escape") => void,
) {
  const cb = useRef(onDismiss);
  cb.current = onDismiss;

  useEffect(() => {
    if (!active) return;
    const onDown = (e: PointerEvent) => {
      const target = e.target as Node;
      if (refs.every((r) => !r.current?.contains(target))) cb.current("outside");
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") cb.current("escape");
    };
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);
}
