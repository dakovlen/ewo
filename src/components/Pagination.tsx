import Link from "next/link";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath?: string;
}

export function Pagination({ currentPage, totalPages, basePath = "/blog" }: PaginationProps) {
  if (totalPages <= 1) return null;

  const makeUrl = (page: number) => (page === 1 ? basePath : `${basePath}?page=${page}`);

  const start = Math.max(1, currentPage - 2);
  const end = Math.min(totalPages, currentPage + 2);
  const pages = [];
  for (let i = start; i <= end; i++) pages.push(i);

  return (
    <nav className="flex justify-center gap-2 mt-8" aria-label="Pagination">
      {currentPage > 1 ? (
        <Link href={makeUrl(currentPage - 1)} className="px-3 py-1 border rounded">← Previous</Link>
      ) : (
        <span className="px-3 py-1 border rounded text-gray-400 cursor-not-allowed select-none">← Previous</span>
      )}

      {pages.map((page) =>
        page === currentPage ? (
          <span key={page} className="px-3 py-1 border rounded font-semibold bg-gray-200">{page}</span>
        ) : (
          <Link key={page} href={makeUrl(page)} className="px-3 py-1 border rounded hover:bg-gray-100">{page}</Link>
        )
      )}

      {currentPage < totalPages ? (
        <Link href={makeUrl(currentPage + 1)} className="px-3 py-1 border rounded">Next →</Link>
      ) : (
        <span className="px-3 py-1 border rounded text-gray-400 cursor-not-allowed select-none">Next →</span>
      )}
    </nav>
  );
}
