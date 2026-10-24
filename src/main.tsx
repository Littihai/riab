import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
// all four Customize font families are bundled (self-hosted): offline-safe, no font CDN. The browser only downloads
// the files for the family in use, split by unicode range.
import "@fontsource-variable/inter";
import "@fontsource-variable/noto-sans-thai";
import "@fontsource/ibm-plex-sans/400.css";
import "@fontsource/ibm-plex-sans/500.css";
import "@fontsource/ibm-plex-sans/600.css";
import "@fontsource/ibm-plex-sans-thai/400.css";
import "@fontsource/ibm-plex-sans-thai/500.css";
import "@fontsource/ibm-plex-sans-thai/600.css";
import "@fontsource/sarabun/400.css";
import "@fontsource/sarabun/500.css";
import "@fontsource/sarabun/600.css";
import "./styles/tokens.css";
import "./styles/base.css";
import "./styles/components.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
