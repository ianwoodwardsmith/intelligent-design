import { site } from "@/content/site";

// ─── Organization ─────────────────────────────────────────────────────────────
// Add to layout.tsx so it appears on every page.

export function OrganizationSchema() {
  const schema = {
    "@context":  "https://schema.org",
    "@type":     "Organization",
    name:        site.name,
    url:         site.url,
    description: site.description,
    contactPoint: site.email ? {
      "@type":       "ContactPoint",
      email:         site.email,
      contactType:   "customer service",
    } : undefined,
    sameAs: [
      site.social.twitter  ? `https://twitter.com/${site.social.twitter}`   : null,
      site.social.linkedin ? `https://linkedin.com/company/${site.social.linkedin}` : null,
    ].filter(Boolean),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────
// Drop into any page that has a FAQ section.

interface FaqItem {
  question: string;
  answer:   string;
}

export function FaqSchema({ faqs }: { faqs: FaqItem[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type":    "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type":        "Question",
      name:           faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// ─── Article ──────────────────────────────────────────────────────────────────
// Drop into blog post pages.

interface ArticleSchemaProps {
  title:       string;
  description: string;
  url:         string;
  datePublished: string;
  authorName:  string;
}

export function ArticleSchema({ title, description, url, datePublished, authorName }: ArticleSchemaProps) {
  const schema = {
    "@context":       "https://schema.org",
    "@type":          "Article",
    headline:         title,
    description,
    url,
    datePublished,
    author: { "@type": "Person", name: authorName },
    publisher: {
      "@type": "Organization",
      name:    site.name,
      url:     site.url,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// ─── Breadcrumb ───────────────────────────────────────────────────────────────
// Drop into any inner page.

interface BreadcrumbItem {
  label: string;
  href:  string;
}

export function BreadcrumbSchema({ items }: { items: BreadcrumbItem[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type":    "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type":   "ListItem",
      position:  i + 1,
      name:      item.label,
      item:      `${site.url}${item.href}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
