import { useLayoutEffect, useState, type RefObject } from "react";

export interface Placement {
  v: "bottom" | "top";
  h: "start" | "end";
}

const DEFAULT: Placement = { v: "bottom", h: "start" };

/**
 * Keeps an anchored panel on screen: it opens below and start-aligned, flips
 * above when it would run off the bottom (and there is room above), and
 * end-aligns when it would run off the side. Apply the result as data
 * attributes; the CSS does the positioning.
 */
export function usePlacement(panel: RefObject<HTMLElement | null>, open: boolean, preferred: Placement["h"] = "start") {
  const [placement, setPlacement] = useState<Placement>({ ...DEFAULT, h: preferred });

  useLayoutEffect(() => {
    if (!open) {
      setPlacement({ ...DEFAULT, h: preferred });
      return;
    }
    const el = panel.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const anchor = el.parentElement?.getBoundingClientRect();
    const next: Placement = { ...DEFAULT, h: preferred };
    if (r.bottom > window.innerHeight && anchor && anchor.top > r.height) next.v = "top";
    if (preferred === "start" && r.right > window.innerWidth) next.h = "end";
    if (preferred === "end" && r.left < 0) next.h = "start";
    setPlacement(next);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  return placement;
}
