import { useEffect, useState } from "react";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { I18nProvider, useI18n } from "@/providers/I18nProvider";
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
  // tolerant parsing: #!/, trailing slash, case, query and sub-hash all resolve
  const path = hash.replace(/^#!?\/?/, "").split(/[?#]/)[0].replace(/\/$/, "").toLowerCase();
  if (path === "") return "home";
  if (path === "components" || path === "form" || path === "table" || path === "login") return path;
  return "404";
}

const TITLE_KEY: Record<Route, string> = {
  home: "nav.home",
  components: "nav.components",
  form: "nav.form",
  table: "nav.table",
  login: "login.title",
  "404": "nf.title",
};

/** The tab title follows every page (login and 404 included) and the language. */
function PageTitle({ route }: { route: Route }) {
  const { t, lang } = useI18n();
  useEffect(() => {
    document.title = `riab · ${t(TITLE_KEY[route])}`;
  }, [route, lang]); // eslint-disable-line react-hooks/exhaustive-deps
  // navigating scrolls back to the top and hands focus to the page heading,
  // so keyboard and screen-reader users land on the new content
  useEffect(() => {
    window.scrollTo(0, 0);
    const h = document.querySelector<HTMLElement>("main h1");
    if (h) {
      h.tabIndex = -1;
      h.focus({ preventScroll: true });
    }
  }, [route]);
  return null;
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
        <PageTitle route={route} />
        {route === "login" ? <Page /> : <Shell route={route}><Page /></Shell>}
        <ToastHost />
      </I18nProvider>
    </ThemeProvider>
  );
}
