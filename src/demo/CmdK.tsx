import { useEffect, useRef, useState } from "react";
import { useFocusTrap } from "@/hooks/useFocusTrap";
import { useI18n } from "@/providers/I18nProvider";

export interface Command {
  id: string;
  label: string;
  hint?: string;
  run: () => void;
}

/**
 * The Ctrl K palette: an input filtering a command list, arrows + Enter pick,
 * Esc or the scrim closes. The input is a combobox over a listbox, with
 * aria-activedescendant following the highlighted row.
 */
export function CmdK({ open, onClose, commands }: { open: boolean; onClose: () => void; commands: Command[] }) {
  const { t } = useI18n();
  const [q, setQ] = useState("");
  const [idx, setIdx] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  useFocusTrap(ref, open, onClose);

  useEffect(() => {
    if (open) {
      setQ("");
      setIdx(0);
    }
  }, [open]);

  if (!open) return null;

  const shown = commands.filter((c) => c.label.toLowerCase().includes(q.trim().toLowerCase()));
  const at = Math.min(idx, Math.max(0, shown.length - 1));

  const pick = (c: Command) => {
    onClose();
    c.run();
  };

  return (
    <div
      className="scrim scrim-top"
      role="presentation"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={ref}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label={t("cmdk.title")}
        className="cmdk menu-slide"
      >
        <input
          className="input cmdk-input"
          role="combobox"
          aria-expanded="true"
          aria-controls="cmdk-list"
          aria-activedescendant={shown.length > 0 ? `cmdk-opt-${at}` : undefined}
          aria-label={t("cmdk.title")}
          placeholder={t("cmdk.placeholder")}
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            setIdx(0);
          }}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") {
              e.preventDefault();
              setIdx((i) => (i + 1) % Math.max(1, shown.length));
            } else if (e.key === "ArrowUp") {
              e.preventDefault();
              setIdx((i) => (i - 1 + shown.length) % Math.max(1, shown.length));
            } else if (e.key === "Enter" && shown[at]) {
              e.preventDefault();
              pick(shown[at]);
            }
          }}
        />
        {shown.length === 0 ? (
          <p className="cmdk-empty muted">{t("cmdk.empty")}</p>
        ) : (
          <ul id="cmdk-list" role="listbox" className="cmdk-list" aria-label={t("cmdk.title")}>
            {shown.map((c, i) => (
              <li
                key={c.id}
                id={`cmdk-opt-${i}`}
                role="option"
                aria-selected={i === at}
                className="cmdk-item"
                onMouseEnter={() => setIdx(i)}
                onMouseDown={(e) => {
                  e.preventDefault();
                  pick(c);
                }}
              >
                <span>{c.label}</span>
                {c.hint && <span className="cmdk-hint">{c.hint}</span>}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
