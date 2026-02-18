import { Card } from '@/components/ui/Card';
import { ThreatMeter } from '@/components/enemies/ThreatMeter';
import { formatDate } from '@/lib/utils';
import type { Enemy } from '@/types';

export function EnemyCard({ enemy }: { enemy: Enemy }) {
  const borderColor =
    enemy.threatLevel >= 4
      ? 'border-l-gipp-red'
      : enemy.threatLevel === 3
        ? 'border-l-gipp-orange'
        : 'border-l-gipp-orange-light';

  return (
    <Card variant="bordered" padding="lg" className={`relative border-l-[6px] ${borderColor} grain`}>
      <div className="relative z-10 flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <h3 className="text-xl font-bold uppercase tracking-wide text-gray-900">{enemy.teamName}</h3>
          <ThreatMeter level={enemy.threatLevel} />
        </div>

        <div className="flex gap-6 text-sm font-mono text-gray-600">
          <span>
            W <span className="font-bold text-green-700">{enemy.record.wins}</span>
          </span>
          <span>
            L <span className="font-bold text-gipp-red">{enemy.record.losses}</span>
          </span>
          <span>
            D <span className="font-bold text-gray-500">{enemy.record.draws}</span>
          </span>
        </div>

        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-gipp-red">
            Reason for Enmity
          </span>
          <p className="mt-1 italic text-gray-700">{enemy.reasonForEnmity}</p>
        </div>

        <p className="text-gray-600 leading-relaxed">{enemy.description}</p>

        {enemy.lastEncounter && (
          <p className="text-xs text-gray-400">
            Last encounter: {formatDate(enemy.lastEncounter)}
          </p>
        )}
      </div>
    </Card>
  );
}
