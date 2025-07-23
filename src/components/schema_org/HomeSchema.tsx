"use client";

import { WithContext, Organization, WebSite } from "schema-dts";
import { siteConfig } from "@/lib/siteConfig";

const organizationSchema: WithContext<Organization> = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteConfig.name,
  url: siteConfig.baseUrl,
  logo: siteConfig.logo,
  sameAs: siteConfig.sameAs,
  description: siteConfig.description,
};

const websiteSchema: WithContext<WebSite> = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: siteConfig.name,
  url: siteConfig.baseUrl,
};

export const HomeSchema = () => {
  return (
    <>
      <script
        key="organization-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      <script
        key="website-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema),
        }}
      />
    </>
  );
};
