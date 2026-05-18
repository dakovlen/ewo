import Link from "next/link";
import styles from "./Pagination.module.css";

type Props = {
  currentPage: number;
  totalPages: number;
  basePath?: string;
};

export function Pagination({ currentPage, totalPages, basePath = "/blog" }: Props) {
  if (totalPages <= 1) return null;

  const makeUrl = (page: number) =>
    page === 1 ? basePath : `${basePath}?page=${page}`;

  const start = Math.max(1, currentPage - 2);
  const end = Math.min(totalPages, currentPage + 2);
  const pages: number[] = [];
  for (let i = start; i <= end; i++) pages.push(i);

  return (
    <nav
      className={styles.nav}
      aria-label="Pagination"
      role="navigation"
    >
      {/* Previous */}
      {currentPage > 1 ? (
        <Link
          href={makeUrl(currentPage - 1)}
          className={styles.btn}
          aria-label="Previous page"
        >
          ← Previous
        </Link>
      ) : (
        <span className={`${styles.btn} ${styles.btnDisabled}`} aria-disabled="true">
          ← Previous
        </span>
      )}

      {/* Page numbers */}
      {pages.map((page) =>
        page === currentPage ? (
          <span
            key={page}
            className={`${styles.btn} ${styles.btnActive}`}
            aria-current="page"
            aria-label={`Page ${page}`}
          >
            {page}
          </span>
        ) : (
          <Link
            key={page}
            href={makeUrl(page)}
            className={styles.btn}
            aria-label={`Go to page ${page}`}
          >
            {page}
          </Link>
        )
      )}

      {/* Next */}
      {currentPage < totalPages ? (
        <Link
          href={makeUrl(currentPage + 1)}
          className={styles.btn}
          aria-label="Next page"
        >
          Next →
        </Link>
      ) : (
        <span className={`${styles.btn} ${styles.btnDisabled}`} aria-disabled="true">
          Next →
        </span>
      )}
    </nav>
  );
}