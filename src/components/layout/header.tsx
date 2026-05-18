"use client";

import { useState, useEffect } from "react";
import { Menu } from "lucide-react";
import { site } from "@/content/site";
import { Button } from "@/components/ui/button";
import { MobileNav } from "@/components/layout/mobile-nav";

export function Header() {
  const [scrolled,    setScrolled]    = useState(false);
  const [mobileOpen,  setMobileOpen]  = useState(false);

  // Apply backdrop/border after scrolling 10px
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <>
      {/* Skip-to-content — visually hidden until focused */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-accent focus:text-white focus:rounded-md focus:text-sm focus:font-medium"
      >
        Skip to content
      </a>

      <header
        className={[
          "fixed top-0 inset-x-0 z-40 transition-all duration-200",
          scrolled
            ? "backdrop-blur-md bg-bg-primary/80 border-b border-border"
            : "bg-transparent",
        ].join(" ")}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo / site name */}
            <a
              href="/"
              className="font-semibold text-text-primary hover:text-accent transition-colors"
            >
              {site.name}
            </a>

            {/* Desktop nav */}
            <nav
              className="hidden md:flex items-center gap-6"
              aria-label="Primary navigation"
            >
              {site.nav.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-sm text-text-secondary hover:text-text-primary transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            {/* Desktop CTA + mobile hamburger */}
            <div className="flex items-center gap-3">
              <Button
                href={site.navCta.href}
                variant="primary"
                size="sm"
                className="hidden md:inline-flex"
              >
                {site.navCta.label}
              </Button>

              <button
                className="md:hidden p-2 text-text-secondary hover:text-text-primary transition-colors"
                aria-label="Open menu"
                aria-expanded={mobileOpen}
                onClick={() => setMobileOpen(true)}
              >
                <Menu size={20} />
              </button>
            </div>
          </div>
        </div>
      </header>

      <MobileNav isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
