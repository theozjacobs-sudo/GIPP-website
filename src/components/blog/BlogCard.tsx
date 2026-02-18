import React from "react";
import Link from "next/link";
import type { BlogPost } from "@/types";
import { Badge } from "@/components/ui/Badge";
import AuthorBadge from "@/components/blog/AuthorBadge";

export interface BlogCardProps {
  post: BlogPost;
}

/**
 * Blog preview card for listing pages. Displays a gradient color
 * placeholder at the top, followed by title, author info, excerpt,
 * and tags. Brutalist aesthetic with sharp corners and bold type.
 */
export default function BlogCard({ post }: BlogCardProps) {
  return (
    <div className="rounded-none border-2 border-gray-900 bg-white shadow-brutal transition-transform hover:-translate-y-1">
      {/* Color placeholder header */}
      <div
        className="relative h-48 bg-gradient-to-br from-gipp-orange via-gipp-red-dark to-gray-900 grain overflow-hidden"
        aria-hidden="true"
      >
        {/* Large faded issue number */}
        <span className="absolute -bottom-4 -right-2 text-[8rem] font-black leading-none text-white/10 select-none">
          #
        </span>
      </div>

      {/* Card body */}
      <div className="p-6">
        <h3 className="text-xl font-black text-gray-900">
          <Link
            href={`/blog/${post.slug}`}
            className="transition-colors hover:text-gipp-orange"
          >
            {post.title}
          </Link>
        </h3>

        <div className="mt-2">
          <AuthorBadge author={post.author} date={post.date} />
        </div>

        <p className="mt-3 line-clamp-2 text-gray-600">{post.excerpt}</p>

        {post.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="outline" size="sm">
                <span className="uppercase tracking-wider text-xs">{tag}</span>
              </Badge>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
