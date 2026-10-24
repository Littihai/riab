import type { ReactNode } from "react";

const ICON = { ok: "✓", warn: "◷", stop: "✕", neutral: "ℹ" } as const;

/** Bordered note: tone bar + icon + text — never color alone. */
export function Alert({ tone = "neutral", title, children }: {
  tone?: "ok" | "warn" | "stop" | "neutral";
  title?: string;
  children: ReactNode;
}) {
  return (
    <div className={tone === "neutral" ? "alert" : `alert ${tone}`} role={tone === "stop" ? "alert" : undefined}>
      <span className="alert-icon" aria-hidden>{ICON[tone]}</span>
      <span>
        {title && <span className="alert-title">{title} </span>}
        {children}
      </span>
    </div>
  );
}
