# riab — theme starter

Template UI แบบเปิด (MIT) สไตล์ "ขาวเรียบมินิมอล": design tokens กลาง, dark mode,
i18n ไทย/อังกฤษ, คอมโพเนนต์พร้อมใช้ · Vite + React + TS · demo จริงที่
https://littihai.github.io/riab/ · สถานะล่าสุดกับงานค้างอยู่ใน `docs/STATUS.md`

## วิธีทำงานกับเจ้าของ

- สื่อสารภาษาไทย ใช้อังกฤษเฉพาะโค้ด commit และ error message
- commit message ภาษาอังกฤษ ทีละเรื่อง **ห้ามใส่บรรทัด Co-Authored-By หรือชื่อ Claude ทุกกรณี**
- push ได้เมื่อ typecheck ผ่านและทดสอบบนเบราว์เซอร์แล้ว · **ห้าม force push** เว้นแต่เจ้าของสั่งและรันเอง
- งานใหญ่แบ่งเป็น module เสนอก่อน งานเล็กทำเลยแล้วรายงานตามจริง (test ไม่ผ่านต้องบอก)
- มีหลายทางเลือกให้เทียบข้อดีข้อเสียแล้วให้เจ้าของเลือก

## กติกาโค้ด (กฎบ้านของ template)

- **Token เท่านั้น**: ห้าม inline style ห้ามค่าสี hex นอก `src/styles/tokens.css`
  สี accent มี 3 ชั้นเสมอ (`--accent-fill` / `--on-accent` / `--accent-text`) ทุกคู่ที่เป็นตัวหนังสือต้องผ่าน WCAG 4.5:1 ทั้ง light/dark
- **อย่างละหนึ่ง**: toast ช่องเดียว (aria-live), dialog สไตล์เดียว (focus trap ใช้ `hooks/useFocusTrap`), formatter วันที่/เงินตัวเดียวต่อภาษา (ปฏิทินเกรกอเรียนทั้งคู่)
- **ฟอนต์ไทย**: ฟอนต์ bundle เอง (@fontsource ไม่ใช้ CDN) · เนื้อหา ≥ 14px (เล็กสุดทั้งระบบ = `--fs-micro` 12px), line-height ≥ 1.55, ห้าม letter-spacing / uppercase กับข้อความไทย
- **ข้อความผู้ใช้เห็นทุกคำ** อยู่ใน `src/i18n/dict.ts` พร้อม {th, en}
- **Motion** อ่าน `--dur-*` เสมอ · reduced-motion (OS หรือ `data-motion="reduce"`) ต้องดับทุกอย่างจากสวิตช์เดียว
- สถานะห้ามใช้สีอย่างเดียว ต้องคู่ไอคอน+ข้อความ · ขอบ control ใช้ `--border-strong` (≥3:1)
- ค่าปรับแต่งของผู้ใช้เก็บใน localStorage คีย์ `riab.*` และสคริปต์ pre-paint ใน `index.html` ต้องตามทัน

## คำสั่ง

```powershell
npm ci
npm run dev          # http://localhost:5280
npm run typecheck
npm run lint
npm test             # Vitest: keyboard, contrast ทุก accent, กฎบ้าน, axe ทุกหน้า
npm run check        # typecheck + lint + format:check + test (รันก่อน push)
npm run build
npm run build:pages  # build ด้วย --base=/riab/ สำหรับ GitHub Pages
```

Deploy demo (โควตา GitHub Actions ของบัญชีเต็มอยู่ จึง deploy มือแบบ fast-forward):
build:pages → ใน `dist/`: `git init -b gh-pages` → fetch gh-pages จาก origin →
`git reset --soft FETCH_HEAD` → add/commit → push `gh-pages:gh-pages` (ห้าม force)

## โครง

`src/styles/` tokens, base (กฎไทย+sr-only), components · `src/components/ui/` ชุดคอมโพเนนต์
· `src/providers/` Theme / Appearance (Customize) / I18n · `src/hooks/` useFocusTrap, useDismiss, usePlacement, useMediaQuery
· `src/demo/` เว็บ demo ทั้งหมด (Shell, SideNav, CmdK, SettingsDialog, หน้า 6 หน้า + hash router ใน `App.tsx`)
· `src/test/` helper ของเทสต์ · `docs/` เอกสาร component/tokens/hooks (เพิ่มคอมโพเนนต์ใหม่ต้องมีหน้าใน `docs/components/` + เทสต์ keyboard)
— คนเอา template ไปใช้จะลบ `src/demo/` ทิ้งแล้วเก็บส่วนที่เหลือ
