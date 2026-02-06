import React from "react";
import { User } from "lucide-react";
import { formatDate } from "@/lib/utils";

export interface AuthorBadgeProps {
  /** Author display name. */
  author: string;
  /** Optional ISO date string displayed after the author. */
  date?: string;
}

/**
 * Compact inline badge showing a user icon, author name, and optional
 * formatted publication date. Used in blog cards and detail pages.
 */
export default function AuthorBadge({ author, date }: AuthorBadgeProps) {
  return (
    <div className="flex items-center gap-2 text-sm">
      <User className="h-4 w-4 shrink-0 text-gray-400" aria-hidden="true" />
      <span className="font-semibold text-gray-700">{author}</span>
      {date && (
        <>
          <span className="text-gray-300" aria-hidden="true">
            &middot;
          </span>
          <time dateTime={date} className="text-gray-500">
            {formatDate(date)}
          </time>
        </>
      )}
    </div>
  );
}
