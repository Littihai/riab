import { useCallback, useEffect, useRef, useState } from "react";
import { Icon, type IconName } from "./Icon";

/**
 * One toast channel for the whole app. Call toast("...") from anywhere;
 * ToastHost renders and announces it. Every toast has a close button, stops
 * its timer while the pointer or keyboard focus is on it, and carries an icon
 * with its tone, never color alone. Failures stay longer and are announced
 * assertively.
 */

type Tone = "neutral" | "ok" | "stop";
type ToastItem = { id: number; text: string; tone: Tone };

const ICON: Record<Tone, IconName> = { neutral: "info", ok: "check", stop: "alert" };
const LIFETIME: Record<Tone, number> = { neutral: 5000, ok: 5000, stop: 9000 };

let push: ((t: ToastItem) => void) | null = null;
let seq = 0;

export function toast(text: string, tone: Tone = "neutral") {
  push?.({ id: ++seq, text, tone });
}

function ToastView({
  item,
  closeLabel,
  onDone,
}: {
  item: ToastItem;
  closeLabel: string;
  onDone: (id: number) => void;
}) {
  const [paused, setPaused] = useState(false);
  const left = useRef(LIFETIME[item.tone]);
  const done = useRef(onDone);
  done.current = onDone;

  useEffect(() => {
    if (paused) return;
    const start = Date.now();
    const timer = window.setTimeout(() => done.current(item.id), left.current);
    return () => {
      window.clearTimeout(timer);
      left.current -= Date.now() - start;
    };
  }, [paused, item.id]);

  return (
    <div
      className={item.tone === "neutral" ? "toast" : `toast ${item.tone}`}
      role={item.tone === "stop" ? "alert" : undefined}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <Icon name={ICON[item.tone]} size={18} />
      <span className="toast-text">{item.text}</span>
      <button type="button" className="toast-close" aria-label={closeLabel} onClick={() => onDone(item.id)}>
        <Icon name="close" size={16} />
      </button>
    </div>
  );
}

export function ToastHost({ closeLabel }: { closeLabel: string }) {
  const [items, setItems] = useState<ToastItem[]>([]);
  const dismiss = useCallback((id: number) => setItems((xs) => xs.filter((x) => x.id !== id)), []);

  useEffect(() => {
    push = (t) => setItems((xs) => [...xs, t]);
    return () => {
      push = null;
    };
  }, []);

  return (
    <div className="toast-region" aria-live="polite">
      {items.map((t) => (
        <ToastView key={t.id} item={t} closeLabel={closeLabel} onDone={dismiss} />
      ))}
    </div>
  );
}
