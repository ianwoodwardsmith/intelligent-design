import Link from "next/link";
import type { Metadata } from "next";
import { getAllTags, getPostsByTag } from "@/lib/mdx";
import { buildMetadata } from "@/lib/seo";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { site } from "@/content/site";

// Statically generate pages for all tags at build time.
export async function generateStaticParams() {
  const tags = getAllTags();
  return tags.map((tag) => ({ tag }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tag: string }>;
}): Promise<Metadata> {
  const { tag } = await params;
  return buildMetadata({
    title:       `Posts tagged "${tag}" — ${site.name}`,
    description: `All articles tagged with "${tag}".`,
    path:        `/blog/tag/${tag}`,
  });
}

export default async function TagPage({
  params,
}: {
  params: Promise<{ tag: string }>;
}) {
  const { tag } = await params;
  const posts = getPostsByTag(tag);

  return (
    <Section className="py-24 sm:py-32 min-h-svh">
      <Container>
        <div className="mb-16">
          <p className="text-text-secondary text-sm mb-2">
            <Link href="/blog" className="hover:text-accent transition-colors">
              ← All posts
            </Link>
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-text-primary">
            Tagged: <span className="text-accent">{tag}</span>
          </h1>
          <p className="mt-2 text-text-secondary">
            {posts.length} {posts.length === 1 ? "post" : "posts"}
          </p>
        </div>

        {posts.length === 0 ? (
          <p className="text-text-secondary">No posts with this tag yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="glass-card rounded-xl p-6 flex flex-col gap-3 hover:border-accent/50 transition-colors group"
              >
                <div className="flex flex-wrap gap-1.5">
                  {post.frontmatter.tags?.map((t) => (
                    <Badge key={t}>{t}</Badge>
                  ))}
                </div>
                <h2 className="text-base font-semibold text-text-primary group-hover:text-accent transition-colors leading-snug">
                  {post.frontmatter.title}
                </h2>
                <p className="text-text-secondary text-sm leading-relaxed flex-1">
                  {post.frontmatter.description}
                </p>
                <div className="flex items-center gap-2 text-xs text-text-secondary mt-2">
                  <time dateTime={post.frontmatter.date}>
                    {new Date(post.frontmatter.date).toLocaleDateString("en-US", {
                      year: "numeric", month: "long", day: "numeric",
                    })}
                  </time>
                  <span aria-hidden="true">·</span>
                  <span>{post.readingTime}</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </Container>
    </Section>
  );
}
