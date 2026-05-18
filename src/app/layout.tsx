import type { Metadata } from "next";
import { inter, jetbrainsMono } from "@/lib/fonts";
import { site } from "@/content/site";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { SiteAnalytics } from "@/components/layout/analytics";
import { PageTransition } from "@/components/layout/page-transition";
import { OrganizationSchema } from "@/lib/structured-data";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default:  site.name,
    template: `%s | ${site.name}`,
  },
  description:  site.description,
  metadataBase: new URL(site.url),
  openGraph: {
    siteName: site.name,
    type:     "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        {/* Preconnect so GA resolves faster — only matters if NEXT_PUBLIC_GA_ID is set */}
        {site.analytics.ga && (
          <>
            <link rel="preconnect" href="https://www.googletagmanager.com" />
            <link rel="preconnect" href="https://www.google-analytics.com" />
          </>
        )}
      </head>
      <body className="bg-bg-primary font-sans text-text-primary antialiased flex flex-col min-h-screen">
        {/* Skip to main content — keyboard nav accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-accent focus:text-white focus:rounded"
        >
          Skip to content
        </a>

        <Header />

        <main id="main-content" className="flex-1">
          <PageTransition>{children}</PageTransition>
        </main>

        <Footer />
        <SiteAnalytics />
        <OrganizationSchema />
      </body>
    </html>
  );
}
