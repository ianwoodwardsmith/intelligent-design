// ─── Site Configuration — Single Source of Truth ─────────────────────────────
//
// Every layout component reads from this file.
// Change a value here and it updates everywhere: nav, footer, SEO, JSON-LD.
//
// After cloning, update this file first.
// ─────────────────────────────────────────────────────────────────────────────

export const site = {
  // Core identity
  name:        "Your Site",
  tagline:     "A short description of what you do",
  description: "A longer description used for SEO meta tags.",
  domain:      "yoursite.com",
  url:         "https://yoursite.com",

  // Contact
  email:   "hello@yoursite.com",
  phone:   "",   // optional

  // Social — set to "" to omit from footer
  social: {
    twitter:  "",
    linkedin: "",
    youtube:  "",
    github:   "",
  },

  // Analytics — set by npm run setup (reads from env at runtime)
  analytics: {
    ga: process.env.NEXT_PUBLIC_GA_ID ?? "",
  },

  // Navigation — drives Header + MobileNav
  nav: [
    { label: "Features",  href: "/#features" },
    { label: "Blog",      href: "/blog" },
    { label: "Contact",   href: "/contact" },
  ],

  // CTA button in header
  navCta: {
    label: "Get Started",
    href:  "/contact",
  },

  // Footer columns
  footer: {
    columns: [
      {
        heading: "Product",
        links: [
          { label: "Features", href: "/#features" },
          { label: "Pricing",  href: "/#pricing" },
          { label: "FAQ",      href: "/#faq" },
        ],
      },
      {
        heading: "Resources",
        links: [
          { label: "Blog",    href: "/blog" },
          { label: "Contact", href: "/contact" },
        ],
      },
    ],
    legal: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
    ],
  },
} as const;
