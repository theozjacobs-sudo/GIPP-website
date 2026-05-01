import type {
  LeagueData,
  LeagueMatch,
  MatchImpact,
  PlayoffOdds,
} from "@/types/league";

interface Props {
  league: LeagueData;
  baselineOdds: PlayoffOdds[];
  winOutOdds: PlayoffOdds[];
  myMatches: LeagueMatch[];
  impacts: MatchImpact[];
}

export function WinOutScenario({
  league,
  baselineOdds,
  winOutOdds,
  myMatches,
  impacts,
}: Props) {
  const teamMap = new Map(league.teams.map((t) => [t.id, t]));
  const myId = league.myTeamId;
  const baseline = baselineOdds.find((o) => o.teamId === myId)!;
  const winOut = winOutOdds.find((o) => o.teamId === myId)!;
  const delta = winOut.playoffPct - baseline.playoffPct;

  // Sort impacts by how much the result swings GIPP's chances
  const ranked = [...impacts]
    .map((i) => ({
      ...i,
      swing:
        Math.max(
          i.playoffPctIfHomeWin,
          i.playoffPctIfDraw,
          i.playoffPctIfAwayWin,
        ) -
        Math.min(
          i.playoffPctIfHomeWin,
          i.playoffPctIfDraw,
          i.playoffPctIfAwayWin,
        ),
    }))
    .sort((a, b) => b.swing - a.swing);

  return (
    <div className="space-y-6">
      <div className="border-3 border-gray-950 bg-gipp-orange shadow-brutal-lg">
        <div className="grain relative">
          <div className="relative z-10 px-6 py-6 text-gray-950">
            <div className="text-xs font-black uppercase tracking-[0.3em]">
              If GIPP wins out
            </div>
            <div className="mt-2 flex items-baseline gap-4">
              <div className="text-6xl font-black tabular-nums text-shadow-brutal">
                {winOut.playoffPct.toFixed(0)}%
              </div>
              <div className="text-sm uppercase tracking-wider text-gray-950/70">
                chance to make playoffs
              </div>
            </div>
            <div className="mt-3 text-sm font-bold">
              {delta >= 0 ? "+" : ""}
              {delta.toFixed(1)} pts vs baseline ({baseline.playoffPct.toFixed(0)}%)
            </div>
          </div>
        </div>
      </div>

      <div className="border-3 border-gray-950 bg-white shadow-brutal">
        <div className="border-b-3 border-gray-950 bg-gray-950 px-4 py-3 text-gipp-cream">
          <h3 className="text-lg font-black uppercase tracking-wider">
            Required GIPP Results
          </h3>
          <p className="text-xs text-gipp-cream/60">
            What &ldquo;winning out&rdquo; means for our remaining schedule
          </p>
        </div>
        <ul className="divide-y divide-gray-200">
          {myMatches.map((m) => {
            const home = teamMap.get(m.home);
            const away = teamMap.get(m.away);
            const opp =
              m.home === myId
                ? away?.name ?? m.away
                : home?.name ?? m.home;
            const venue = m.home === myId ? "Home" : "Away";
            return (
              <li
                key={m.home + m.away}
                className="flex items-center justify-between px-4 py-3"
              >
                <div>
                  <div className="font-bold uppercase tracking-wide">
                    Beat {opp}
                  </div>
                  <div className="text-xs text-gray-500 font-mono">
                    {new Date(m.date + "T00:00:00").toLocaleDateString(
                      "en-US",
                      { month: "long", day: "numeric" },
                    )}{" "}
                    · {venue}
                  </div>
                </div>
                <div className="stamp text-gipp-red text-xs">Win</div>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="border-3 border-gray-950 bg-white shadow-brutal">
        <div className="border-b-3 border-gray-950 bg-gray-950 px-4 py-3 text-gipp-cream">
          <h3 className="text-lg font-black uppercase tracking-wider">
            Matches that swing our odds the most
          </h3>
          <p className="text-xs text-gipp-cream/60">
            For each remaining non-GIPP match, how its outcome moves GIPP&apos;s
            playoff probability. Sorted by impact.
          </p>
        </div>
        <ul className="divide-y divide-gray-200">
          {ranked.map((i) => {
            const home = teamMap.get(i.match.home);
            const away = teamMap.get(i.match.away);
            const outcomes = [
              {
                key: "h",
                label: `${home?.shortName ?? i.match.home} W`,
                pct: i.playoffPctIfHomeWin,
                prob: i.homeWinProbPct,
              },
              {
                key: "d",
                label: "Draw",
                pct: i.playoffPctIfDraw,
                prob: i.drawProbPct,
              },
              {
                key: "a",
                label: `${away?.shortName ?? i.match.away} W`,
                pct: i.playoffPctIfAwayWin,
                prob: i.awayWinProbPct,
              },
            ];
            const best = [...outcomes].sort((a, b) => b.pct - a.pct)[0];

            return (
              <li key={i.match.home + i.match.away} className="px-4 py-4">
                <div className="flex items-baseline justify-between gap-2">
                  <div className="font-bold uppercase tracking-wide text-sm">
                    {home?.name ?? i.match.home}{" "}
                    <span className="text-gray-400">vs</span>{" "}
                    {away?.name ?? i.match.away}
                  </div>
                  <div className="text-xs text-gray-500 font-mono">
                    {new Date(i.match.date + "T00:00:00").toLocaleDateString(
                      "en-US",
                      { month: "short", day: "numeric" },
                    )}
                  </div>
                </div>
                <div className="mt-2 text-xs uppercase tracking-widest text-gipp-orange-dark">
                  Best for us: {best.label} → {best.pct.toFixed(0)}%
                </div>
                <div className="mt-2 grid grid-cols-3 gap-2">
                  {outcomes.map((o) => {
                    const isBest = o.key === best.key;
                    return (
                      <div
                        key={o.key}
                        className={
                          "border-2 px-2 py-2 text-center " +
                          (isBest
                            ? "border-gipp-orange bg-gipp-orange/15"
                            : "border-gray-300 bg-gray-50")
                        }
                      >
                        <div className="text-[10px] font-bold uppercase tracking-widest text-gray-600">
                          {o.label}
                        </div>
                        <div className="mt-1 text-lg font-black font-mono tabular-nums">
                          {o.pct.toFixed(0)}%
                        </div>
                        <div className="text-[10px] text-gray-500 font-mono">
                          {o.prob.toFixed(0)}% likely
                        </div>
                      </div>
                    );
                  })}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
