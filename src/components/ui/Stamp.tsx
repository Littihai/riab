import { Icon, type IconName } from "./Icon";

/** Status stamp: thin border, always icon + text — never color alone. */
export type StampTone = "ok" | "warn" | "stop" | "neutral";

const ICON: Record<StampTone, IconName> = { ok: "check", warn: "clock", stop: "close", neutral: "minus" };

export function Stamp({ tone, children }: { tone: StampTone; children: string }) {
  return (
    <span className={`stamp ${tone}`}>
      <Icon name={ICON[tone]} size={14} />
      {children}
    </span>
  );
}
