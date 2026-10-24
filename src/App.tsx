import { useEffect, useState } from "react";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { I18nProvider } from "@/providers/I18nProvider";
import { ToastHost } from "@/components/ui/Toast";
import { Shell } from "@/demo/Shell";
import { DashboardPage } from "@/demo/DashboardPage";
import { ComponentsPage } from "@/demo/ComponentsPage";
import { FormPage } from "@/demo/FormPage";
import { TablePage } from "@/demo/TablePage";
import { LoginPage } from "@/demo/LoginPage";
import { NotFoundPage } from "@/demo/NotFoundPage";

export type Route = "home" | "components" | "form" | "table" | "login" | "404";

/** Dependency-free hash routes — enough for a template demo. */
function useRoute(): Route {
  const [hash, setHash] = useState(() => window.location.hash);
  useEffect(() => {
    const on = () => setHash(window.location.hash);
    window.addEventListener("hashchange", on);
    return () => window.removeEventListener("hashchange", on);
  }, []);
  const path = hash.replace(/^#\/?/, "").replace(/\/$/, "");
  if (path === "") return "home";
  if (path === "components" || path === "form" || path === "table" || path === "login") return path;
  return "404";
}

const PAGES: Record<Route, () => JSX.Element> = {
  home: DashboardPage,
  components: ComponentsPage,
  form: FormPage,
  table: TablePage,
  login: LoginPage,
  "404": NotFoundPage,
};

export function App() {
  const route = useRoute();
  const Page = PAGES[route];
  return (
    <ThemeProvider>
      <I18nProvider>
        {route === "login" ? <Page /> : <Shell route={route}><Page /></Shell>}
        <ToastHost />
      </I18nProvider>
    </ThemeProvider>
  );
}
