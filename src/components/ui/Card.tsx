import type { ReactNode } from "react";

/**
 * The paper sheet with an optional heading row. `title` renders as an h2, so
 * give each card on a page a title (or label it yourself) to keep the outline
 * h1 > h2. `actions` sits at the end of the heading row.
 */
export function Card({
  title,
  actions,
  children,
  className,
}: {
  title?: string;
  actions?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={className ? `card card-body ${className}` : "card card-body"}>
      {(title || actions) && (
        <div className="card-head">
          {title && <h2>{title}</h2>}
          {actions && <div className="card-actions">{actions}</div>}
        </div>
      )}
      {children}
    </section>
  );
}
