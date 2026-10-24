import type { ReactElement } from "react";
import { render } from "@testing-library/react";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { AppearanceProvider } from "@/providers/AppearanceProvider";
import { I18nProvider } from "@/providers/I18nProvider";

/** Render with the same providers the app uses. */
export function renderApp(ui: ReactElement) {
  return render(
    <ThemeProvider>
      <AppearanceProvider>
        <I18nProvider>{ui}</I18nProvider>
      </AppearanceProvider>
    </ThemeProvider>,
  );
}
