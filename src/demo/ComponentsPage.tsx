import { useState } from "react";
import { useI18n } from "@/providers/I18nProvider";
import { Alert } from "@/components/ui/Alert";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Field, Input, Select, Textarea } from "@/components/ui/Field";
import { Modal } from "@/components/ui/Modal";
import { Pager } from "@/components/ui/Pager";
import { Stamp } from "@/components/ui/Stamp";
import { Switch } from "@/components/ui/Switch";
import { Tabs } from "@/components/ui/Tabs";
import { toast } from "@/components/ui/Toast";

/** The component gallery: every piece of the set, live, in both languages and both modes. */
export function ComponentsPage() {
  const { t } = useI18n();
  const [email, setEmail] = useState("somchai@");
  const [notify, setNotify] = useState(true);
  const [tab, setTab] = useState("detail");
  const [modalOpen, setModalOpen] = useState(false);
  const [page, setPage] = useState(2);

  const emailBad = email.length > 0 && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const tabs = [
    { id: "detail", label: t("cmp.tab.detail") },
    { id: "history", label: t("cmp.tab.history") },
    { id: "files", label: t("cmp.tab.files") },
  ];

  return (
    <main className="page">
      <div className="crumb">{t("nav.components")}</div>
      <div className="page-head">
        <div>
          <h1>{t("cmp.title")}</h1>
          <p className="sub">{t("cmp.sub")}</p>
        </div>
      </div>

      <div className="cmp-grid">
        <section className="card section-card">
          <h3>{t("cmp.buttons")}</h3>
          <div className="row-wrap">
            <Button>{t("cmp.primary")}</Button>
            <Button variant="ghost">{t("cmp.ghost")}</Button>
            <Button disabled>{t("cmp.disabled")}</Button>
          </div>
        </section>

        <section className="card section-card">
          <h3>{t("cmp.badges")}</h3>
          <div className="row-wrap">
            <Badge>{t("cmp.badge.plain")}</Badge>
            <Badge tone="ok">{t("status.approved")}</Badge>
            <Badge tone="warn">{t("status.pending")}</Badge>
            <Badge tone="stop">{t("status.rejected")}</Badge>
          </div>
          <div className="row-wrap">
            <Stamp tone="ok">{t("status.approved")}</Stamp>
            <Stamp tone="warn">{t("status.pending")}</Stamp>
            <Stamp tone="stop">{t("status.rejected")}</Stamp>
            <Stamp tone="neutral">{t("status.draft")}</Stamp>
          </div>
        </section>

        <section className="card section-card">
          <h3>{t("cmp.alerts")}</h3>
          <Alert tone="ok" title={t("cmp.alert.okTitle")}>{t("cmp.alert.okBody")}</Alert>
          <Alert tone="warn" title={t("cmp.alert.warnTitle")}>{t("cmp.alert.warnBody")}</Alert>
          <Alert tone="stop" title={t("cmp.alert.stopTitle")}>{t("cmp.alert.stopBody")}</Alert>
        </section>

        <section className="card section-card">
          <h3>{t("cmp.form")}</h3>
          <Field label={t("cmp.f.name")} hint={t("cmp.f.nameHint")}>
            <Input placeholder="PR-2610-0042" />
          </Field>
          <Field label={t("cmp.f.type")}>
            <Select defaultValue="pr">
              <option value="pr">{t("cmp.f.type1")}</option>
              <option value="rfq">{t("cmp.f.type2")}</option>
            </Select>
          </Field>
          <Field label={t("cmp.f.email")} error={emailBad ? t("cmp.f.emailErr") : undefined}>
            <Input type="email" value={email} invalid={emailBad} onChange={(e) => setEmail(e.target.value)} />
          </Field>
          <Field label={t("cmp.f.note")}>
            <Textarea rows={3} />
          </Field>
          <label className="row-wrap switch-row">
            <Switch checked={notify} onChange={setNotify} />
            <span>{t("cmp.f.notify")}</span>
          </label>
        </section>

        <section className="card section-card">
          <h3>{t("cmp.tabs")}</h3>
          <Tabs tabs={tabs} value={tab} onChange={setTab} ariaLabel={t("cmp.tabs")} />
          <div className="tab-panel" role="tabpanel">
            {t("cmp.tab.body")} {tabs.find((x) => x.id === tab)?.label}
          </div>
          <h3>{t("cmp.pager")}</h3>
          <Pager page={page} pages={5} onPage={setPage} label={(p, n) => t("pager.page").replace("%p", String(p)).replace("%n", String(n))} />
        </section>

        <section className="card section-card">
          <h3>{t("cmp.overlays")}</h3>
          <div className="row-wrap">
            <Button onClick={() => setModalOpen(true)}>{t("cmp.openModal")}</Button>
            <Button variant="ghost" onClick={() => toast(t("cmp.toastMsg"))}>{t("cmp.sendToast")}</Button>
          </div>
        </section>
      </div>

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={t("cmp.modal.title")}
        footer={
          <>
            <Button variant="ghost" onClick={() => setModalOpen(false)}>{t("common.cancel")}</Button>
            <Button onClick={() => { setModalOpen(false); toast(t("cmp.toastMsg")); }}>{t("common.confirm")}</Button>
          </>
        }
      >
        <p className="muted">{t("cmp.modal.body")}</p>
      </Modal>
    </main>
  );
}
