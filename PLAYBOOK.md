# intelligent-design Playbook

A practical guide to using this template — from first clone to production launch.

---

## Table of Contents

1. [Starting a new site](#1-starting-a-new-site)
2. [Building out the site](#2-building-out-the-site)
3. [Pre-launch checklist](#3-pre-launch-checklist)
4. [Architecture decisions](#4-architecture-decisions)

---

## 1. Starting a New Site

### What you'll need before running setup

- Your site name and domain
- A hex code for your primary accent color (buttons, links, highlights)
- A Google Analytics 4 measurement ID — format `G-XXXXXXXXXX` (optional, skip to omit)
- A [Resend](https://resend.com) API key and a verified sending domain (optional, needed for the contact form)
- The email address that contact form submissions should go to

### Clone and run setup

```bash
# Use this repo as a GitHub template, or clone directly
git clone https://github.com/your-org/intelligent-design my-site
cd my-site
npm install
npm run setup
```

The setup script will prompt for your brand configuration, then:
- Write `.env.local` with all secrets and public env vars
- Set your accent color in `src/app/globals.css`
- Update `src/content/site.ts` with your site name, domain, and contact email

### Choose your theme preset

Two presets ship in `src/app/globals.css`:

| Preset | Background | Use when |
|--------|-----------|----------|
| **dark** (default) | Near-black `#0D0D0D` | Product / SaaS / sports tech |
| **light** | White `#FFFFFF` | B2B / corporate / acquisition |

The setup script selects your preset automatically. To switch manually later, open `globals.css` and swap which `@theme {}` block is commented out. Only one should be active at a time.

### Swap fonts

Fonts are configured in `src/lib/fonts.ts`. The template ships with Inter (body) and JetBrains Mono (code). To change either:

1. Import your font from `next/font/google` in `fonts.ts`
2. Export it with a CSS variable name, e.g. `variable: "--font-sans"`
3. Add the variable to the `<html>` className in `src/app/layout.tsx`

The `--font-sans` and `--font-mono` tokens in `globals.css` point to these variables automatically.

### Configure site identity

**`src/content/site.ts` is the single source of truth** for everything in the site chrome. Open it and fill in:

- `name` — your site/company name
- `tagline` — one sentence shown in the footer
- `description` — used for the default meta description
- `nav` — top navigation links
- `navCta` — the header call-to-action button (label + href)
- `footer.columns` — footer link groups
- `footer.legal` — privacy/terms links at the bottom
- `social` — set to `""` to hide any icon

Every layout component reads from this file. You should not need to touch `header.tsx` or `footer.tsx` for routine content changes.

---

## 2. Building Out the Site

### Adding a page

1. Create `src/app/<route>/page.tsx`
2. Export metadata using `buildMetadata()`:

```tsx
import { buildMetadata } from "@/lib/seo";
import { BreadcrumbSchema } from "@/lib/structured-data";

export const metadata = buildMetadata({
  title: "Page Title",
  description: "Used in search results and social previews.",
  path: "/your-route",
});

export default function YourPage() {
  return (
    <>
      <BreadcrumbSchema items={[
        { label: "Home", href: "/" },
        { label: "Page Title", href: "/your-route" },
      ]} />
      {/* page content */}
    </>
  );
}
```

3. Add it to `site.nav` in `src/content/site.ts` if it should appear in the nav.

### Adding a blog post

Create `src/content/blog/your-slug.mdx` with this frontmatter:

```mdx
---
title: "Your Post Title"
description: "Used in the blog index card and search results."
date: "2026-05-18"
author: "Your Name"
tags: ["tag-one", "tag-two"]
---

Post content in Markdown here.
```

The post auto-appears in `/blog`, sorted by date. Tag pages at `/blog/tag/[tag]` and the RSS feed at `/feed.xml` update automatically.

### Updating homepage content

All homepage copy lives in `src/content/homepage.ts`. To change the hero headline, feature cards, or FAQ items — edit that file. No JSX changes needed.

To reorder homepage sections or add a new one, open `src/app/page.tsx` and adjust the component order.

### Adding a homepage section not in the template

Use `Section` and `Container` as wrappers:

```tsx
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { FadeIn } from "@/components/ui/motion";

export function MySection() {
  return (
    <Section dark id="my-section">
      <Container>
        <FadeIn>
          {/* content */}
        </FadeIn>
      </Container>
    </Section>
  );
}
```

Use `dark` on alternating sections for visual rhythm — the same pattern ScoreBird, VideoPro, and every other site in this portfolio uses.

### Image rules

Three rules, no exceptions:

1. **WebP only for hero backgrounds and large images.** PNG/JPG hero images are a leading cause of slow LCP scores. Convert with:
   ```bash
   cwebp -q 80 input.png -o output.webp
   ```
   A 1.6MB PNG typically becomes a 50–80KB WebP. That's a 20–30x improvement.

2. **Always use `next/image`, never `<img>`.** The ESLint config flags plain `<img>` tags. `next/image` handles lazy loading, responsive sizes, and format negotiation automatically.

3. **Hero images ≤ 100KB.** Run images through [Squoosh](https://squoosh.app) or `cwebp` before committing. If your hero image is over 100KB, it's too big.

### Lazy-loading heavy components

Any `"use client"` component that isn't visible on initial render should be dynamically imported so its JavaScript is excluded from the critical bundle:

```tsx
import dynamic from "next/dynamic";

const HeavyComponent = dynamic(
  () => import("@/components/HeavyComponent").then((m) => ({ default: m.HeavyComponent })),
  { ssr: false, loading: () => null }
);
```

Use this pattern for: chat widgets, PDF generators, modals, onboarding flows, anything from the AI SDK.

---

## 3. Pre-Launch Checklist

Work through this before pointing DNS. One pass takes about 30 minutes.

### Content

- [ ] Replace placeholder hero copy in `src/content/homepage.ts`
- [ ] Replace placeholder features in `src/content/homepage.ts`
- [ ] Replace placeholder FAQs in `src/content/homepage.ts`
- [ ] Replace nav and footer links in `src/content/site.ts`
- [ ] Delete or replace `src/content/blog/hello-world.mdx`
- [ ] Fill in `public/llms.txt` and `public/llms-full.txt` — do not leave these as stubs
- [ ] Add a real OG image at `public/og-image.png` (1200×630px)
- [ ] Add your logo to `public/images/` and reference it in `src/components/layout/header.tsx`
- [ ] Verify privacy and terms pages at `/privacy` and `/terms` have real legal content
- [ ] If you name specific customers, confirm their consent before launching

### Technical

- [ ] `npm run build` exits with zero errors
- [ ] `.env.local` has all required vars (compare against `.env.example`)
- [ ] Contact form submits and delivers to the right inbox (test it)
- [ ] All nav links resolve — click through every item in the header and footer
- [ ] Mobile nav opens and closes correctly
- [ ] RSS feed returns valid XML at `/feed.xml`
- [ ] Sitemap is present at `/sitemap.xml`
- [ ] `robots.txt` is present and correct at `/robots.txt`

### SEO & Performance

- [ ] Open Graph preview looks correct — use [opengraph.xyz](https://www.opengraph.xyz) to check
- [ ] Run Lighthouse on the homepage: target **90+ on mobile**
- [ ] Hero image is WebP and ≤ 100KB
- [ ] No plain `<img>` tags — `npm run lint` should be clean
- [ ] Submit sitemap to Google Search Console after DNS cutover

### Deployment

- [ ] Connect repo to Vercel: `npx vercel link`
- [ ] Set all env vars in Vercel project settings (everything from `.env.local`)
- [ ] Deploy preview and smoke test: `npx vercel`
- [ ] Point DNS — allow up to 48 hours for propagation
- [ ] Verify the live domain resolves and HTTPS is active

---

## 4. Architecture Decisions

This section explains the non-obvious choices in the template. It's here so the reasoning survives beyond this conversation — for teammates, contributors, and anyone who picks this up later.

### Why Tailwind v4 CSS config instead of `tailwind.config.ts`

Tailwind v4 moved all configuration into CSS. The `@theme {}` block in `globals.css` replaces `tailwind.config.ts` entirely. Benefits:

- One less config file to maintain
- Theme tokens are co-located with the styles that use them
- The dark/light preset swap is a single CSS comment toggle — no JS config changes

The tradeoff: dynamic class interpolation (e.g. `text-${color}`) gets purged at build time. Use complete static class names only.

### Why `src/content/site.ts` as single source of truth

Every marketing site eventually needs to change a nav link, update a social handle, or rename a footer column. Without a central config, that means hunting through `header.tsx`, `footer.tsx`, and maybe the layout — three files, easy to miss one.

`site.ts` makes every layout change a one-line edit. The convention is: if it appears in the site chrome (nav, footer, meta), it lives in `site.ts`. If it's page-specific content, it lives in the page's content file.

### Why `dynamic()` for heavy client components

Client components that aren't visible on initial render still ship their JavaScript to every visitor, on every page, whether they use them or not. A chat widget that bundles the AI SDK might add 150KB+ to your critical JS — paid by everyone who visits the homepage, not just the few who open the chat.

`dynamic(() => import(...), { ssr: false })` splits the component into its own chunk that only loads after the page is interactive. For components that start hidden, this is always the right call.

### Why no FadeIn on hero text

The hero headline is the Largest Contentful Paint (LCP) element on most pages. If it starts at `opacity: 0` and fades in, the browser considers it invisible until the animation starts — even if the HTML was ready. This directly hurts your Lighthouse LCP score.

The `FadeIn` component has a `disableAnimation` prop for this reason. The Hero section always passes `disableAnimation={true}` to its text wrapper. Decorative elements (glow orbs, background shapes) can still animate freely.

### Why 150ms page transitions instead of 300ms

300ms is perceptibly slow. In user testing, transitions above ~200ms register as "waiting" rather than "navigation." 150ms still feels intentional and smooth, but doesn't eat half a second on every page click. The y-offset is also capped at 4px — large vertical movement amplifies the perception of slowness.

### Why two theme presets instead of fully custom

Fully custom theming requires the developer to make a dozen color decisions at setup time — backgrounds, cards, borders, text hierarchy, states. Most of those decisions are solved problems.

Two presets cover 90% of the use cases in this portfolio. If neither fits, the CSS variable system makes it straightforward to create a third preset — just add a new `@theme {}` block. The point of presets is to eliminate decision-making for solved problems, not to prevent customization.

### Why Resend for email

Transactional email is a commodity. Resend offers a generous free tier, clean API, reliable delivery, and first-class Next.js support. The contact form API route is a thin wrapper — swapping to SendGrid or Postmark is a 10-line change in `src/app/api/contact/route.ts`.

### Why GEO files (`llms.txt` / `llms-full.txt`)

Search is increasingly mediated by AI assistants. GEO files (Generative Engine Optimization) are to AI search what `robots.txt` is to crawlers — a structured, human-readable description of your site that AI systems can consume. They're cheap to write and increasingly impactful for discovery.

Fill them in before launch. Leaving them as stubs undermines the point.
