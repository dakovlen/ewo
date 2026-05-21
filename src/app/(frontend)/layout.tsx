import { draftMode } from "next/headers";
import { VisualEditing } from "next-sanity";
import { DisableDraftMode } from "@/components/DisableDraftMode";
import { Header } from "@/components/Header/Header";
import { SanityLive } from "@/sanity/lib/live";
import { Footer } from "@/components/Footer/Footer";
import { CookieBanner } from "@/components/CookieBanner/CookieBanner";

export default async function FrontendLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />

      <main id="main-content" tabIndex={-1}>
        {children}
      </main>

      <Footer />

      <CookieBanner />

      <SanityLive />
      {(await draftMode()).isEnabled && (
        <>
          <DisableDraftMode />
          <VisualEditing />
        </>
      )}
    </>
  );
}