import { Icon } from "./Icon";

export interface Crumb {
  label: string;
  /** omit on the last item: it is the current page and is not a link */
  href?: string;
}

/** Where-am-I trail. The last item is the current page (aria-current), earlier ones are links. */
export function Breadcrumb({ items, ariaLabel }: { items: Crumb[]; ariaLabel: string }) {
  return (
    <nav aria-label={ariaLabel} className="breadcrumb">
      <ol>
        {items.map((c, i) => {
          const last = i === items.length - 1;
          return (
            <li key={`${i}-${c.label}`}>
              {i > 0 && (
                <span className="crumb-sep" aria-hidden="true">
                  <Icon name="chevronRight" size={14} />
                </span>
              )}
              {last || !c.href ? (
                <span aria-current={last ? "page" : undefined}>{c.label}</span>
              ) : (
                <a href={c.href}>{c.label}</a>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
