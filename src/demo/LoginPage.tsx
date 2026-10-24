import { Icon } from "@/components/ui/Icon";
import { useState, type FormEvent } from "react";
import { useI18n } from "@/providers/I18nProvider";
import { useTheme } from "@/providers/ThemeProvider";
import { Button } from "@/components/ui/Button";
import { Field, Input } from "@/components/ui/Field";
import { Switch } from "@/components/ui/Switch";
import { toast } from "@/components/ui/Toast";

/** The bare sign-in screen: one card, no app frame. The logo links back to the landing page. */
export function LoginPage() {
  const { t, lang, setLang } = useI18n();
  const { resolved, setPref } = useTheme();
  const [emp, setEmp] = useState("");
  const [pwd, setPwd] = useState("");
  const [remember, setRemember] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const next: Record<string, string> = {};
    if (!emp.trim()) next.emp = t("f.required");
    if (!pwd) next.pwd = t("f.required");
    // (demo only — nothing is checked or stored)
    setErrors(next);
    if (Object.keys(next).length > 0) return;
    toast(t("login.ok"));
    // replace, not push: Back after signing in must not return to the sign-in page
    window.location.replace("#/");
  };

  return (
    <main className="auth">
      <div className="auth-tools">
        <button
          type="button"
          className="icon-btn"
          aria-label={t("header.theme")}
          title={t("header.theme")}
          onClick={() => setPref(resolved === "dark" ? "light" : "dark")}
        >
          <Icon name="contrast" />
        </button>
        <span className="lang-toggle" role="group" aria-label={t("header.lang")}>
          <button type="button" aria-pressed={lang === "th"} onClick={() => setLang("th")}>
            ไทย
          </button>
          <button type="button" aria-pressed={lang === "en"} onClick={() => setLang("en")}>
            EN
          </button>
        </span>
      </div>
      <div className="auth-stack">
        <a className="auth-brand" href="#/" aria-label={t("app.name")}>
          <span className="tile">ร</span>
          {t("app.name")}
        </a>
        <form className="card auth-card" onSubmit={submit} noValidate aria-labelledby="login-title">
          <div>
            <h1 id="login-title" className="auth-title">
              {t("login.title")}
            </h1>
            <p className="sub muted">{t("login.sub")}</p>
          </div>
          <Field label={t("login.emp")} error={errors.emp}>
            <Input
              value={emp}
              invalid={!!errors.emp}
              onChange={(e) => {
                setEmp(e.target.value);
                setErrors((x) => ({ ...x, emp: "" }));
              }}
              placeholder="90000001"
              autoComplete="username"
            />
          </Field>
          <Field label={t("login.pwd")} error={errors.pwd}>
            <Input
              type="password"
              value={pwd}
              invalid={!!errors.pwd}
              onChange={(e) => {
                setPwd(e.target.value);
                setErrors((x) => ({ ...x, pwd: "" }));
              }}
              autoComplete="current-password"
            />
          </Field>
          <label className="row-wrap switch-row">
            <Switch checked={remember} onChange={setRemember} />
            <span>{t("login.remember")}</span>
          </label>
          <Button type="submit">{t("login.go")}</Button>
          <p className="hint muted">{t("login.demo")}</p>
        </form>
      </div>
    </main>
  );
}
