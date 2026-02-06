import React from "react";
import Link from "next/link";
import type { BlogPost } from "@/types";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import AuthorBadge from "@/components/blog/AuthorBadge";

export interface BlogCardProps {
  post: BlogPost;
}

/**
 * Blog preview card for listing pages. Displays a gradient color
 * placeholder at the top, followed by title, author info, excerpt,
 * and tags.
 */
export default function BlogCard({ post }: BlogCardProps) {
  return (
    <Card variant="elevated" padding="none">
      {/* Color placeholder header */}
      <div
        className="h-40 bg-gradient-to-br from-gipp-orange via-gipp-orange-light to-gipp-cream"
        aria-hidden="true"
      />

      {/* Card body */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900">
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
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
}
