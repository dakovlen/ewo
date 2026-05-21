"use client";

import { usePathname } from "next/navigation";
import { FreeJournalBanner } from "@/components/FreeJournalBanner/FreeJournalBanner";

export function FreeJournalBannerGuard() {
  const pathname = usePathname();

  if (pathname === "/") return null;

  return <FreeJournalBanner />;
}