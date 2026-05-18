import Link from "next/link";
import type { Metadata } from "next";
import { getAllPosts } from "@/lib/mdx";
import { buildMetadata } from "@/lib/seo";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { site } from "@/content/site";

export const metadata: Metadata = buildMetadata({
  title:       `Blog — ${site.name}`,
  description: "Articles, updates, and insights from the team.",
  path:        "/blog",
});

export default function BlogIndex() {
  const posts = getAllPosts();

  return (
    <Section className="py-24 sm:py-32 min-h-svh">
      <Container>
        <div className="mb-16">
          <h1 className="text-4xl font-bold tracking-tight text-text-primary">Blog</h1>
          <p className="mt-4 text-text-secondary text-lg">
            Articles, updates, and insights from the team.
          </p>
        </div>

        {posts.length === 0 ? (
          <p className="text-text-secondary">No posts yet — check back soon.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="glass-card rounded-xl p-6 flex flex-col gap-3 hover:border-accent/50 transition-colors group"
              >
                <div className="flex flex-wrap gap-1.5">
                  {post.frontmatter.tags?.map((tag) => (
                    <Badge key={tag}>{tag}</Badge>
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
