import { getAllPosts } from "@/lib/mdx";
import { site } from "@/content/site";

// RSS 2.0 feed for all published blog posts.
export async function GET() {
  const posts = getAllPosts();

  const items = posts
    .map((post) => {
      const url = `${site.url}/blog/${post.slug}`;
      // Escape special XML characters to produce well-formed XML.
      const title       = escapeXml(post.frontmatter.title);
      const description = escapeXml(post.frontmatter.description);
      const author      = escapeXml(post.frontmatter.author);
      const pubDate     = new Date(post.frontmatter.date).toUTCString();

      return `    <item>
      <title>${title}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${description}</description>
      <author>${author}</author>
      <pubDate>${pubDate}</pubDate>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(site.name)}</title>
    <link>${site.url}</link>
    <description>${escapeXml(site.description)}</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${site.url}/feed.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
    },
  });
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}
