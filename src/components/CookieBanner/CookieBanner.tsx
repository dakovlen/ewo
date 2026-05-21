"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./CookieBanner.module.css";

const STORAGE_KEY = "ew_cookie_consent";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Показуємо тільки якщо ще не натискали "Got it"
    const consent = localStorage.getItem(STORAGE_KEY);
    if (!consent) {
      setVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(STORAGE_KEY, "accepted");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      className={styles.banner}
      role="region"
      aria-label="Cookie notice"
    >
      <div className={styles.inner}>
        <p className={styles.text}>
          🍪{" "}
          We use cookies to improve your experience on ElderlyWisdom.
          By continuing, you agree to our{" "}
          <Link href="/privacy" className={styles.link}>
            Privacy Policy
          </Link>
          .
        </p>

        <button
          className={styles.btn}
          onClick={handleAccept}
          aria-label="Accept cookies and close this notice"
        >
          Got it
        </button>
      </div>
    </div>
  );
}