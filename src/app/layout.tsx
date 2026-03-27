import "@/app/globals.css";
import Script from "next/script";
import { Toaster } from "sonner";
import type { Metadata } from "next";
import { siteConfig } from "@/lib/siteConfig";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.baseUrl),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
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