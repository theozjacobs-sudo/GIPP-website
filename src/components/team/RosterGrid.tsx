'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { PlayerCard } from '@/components/team/PlayerCard';
import type { Player, Position } from '@/types';

const POSITIONS: Array<{ label: string; value: Position | 'ALL' }> = [
  { label: 'All', value: 'ALL' },
  { label: 'GK', value: 'GK' },
  { label: 'DEF', value: 'DEF' },
  { label: 'MID', value: 'MID' },
  { label: 'FWD', value: 'FWD' },
];

export function RosterGrid({ players }: { players: Player[] }) {
  const [filter, setFilter] = useState<Position | 'ALL'>('ALL');

  const filtered = filter === 'ALL'
    ? players
    : players.filter((p) => p.position === filter);

  return (
    <div>
      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2 mb-8" role="tablist" aria-label="Filter by position">
        {POSITIONS.map(({ label, value }) => (
          <button
            key={value}
            role="tab"
            aria-selected={filter === value}
            onClick={() => setFilter(value)}
            className={cn(
              'px-4 py-2 rounded-lg text-sm font-semibold transition-colors',
              'focus:outline-none focus-visible:ring-2 focus-visible:ring-gipp-orange focus-visible:ring-offset-2',
              filter === value
                ? 'bg-gipp-orange text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gipp-cream'
            )}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filtered.map((player) => (
          <PlayerCard key={player.id} player={player} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-gray-500 py-12">
          No players in this position yet.
        </p>
      )}
    </div>
  );
}
