import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getRecentPosts } from "@/lib/mdx";
import { formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";

/**
 * Latest blog posts section — gritty matchday dispatch aesthetic.
 *
 * Features brutal box-shadows, numbered indicators, uppercase tags,
 * and a hover effect that shifts the shadow on interaction.
 */
export default function LatestPosts() {
  const posts = getRecentPosts(3);

  return (
    <section className="mx-auto max-w-6xl px-4 py-20">
      {/* Section heading — big, uppercase, brutalist */}
      <div className="mb-12 text-center">
        <h2 className="text-4xl font-black uppercase tracking-tight text-gray-900 sm:text-5xl">
          Dispatches from the Pitch
        </h2>
        <p className="mt-3 text-sm font-medium uppercase tracking-[0.2em] text-gray-500">
          The latest from the GIPP gazette
        </p>
        <div className="mx-auto mt-4 h-1 w-16 bg-gipp-orange" aria-hidden="true" />
      </div>

      {posts.length === 0 ? (
        <p className="mt-8 text-center text-gray-500">
          No dispatches yet.
        </p>
      ) : (
        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, index) => (
            <div
              key={post.slug}
              className="group relative overflow-hidden rounded-none border border-gray-200 bg-white p-6 shadow-brutal transition-all duration-200 hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-brutal-lg"
            >
              {/* Large faded number behind content */}
              <span
                className="pointer-events-none absolute right-3 top-2 select-none text-8xl font-black leading-none text-gray-100"
                aria-hidden="true"
              >
                {String(index + 1).padStart(2, "0")}
              </span>

              {/* Card content */}
              <div className="relative z-10">
                <h3 className="text-xl font-bold text-gray-900">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="transition-colors hover:text-gipp-orange"
                  >
                    {post.title}
                  </Link>
                </h3>

                <div className="mt-2 flex items-center gap-2 text-sm text-gray-500">
                  <span className="font-semibold uppercase tracking-wide text-gray-700">
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
                      <Badge
                        key={tag}
                        variant="outline"
                        size="sm"
                        className="rounded-none uppercase tracking-wider"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-14 text-center">
        <Link
          href="/blog"
          className="group/link inline-flex items-center gap-2 text-base font-black uppercase tracking-[0.2em] text-gipp-orange transition-colors hover:text-gipp-orange-dark"
        >
          Read All Posts
          <ArrowRight
            className="h-4 w-4 transition-transform duration-200 group-hover/link:translate-x-1"
            aria-hidden="true"
          />
        </Link>
      </div>
    </section>
  );
}
