"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import styles from "./NavCloser.module.css";

export function NavCloser() {
  const pathname = usePathname();
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const btn = btnRef.current;
    if (!btn) return;

    // Закриваємо меню
    btn.setAttribute("aria-expanded", "false");
    btn.setAttribute("aria-label", "Open navigation menu");

    // Знімаємо data-open з nav
    const nav = btn.closest("nav");
    if (nav) nav.removeAttribute("data-menu-open");
  }, [pathname]);

  const handleClick = () => {
    const btn = btnRef.current;
    if (!btn) return;

    const isOpen = btn.getAttribute("aria-expanded") === "true";
    const next = !isOpen;

    btn.setAttribute("aria-expanded", String(next));
    btn.setAttribute(
      "aria-label",
      next ? "Close navigation menu" : "Open navigation menu"
    );

    // Встановлюємо data атрибут на nav — CSS в Header.module.css його бачить
    const nav = btn.closest("nav");
    if (nav) {
      next
        ? nav.setAttribute("data-menu-open", "true")
        : nav.removeAttribute("data-menu-open");
    }
  };

  return (
    <button
      ref={btnRef}
      id="menu-toggle"
      className={styles.burger}
      aria-expanded="false"
      aria-controls="main-nav-menu"
      aria-label="Open navigation menu"
      onClick={handleClick}
    >
      <span className={styles.line} aria-hidden="true" />
      <span className={styles.line} aria-hidden="true" />
      <span className={styles.line} aria-hidden="true" />
    </button>
  );
}