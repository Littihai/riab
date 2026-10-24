export function Pager({ page, pages, onPage, label }: {
  page: number;
  pages: number;
  onPage: (p: number) => void;
  label: (page: number, pages: number) => string;
}) {
  if (pages <= 1) return null;
  return (
    <div className="pager">
      <button onClick={() => onPage(page - 1)} disabled={page <= 1} aria-label="previous">←</button>
      <span>{label(page, pages)}</span>
      <button onClick={() => onPage(page + 1)} disabled={page >= pages} aria-label="next">→</button>
    </div>
  );
}
