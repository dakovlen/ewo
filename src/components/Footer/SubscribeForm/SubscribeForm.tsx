/*
  SubscribeForm.tsx — "use client" бо має стан і події.
  
  Логіка не змінилась від оригіналу.
  Переписані тільки стилі — з Tailwind на CSS Modules.
  Прибрані shadcn компоненти Input і Button —
  замінені на нативні <input> і <button> зі своїми стилями.
*/

"use client";

import { useState, useRef, useEffect } from "react";
import Script from "next/script";
import { toast } from "sonner";
import { getRecaptchaToken } from "@/lib/getRecaptchaToken";
import styles from "./SubscribeForm.module.css";

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

export function SubscribeForm() {
  const [email, setEmail]       = useState("");
  const [status, setStatus]     = useState<"idle" | "loading" | "success" | "error">("idle");
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
      toast.success("Thank you for subscribing!");
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

      <section className={styles.section} aria-labelledby="subscribe-heading">
        <div className={styles.inner}>

          {/* Текст */}
          <div className={styles.text}>
            <p className={styles.overline}>Stay connected</p>
            <h2 id="subscribe-heading" className={styles.heading}>
              Wisdom delivered to your inbox
            </h2>
            <p className={styles.description}>
              New articles, gentle inspiration, and book recommendations
              from Solan Voss — every week.
            </p>
          </div>

          {/* Форма */}
          <form
            className={styles.form}
            onSubmit={handleSubmit}
            noValidate
          >
            <div className={styles.inputRow}>
              <input
                className={`${styles.input} ${inputError ? styles.inputError : ""}`}
                type="email"
                name="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (inputError) setInputError(false);
                }}
                placeholder="Your email address"
                required
                aria-label="Email address"
                aria-invalid={inputError}
                aria-describedby={inputError ? "subscribe-error" : undefined}
                disabled={status === "loading"}
              />

              <button
                className={styles.button}
                type="submit"
                disabled={status === "loading"}
              >
                {status === "loading" ? "Subscribing…" : "Subscribe"}
              </button>
            </div>

            {inputError && (
              <p
                id="subscribe-error"
                ref={errorRef}
                role="alert"
                aria-live="assertive"
                tabIndex={-1}
                className={styles.error}
              >
                Please enter a valid email address.
              </p>
            )}

            <p className={styles.privacy}>
              No spam. Unsubscribe anytime.
            </p>
          </form>

        </div>
      </section>
    </>
  );
}