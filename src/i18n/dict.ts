/** Every user-visible string lives here with both languages. No text in components. */
export type Lang = "th" | "en";
type Entry = { th: string; en: string };

export const DICT: Record<string, Entry> = {
  "app.name": { th: "riab", en: "riab" },
  "nav.home": { th: "หน้าแรก", en: "Home" },
  "nav.overview": { th: "ภาพรวมระบบ", en: "Overview" },
  "nav.docs": { th: "เอกสาร", en: "Documents" },
  "nav.warehouse": { th: "คลังสินค้า", en: "Warehouse" },
  "header.search": { th: "ค้นหา", en: "Search" },
  "header.theme": { th: "สลับโหมดสี", en: "Toggle color mode" },
  "header.density": { th: "ความหนาแน่น", en: "Density" },

  "home.crumb": { th: "หน้าแรก", en: "Home" },
  "home.title": { th: "สมุดงานของฉัน", en: "My ledger" },
  "home.sub": {
    th: "งานที่รอคุณ และสถานะของโมดูลที่คุณใช้ — ข้อมูลสมมติเพื่อการสาธิต",
    en: "Work waiting for you and the state of your modules — fictional demo data",
  },
  "home.report": { th: "ดูรายงาน", en: "View report" },
  "home.newPr": { th: "เปิดใบขอซื้อ", en: "New purchase request" },

  "kpi.pending": { th: "ใบขอซื้อรออนุมัติ", en: "Requests awaiting approval" },
  "kpi.pending.sub": { th: "จากสัปดาห์ก่อน", en: "vs last week" },
  "kpi.spend": { th: "มูลค่าจัดซื้อเดือนนี้", en: "Purchasing this month" },
  "kpi.spend.sub": { th: "งบที่ใช้ไป", en: "Budget used" },
  "kpi.lowStock": { th: "สินค้าต่ำกว่าจุดปลอดภัย", en: "Items below safety stock" },
  "kpi.lowStock.sub": { th: "ต้องสั่งเติมภายใน", en: "Reorder within" },
  "kpi.lowStock.val": { th: "5 วัน", en: "5 days" },
  "kpi.receive": { th: "งานรับเข้าวันนี้", en: "Receipts today" },
  "kpi.receive.sub": { th: "เสร็จแล้ว", en: "Done" },
  "kpi.receive.val": { th: "5 รายการ", en: "5 items" },

  "table.title": { th: "ใบขอซื้อล่าสุด", en: "Recent purchase requests" },
  "table.all": { th: "ดูทั้งหมด", en: "View all" },
  "table.doc": { th: "เอกสาร", en: "Document" },
  "table.requester": { th: "ผู้ขอ", en: "Requester" },
  "table.status": { th: "สถานะ", en: "Status" },
  "table.amount": { th: "มูลค่า", en: "Amount" },

  "status.approved": { th: "อนุมัติแล้ว", en: "Approved" },
  "status.pending": { th: "รออนุมัติ", en: "Awaiting approval" },
  "status.rejected": { th: "ไม่อนุมัติ", en: "Not approved" },
  "status.draft": { th: "แบบร่าง", en: "Draft" },

  "empty.title": { th: "ยังไม่มีคำขอราคา", en: "No requests for quotation yet" },
  "empty.sub": {
    th: "เปิดคำขอราคาให้ผู้ขายเสนอราคา ก่อนออกใบขอซื้อจริง",
    en: "Open a request for quotation so vendors can quote before the real purchase request",
  },
  "empty.cta": { th: "เปิดคำขอราคา", en: "New request for quotation" },

  "footer.note": {
    th: "riab · Kraft Ledger — ข้อมูลทั้งหมดเป็นข้อมูลสมมติ",
    en: "riab · Kraft Ledger — all data is fictional",
  },
};
