import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllPosts, getPostBySlug } from "@/lib/mdx";
import { GeometricPattern } from "@/components/ui/GeometricPattern";
import { Badge } from "@/components/ui/Badge";
import AuthorBadge from "@/components/blog/AuthorBadge";

interface BlogPostPageProps {
  params: { slug: string };
}

/**
 * Pre-generate all known blog slugs at build time.
 */
export function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

/**
 * Dynamic metadata based on the post's frontmatter.
 */
export function generateMetadata({ params }: BlogPostPageProps): Metadata {
  try {
    const post = getPostBySlug(params.slug);
    return {
      title: post.title,
      description: post.excerpt,
    };
  } catch {
    return {
      title: "Post Not Found",
    };
  }
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  let post;
  try {
    post = getPostBySlug(params.slug);
  } catch {
    notFound();
  }

  return (
    <>
      {/* Decorative header strip */}
      <div className="relative overflow-hidden bg-gipp-red-dark px-4 py-12">
        <GeometricPattern colorScheme="dark" opacity={0.12} />
        <div className="relative z-10" />
      </div>

      {/* Article content */}
      <article className="mx-auto max-w-3xl px-4 py-12">
        {/* Title */}
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          {post.title}
        </h1>

        {/* Author and date */}
        <div className="mt-4">
          <AuthorBadge author={post.author} date={post.date} />
        </div>

        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="outline" size="sm">
                {tag}
              </Badge>
            ))}
          </div>
        )}

        {/* Divider */}
        <hr className="my-8 border-gipp-orange/20" />

        {/* MDX content */}
        <div className="prose prose-lg max-w-3xl mx-auto prose-headings:text-gipp-orange-dark prose-a:text-gipp-orange">
          <MDXRemote source={post.content} />
        </div>

        {/* Back link */}
        <div className="mt-12 border-t border-gray-200 pt-8">
          <Link
            href="/blog"
            className="inline-flex items-center text-gipp-orange font-semibold transition-colors hover:text-gipp-orange-dark"
          >
            &larr; Back to all posts
          </Link>
        </div>
      </article>
    </>
  );
}
