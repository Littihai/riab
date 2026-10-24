/**
 * A segmented single choice: a radiogroup with roving tabindex — Left/Right
 * walk and select, matching the Tabs behaviour.
 */
import { useRef } from "react";

export function Segmented({
  options,
  value,
  onChange,
  ariaLabel,
}: {
  options: { value: string; label: string }[];
  value: string;
  onChange: (v: string) => void;
  ariaLabel: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const go = (index: number) => {
    const next = options[(index + options.length) % options.length];
    onChange(next.value);
    requestAnimationFrame(() => ref.current?.querySelector<HTMLElement>('[aria-checked="true"]')?.focus());
  };
  return (
    <div ref={ref} className="seg" role="radiogroup" aria-label={ariaLabel}>
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          role="radio"
          aria-checked={o.value === value}
          tabIndex={o.value === value ? 0 : -1}
          className="seg-item"
          onClick={() => onChange(o.value)}
          onKeyDown={(e) => {
            const i = options.findIndex((x) => x.value === value);
            if (e.key === "ArrowRight" || e.key === "ArrowDown") {
              e.preventDefault();
              go(i + 1);
            } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
              e.preventDefault();
              go(i - 1);
            }
          }}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}
