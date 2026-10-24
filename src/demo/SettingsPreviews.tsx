import type { Appearance } from "@/providers/AppearanceProvider";

/**
 * The little pictures on the Customize cards. Each is a miniature app drawn
 * with the real tokens, re-scoped with a data attribute on the preview itself
 * (data-theme, data-base, data-radius), so it always shows what the choice
 * would look like without touching the page.
 */

type Scope = Partial<{ "data-theme": "light" | "dark"; "data-base": string; "data-radius": string }>;

function Mini({ nav = "side", ...scope }: { nav?: "top" | "side" | "rail" } & Scope) {
  return (
    <span className="pv" data-nav={nav} {...scope}>
      {nav !== "top" ? (
        <span className="pv-side">
          <i className="pv-dot" />
          <i className="pv-line" />
          <i className="pv-line" />
        </span>
      ) : (
        <span className="pv-top">
          <i className="pv-dot" />
          <i className="pv-line" />
          <i className="pv-line" />
        </span>
      )}
      <span className="pv-main">
        <i className="pv-bar" />
        <span className="pv-panel" />
      </span>
    </span>
  );
}

export function SchemePreview({ scheme }: { scheme: "light" | "dark" | "system" }) {
  if (scheme === "system") {
    return (
      <span className="pv-split">
        <Mini data-theme="light" />
        <span className="pv-half">
          <Mini data-theme="dark" />
        </span>
      </span>
    );
  }
  return <Mini data-theme={scheme} />;
}

export function NavPreview({ nav }: { nav: Appearance["nav"] }) {
  return <Mini nav={nav} />;
}

export function RadiusPreview({ radius }: { radius: Appearance["radius"] }) {
  return <Mini data-radius={radius} />;
}

export function BasePreview({ base }: { base: Appearance["base"] }) {
  return <Mini data-base={base} />;
}

export function FontPreview({ font }: { font: Appearance["font"] }) {
  return (
    <span className="pv-font" data-f={font}>
      <span className="pv-aa">Aa กข</span>
      <span className="pv-sample">Riab 0123</span>
    </span>
  );
}
