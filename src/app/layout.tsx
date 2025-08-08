import "@/app/globals.css";
import Script from "next/script";
import { Toaster } from 'sonner';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
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
      </head>
      <body>
        {children}
        <Toaster
          position="top-center"
          richColors
          closeButton
        />
      </body>
    </html>
  );
}
