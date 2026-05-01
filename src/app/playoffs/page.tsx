import type { Metadata } from "next";
import { TrendingUp, Target, Trophy } from "lucide-react";
import { GeometricPattern } from "@/components/ui/GeometricPattern";
import { StandingsTable } from "@/components/playoffs/StandingsTable";
import { OddsBarChart } from "@/components/playoffs/OddsBarChart";
import { RemainingFixtures } from "@/components/playoffs/RemainingFixtures";
import { WinOutScenario } from "@/components/playoffs/WinOutScenario";
import {
  computeOtherMatchImpact,
  getLeague,
  getRemainingMatches,
  predictMatch,
  runSimulation,
} from "@/lib/playoffs";
import { SITE } from "@/data/site";

export const metadata: Metadata = {
  title: "Playoff Predictions",
  description:
    "Monte Carlo playoff probability dashboard for the Pier 5 9v9 league.",
};

export default function PlayoffsPage() {
  const league = getLeague();

  // Baseline simulation: every remaining match simulated freely
  const baseline = runSimulation(league, { iterations: 12000, rngSeed: 1234 });

  // Win-out simulation: force GIPP to win every remaining match
  const winOut = runSimulation(league, {
    iterations: 12000,
    rngSeed: 5678,
    forcedResults: [{ teamId: league.myTeamId, outcome: "win" }],
  });

  const remaining = getRemainingMatches(league.matches);
  const myMatches = remaining.filter(
    (m) => m.home === league.myTeamId || m.away === league.myTeamId,
  );

  const fixturesWithPredictions = remaining.map((m) => ({
    match: m,
    prediction: predictMatch(league, m),
  }));

  const impacts = computeOtherMatchImpact(
    league,
    league.myTeamId,
    2500,
    false, // baseline: don't force GIPP wins, just measure raw impact of each match
  );

  const myBaselineOdds = baseline.odds.find(
    (o) => o.teamId === league.myTeamId,
  )!;

  const matchdaysPlayed = Math.max(
    ...league.matches
      .filter((m) => m.homeScore !== null)
      .map((m) => m.matchday),
  );
  const matchdaysTotal = Math.max(...league.matches.map((m) => m.matchday));

  return (
    <>
      {/* Header */}
      <section className="relative overflow-hidden bg-gray-950 py-20 sm:py-24 grain">
        <GeometricPattern colorScheme="dark" opacity={0.15} />
        <div className="relative z-10 mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
          <Trophy
            className="mx-auto mb-4 h-10 w-10 text-gipp-orange"
            aria-hidden
          />
          <div className="mb-4">
            <span className="stamp text-gipp-orange/80 text-xs">
              Spring 2026 · Pier 5
            </span>
          </div>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black uppercase tracking-widest text-gipp-cream">
            Playoff Race
          </h1>
          <p className="mt-4 text-lg text-gipp-cream/70">
            Monte Carlo probabilities for a top-{league.playoffSpots} finish.
            Updated through Matchday {matchdaysPlayed} of {matchdaysTotal}.
          </p>
          <p className="mt-2 text-xs uppercase tracking-widest text-gipp-cream/40">
            {baseline.iterations.toLocaleString()} simulated seasons · Poisson
            scoring model
          </p>
        </div>
      </section>

      {/* GIPP hero number */}
      <section className="bg-gipp-cream-light px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="border-3 border-gray-950 bg-white shadow-brutal-lg">
            <div className="grid grid-cols-1 md:grid-cols-3">
              <HeroStat
                label="GIPP playoff odds"
                value={`${myBaselineOdds.playoffPct.toFixed(0)}%`}
                sub={`avg finish: #${myBaselineOdds.avgFinish.toFixed(1)}`}
                icon={<TrendingUp className="h-6 w-6" />}
                accent
              />
              <HeroStat
                label="Matches remaining"
                value={`${myMatches.length}`}
                sub={myMatches
                  .map((m) =>
                    m.home === league.myTeamId
                      ? `vs ${shortName(league, m.away)}`
                      : `@ ${shortName(league, m.home)}`,
                  )
                  .join(" · ")}
                icon={<Target className="h-6 w-6" />}
              />
              <HeroStat
                label="If we win out"
                value={`${winOut.odds.find((o) => o.teamId === league.myTeamId)!.playoffPct.toFixed(0)}%`}
                sub="chance to make top 4"
                icon={<Trophy className="h-6 w-6" />}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Standings */}
      <section className="bg-gipp-cream-light px-4 pb-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <SectionLabel>Current Standings</SectionLabel>
          <StandingsTable
            league={league}
            standings={baseline.baseStandings}
          />
        </div>
      </section>

      {/* Playoff odds chart */}
      <section className="bg-white px-4 py-12 sm:px-6 lg:px-8 border-y-3 border-gray-950">
        <div className="mx-auto max-w-5xl">
          <SectionLabel>Playoff Probability</SectionLabel>
          <OddsBarChart
            league={league}
            odds={baseline.odds}
            title="Baseline Forecast"
            subtitle={`% of ${baseline.iterations.toLocaleString()} simulated seasons in which each team finishes top ${league.playoffSpots}`}
          />
        </div>
      </section>

      {/* GIPP scenario */}
      <section className="bg-gipp-cream-light px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <SectionLabel>GIPP Scenario · Win Out</SectionLabel>
          <WinOutScenario
            league={league}
            baselineOdds={baseline.odds}
            winOutOdds={winOut.odds}
            myMatches={myMatches}
            impacts={impacts}
          />
        </div>
      </section>

      {/* Remaining fixtures */}
      <section className="bg-white px-4 py-12 sm:px-6 lg:px-8 border-t-3 border-gray-950">
        <div className="mx-auto max-w-5xl">
          <SectionLabel>Remaining Fixtures · Predictions</SectionLabel>
          <RemainingFixtures
            league={league}
            fixtures={fixturesWithPredictions}
          />
        </div>
      </section>

      {/* Methodology */}
      <section className="bg-gray-950 px-4 py-12 sm:px-6 lg:px-8 text-gipp-cream">
        <div className="mx-auto max-w-3xl">
          <SectionLabel light>Methodology</SectionLabel>
          <div className="space-y-4 text-sm text-gipp-cream/80">
            <p>
              Each team gets an attack and defense rating derived from results
              so far, shrunk toward the league average to soften small samples.
              Expected goals in any match are{" "}
              <code className="font-mono text-gipp-orange">
                attack_A × defense_B × league_avg
              </code>
              , then sampled from a Poisson distribution.
            </p>
            <p>
              We simulate the remaining {remaining.length} matches{" "}
              {baseline.iterations.toLocaleString()} times, build the final
              table for each simulated season, and count how often each team
              lands in the top {league.playoffSpots}. Tiebreakers: points → goal
              difference → goals scored.
            </p>
            <p>
              The &ldquo;win out&rdquo; panel forces every GIPP match to a win (via
              rejection-sampled Poisson scorelines), then re-simulates
              everything else to surface which other matchups matter most for
              our seeding.
            </p>
            <p className="text-xs text-gipp-cream/40">
              Source data:{" "}
              <a
                href={league.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gipp-orange hover:underline"
              >
                {SITE.league} fixtures page
              </a>
              . Model is intentionally simple — a recreational league with 6–8
              games per side doesn&apos;t have enough sample for anything fancier.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

function HeroStat({
  label,
  value,
  sub,
  icon,
  accent,
}: {
  label: string;
  value: string;
  sub: string;
  icon: React.ReactNode;
  accent?: boolean;
}) {
  return (
    <div
      className={
        "relative px-6 py-6 " +
        (accent ? "bg-gipp-orange text-gray-950" : "bg-white") +
        " border-r-0 last:border-r-0 md:[&:not(:last-child)]:border-r-3 md:border-gray-950 [&:not(:last-child)]:border-b-3 md:[&:not(:last-child)]:border-b-0"
      }
    >
      <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.25em]">
        {icon}
        {label}
      </div>
      <div className="mt-2 text-5xl font-black tabular-nums">{value}</div>
      <div
        className={
          "mt-1 text-xs uppercase tracking-wider " +
          (accent ? "text-gray-950/70" : "text-gray-500")
        }
      >
        {sub}
      </div>
    </div>
  );
}

function SectionLabel({
  children,
  light,
}: {
  children: React.ReactNode;
  light?: boolean;
}) {
  return (
    <h2
      className={
        "mb-6 text-xs font-black uppercase tracking-[0.3em] " +
        (light ? "text-gipp-orange" : "text-gipp-orange-dark")
      }
    >
      {children}
    </h2>
  );
}

function shortName(
  league: ReturnType<typeof getLeague>,
  teamId: string,
): string {
  return (
    league.teams.find((t) => t.id === teamId)?.shortName ?? teamId
  );
}
