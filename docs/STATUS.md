# สถานะโปรเจกต์ riab (อัปเดต 2026-10-24)

## เวอร์ชันที่ผ่านมา

- **v0.1** — ธีม Riab Minimal (ขาว/หมึก), คอมโพเนนต์พื้นฐาน 10 ตัว, หน้า demo 6 หน้า
  (dashboard, gallery, form, table, login, 404), hash router, demo ขึ้น GitHub Pages,
  เปิด Template repository · ผ่านรีวิว QA 2 รอบ (โน้ตรีวิวอยู่ฝั่งทีม lotline)
- **v0.2** — ระบบ Customize (accent 4 สี / มุมโค้ง 3 แบบ / ความหนาแน่น / motion / เมนู 3 โหมด),
  SettingsDialog 3 section, Ctrl K command palette, Segmented + useFocusTrap/useMediaQuery
  · ยังไม่ได้รีวิวโดย QA/UX (session ของทีมชนลิมิตวันนั้น)

เลขใน `package.json` ยังเป็น 0.1.0 และยังไม่มี git tag — งานแรกที่เสนอ: อัปเป็น 0.2.0,
ติด tag v0.1/v0.2, ทำ GitHub Release

## งานค้าง (เรียงตามที่เจ้าของน่าจะได้ประโยชน์ก่อน)

1. **Tag + Release v0.1/v0.2** (เล็ก)
2. **รีวิว v0.2** — จุดที่ควรเช็ก: SettingsDialog บนมือถือ, rail + keyboard, CmdK กับ screen reader,
   สลับโหมดเมนูแล้ว focus/current ถูก
3. **CI** — เพิ่ม workflow typecheck+build (+deploy Pages) เมื่อโควตา Actions ของบัญชีรีเซ็ต
4. **คอมโพเนนต์ที่ยังขาด** (จากรีวิว QA): Dropdown menu, Tooltip, Popover, Drawer,
   Breadcrumb/EmptyState/Card เป็นคอมโพเนนต์จริง, toast แบบมีปุ่มปิด/ค้างเมื่อ hover, ชุดไอคอน SVG แทน unicode glyph
5. **เอกสารต่อหน้า component** (props + a11y notes) ใน `docs/`
6. **Tests** — อย่างน้อย keyboard ของ Modal/Tabs/CmdK (เคยเจอบั๊ก keyboard 2 ตัวตอนรีวิว)
7. ความเข้มงวดที่เหลือจากรีวิว: ฟอนต์ไทยจุดที่ยัง 12.5–13.5px, สีหมวดหมู่เพิ่มเติม

## ความเป็นมาสั้น ๆ

แตกมาจากงานทีม lotline-next (ERP portfolio ของเจ้าของ) เพื่อเป็น theme starter แจกฟรีแบบ Tabler
ทิศทางดีไซน์แรกคือ "Kraft Ledger" (กระดาษคราฟต์ — mockup เก็บไว้ที่ `mockup/dashboard.html`)
ก่อนเจ้าของเลือกเปลี่ยนเป็นขาวมินิมอลตามชื่อ riab (เรียบ) · กติกาทั้งหมดอยู่ใน `CLAUDE.md`
