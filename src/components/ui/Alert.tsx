import type { ReactNode } from "react";
import { Icon, type IconName } from "./Icon";

const ICON: Record<"ok" | "warn" | "stop" | "neutral", IconName> = { ok: "check", warn: "clock", stop: "close", neutral: "info" };

/** Bordered note: tone bar + icon + text — never color alone. */
export function Alert({ tone = "neutral", title, children }: {
  tone?: "ok" | "warn" | "stop" | "neutral";
  title?: string;
  children: ReactNode;
}) {
  return (
    <div className={tone === "neutral" ? "alert" : `alert ${tone}`} role={tone === "stop" ? "alert" : undefined}>
      <span className="alert-icon"><Icon name={ICON[tone]} size={18} /></span>
      <span>
        {title && <span className="alert-title">{title} </span>}
        {children}
      </span>
    </div>
  );
}
