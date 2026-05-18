import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

const BLOG_DIR = path.join(process.cwd(), "src/content/blog");

export interface PostFrontmatter {
  title:       string;
  description: string;
  date:        string;     // ISO 8601 — e.g. "2026-05-18"
  author:      string;
  tags:        string[];
  draft?:      boolean;
}

export interface Post {
  slug:        string;
  frontmatter: PostFrontmatter;
  content:     string;
  readingTime: string;     // e.g. "4 min read"
}

// Returns all published posts sorted by date descending.
export function getAllPosts(): Post[] {
  if (!fs.existsSync(BLOG_DIR)) return [];

  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".mdx"));

  const posts = files.map((file) => {
    const slug    = file.replace(/\.mdx$/, "");
    const raw     = fs.readFileSync(path.join(BLOG_DIR, file), "utf8");
    const { data, content } = matter(raw);
    const fm      = data as PostFrontmatter;
    const rt      = readingTime(content);

    return {
      slug,
      frontmatter:  fm,
      content,
      readingTime:  rt.text,
    };
  });

  return posts
    .filter((p) => !p.frontmatter.draft)
    .sort((a, b) => new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime());
}

// Returns a single post by slug, or null if not found.
export function getPostBySlug(slug: string): Post | null {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  const fm  = data as PostFrontmatter;
  const rt  = readingTime(content);

  return { slug, frontmatter: fm, content, readingTime: rt.text };
}

// Returns all unique tags across published posts.
export function getAllTags(): string[] {
  const posts = getAllPosts();
  const tags  = new Set(posts.flatMap((p) => p.frontmatter.tags ?? []));
  return Array.from(tags).sort();
}

// Returns posts matching a given tag.
export function getPostsByTag(tag: string): Post[] {
  return getAllPosts().filter((p) => p.frontmatter.tags?.includes(tag));
}
