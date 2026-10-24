import { useState, type FormEvent } from "react";
import { useI18n } from "@/providers/I18nProvider";
import { Button } from "@/components/ui/Button";
import { Field, Input, Select, Textarea } from "@/components/ui/Field";
import { Switch } from "@/components/ui/Switch";
import { toast } from "@/components/ui/Toast";

/** A realistic create-document form: required checks on submit, errors inline, success as a toast. */
export function FormPage() {
  const { t } = useI18n();
  const [item, setItem] = useState("");
  const [qty, setQty] = useState("1");
  const [unit, setUnit] = useState("pc");
  const [need, setNeed] = useState("");
  const [reason, setReason] = useState("");
  const [urgent, setUrgent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  // an error leaves as soon as the person edits the field, not on the next submit
  const clear = (k: string) =>
    setErrors((e) => (e[k] ? Object.fromEntries(Object.entries(e).filter(([x]) => x !== k)) : e));

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const next: Record<string, string> = {};
    const q = Number(qty);
    const today = new Date().toISOString().slice(0, 10);
    if (!item.trim()) next.item = t("f.required");
    if (!qty.trim() || !Number.isInteger(q) || q <= 0) next.qty = t("f.qtyErr");
    if (!need) next.need = t("f.required");
    else if (need < today) next.need = t("f.needPast");
    setErrors(next);
    if (Object.keys(next).length > 0) {
      // the keyboard lands on the first invalid field, and its error is read out
      requestAnimationFrame(() => document.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus());
      return;
    }
    toast(t("form.saved"));
    setItem("");
    setQty("1");
    setNeed("");
    setReason("");
    setUrgent(false);
  };

  return (
    <main className="page">
      <div className="crumb">{t("nav.form")}</div>
      <div className="page-head">
        <div>
          <h1>{t("form.title")}</h1>
          <p className="sub">{t("form.sub")}</p>
        </div>
      </div>

      <form className="card form-card" onSubmit={submit} noValidate>
        <div className="form-grid">
          <div className="form-span">
            <Field label={t("f.item")} hint={t("f.itemHint")} error={errors.item} required>
              <Input
                value={item}
                invalid={!!errors.item}
                onChange={(e) => {
                  setItem(e.target.value);
                  clear("item");
                }}
                placeholder={t("f.itemPh")}
              />
            </Field>
          </div>
          <Field label={t("f.qty")} error={errors.qty} required>
            <Input
              type="number"
              min={1}
              value={qty}
              invalid={!!errors.qty}
              onChange={(e) => {
                setQty(e.target.value);
                clear("qty");
              }}
            />
          </Field>
          <Field label={t("f.unit")}>
            <Select value={unit} onChange={(e) => setUnit(e.target.value)}>
              <option value="pc">{t("f.unit.pc")}</option>
              <option value="box">{t("f.unit.box")}</option>
              <option value="kg">{t("f.unit.kg")}</option>
            </Select>
          </Field>
          <Field label={t("f.need")} error={errors.need} required>
            <Input
              type="date"
              value={need}
              invalid={!!errors.need}
              onChange={(e) => {
                setNeed(e.target.value);
                clear("need");
              }}
            />
          </Field>
          <div className="form-span">
            <Field label={t("f.reason")}>
              <Textarea rows={3} value={reason} onChange={(e) => setReason(e.target.value)} />
            </Field>
          </div>
          <label className="row-wrap switch-row form-span">
            <Switch checked={urgent} onChange={setUrgent} />
            <span>{t("f.urgent")}</span>
          </label>
        </div>
        <div className="form-foot">
          <Button variant="ghost" onClick={() => history.back()}>
            {t("common.cancel")}
          </Button>
          <Button type="submit">{t("f.submit")}</Button>
        </div>
      </form>
    </main>
  );
}
