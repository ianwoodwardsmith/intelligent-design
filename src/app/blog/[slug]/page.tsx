import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import { getAllPosts, getPostBySlug } from "@/lib/mdx";
import { buildMetadata } from "@/lib/seo";
import { ArticleSchema } from "@/lib/structured-data";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { site } from "@/content/site";

// Statically generate pages for all published posts at build time.
export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

// Generate per-post metadata for SEO and Open Graph.
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return buildMetadata({
    title:       post.frontmatter.title,
    description: post.frontmatter.description,
    path:        `/blog/${slug}`,
  });
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) notFound();

  const postUrl = `${site.url}/blog/${slug}`;

  return (
    <>
      <ArticleSchema
        title={post.frontmatter.title}
        description={post.frontmatter.description}
        url={postUrl}
        datePublished={post.frontmatter.date}
        authorName={post.frontmatter.author}
      />

      <Section className="py-24 sm:py-32 min-h-svh">
        <Container>
          {/* Post header */}
          <header className="mb-12 max-w-2xl">
            <div className="flex flex-wrap gap-2 mb-4">
              {post.frontmatter.tags?.map((tag) => (
                <Badge key={tag}>{tag}</Badge>
              ))}
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-text-primary leading-tight">
              {post.frontmatter.title}
            </h1>
            <p className="mt-4 text-text-secondary text-lg leading-relaxed">
              {post.frontmatter.description}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-text-secondary border-t border-border pt-6">
              <span>{post.frontmatter.author}</span>
              <span aria-hidden="true">·</span>
              <time dateTime={post.frontmatter.date}>
                {new Date(post.frontmatter.date).toLocaleDateString("en-US", {
                  year: "numeric", month: "long", day: "numeric",
                })}
              </time>
              <span aria-hidden="true">·</span>
              <span>{post.readingTime}</span>
            </div>
          </header>

          {/* MDX body */}
          <article className="prose">
            <MDXRemote
              source={post.content}
              options={{
                mdxOptions: {
                  remarkPlugins: [remarkGfm],
                  rehypePlugins: [rehypeSlug],
                },
              }}
            />
          </article>
        </Container>
      </Section>
    </>
  );
}
