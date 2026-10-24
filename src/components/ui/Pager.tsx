import { Icon } from "./Icon";

export function Pager({
  page,
  pages,
  onPage,
  label,
  prevLabel,
  nextLabel,
}: {
  page: number;
  pages: number;
  onPage: (p: number) => void;
  label: (page: number, pages: number) => string;
  prevLabel: string;
  nextLabel: string;
}) {
  if (pages <= 1) return null;
  return (
    <div className="pager">
      <button type="button" onClick={() => onPage(page - 1)} disabled={page <= 1} aria-label={prevLabel}>
        <Icon name="arrowLeft" size={16} />
      </button>
      <span>{label(page, pages)}</span>
      <button type="button" onClick={() => onPage(page + 1)} disabled={page >= pages} aria-label={nextLabel}>
        <Icon name="arrowRight" size={16} />
      </button>
    </div>
  );
}
