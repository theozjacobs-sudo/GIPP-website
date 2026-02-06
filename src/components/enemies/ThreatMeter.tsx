import { Flame } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { ThreatLevel } from '@/types';

const LABELS: Record<ThreatLevel, string> = {
  1: 'Nuisance',
  2: 'Annoying',
  3: 'Rival',
  4: 'Nemesis',
  5: 'Arch-Nemesis',
};

export function ThreatMeter({ level }: { level: ThreatLevel }) {
  const label = LABELS[level];
  const color =
    level >= 4
      ? 'text-gipp-red'
      : level === 3
        ? 'text-gipp-orange'
        : 'text-gipp-orange-light';

  return (
    <div
      className="flex items-center gap-2"
      aria-label={`Threat level: ${level} out of 5 - ${label}`}
      role="img"
    >
      <div className="flex gap-0.5">
        {Array.from({ length: 5 }, (_, i) => (
          <Flame
            key={i}
            className={cn(
              'h-4 w-4',
              i < level ? color : 'text-gray-300'
            )}
            aria-hidden="true"
            fill={i < level ? 'currentColor' : 'none'}
          />
        ))}
      </div>
      <span className={cn('text-xs font-semibold uppercase tracking-wide', color)}>
        {label}
      </span>
    </div>
  );
}
