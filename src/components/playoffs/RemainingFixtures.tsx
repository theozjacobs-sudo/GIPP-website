import type { LeagueData, LeagueMatch, MatchPrediction } from "@/types/league";

interface Props {
  league: LeagueData;
  fixtures: { match: LeagueMatch; prediction: MatchPrediction }[];
}

function fmtDate(iso: string) {
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

export function RemainingFixtures({ league, fixtures }: Props) {
  const teamMap = new Map(league.teams.map((t) => [t.id, t]));

  // Group by matchday
  const byMatchday = new Map<number, typeof fixtures>();
  for (const f of fixtures) {
    const arr = byMatchday.get(f.match.matchday) ?? [];
    arr.push(f);
    byMatchday.set(f.match.matchday, arr);
  }
  const matchdays = Array.from(byMatchday.keys()).sort((a, b) => a - b);

  return (
    <div className="space-y-6">
      {matchdays.map((md) => {
        const dayFixtures = byMatchday.get(md)!;
        const date = dayFixtures[0]?.match.date;
        return (
          <div
            key={md}
            className="border-3 border-gray-950 bg-white shadow-brutal"
          >
            <div className="flex items-baseline justify-between border-b-3 border-gray-950 bg-gray-950 px-4 py-3 text-gipp-cream">
              <h3 className="text-lg font-black uppercase tracking-wider">
                Matchday {md}
              </h3>
              <span className="text-xs uppercase tracking-widest text-gipp-cream/60">
                {fmtDate(date)}
              </span>
            </div>
            <div className="divide-y divide-gray-200">
              {dayFixtures.map(({ match, prediction }) => {
                const home = teamMap.get(match.home);
                const away = teamMap.get(match.away);
                const isMyMatch =
                  match.home === league.myTeamId ||
                  match.away === league.myTeamId;
                const probs = [
                  { label: home?.shortName ?? match.home, pct: prediction.homeWinPct, key: "h" },
                  { label: "Draw", pct: prediction.drawPct, key: "d" },
                  { label: away?.shortName ?? match.away, pct: prediction.awayWinPct, key: "a" },
                ];
                const fav = [...probs].sort((a, b) => b.pct - a.pct)[0];
                return (
                  <div
                    key={match.home + match.away}
                    className={
                      "px-4 py-4 " +
                      (isMyMatch ? "bg-gipp-orange/10" : "")
                    }
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex-1">
                        <div className="font-bold uppercase tracking-wide text-sm">
                          {home?.name ?? match.home}{" "}
                          <span className="text-gray-400">vs</span>{" "}
                          {away?.name ?? match.away}
                        </div>
                        <div className="mt-1 text-xs text-gray-500 font-mono">
                          xG: {prediction.expectedHome.toFixed(2)} —{" "}
                          {prediction.expectedAway.toFixed(2)}
                        </div>
                      </div>
                      <div className="text-right text-xs">
                        <div className="font-bold uppercase tracking-widest text-gipp-orange-dark">
                          Favorite
                        </div>
                        <div className="font-mono">
                          {fav.label} ({fav.pct.toFixed(0)}%)
                        </div>
                      </div>
                    </div>

                    <div className="mt-3 flex h-6 overflow-hidden border border-gray-300">
                      {probs.map((p) => (
                        <div
                          key={p.key}
                          className={
                            (p.key === "h"
                              ? "bg-gipp-orange "
                              : p.key === "d"
                              ? "bg-gray-400 "
                              : "bg-gipp-red ") +
                            "flex items-center justify-center text-[10px] font-mono font-bold text-white"
                          }
                          style={{ width: `${p.pct}%` }}
                          title={`${p.label}: ${p.pct.toFixed(1)}%`}
                        >
                          {p.pct >= 12 ? `${p.pct.toFixed(0)}%` : ""}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
