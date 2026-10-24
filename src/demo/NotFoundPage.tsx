import { useI18n } from "@/providers/I18nProvider";

export function NotFoundPage() {
  const { t } = useI18n();
  return (
    <main className="page nf">
      <div className="nf-code" aria-hidden>
        404
      </div>
      <h1>{t("nf.title")}</h1>
      <p className="sub muted">{t("nf.sub")}</p>
      <p>
        <a href="#/">{t("nf.home")} →</a>
      </p>
    </main>
  );
}
