'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import type { Player, Position } from '@/types';
import { ChevronDown, Star, Instagram } from 'lucide-react';

const POSITION_COLORS: Record<Position, string> = {
  GK: 'from-gipp-red to-gipp-red-dark',
  DEF: 'from-gipp-orange-dark to-gipp-red-dark',
  MID: 'from-gipp-orange to-gipp-orange-dark',
  FWD: 'from-gipp-orange-light to-gipp-orange',
};

const POSITION_BADGE: Record<Position, 'red' | 'orange' | 'cream' | 'outline'> = {
  GK: 'red',
  DEF: 'orange',
  MID: 'cream',
  FWD: 'outline',
};

export function PlayerCard({ player }: { player: Player }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <Card variant="elevated" padding="none" className="overflow-hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-gipp-orange focus-visible:ring-inset"
        aria-expanded={expanded}
        aria-label={`${player.name} - ${player.position}. Click to ${expanded ? 'collapse' : 'expand'} details`}
      >
        {/* Jersey number hero */}
        <div
          className={cn(
            'relative h-48 bg-gradient-to-br flex items-center justify-center',
            POSITION_COLORS[player.position]
          )}
        >
          <span className="text-8xl font-black text-white/20 select-none">
            {player.number}
          </span>
          {player.isCaptain && (
            <div className="absolute top-3 right-3 bg-gipp-cream rounded-full p-1.5">
              <Star className="h-4 w-4 text-gipp-orange fill-gipp-orange" aria-hidden="true" />
            </div>
          )}
        </div>

        {/* Player info */}
        <div className="p-4">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-bold text-lg text-gray-900">{player.name}</h3>
              {player.nickname && (
                <p className="font-script text-gipp-orange-muted text-lg">
                  &ldquo;{player.nickname}&rdquo;
                </p>
              )}
            </div>
            <div className="flex flex-col items-end gap-1.5">
              <Badge variant={POSITION_BADGE[player.position]} size="sm">
                {player.position}
              </Badge>
              <ChevronDown
                className={cn(
                  'h-4 w-4 text-gray-400 transition-transform duration-200',
                  expanded && 'rotate-180'
                )}
                aria-hidden="true"
              />
            </div>
          </div>
        </div>
      </button>

      {/* Expandable details */}
      <div
        className={cn(
          'overflow-hidden transition-all duration-300',
          expanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        )}
      >
        <div className="px-4 pb-4 pt-0 space-y-3 border-t border-gray-100">
          <p className="text-sm text-gray-600 leading-relaxed pt-3">{player.bio}</p>
          <p className="text-sm text-gray-500 italic">
            <span className="font-semibold not-italic">Fun fact:</span> {player.funFact}
          </p>
          <div className="flex items-center justify-between text-xs text-gray-400">
            <span>Since {player.joinedYear}</span>
            {player.instagram && (
              <a
                href={`https://instagram.com/${player.instagram.replace('@', '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-gipp-orange hover:text-gipp-orange-dark"
                onClick={(e) => e.stopPropagation()}
              >
                <Instagram className="h-3.5 w-3.5" aria-hidden="true" />
                {player.instagram}
              </a>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}
