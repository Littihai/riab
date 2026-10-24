/** Status stamp: thin border, always icon + text — never color alone. */
export type StampTone = "ok" | "warn" | "stop" | "neutral";

const ICON: Record<StampTone, string> = { ok: "✓", warn: "◷", stop: "✕", neutral: "—" };

export function Stamp({ tone, children }: { tone: StampTone; children: string }) {
  return (
    <span className={`stamp ${tone}`}>
      <span aria-hidden>{ICON[tone]}</span>
      {children}
    </span>
  );
}
