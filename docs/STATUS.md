# สถานะโปรเจกต์ riab (อัปเดต 2026-10-24)

## เวอร์ชันที่ผ่านมา

- **v0.1** — ธีม Riab Minimal, คอมโพเนนต์พื้นฐาน, หน้า demo 6 หน้า, hash router, demo บน GitHub Pages,
  Template repository · ผ่านรีวิว QA 2 รอบ (tag `v0.1` = `e54a472`)
- **v0.2** — ระบบ Customize, SettingsDialog, เมนู 3 โหมด, Ctrl K, ชุดไอคอน SVG, accent Indigo, สวิตช์สีไอคอน
- **v0.3** — คอมโพเนนต์ใหม่ 7 ตัว (Menu, Tooltip, Popover, Drawer, Breadcrumb, Card, EmptyState), toast ปิดได้/มี tone/หยุดเมื่อ hover,
  skip link, ฟอนต์ bundle เอง, ESLint + Prettier, Vitest (keyboard, contrast, กฎบ้าน, axe), เอกสารต่อหน้า component,
  CI workflow, CHANGELOG/CONTRIBUTING/SECURITY/templates

## คะแนนประเมินตัวเอง (ก่อน/หลัง v0.3)

ก่อน ≈ 6.5/10 → หลัง ≈ 8.7/10 ที่ยังขาดไปถึง 10: ทดสอบกับ screen reader จริง (NVDA/VoiceOver) และผู้ใช้จริง,
ทดสอบบนอุปกรณ์มือถือจริง, คอมโพเนนต์ที่ยังไม่มี (ด้านล่าง), CI ที่รันจริง

## งานค้าง (เรียงตามที่เจ้าของน่าจะได้ประโยชน์ก่อน)

1. **ทดสอบกับ screen reader จริง** (NVDA + Firefox/Chrome, VoiceOver + Safari) โดยเฉพาะ Menu, Popover, Ctrl K, เมนูข้าง — axe จับได้แค่โครงสร้าง
2. **ทดสอบมือถือจริง** (iOS Safari, Android Chrome): Drawer, Settings, Menu ที่ flip
3. **CI รันจริง** — โควตา GitHub Actions ของบัญชีเต็ม ตอนนี้ deploy demo มือ (ดู `CLAUDE.md`) ต้องรีเซ็ตโควตาแล้วเช็กว่า `ci.yml` ผ่านบน GitHub
4. **คอมโพเนนต์ที่ยังขาด**: Date picker, Combobox/autocomplete, Table ที่เรียง/กรองได้ในตัว, Progress, Avatar, Accordion, typeahead ใน Menu
5. **Tooltip/Menu ชนขอบจอ**: Tooltip ยังไม่ flip (Menu/Popover flip แล้ว)
6. สีหมวดหมู่เพิ่มเติม · og.jpg ขนาดแนะนำ 1200x630 (ตอนนี้ 800x506)
7. Landing page (แนวทางที่ออกแบบไว้: mockup แบบ Apple / React Bits ยังไม่ได้ทำ — เจ้าของยังไม่เลือก)

## ความเป็นมาสั้น ๆ

แตกมาจากงานทีม lotline-next (ERP portfolio ของเจ้าของ) เพื่อเป็น theme starter แจกฟรีแบบ Tabler
ทิศทางดีไซน์แรกคือ "Kraft Ledger" (กระดาษคราฟต์ — mockup เก็บไว้ที่ `mockup/dashboard.html`)
ก่อนเจ้าของเลือกเปลี่ยนเป็นขาวมินิมอลตามชื่อ riab (เรียบ) · กติกาทั้งหมดอยู่ใน `CLAUDE.md`
