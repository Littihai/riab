import type { ReactNode } from "react";

export function Badge({ tone, children }: { tone?: "ok" | "warn" | "stop"; children: ReactNode }) {
  return <span className={tone ? `badge ${tone}` : "badge"}>{children}</span>;
}
