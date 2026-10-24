import { useEffect, useState } from "react";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { I18nProvider } from "@/providers/I18nProvider";
import { ToastHost } from "@/components/ui/Toast";
import { Shell } from "@/demo/Shell";
import { DashboardPage } from "@/demo/DashboardPage";
import { ComponentsPage } from "@/demo/ComponentsPage";

/** Dependency-free hash routes — enough for a template demo. */
function useRoute(): "home" | "components" {
  const [hash, setHash] = useState(() => window.location.hash);
  useEffect(() => {
    const on = () => setHash(window.location.hash);
    window.addEventListener("hashchange", on);
    return () => window.removeEventListener("hashchange", on);
  }, []);
  return hash.startsWith("#/components") ? "components" : "home";
}

export function App() {
  const route = useRoute();
  return (
    <ThemeProvider>
      <I18nProvider>
        <Shell route={route}>{route === "components" ? <ComponentsPage /> : <DashboardPage />}</Shell>
        <ToastHost />
      </I18nProvider>
    </ThemeProvider>
  );
}
