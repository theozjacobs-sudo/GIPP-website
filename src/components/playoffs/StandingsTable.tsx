import type { LeagueData, StandingsRow } from "@/types/league";

interface Props {
  league: LeagueData;
  standings: StandingsRow[];
}

export function StandingsTable({ league, standings }: Props) {
  const teamMap = new Map(league.teams.map((t) => [t.id, t]));

  return (
    <div className="overflow-x-auto border-3 border-gray-950 bg-white shadow-brutal">
      <table className="w-full text-sm">
        <thead className="bg-gray-950 text-gipp-cream">
          <tr>
            <th className="px-2 py-3 text-left font-black uppercase tracking-widest text-xs">#</th>
            <th className="px-2 py-3 text-left font-black uppercase tracking-widest text-xs">Team</th>
            <th className="px-2 py-3 text-center font-black uppercase tracking-widest text-xs">P</th>
            <th className="px-2 py-3 text-center font-black uppercase tracking-widest text-xs">W</th>
            <th className="px-2 py-3 text-center font-black uppercase tracking-widest text-xs">D</th>
            <th className="px-2 py-3 text-center font-black uppercase tracking-widest text-xs">L</th>
            <th className="px-2 py-3 text-center font-black uppercase tracking-widest text-xs">GF</th>
            <th className="px-2 py-3 text-center font-black uppercase tracking-widest text-xs">GA</th>
            <th className="px-2 py-3 text-center font-black uppercase tracking-widest text-xs">GD</th>
            <th className="px-2 py-3 text-center font-black uppercase tracking-widest text-xs">PTS</th>
          </tr>
        </thead>
        <tbody>
          {standings.map((row, i) => {
            const team = teamMap.get(row.teamId);
            const inPlayoffs = i < league.playoffSpots;
            const isMyTeam = row.teamId === league.myTeamId;
            const cutoff = i === league.playoffSpots - 1;
            return (
              <tr
                key={row.teamId}
                className={
                  "border-t border-gray-200 " +
                  (isMyTeam
                    ? "bg-gipp-orange/15 font-semibold"
                    : inPlayoffs
                    ? "bg-green-50"
                    : "bg-white") +
                  (cutoff ? " border-b-4 border-b-gray-950" : "")
                }
              >
                <td className="px-2 py-3 font-mono text-gray-500">
                  <span className="inline-flex items-center gap-2">
                    {i + 1}
                    {inPlayoffs && (
                      <span className="inline-block h-2 w-2 rounded-full bg-green-600" aria-hidden />
                    )}
                  </span>
                </td>
                <td className="px-2 py-3 font-bold uppercase tracking-wide">
                  {team?.name ?? row.teamId}
                </td>
                <td className="px-2 py-3 text-center font-mono">{row.played}</td>
                <td className="px-2 py-3 text-center font-mono text-green-700">{row.wins}</td>
                <td className="px-2 py-3 text-center font-mono text-gray-500">{row.draws}</td>
                <td className="px-2 py-3 text-center font-mono text-gipp-red">{row.losses}</td>
                <td className="px-2 py-3 text-center font-mono">{row.goalsFor}</td>
                <td className="px-2 py-3 text-center font-mono">{row.goalsAgainst}</td>
                <td className="px-2 py-3 text-center font-mono">
                  {row.goalDifference > 0 ? "+" : ""}
                  {row.goalDifference}
                </td>
                <td className="px-2 py-3 text-center font-mono font-black text-base">
                  {row.points}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="border-t-3 border-gray-950 bg-gipp-cream-light px-4 py-2 text-xs text-gray-600">
        <span className="inline-block h-2 w-2 rounded-full bg-green-600 align-middle mr-2" />
        Top {league.playoffSpots} qualify for playoffs
      </div>
    </div>
  );
}
