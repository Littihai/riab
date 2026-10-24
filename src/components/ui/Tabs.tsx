export function Tabs({ tabs, value, onChange, ariaLabel }: {
  tabs: { id: string; label: string }[];
  value: string;
  onChange: (id: string) => void;
  ariaLabel?: string;
}) {
  const move = (dir: 1 | -1) => {
    const i = tabs.findIndex((t) => t.id === value);
    const next = tabs[(i + dir + tabs.length) % tabs.length];
    onChange(next.id);
    // keep focus on the newly selected tab so arrow keys keep working
    requestAnimationFrame(() => document.getElementById(`tab-${next.id}`)?.focus());
  };
  return (
    <div className="tabs" role="tablist" aria-label={ariaLabel}>
      {tabs.map((t) => (
        <button
          key={t.id}
          id={`tab-${t.id}`}
          role="tab"
          aria-selected={t.id === value}
          tabIndex={t.id === value ? 0 : -1}
          className="tab"
          onClick={() => onChange(t.id)}
          onKeyDown={(e) => {
            if (e.key === "ArrowRight") { e.preventDefault(); move(1); }
            if (e.key === "ArrowLeft") { e.preventDefault(); move(-1); }
          }}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}
