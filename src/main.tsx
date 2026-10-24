import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
// fonts are bundled (self-hosted), so the app works offline and sends no request to a font CDN
import "@fontsource-variable/inter";
import "@fontsource-variable/noto-sans-thai";
import "./styles/tokens.css";
import "./styles/base.css";
import "./styles/components.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
