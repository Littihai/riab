import { ThemeProvider } from "@/providers/ThemeProvider";
import { I18nProvider } from "@/providers/I18nProvider";
import { DashboardPage } from "@/demo/DashboardPage";

export function App() {
  return (
    <ThemeProvider>
      <I18nProvider>
        <DashboardPage />
      </I18nProvider>
    </ThemeProvider>
  );
}
