'use client';

import { MoodboardItem } from '@/components/moodboard/MoodboardItem';
import type { MoodboardItem as MoodboardItemType } from '@/types';

export function MoodboardGrid({ items }: { items: MoodboardItemType[] }) {
  if (items.length === 0) {
    return (
      <div className="py-16 text-center">
        <p className="text-gray-500 text-lg">
          The board is empty. Someone post something inspiring.
        </p>
      </div>
    );
  }

  return (
    <div className="columns-1 sm:columns-2 lg:columns-3 gap-4">
      {items.map((item) => (
        <MoodboardItem key={item.id} item={item} />
      ))}
    </div>
  );
}
