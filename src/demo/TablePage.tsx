import type { DictKey } from "@/i18n/dict";
import { useMemo, useState } from "react";
import { useI18n } from "@/providers/I18nProvider";
import { Input, Select } from "@/components/ui/Field";
import { Pager } from "@/components/ui/Pager";
import { Stamp, type StampTone } from "@/components/ui/Stamp";

/** A full ledger: search, status filter, amount sort, pagination, and an empty state when nothing matches. */

type Row = { doc: string; who: string; date: Date; tone: StampTone; status: DictKey; amount: number };

const WHO = ["สมหมาย ใจดี", "วรรณา ศรีสุข", "ประเสริฐ มั่นคง", "อรทัย แก้วใส", "พิชัย รุ่งเรือง", "สุดา ทองสุข"];
const STATES: { tone: StampTone; key: DictKey }[] = [
  { tone: "ok", key: "status.approved" },
  { tone: "warn", key: "status.pending" },
  { tone: "stop", key: "status.rejected" },
  { tone: "neutral", key: "status.draft" },
];

const ROWS: Row[] = Array.from({ length: 23 }, (_, i) => {
  const n = 41 - i;
  const st = STATES[(i * 7 + 2) % STATES.length];
  return {
    doc: `PR-2610-${String(n).padStart(4, "0")}`,
    who: WHO[(i * 5 + 1) % WHO.length],
    date: new Date(2026, 9, 24 - i),
    tone: st.tone,
    status: st.key,
    amount: 18000 + ((i * 37199) % 310000),
  };
});

const PAGE_SIZE = 8;

export function TablePage() {
  const { t, fmtMoney, fmtDate } = useI18n();
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("all");
  const [sort, setSort] = useState<"none" | "asc" | "desc">("none");
  const [page, setPage] = useState(1);

  const rows = useMemo(() => {
    let out = ROWS.filter(
      (r) =>
        (status === "all" || r.status === status) &&
        (q.trim() === "" || r.doc.toLowerCase().includes(q.trim().toLowerCase()) || r.who.includes(q.trim())),
    );
    if (sort !== "none") out = [...out].sort((a, b) => (sort === "asc" ? a.amount - b.amount : b.amount - a.amount));
    return out;
  }, [q, status, sort]);

  const pages = Math.max(1, Math.ceil(rows.length / PAGE_SIZE));
  const shown = rows.slice((Math.min(page, pages) - 1) * PAGE_SIZE, Math.min(page, pages) * PAGE_SIZE);

  const pick = <T,>(v: T, set: (x: T) => void) => {
    set(v);
    setPage(1);
  };

  return (
    <main className="page">
      <div className="crumb">{t("nav.table")}</div>
      <div className="page-head">
        <div>
          <h1>{t("tbl.title")}</h1>
          <p className="sub">{t("tbl.sub")}</p>
        </div>
      </div>

      <section className="card panel">
        {/* the result count is announced when search or filter changes it */}
        <p className="sr-only" aria-live="polite">
          {t("tbl.count").replace("%n", String(rows.length))}
        </p>
        <div className="toolbar">
          <Input
            value={q}
            onChange={(e) => pick(e.target.value, setQ)}
            placeholder={t("tbl.search")}
            aria-label={t("tbl.search")}
          />
          <Select value={status} onChange={(e) => pick(e.target.value, setStatus)} aria-label={t("tbl.filter")}>
            <option value="all">{t("tbl.filter")}</option>
            {STATES.map((s) => (
              <option key={s.key} value={s.key}>
                {t(s.key)}
              </option>
            ))}
          </Select>
        </div>

        {shown.length === 0 ? (
          <div className="empty">
            <h3>{t("tbl.empty")}</h3>
            <p className="sub">{t("tbl.emptyHint")}</p>
          </div>
        ) : (
          // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex -- keyboard-reachable scroll region
          <div className="table-wrap" tabIndex={0} role="region" aria-label={t("tbl.title")}>
            <table className="ledger">
              <thead>
                <tr>
                  <th>{t("table.doc")}</th>
                  <th>{t("table.requester")}</th>
                  <th>{t("tbl.date")}</th>
                  <th>{t("table.status")}</th>
                  <th
                    className="num"
                    aria-sort={sort === "asc" ? "ascending" : sort === "desc" ? "descending" : "none"}
                  >
                    <button type="button" className="th-sort" onClick={() => setSort(sort === "desc" ? "asc" : "desc")}>
                      {t("table.amount")} {sort === "asc" ? "↑" : sort === "desc" ? "↓" : "↕"}
                    </button>
                  </th>
                </tr>
              </thead>
              <tbody>
                {shown.map((r) => (
                  <tr key={r.doc}>
                    <td className="doc">{r.doc}</td>
                    <td>{r.who}</td>
                    <td>{fmtDate(r.date)}</td>
                    <td>
                      <Stamp tone={r.tone}>{t(r.status)}</Stamp>
                    </td>
                    <td className="num">{fmtMoney(r.amount)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <Pager
          page={Math.min(page, pages)}
          pages={pages}
          onPage={setPage}
          label={(p, n) => t("pager.page").replace("%p", String(p)).replace("%n", String(n))}
          prevLabel={t("pager.prev")}
          nextLabel={t("pager.next")}
        />
      </section>
    </main>
  );
}
