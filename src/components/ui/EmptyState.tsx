import type { ReactNode } from "react";

/**
 * Nothing here yet: say so, say why or what to do, and offer the one action
 * that fixes it. `icon` sits in the ring (an Icon, or a small illustration).
 */
export function EmptyState({
  icon,
  title,
  description,
  action,
}: {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="empty">
      {icon && <div className="ring">{icon}</div>}
      <h2>{title}</h2>
      {description && <p className="sub">{description}</p>}
      {action}
    </div>
  );
}
