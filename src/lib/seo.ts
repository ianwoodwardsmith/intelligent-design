import type { Metadata } from "next";
import { site } from "@/content/site";

interface BuildMetadataOptions {
  title:        string;
  description:  string;
  path:         string;          // e.g. "/blog/my-post"
  image?:       string;          // absolute URL, defaults to /og-image.png
  noIndex?:     boolean;
}

export function buildMetadata({
  title,
  description,
  path,
  image,
  noIndex = false,
}: BuildMetadataOptions): Metadata {
  const url      = `${site.url}${path}`;
  const ogImage  = image ?? `${site.url}/og-image.png`;

  return {
    title,
    description,
    metadataBase: new URL(site.url),
    alternates:   { canonical: url },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    openGraph: {
      title,
      description,
      url,
      siteName: site.name,
      type:     "website",
      images:   [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card:        "summary_large_image",
      title,
      description,
      images:      [ogImage],
    },
  };
}
