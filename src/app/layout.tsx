// src/app/layout.tsx

import "@/app/globals.css";
import Script from "next/script";
import { Toaster } from "sonner";
import type { Metadata } from "next";
import { siteConfig } from "@/lib/siteConfig";
import { Playfair_Display, DM_Sans } from "next/font/google";

/*
  next/font завантажує шрифти під час білду — не в runtime.
  Це дає:
  - нульовий layout shift (CLS = 0)
  - шрифти хостяться на твоєму домені, не на Google
  - автоматичний font-display: swap
  - не потрібен @import в CSS
*/

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
  // CSS змінна — використовуємо в CSS через var(--font-serif)
  variable: "--font-serif",
  display: "swap",
  fallback: ["Georgia", "serif"], // ← якщо Google Fonts недоступні

});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  // CSS змінна — використовуємо в CSS через var(--font-sans)
  variable: "--font-sans",
  display: "swap",
  fallback: ["system-ui", "sans-serif"], // ← fallback
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.baseUrl),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    /*
      Додаємо className з обома шрифтами на <html>.
      Це робить CSS змінні --font-serif і --font-sans
      доступними на всій сторінці.
    */
    <html
      lang="en"
      suppressHydrationWarning
      className={`${playfair.variable} ${dmSans.variable}`}
    >
      <head />
      <body>
        {children}

        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-VZ5KV8LGMJ"
          strategy="afterInteractive"
        />
        <Script
          id="gtag-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-VZ5KV8LGMJ');
            `,
          }}
        />

        <Toaster position="top-center" richColors closeButton />
      </body>
    </html>
  );
}