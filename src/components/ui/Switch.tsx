/**
 * On/off switch: the real control is a hidden checkbox, so a wrapping <label>
 * forwards clicks and Space toggles it. Track and thumb are CSS (`.switch`).
 */
export function Switch({ checked, onChange, disabled, ariaLabel }: {
  checked: boolean;
  onChange: (v: boolean) => void;
  disabled?: boolean;
  ariaLabel?: string;
}) {
  return (
    <span className="switch">
      <input
        type="checkbox"
        role="switch"
        checked={checked}
        disabled={disabled}
        aria-label={ariaLabel}
        onChange={(e) => onChange(e.target.checked)}
      />
      <span className="switch-track" aria-hidden />
    </span>
  );
}
