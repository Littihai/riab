import type { ReactNode } from "react";

/** A labelled checkbox row. */
export function Checkbox({
  label,
  checked,
  onChange,
  disabled,
}: {
  label: ReactNode;
  checked: boolean;
  onChange: (v: boolean) => void;
  disabled?: boolean;
}) {
  return (
    <label className="check-row">
      <input type="checkbox" checked={checked} disabled={disabled} onChange={(e) => onChange(e.target.checked)} />
      <span>{label}</span>
    </label>
  );
}

/** A labelled radio row; group them with a shared `name`. */
export function Radio({
  label,
  name,
  value,
  current,
  onChange,
  disabled,
}: {
  label: ReactNode;
  name: string;
  value: string;
  current: string;
  onChange: (v: string) => void;
  disabled?: boolean;
}) {
  return (
    <label className="check-row">
      <input
        type="radio"
        name={name}
        value={value}
        checked={current === value}
        disabled={disabled}
        onChange={() => onChange(value)}
      />
      <span>{label}</span>
    </label>
  );
}
