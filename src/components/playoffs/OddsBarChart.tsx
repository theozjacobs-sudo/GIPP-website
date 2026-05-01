import type { LeagueData, PlayoffOdds } from "@/types/league";

interface Props {
  league: LeagueData;
  odds: PlayoffOdds[];
  title?: string;
  subtitle?: string;
}

export function OddsBarChart({ league, odds, title, subtitle }: Props) {
  const teamMap = new Map(league.teams.map((t) => [t.id, t]));
  const maxPct = Math.max(100, ...odds.map((o) => o.playoffPct));

  return (
    <div className="border-3 border-gray-950 bg-white shadow-brutal">
      {(title || subtitle) && (
        <div className="border-b-3 border-gray-950 bg-gray-950 px-4 py-3 text-gipp-cream">
          {title && (
            <h3 className="text-lg font-black uppercase tracking-wider">
              {title}
            </h3>
          )}
          {subtitle && (
            <p className="text-xs text-gipp-cream/60">{subtitle}</p>
          )}
        </div>
      )}
      <div className="divide-y divide-gray-100">
        {odds.map((row) => {
          const team = teamMap.get(row.teamId);
          const isMyTeam = row.teamId === league.myTeamId;
          const widthPct = Math.max(0.5, (row.playoffPct / maxPct) * 100);
          let barColor = "bg-gipp-orange";
          if (row.playoffPct >= 75) barColor = "bg-green-600";
          else if (row.playoffPct >= 30) barColor = "bg-gipp-orange";
          else if (row.playoffPct >= 5) barColor = "bg-gipp-red/70";
          else barColor = "bg-gray-400";

          return (
            <div
              key={row.teamId}
              className={
                "flex items-center gap-3 px-3 py-2 " +
                (isMyTeam ? "bg-gipp-orange/10" : "")
              }
            >
              <div className="w-32 shrink-0 truncate text-sm font-bold uppercase tracking-wide">
                {team?.shortName ?? row.teamId}
                {isMyTeam && (
                  <span className="ml-1 text-[10px] font-black text-gipp-orange-dark">
                    (US)
                  </span>
                )}
              </div>
              <div className="relative h-6 flex-1 bg-gray-100">
                <div
                  className={"absolute inset-y-0 left-0 " + barColor}
                  style={{ width: `${widthPct}%` }}
                  aria-hidden
                />
                <div className="relative z-10 flex h-full items-center px-2 text-xs font-mono font-bold">
                  {row.playoffPct.toFixed(1)}%
                </div>
              </div>
              <div className="w-20 shrink-0 text-right font-mono text-xs text-gray-500">
                avg #{row.avgFinish.toFixed(1)}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
