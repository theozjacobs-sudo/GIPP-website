'use client';

import { useState } from 'react';
import { ExternalLink, Play, Quote } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import type { MoodboardItem as MoodboardItemType } from '@/types';

export function MoodboardItem({ item }: { item: MoodboardItemType }) {
  const [imgError, setImgError] = useState(false);

  return (
    <Card variant="elevated" padding="none" className="break-inside-avoid mb-4">
      {/* Content by type */}
      {item.type === 'image' && !imgError && (
        <img
          src={item.content}
          alt={item.caption || 'Moodboard image'}
          className="w-full rounded-t-xl object-cover"
          onError={() => setImgError(true)}
          loading="lazy"
        />
      )}

      {(item.type === 'image' && imgError) && (
        <div className="flex h-32 items-center justify-center bg-gipp-cream-light rounded-t-xl">
          <p className="text-sm text-gray-400">Image unavailable</p>
        </div>
      )}

      {item.type === 'quote' && (
        <div className="bg-gipp-cream-light p-6">
          <Quote className="h-6 w-6 text-gipp-orange/40 mb-2" aria-hidden="true" />
          <blockquote className="text-lg italic text-gray-800 leading-relaxed">
            &ldquo;{item.content}&rdquo;
          </blockquote>
        </div>
      )}

      {item.type === 'link' && (
        <a
          href={item.content}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 p-4 hover:bg-gipp-cream-light transition-colors group"
        >
          <ExternalLink className="h-5 w-5 text-gipp-orange flex-shrink-0" aria-hidden="true" />
          <span className="text-sm text-gray-700 group-hover:text-gipp-orange truncate">
            {item.content}
          </span>
        </a>
      )}

      {item.type === 'video' && (
        <a
          href={item.content}
          target="_blank"
          rel="noopener noreferrer"
          className="relative flex h-40 items-center justify-center bg-gradient-to-br from-gipp-orange-dark to-gipp-red rounded-t-xl group"
        >
          <Play
            className="h-12 w-12 text-white/80 group-hover:text-white transition-colors"
            fill="currentColor"
            aria-hidden="true"
          />
          <span className="sr-only">Play video</span>
        </a>
      )}

      {/* Meta */}
      <div className="p-4 space-y-1">
        {item.caption && (
          <p className="text-sm text-gray-700">{item.caption}</p>
        )}
        <p className="text-xs text-gray-400">
          {item.submittedBy} &middot; Week {item.week}
        </p>
      </div>
    </Card>
  );
}
