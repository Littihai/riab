/** A small spinner for short waits. Give it a label for screen readers. */
export function Spinner({ label }: { label: string }) {
  return <span className="spinner" role="status" aria-label={label} />;
}

/** A shimmering placeholder line (hidden from screen readers); width in quarters of the row. */
export function Skeleton({ w = 100 }: { w?: 25 | 50 | 75 | 100 }) {
  return <span className={`skeleton w-${w}`} aria-hidden />;
}
