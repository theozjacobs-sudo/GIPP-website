import React from "react";
import Link from "next/link";
import { getRecentPosts } from "@/lib/mdx";
import { formatDate } from "@/lib/utils";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

/**
 * Server component that displays the three most recent blog posts
 * on the homepage. Falls back to a placeholder message when no
 * content exists yet.
 */
export default function LatestPosts() {
  const posts = getRecentPosts(3);

  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <SectionHeading
        subtitle="The latest from the GIPP gazette"
        align="center"
      >
        Dispatches from the Pitch
      </SectionHeading>

      {posts.length === 0 ? (
        <p className="mt-8 text-center text-gray-500">
          No dispatches yet.
        </p>
      ) : (
        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Card key={post.slug} variant="elevated" padding="md">
              <h3 className="text-xl font-bold text-gray-900">
                <Link
                  href={`/blog/${post.slug}`}
                  className="transition-colors hover:text-gipp-orange"
                >
                  {post.title}
                </Link>
              </h3>

              <div className="mt-2 flex items-center gap-2 text-sm text-gray-500">
                <span className="font-medium text-gray-700">
                  {post.author}
                </span>
                <span aria-hidden="true">&middot;</span>
                <time dateTime={post.date}>{formatDate(post.date)}</time>
              </div>

              <p className="mt-3 line-clamp-3 text-gray-600">
                {post.excerpt}
              </p>

              {post.tags.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <Badge key={tag} variant="outline" size="sm">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </Card>
          ))}
        </div>
      )}

      <div className="mt-12 text-center">
        <Link
          href="/blog"
          className="inline-flex items-center text-lg font-semibold text-gipp-orange transition-colors hover:text-gipp-orange-dark"
        >
          Read All Posts &rarr;
        </Link>
      </div>
    </section>
  );
}
