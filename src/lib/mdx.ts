import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { BlogPost } from '@/types';

const BLOG_DIR = path.join(process.cwd(), 'src/content/blog');

/**
 * Ensure the blog content directory exists.
 * Returns false if the directory is missing and could not be found,
 * which lets callers bail out gracefully.
 */
function ensureBlogDir(): boolean {
  if (!fs.existsSync(BLOG_DIR)) {
    try {
      fs.mkdirSync(BLOG_DIR, { recursive: true });
    } catch {
      return false;
    }
  }
  return true;
}

/**
 * Read every `.mdx` file from the blog content directory, parse its
 * frontmatter, and return a date-descending array of `BlogPost` objects.
 *
 * The `content` field is intentionally omitted here — this is the
 * "listing" view, so we keep payloads light.
 */
export function getAllPosts(): BlogPost[] {
  if (!ensureBlogDir()) return [];

  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith('.mdx'));

  const posts: BlogPost[] = files.map((filename) => {
    const slug = filename.replace(/\.mdx$/, '');
    const filePath = path.join(BLOG_DIR, filename);
    const raw = fs.readFileSync(filePath, 'utf-8');
    const { data } = matter(raw);

    return {
      slug,
      title: data.title ?? 'Untitled',
      author: data.author ?? 'Unknown',
      authorSlug: data.authorSlug,
      date: data.date ?? '',
      excerpt: data.excerpt ?? '',
      tags: data.tags ?? [],
      coverImage: data.coverImage,
    };
  });

  // Sort by date descending (newest first).
  posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return posts;
}

/**
 * Fetch a single post by its slug (filename without `.mdx`).
 *
 * Returns the full `BlogPost` object *plus* the raw MDX `content` string
 * so the caller can render it however they like (e.g. with next-mdx-remote).
 *
 * Throws if the file does not exist — callers should catch and 404.
 */
export function getPostBySlug(slug: string): BlogPost & { content: string } {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    throw new Error(`Post not found: "${slug}"`);
  }

  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(raw);

  return {
    slug,
    title: data.title ?? 'Untitled',
    author: data.author ?? 'Unknown',
    authorSlug: data.authorSlug,
    date: data.date ?? '',
    excerpt: data.excerpt ?? '',
    tags: data.tags ?? [],
    coverImage: data.coverImage,
    content,
  };
}

/**
 * Convenience helper — return the most recent `count` posts.
 * Handy for homepage "Latest from the Blog" sections.
 */
export function getRecentPosts(count: number = 3): BlogPost[] {
  return getAllPosts().slice(0, count);
}
