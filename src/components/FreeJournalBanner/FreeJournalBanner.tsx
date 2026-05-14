"use client";

import { useState, useRef, useEffect } from "react";
import Script from "next/script";
import { toast } from "sonner";
import { getRecaptchaToken } from "@/lib/getRecaptchaToken";
import styles from "./FreeJournalBanner.module.css";

function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.toLowerCase());
}

async function subscribe(email: string, token: string) {
  const res = await fetch("/api/subscribe", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, token }),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || "Subscription failed");
  }

  return res.json();
}

export function FreeJournalBanner() {
  const [email, setEmail]           = useState("");
  const [status, setStatus]         = useState<"idle" | "loading" | "success" | "error">("idle");
  const [inputError, setInputError] = useState(false);
  const errorRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (inputError && errorRef.current) {
      errorRef.current.focus();
    }
  }, [inputError]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setInputError(true);
      toast.error("Please enter a valid email address.");
      return;
    }

    setStatus("loading");

    try {
      const token = await getRecaptchaToken("subscribe");
      await subscribe(email, token);
      setStatus("success");
      setEmail("");
      toast.success("Check your inbox — your journal is on its way!");
    } catch (error: any) {
      setStatus("error");
      toast.error(error.message || "Something went wrong.");
    }
  };

  return (
    <>
      <Script
        src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
        strategy="afterInteractive"
      />

      <section className={styles.section} aria-labelledby="journal-heading">
        <div className={styles.inner}>

          {/* Текст */}
          <div className={styles.content}>
            <p className={styles.overline}>Free gift for you</p>
            <h2 id="journal-heading" className={styles.heading}>
              7 Days Closer to Family
            </h2>
            <p className={styles.description}>
              A free 7-day printable journal with daily reflections, wisdom,
              and gentle tasks to help you reconnect with the people you love.
              Enter your email and we'll send it straight to your inbox.
            </p>

            <ul className={styles.bullets} role="list">
              {[
                "7 daily themes: presence, love, forgiveness & more",
                "Word searches, reflections & scripture",
                "Printable — no account needed, just print & begin",
              ].map((item) => (
                <li key={item} className={styles.bullet}>
                  <span className={styles.bulletIcon} aria-hidden="true">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Форма */}
          <div className={styles.formWrap}>
            {status === "success" ? (
              <div className={styles.successBox} role="status">
                <p className={styles.successTitle}>You're all set! 🎉</p>
                <p className={styles.successText}>
                  Check your inbox — the journal is on its way.
                </p>
              </div>
            ) : (
              <form className={styles.form} onSubmit={handleSubmit} noValidate>
                <label htmlFor="journal-email" className={styles.label}>
                  Your email address
                </label>
                <input
                  id="journal-email"
                  className={`${styles.input} ${inputError ? styles.inputError : ""}`}
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (inputError) setInputError(false);
                  }}
                  placeholder="name@example.com"
                  required
                  aria-invalid={inputError}
                  aria-describedby={inputError ? "journal-error" : undefined}
                  disabled={status === "loading"}
                />

                {inputError && (
                  <p
                    id="journal-error"
                    ref={errorRef}
                    role="alert"
                    aria-live="assertive"
                    tabIndex={-1}
                    className={styles.error}
                  >
                    Please enter a valid email address.
                  </p>
                )}

                <button
                  className={styles.button}
                  type="submit"
                  disabled={status === "loading"}
                >
                  {status === "loading" ? "Sending…" : "Send Me the Free Journal"}
                </button>

                <p className={styles.privacy}>
                  No spam. Unsubscribe anytime.
                </p>
              </form>
            )}
          </div>

        </div>
      </section>
    </>
  );
}
