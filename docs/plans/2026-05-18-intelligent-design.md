# intelligent-design — Website Starter Template

**Date:** 2026-05-18  
**Status:** Design approved, ready for implementation

---

## What It Is

A GitHub template repo for rapidly standing up production-ready marketing websites. Distills learnings from ScoreBird, VideoPro, ScoreBuddy, HometownLive, and NewBlue into a single starting point.

Two deliverables:
1. **`intelligent-design` repo** — clone, run setup, deploy in under an hour
2. **`PLAYBOOK.md`** — the how-and-why guide for team members and external users

---

## Stack

- Next.js 16 + TypeScript
- Tailwind v4 (CSS config in `globals.css`, no `tailwind.config.ts`)
- Framer Motion (scroll animations only — never on LCP elements)
- Vercel Analytics + optional GA4
- Resend (contact form)
- `next-sitemap` + GEO files (`llms.txt`)

---

## Themes

Two presets, selected at setup time:

| Preset | Background | Text | Use when |
|--------|-----------|------|----------|
| `dark` | Near-black | Light | Product/SaaS/sports tech (ScoreBird, VideoPro pattern) |
| `light` | White/off-white | Dark | B2B/corporate/acquisition (HometownLive pattern) |

Both share the same CSS variable schema:

```css
@theme {
  --color-bg-primary: ...;
  --color-bg-secondary: ...;
  --color-bg-card: ...;
  --color-accent: ...;
  --color-accent-hover: ...;
  --color-text-primary: ...;
  --color-text-secondary: ...;
  --color-border: ...;
}
```

---

## What Ships in Core

**Always included:**
- Header + mobile nav
- Footer
- Hero + features grid + FAQ + CTA sections
- Blog (MDX, tag pages, RSS feed, reading time)
- Contact form (Resend + Zod validation)
- Full SEO scaffolding (see below)

**Excluded — add per project:**
- Chat widget (AI SDK)
- Purchase portal (Stripe)
- Competitor comparison pages
- Auth / customer portals

---

## File Structure

```
intelligent-design/
├── src/
│   ├── app/
│   │   ├── layout.tsx           # Preconnect hints, fonts, analytics, PageTransition
│   │   ├── globals.css          # Tailwind v4 @theme block — all brand tokens here
│   │   ├── page.tsx             # Homepage (sections composed here)
│   │   ├── blog/                # MDX blog — index + [slug] + tag/[tag]
│   │   ├── contact/             # Contact page + /api/contact route (Resend)
│   │   ├── privacy/ + terms/    # Legal stubs
│   │   └── api/contact/         # Resend handler + Zod validation
│   ├── components/
│   │   ├── layout/              # Header, Footer, MobileNav, PageTransition, Analytics
│   │   ├── sections/            # Hero, Features, FAQ, Pricing (optional), CTA
│   │   └── ui/                  # Button, Container, Section, Badge, Motion (FadeIn)
│   ├── content/
│   │   ├── blog/                # .mdx posts (one example included)
│   │   ├── site.ts              # Site name, nav, footer links — single source of truth
│   │   └── homepage.ts          # Hero copy, features, FAQ data
│   └── lib/
│       ├── fonts.ts             # next/font config
│       ├── seo.ts               # buildMetadata() helper
│       ├── structured-data.tsx  # JSON-LD: Organization, FAQ, Article, Breadcrumb
│       ├── mdx.ts               # Blog helpers (getAllPosts, getPostBySlug)
│       └── navigation.ts        # Nav structure
├── public/
│   ├── llms.txt                 # GEO file stub
│   ├── llms-full.txt            # Extended GEO file stub
│   └── images/                  # WebP only — enforced in PLAYBOOK.md
├── scripts/
│   └── setup.ts                 # Brand + env setup script
├── PLAYBOOK.md
├── next.config.ts
├── next-sitemap.config.js
└── .env.example
```

### Key Pattern: `content/site.ts`

Single file that drives the entire site chrome. Every layout component reads from it — change a nav item here and it updates everywhere.

```ts
export const site = {
  name: "Your Site",
  domain: "yoursite.com",
  description: "...",
  nav: [...],
  footer: { columns: [...], legal: [...] },
  social: { twitter: "...", linkedin: "..." },
  analytics: { ga: process.env.NEXT_PUBLIC_GA_ID },
}
```

---

## Performance Defaults

All baked in — new projects start at high Lighthouse scores.

| Pattern | Implementation |
|---------|---------------|
| GA preconnect hints | `layout.tsx` — only rendered if GA ID is set |
| Page transitions ≤ 150ms | `PageTransition` hardcoded at 150ms, y-offset 4px max |
| No FadeIn on LCP | `FadeIn` has `disableOnLCP` prop, on by default in Hero |
| WebP images only | Linting rule + documented in PLAYBOOK.md |
| `next/image` enforced | ESLint rule blocks plain `<img>` |
| Lazy-load heavy components | `dynamic()` pattern documented — copy/paste example in PLAYBOOK.md |

---

## SEO Defaults

Every page gets these automatically:

- `buildMetadata()` helper pre-wired into every page template
- JSON-LD Organization schema in `layout.tsx` (reads from `site.ts`)
- FAQ + Article schemas as drop-in components
- OG image placeholder in `public/` with instructions
- `next-sitemap` runs on every build
- `llms.txt` + `llms-full.txt` stubs with fill-in-the-blank format

---

## Setup Script (`npm run setup`)

Prompts for:
1. Site name + domain
2. Theme preset (`dark` / `light`)
3. Accent color (hex)
4. GA4 measurement ID (optional — skip to omit script tags entirely)
5. Resend API key + from-address

Writes `.env.local` and patches CSS variables in `globals.css`. A new dev goes from clone → branded → deployable without touching config files manually.

---

## PLAYBOOK.md Structure

**Part 1 — Starting a new site**
- Prerequisites (what to have ready before running setup)
- Clone + setup walkthrough
- Swapping fonts
- Configuring nav and footer via `site.ts`
- Dark vs light — when to use each

**Part 2 — Building out the site**
- Adding a page
- Adding a blog post (frontmatter fields)
- Adding a homepage section
- Image rules: WebP only, `next/image` always, hero images ≤ 100KB (include `cwebp` one-liner)

**Part 3 — Pre-launch checklist**
- [ ] Replace all placeholder content (OG image, legal pages, `llms.txt`)
- [ ] `npm run build` passes with zero errors
- [ ] Lighthouse ≥ 90 on mobile
- [ ] All nav links resolve
- [ ] Contact form delivers to real inbox
- [ ] Sitemap submitted to Search Console
- [ ] Named customers / synthesized quotes confirmed or removed
- [ ] `.env.example` matches all vars in `.env.local`

**Part 4 — Architecture decisions** (for external readers)
- Why Tailwind v4 CSS config
- Why `site.ts` as single source of truth
- Why `dynamic()` for heavy client components
- Why no FadeIn on hero text
- Why two themes instead of fully custom

---

## Implementation Order

1. Init Next.js 16 repo, configure Tailwind v4, ESLint, TypeScript
2. Build theme system — CSS variables + two preset files
3. Build `site.ts` + layout components (Header, Footer, MobileNav, PageTransition, Analytics)
4. Build UI primitives (Button, Container, Section, FadeIn)
5. Build homepage sections (Hero, Features, FAQ, CTA)
6. Build blog (MDX pipeline, tag pages, RSS, Article schema)
7. Build contact form (Resend + Zod + API route)
8. Wire SEO scaffolding (`buildMetadata`, JSON-LD, sitemap, GEO files)
9. Build setup script
10. Write PLAYBOOK.md
11. Add example content + placeholder OG image
12. Final audit: Lighthouse, ESLint, build check
