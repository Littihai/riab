import { useEffect, useState } from "react";

/** One toast channel for the whole app. Call toast("...") from anywhere; ToastHost renders and announces it. */

type ToastItem = { id: number; text: string };

let push: ((t: ToastItem) => void) | null = null;
let seq = 0;

export function toast(text: string) {
  push?.({ id: ++seq, text });
}

export function ToastHost() {
  const [items, setItems] = useState<ToastItem[]>([]);

  useEffect(() => {
    push = (t) => {
      setItems((xs) => [...xs, t]);
      window.setTimeout(() => setItems((xs) => xs.filter((x) => x.id !== t.id)), 4000);
    };
    return () => { push = null; };
  }, []);

  return (
    <div className="toast-region" aria-live="polite">
      {items.map((t) => (
        <div key={t.id} className="toast">{t.text}</div>
      ))}
    </div>
  );
}
