import { useId, useState } from "react";
import { useI18n } from "@/providers/I18nProvider";
import { Alert } from "@/components/ui/Alert";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Checkbox, Radio } from "@/components/ui/Choice";
import { Field, Input, Select, Textarea } from "@/components/ui/Field";
import { Skeleton, Spinner } from "@/components/ui/Loading";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Card } from "@/components/ui/Card";
import { Drawer } from "@/components/ui/Drawer";
import { EmptyState } from "@/components/ui/EmptyState";
import { Icon } from "@/components/ui/Icon";
import { Menu } from "@/components/ui/Menu";
import { Modal } from "@/components/ui/Modal";
import { Popover } from "@/components/ui/Popover";
import { Tooltip } from "@/components/ui/Tooltip";
import { Pager } from "@/components/ui/Pager";
import { Stamp } from "@/components/ui/Stamp";
import { Switch } from "@/components/ui/Switch";
import { Tabs, tabId } from "@/components/ui/Tabs";
import { toast } from "@/components/ui/Toast";

/** The component gallery: every piece of the set, live, in both languages and both modes. */
export function ComponentsPage() {
  const { t } = useI18n();
  const [email, setEmail] = useState("somchai@");
  const [notify, setNotify] = useState(true);
  const [tab, setTab] = useState("detail");
  const [modalOpen, setModalOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [pendingOnly, setPendingOnly] = useState(true);
  const [page, setPage] = useState(2);
  const [digest, setDigest] = useState(true);
  const [inApp, setInApp] = useState(false);
  const [cadence, setCadence] = useState("week");
  const tabsBase = useId();
  const panelId = `${tabsBase}-panel`;

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
          <h2>{t("cmp.buttons")}</h2>
          <div className="row-wrap">
            <Button>{t("cmp.primary")}</Button>
            <Button variant="ghost">{t("cmp.ghost")}</Button>
            <Button disabled>{t("cmp.disabled")}</Button>
          </div>
        </section>

        <section className="card section-card">
          <h2>{t("cmp.badges")}</h2>
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
          <h2>{t("cmp.alerts")}</h2>
          <Alert tone="ok" title={t("cmp.alert.okTitle")}>
            {t("cmp.alert.okBody")}
          </Alert>
          <Alert tone="warn" title={t("cmp.alert.warnTitle")}>
            {t("cmp.alert.warnBody")}
          </Alert>
          <Alert tone="stop" title={t("cmp.alert.stopTitle")}>
            {t("cmp.alert.stopBody")}
          </Alert>
        </section>

        <section className="card section-card">
          <h2>{t("cmp.form")}</h2>
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
          <h2>{t("cmp.tabs")}</h2>
          <Tabs
            tabs={tabs}
            value={tab}
            onChange={setTab}
            ariaLabel={t("cmp.tabs")}
            idBase={tabsBase}
            panelId={panelId}
          />
          <div className="tab-panel" role="tabpanel" id={panelId} aria-labelledby={tabId(tabsBase, tab)}>
            {t("cmp.tab.body")} {tabs.find((x) => x.id === tab)?.label}
          </div>
          <h2>{t("cmp.pager")}</h2>
          <Pager
            page={page}
            pages={5}
            onPage={setPage}
            label={(p, n) => t("pager.page").replace("%p", String(p)).replace("%n", String(n))}
            prevLabel={t("pager.prev")}
            nextLabel={t("pager.next")}
          />
        </section>

        <section className="card section-card">
          <h2>{t("cmp.choices")}</h2>
          <div className="col-gap">
            <Checkbox label={t("cmp.check1")} checked={digest} onChange={setDigest} />
            <Checkbox label={t("cmp.check2")} checked={inApp} onChange={setInApp} />
          </div>
          <div className="row-wrap" role="radiogroup" aria-label={t("cmp.cadence")}>
            <Radio label={t("cmp.radio.day")} name="cadence" value="day" current={cadence} onChange={setCadence} />
            <Radio label={t("cmp.radio.week")} name="cadence" value="week" current={cadence} onChange={setCadence} />
            <Radio label={t("cmp.radio.month")} name="cadence" value="month" current={cadence} onChange={setCadence} />
          </div>
        </section>

        <section className="card section-card">
          <h2>{t("cmp.loading")}</h2>
          <div className="row-wrap">
            <Spinner label={t("cmp.loadingLabel")} />
            <span className="muted">{t("cmp.loadingLabel")}</span>
          </div>
          <div className="col-gap">
            <Skeleton w={100} />
            <Skeleton w={75} />
            <Skeleton w={50} />
          </div>
        </section>

        <section className="card section-card">
          <h2>{t("cmp.overlays")}</h2>
          <div className="row-wrap">
            <Button onClick={() => setModalOpen(true)}>{t("cmp.openModal")}</Button>
            <Button variant="ghost" onClick={() => setDrawerOpen(true)}>
              {t("cmp.drawer.open")}
            </Button>
            <Button variant="ghost" onClick={() => toast(t("cmp.toastMsg"))}>
              {t("cmp.sendToast")}
            </Button>
            <Button variant="ghost" onClick={() => toast(t("cmp.toast.okMsg"), "ok")}>
              {t("cmp.toast.ok")}
            </Button>
            <Button variant="ghost" onClick={() => toast(t("cmp.toast.stopMsg"), "stop")}>
              {t("cmp.toast.stop")}
            </Button>
          </div>
        </section>

        <section className="card section-card">
          <h2>{t("cmp.menu")}</h2>
          <div className="row-wrap">
            <Menu
              label={t("cmp.menu.trigger")}
              items={[
                { id: "edit", label: t("cmp.menu.edit"), onSelect: () => toast(t("cmp.menu.edit")) },
                { id: "dup", label: t("cmp.menu.dup"), onSelect: () => toast(t("cmp.menu.dup")) },
                { id: "arc", label: t("cmp.menu.archive"), onSelect: () => {}, disabled: true },
                { id: "del", label: t("cmp.menu.delete"), onSelect: () => toast(t("cmp.menu.delete")), danger: true },
              ]}
            />
          </div>
        </section>

        <section className="card section-card">
          <h2>{t("cmp.tooltip")}</h2>
          <div className="row-wrap">
            <Tooltip label={t("cmp.tooltip.hint")}>
              <Button variant="ghost">{t("cmp.tooltip.btn")}</Button>
            </Tooltip>
          </div>
        </section>

        <section className="card section-card">
          <h2>{t("cmp.popover")}</h2>
          <div className="row-wrap">
            <Popover trigger={t("cmp.popover.trigger")} label={t("cmp.popover.label")}>
              <div className="row-wrap">
                <Switch ariaLabel={t("cmp.popover.switch")} checked={pendingOnly} onChange={setPendingOnly} />
                <span>{t("cmp.popover.switch")}</span>
              </div>
            </Popover>
          </div>
        </section>

        <section className="card section-card">
          <h2>{t("cmp.breadcrumb")}</h2>
          <Breadcrumb
            ariaLabel={t("cmp.breadcrumb.label")}
            items={[
              { label: t("nav.home"), href: "#/" },
              { label: t("nav.components"), href: "#/components" },
              { label: t("cmp.breadcrumb.leaf") },
            ]}
          />
        </section>

        <Card
          title={t("cmp.card.title")}
          actions={
            <Button variant="ghost">
              {t("cmp.card.action")}
              <Icon name="arrowRight" size={16} />
            </Button>
          }
        >
          <p className="muted">{t("cmp.card.body")}</p>
        </Card>

        <section className="card section-card">
          <h2>{t("cmp.card")}</h2>
          <EmptyState
            icon={<Icon name="doc" size={36} />}
            title={t("cmp.empty.title")}
            description={t("cmp.empty.desc")}
            action={<Button>{t("cmp.empty.cta")}</Button>}
          />
        </section>
      </div>

      <Drawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        title={t("cmp.drawer.title")}
        closeLabel={t("common.close")}
        footer={<Button onClick={() => setDrawerOpen(false)}>{t("common.confirm")}</Button>}
      >
        <p className="muted">{t("cmp.drawer.body")}</p>
      </Drawer>

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={t("cmp.modal.title")}
        footer={
          <>
            <Button variant="ghost" onClick={() => setModalOpen(false)}>
              {t("common.cancel")}
            </Button>
            <Button
              onClick={() => {
                setModalOpen(false);
                toast(t("cmp.toastMsg"));
              }}
            >
              {t("common.confirm")}
            </Button>
          </>
        }
      >
        <p className="muted">{t("cmp.modal.body")}</p>
      </Modal>
    </main>
  );
}
