import { useState } from "react";
import { useI18n } from "@/providers/I18nProvider";
import { useTheme } from "@/providers/ThemeProvider";
import { Button } from "@/components/ui/Button";
import { Stamp, type StampTone } from "@/components/ui/Stamp";
import "./demo.css";

/** One page that exercises every locked token: header, KPI cards, ledger table, empty state. */

const ROWS: { doc: string; who: string; tone: StampTone; status: string; amount: number }[] = [
  { doc: "PR-2610-0041", who: "สมหมาย ใจดี", tone: "warn", status: "status.pending", amount: 86400 },
  { doc: "PR-2610-0040", who: "วรรณา ศรีสุข", tone: "ok", status: "status.approved", amount: 312510 },
  { doc: "PR-2610-0039", who: "ประเสริฐ มั่นคง", tone: "stop", status: "status.rejected", amount: 46800 },
  { doc: "PR-2610-0038", who: "สมหมาย ใจดี", tone: "neutral", status: "status.draft", amount: 110370 },
  { doc: "PR-2610-0037", who: "อรทัย แก้วใส", tone: "ok", status: "status.approved", amount: 58200 },
];

function Spark({ points, tone = "pine" }: { points: string; tone?: "pine" | "saffron" }) {
  return (
    <svg className="spark" width="100%" height="28" viewBox="0 0 120 28" preserveAspectRatio="none" aria-hidden="true">
      <polyline points={points} fill="none" stroke={`var(--${tone})`} strokeWidth="1.5" />
    </svg>
  );
}

export function DashboardPage() {
  const { t, lang, setLang, fmtMoney } = useI18n();
  const { resolved, setPref } = useTheme();
  const [selected, setSelected] = useState("PR-2610-0040");

  return (
    <>
      <header className="app-header">
        <span className="brand">
          <span className="tile">ร</span>
          {t("app.name")}
        </span>
        <nav className="app-nav" aria-label={t("nav.home")}>
          <button className="nav-item" aria-current="page">{t("nav.home")}</button>
          <button className="nav-item">{t("nav.overview")}</button>
          <button className="nav-item">{t("nav.docs")}</button>
          <button className="nav-item">{t("nav.warehouse")}</button>
        </nav>
        <span className="flex-1" />
        <button className="search-chip">
          <span aria-hidden>⌕</span>
          <span className="hint">{t("header.search")}</span>
          <kbd>Ctrl K</kbd>
        </button>
        <button
          className="icon-btn"
          aria-label={t("header.theme")}
          title={t("header.theme")}
          onClick={() => setPref(resolved === "dark" ? "light" : "dark")}
        >
          ◐
        </button>
        <span className="lang-toggle" role="group" aria-label="Language">
          <button aria-pressed={lang === "th"} onClick={() => setLang("th")}>ไทย</button>
          <button aria-pressed={lang === "en"} onClick={() => setLang("en")}>EN</button>
        </span>
      </header>

      <main className="page">
        <div className="crumb">{t("home.crumb")}</div>
        <div className="page-head">
          <div>
            <h1>{t("home.title")}</h1>
            <p className="sub">{t("home.sub")}</p>
          </div>
          <div className="actions">
            <Button variant="ghost">{t("home.report")}</Button>
            <Button>{t("home.newPr")}</Button>
          </div>
        </div>

        <section className="kpis">
          <div className="card lift kpi rise">
            <div className="label">{t("kpi.pending")}</div>
            <div className="num">12</div>
            <div className="leader-row">
              <span>{t("kpi.pending.sub")}</span>
              <span className="leader" />
              <span className="chip up">▲ 3</span>
            </div>
            <Spark points="0,20 15,16 30,18 45,12 60,14 75,9 90,11 105,6 120,8" />
          </div>
          <div className="card lift kpi rise">
            <div className="label">{t("kpi.spend")}</div>
            <div className="num">{fmtMoney(1245300)}</div>
            <div className="leader-row">
              <span>{t("kpi.spend.sub")}</span>
              <span className="leader" />
              <span>62%</span>
            </div>
            <Spark points="0,24 15,22 30,19 45,20 60,15 75,13 90,12 105,9 120,5" />
          </div>
          <div className="card lift kpi rise">
            <div className="label">{t("kpi.lowStock")}</div>
            <div className="num">4</div>
            <div className="leader-row">
              <span>{t("kpi.lowStock.sub")}</span>
              <span className="leader" />
              <span>{t("kpi.lowStock.val")}</span>
            </div>
            <Spark points="0,8 15,10 30,9 45,14 60,12 75,18 90,16 105,21 120,19" tone="saffron" />
          </div>
          <div className="card lift kpi rise">
            <div className="label">{t("kpi.receive")}</div>
            <div className="num">7</div>
            <div className="leader-row">
              <span>{t("kpi.receive.sub")}</span>
              <span className="leader" />
              <span>{t("kpi.receive.val")}</span>
            </div>
            <Spark points="0,22 15,20 30,16 45,17 60,12 75,14 90,10 105,12 120,7" />
          </div>
        </section>

        <div className="columns">
          <section className="card panel">
            <div className="panel-head">
              <h3>{t("table.title")}</h3>
              <a href="#all">{t("table.all")} →</a>
            </div>
            <table className="ledger">
              <thead>
                <tr>
                  <th>{t("table.doc")}</th>
                  <th>{t("table.requester")}</th>
                  <th>{t("table.status")}</th>
                  <th className="num">{t("table.amount")}</th>
                </tr>
              </thead>
              <tbody>
                {ROWS.map((r) => (
                  <tr key={r.doc} aria-selected={selected === r.doc || undefined} onClick={() => setSelected(r.doc)}>
                    <td className="doc">{r.doc}</td>
                    <td>{r.who}</td>
                    <td><Stamp tone={r.tone}>{t(r.status)}</Stamp></td>
                    <td className="num">{fmtMoney(r.amount)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          <section className="card panel empty">
            <div className="ring">
              <svg width="64" height="64" viewBox="0 0 64 64" fill="none" aria-hidden="true">
                <rect x="12" y="8" width="40" height="48" rx="4" stroke="var(--accent-fill)" strokeWidth="2" />
                <path d="M20 20h24M20 29h24M20 38h14" stroke="var(--pine)" strokeWidth="2" strokeLinecap="round" strokeDasharray="1 5" />
                <circle cx="46" cy="46" r="10" fill="var(--surface)" stroke="var(--accent-fill)" strokeWidth="2" />
                <path d="M42 46l3 3 5-6" stroke="var(--accent-fill)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h3>{t("empty.title")}</h3>
            <p className="sub">{t("empty.sub")}</p>
            <Button>{t("empty.cta")}</Button>
          </section>
        </div>
      </main>

      <footer className="app-footer">
        <span>{t("footer.note")}</span>
        <span>Fraunces + Noto Serif Thai · Source Sans 3 + Noto Sans Thai</span>
      </footer>
    </>
  );
}
