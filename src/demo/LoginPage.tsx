import { useState, type FormEvent } from "react";
import { useI18n } from "@/providers/I18nProvider";
import { Button } from "@/components/ui/Button";
import { Field, Input } from "@/components/ui/Field";
import { Switch } from "@/components/ui/Switch";
import { toast } from "@/components/ui/Toast";

/** The bare sign-in screen: one card, no app frame. The logo links back to the landing page. */
export function LoginPage() {
  const { t } = useI18n();
  const [emp, setEmp] = useState("");
  const [pwd, setPwd] = useState("");
  const [remember, setRemember] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const next: Record<string, string> = {};
    if (!emp.trim()) next.emp = t("f.required");
    if (!pwd) next.pwd = t("f.required");
    setErrors(next);
    if (Object.keys(next).length > 0) return;
    toast(t("login.ok"));
    window.location.hash = "#/";
  };

  return (
    <div className="auth">
      <div className="auth-stack">
        <a className="auth-brand" href="#/" aria-label={t("app.name")}>
          <span className="tile">ร</span>
          {t("app.name")}
        </a>
        <form className="card auth-card" onSubmit={submit} noValidate aria-labelledby="login-title">
          <div>
            <h2 id="login-title">{t("login.title")}</h2>
            <p className="sub muted">{t("login.sub")}</p>
          </div>
          <Field label={t("login.emp")} error={errors.emp}>
            <Input value={emp} invalid={!!errors.emp} onChange={(e) => setEmp(e.target.value)} placeholder="90000001" autoComplete="username" />
          </Field>
          <Field label={t("login.pwd")} error={errors.pwd}>
            <Input type="password" value={pwd} invalid={!!errors.pwd} onChange={(e) => setPwd(e.target.value)} autoComplete="current-password" />
          </Field>
          <label className="row-wrap switch-row">
            <Switch checked={remember} onChange={setRemember} />
            <span>{t("login.remember")}</span>
          </label>
          <Button type="submit">{t("login.go")}</Button>
          <p className="hint muted">{t("login.demo")}</p>
        </form>
      </div>
    </div>
  );
}
