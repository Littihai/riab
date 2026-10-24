import { useId } from "react";

/**
 * Tablist with roving tabindex: Left/Right walk and wrap, Home/End jump to the
 * edges. Pass `panelId` of the visible panel so each tab points at it with
 * aria-controls, and label the panel with `tabId(base, value)`.
 */
export function tabId(base: string, id: string) {
  return `${base}-tab-${id}`;
}

export function Tabs({
  tabs,
  value,
  onChange,
  ariaLabel,
  idBase,
  panelId,
}: {
  tabs: { id: string; label: string }[];
  value: string;
  onChange: (id: string) => void;
  ariaLabel?: string;
  idBase?: string;
  panelId?: string;
}) {
  const auto = useId();
  const base = idBase ?? auto;

  const go = (index: number) => {
    const next = tabs[(index + tabs.length) % tabs.length];
    onChange(next.id);
    requestAnimationFrame(() => document.getElementById(tabId(base, next.id))?.focus());
  };

  return (
    <div className="tabs" role="tablist" aria-label={ariaLabel}>
      {tabs.map((t) => (
        <button
          key={t.id}
          id={tabId(base, t.id)}
          type="button"
          role="tab"
          aria-selected={t.id === value}
          aria-controls={panelId}
          tabIndex={t.id === value ? 0 : -1}
          className="tab"
          onClick={() => onChange(t.id)}
          onKeyDown={(e) => {
            const i = tabs.findIndex((x) => x.id === value);
            if (e.key === "ArrowRight") {
              e.preventDefault();
              go(i + 1);
            } else if (e.key === "ArrowLeft") {
              e.preventDefault();
              go(i - 1);
            } else if (e.key === "Home") {
              e.preventDefault();
              go(0);
            } else if (e.key === "End") {
              e.preventDefault();
              go(tabs.length - 1);
            }
          }}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}
