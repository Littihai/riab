import { useRef, type ReactNode } from "react";
import { Icon } from "./Icon";

export interface CardOption {
  value: string;
  label: string;
  /** a small picture of the result; decorative, the label names the option */
  preview: ReactNode;
}

/**
 * A single choice shown as picture cards (color scheme, font, corners). It is a
 * radiogroup with roving focus like Segmented: arrows move and select, one tab
 * stop for the group. The chosen card has a ring, a check and bold text, so the
 * selection never rests on color alone.
 */
export function OptionCards({
  options,
  value,
  onChange,
  ariaLabel,
  size = "md",
}: {
  options: CardOption[];
  value: string;
  onChange: (value: string) => void;
  ariaLabel: string;
  size?: "sm" | "md";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const go = (index: number) => {
    const next = options[(index + options.length) % options.length];
    onChange(next.value);
    requestAnimationFrame(() => ref.current?.querySelector<HTMLElement>('[aria-checked="true"]')?.focus());
  };

  return (
    <div ref={ref} className="opt-cards" data-size={size} role="radiogroup" aria-label={ariaLabel}>
      {options.map((o) => {
        const on = o.value === value;
        return (
          <button
            key={o.value}
            type="button"
            role="radio"
            aria-checked={on}
            tabIndex={on ? 0 : -1}
            className="opt-card"
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
            <span className="opt-preview" aria-hidden="true">
              {o.preview}
            </span>
            <span className="opt-label">
              {on && <Icon name="check" size={14} />}
              {o.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
