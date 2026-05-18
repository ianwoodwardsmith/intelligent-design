import { Analytics } from "@vercel/analytics/react";
import Script from "next/script";
import { site } from "@/content/site";

/**
 * Drop this into the root layout <body>.
 * GA tags are omitted entirely when NEXT_PUBLIC_GA_ID is not set,
 * keeping the page clean in dev and on non-GA deployments.
 */
export function SiteAnalytics() {
  return (
    <>
      {site.analytics.ga !== "" && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${site.analytics.ga}`}
            strategy="afterInteractive"
          />
          <Script id="ga-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${site.analytics.ga}');
            `}
          </Script>
        </>
      )}
      <Analytics />
    </>
  );
}
