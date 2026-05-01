import type {
  LeagueData,
  LeagueMatch,
  LeagueTeam,
  MatchImpact,
  MatchPrediction,
  PlayoffOdds,
  SimulationResult,
  StandingsRow,
  TeamStrength,
} from "@/types/league";
import leagueData from "@/data/league.json";

export function getLeague(): LeagueData {
  return leagueData as LeagueData;
}

export function getPlayedMatches(matches: LeagueMatch[]): LeagueMatch[] {
  return matches.filter(
    (m) => m.homeScore !== null && m.awayScore !== null,
  );
}

export function getRemainingMatches(matches: LeagueMatch[]): LeagueMatch[] {
  return matches.filter(
    (m) => m.homeScore === null || m.awayScore === null,
  );
}

export function computeStandings(
  teams: LeagueTeam[],
  matches: LeagueMatch[],
): StandingsRow[] {
  const rows = new Map<string, StandingsRow>();
  for (const t of teams) {
    rows.set(t.id, {
      teamId: t.id,
      played: 0,
      wins: 0,
      draws: 0,
      losses: 0,
      goalsFor: 0,
      goalsAgainst: 0,
      goalDifference: 0,
      points: 0,
    });
  }

  for (const m of getPlayedMatches(matches)) {
    const home = rows.get(m.home);
    const away = rows.get(m.away);
    if (!home || !away) continue;
    const hs = m.homeScore as number;
    const as_ = m.awayScore as number;

    home.played += 1;
    away.played += 1;
    home.goalsFor += hs;
    home.goalsAgainst += as_;
    away.goalsFor += as_;
    away.goalsAgainst += hs;

    if (hs > as_) {
      home.wins += 1;
      away.losses += 1;
      home.points += 3;
    } else if (hs < as_) {
      away.wins += 1;
      home.losses += 1;
      away.points += 3;
    } else {
      home.draws += 1;
      away.draws += 1;
      home.points += 1;
      away.points += 1;
    }
  }

  const allRows = Array.from(rows.values());
  for (const r of allRows) {
    r.goalDifference = r.goalsFor - r.goalsAgainst;
  }

  return sortStandings(allRows);
}

export function sortStandings(rows: StandingsRow[]): StandingsRow[] {
  return [...rows].sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points;
    if (b.goalDifference !== a.goalDifference)
      return b.goalDifference - a.goalDifference;
    if (b.goalsFor !== a.goalsFor) return b.goalsFor - a.goalsFor;
    return a.teamId.localeCompare(b.teamId);
  });
}

/**
 * Estimate per-team attack and defense multipliers from played matches.
 * The model is Poisson with team-specific scoring/conceding rates,
 * shrunk toward the league average to avoid wild swings on small samples.
 */
export function computeTeamStrengths(
  teams: LeagueTeam[],
  matches: LeagueMatch[],
): { strengths: Map<string, TeamStrength>; leagueAvgGoals: number } {
  const played = getPlayedMatches(matches);
  let totalGoals = 0;
  let totalTeamGames = 0;
  const goalsFor = new Map<string, number>();
  const goalsAgainst = new Map<string, number>();
  const games = new Map<string, number>();

  for (const t of teams) {
    goalsFor.set(t.id, 0);
    goalsAgainst.set(t.id, 0);
    games.set(t.id, 0);
  }

  for (const m of played) {
    const hs = m.homeScore as number;
    const as_ = m.awayScore as number;
    goalsFor.set(m.home, (goalsFor.get(m.home) ?? 0) + hs);
    goalsAgainst.set(m.home, (goalsAgainst.get(m.home) ?? 0) + as_);
    goalsFor.set(m.away, (goalsFor.get(m.away) ?? 0) + as_);
    goalsAgainst.set(m.away, (goalsAgainst.get(m.away) ?? 0) + hs);
    games.set(m.home, (games.get(m.home) ?? 0) + 1);
    games.set(m.away, (games.get(m.away) ?? 0) + 1);
    totalGoals += hs + as_;
    totalTeamGames += 2;
  }

  const leagueAvgGoals = totalGoals / Math.max(totalTeamGames, 1); // per team-game
  const strengths = new Map<string, TeamStrength>();

  // Shrinkage: pretend each team has K phantom games at league average.
  // K=3 keeps small-sample teams from skewing predictions.
  const K = 3;

  for (const t of teams) {
    const gp = games.get(t.id) ?? 0;
    const gf = goalsFor.get(t.id) ?? 0;
    const ga = goalsAgainst.get(t.id) ?? 0;
    const attackRate =
      (gf + K * leagueAvgGoals) / (gp + K) / leagueAvgGoals;
    const defenseRate =
      (ga + K * leagueAvgGoals) / (gp + K) / leagueAvgGoals;
    strengths.set(t.id, {
      attack: attackRate,
      defense: defenseRate,
      gamesPlayed: gp,
    });
  }

  return { strengths, leagueAvgGoals };
}

function poissonSample(lambda: number, rng: () => number): number {
  // Knuth's algorithm — fine for typical 9v9 lambdas (~0.5-4)
  if (lambda <= 0) return 0;
  const L = Math.exp(-lambda);
  let k = 0;
  let p = 1;
  while (true) {
    k += 1;
    p *= rng();
    if (p <= L) return k - 1;
    if (k > 30) return k - 1; // safety
  }
}

function expectedGoals(
  attackerStrength: TeamStrength,
  defenderStrength: TeamStrength,
  leagueAvgGoals: number,
): number {
  return attackerStrength.attack * defenderStrength.defense * leagueAvgGoals;
}

interface SimMatchResult {
  homeScore: number;
  awayScore: number;
}

function simulateMatch(
  m: LeagueMatch,
  strengths: Map<string, TeamStrength>,
  leagueAvgGoals: number,
  rng: () => number,
): SimMatchResult {
  const home = strengths.get(m.home);
  const away = strengths.get(m.away);
  if (!home || !away) return { homeScore: 0, awayScore: 0 };
  const lambdaHome = expectedGoals(home, away, leagueAvgGoals);
  const lambdaAway = expectedGoals(away, home, leagueAvgGoals);
  return {
    homeScore: poissonSample(lambdaHome, rng),
    awayScore: poissonSample(lambdaAway, rng),
  };
}

/**
 * Simulate a single team's match conditioned on a forced outcome
 * ("win" / "draw" / "loss") via rejection sampling. Used for win-out scenarios.
 */
function simulateMatchForced(
  m: LeagueMatch,
  forcedTeam: string,
  outcome: "win" | "draw" | "loss",
  strengths: Map<string, TeamStrength>,
  leagueAvgGoals: number,
  rng: () => number,
): SimMatchResult {
  for (let attempt = 0; attempt < 200; attempt++) {
    const r = simulateMatch(m, strengths, leagueAvgGoals, rng);
    const teamIsHome = m.home === forcedTeam;
    const teamScore = teamIsHome ? r.homeScore : r.awayScore;
    const oppScore = teamIsHome ? r.awayScore : r.homeScore;
    if (outcome === "win" && teamScore > oppScore) return r;
    if (outcome === "loss" && teamScore < oppScore) return r;
    if (outcome === "draw" && teamScore === oppScore) return r;
  }
  // Fallback: synthesize a minimal valid scoreline
  if (outcome === "win") {
    return m.home === forcedTeam
      ? { homeScore: 1, awayScore: 0 }
      : { homeScore: 0, awayScore: 1 };
  }
  if (outcome === "loss") {
    return m.home === forcedTeam
      ? { homeScore: 0, awayScore: 1 }
      : { homeScore: 1, awayScore: 0 };
  }
  return { homeScore: 1, awayScore: 1 };
}

interface RunSimulationOptions {
  iterations?: number;
  forcedResults?: { teamId: string; outcome: "win" | "draw" | "loss" }[];
  /** If set, only matches involving this team get forced; matches not in
   *  forcedResults still simulate normally. */
  rngSeed?: number;
}

// Mulberry32 PRNG for deterministic results
function makeRng(seed: number): () => number {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Run Monte Carlo simulation of remaining fixtures.
 *
 * For each iteration:
 *  1. Simulate every remaining match via Poisson
 *  2. Build final standings with current + simulated results
 *  3. Tally the position each team finished in
 *
 * Returns playoff odds (top-N finish %) per team plus distributions.
 */
export function runSimulation(
  league: LeagueData,
  options: RunSimulationOptions = {},
): SimulationResult {
  const iterations = options.iterations ?? 10000;
  const seed = options.rngSeed ?? 42;
  const rng = makeRng(seed);

  const baseStandings = computeStandings(league.teams, league.matches);
  const { strengths, leagueAvgGoals } = computeTeamStrengths(
    league.teams,
    league.matches,
  );
  const remaining = getRemainingMatches(league.matches);

  const positionCounts = new Map<string, number[]>();
  const positionSum = new Map<string, number>();
  for (const t of league.teams) {
    positionCounts.set(t.id, new Array(league.teams.length).fill(0));
    positionSum.set(t.id, 0);
  }

  const baseRows = computeStandings(league.teams, league.matches);

  for (let iter = 0; iter < iterations; iter++) {
    // Clone base standings cheaply
    const sim = new Map<string, StandingsRow>();
    for (const r of baseRows) {
      sim.set(r.teamId, { ...r });
    }

    for (const m of remaining) {
      let result: SimMatchResult;
      const forced = options.forcedResults?.find(
        (f) => f.teamId === m.home || f.teamId === m.away,
      );
      if (forced) {
        result = simulateMatchForced(
          m,
          forced.teamId,
          forced.outcome,
          strengths,
          leagueAvgGoals,
          rng,
        );
      } else {
        result = simulateMatch(m, strengths, leagueAvgGoals, rng);
      }
      const home = sim.get(m.home)!;
      const away = sim.get(m.away)!;
      home.played += 1;
      away.played += 1;
      home.goalsFor += result.homeScore;
      home.goalsAgainst += result.awayScore;
      away.goalsFor += result.awayScore;
      away.goalsAgainst += result.homeScore;
      if (result.homeScore > result.awayScore) {
        home.wins += 1;
        away.losses += 1;
        home.points += 3;
      } else if (result.homeScore < result.awayScore) {
        away.wins += 1;
        home.losses += 1;
        away.points += 3;
      } else {
        home.draws += 1;
        away.draws += 1;
        home.points += 1;
        away.points += 1;
      }
      home.goalDifference = home.goalsFor - home.goalsAgainst;
      away.goalDifference = away.goalsFor - away.goalsAgainst;
    }

    const finalSorted = sortStandings(Array.from(sim.values()));
    finalSorted.forEach((row, idx) => {
      const arr = positionCounts.get(row.teamId)!;
      arr[idx] += 1;
      positionSum.set(
        row.teamId,
        (positionSum.get(row.teamId) ?? 0) + (idx + 1),
      );
    });
  }

  const playoffSpots = league.playoffSpots;
  const odds: PlayoffOdds[] = league.teams.map((t) => {
    const counts = positionCounts.get(t.id)!;
    const playoffSum = counts
      .slice(0, playoffSpots)
      .reduce((a, b) => a + b, 0);
    const topSeed = counts[0];
    const avgFinish = (positionSum.get(t.id) ?? 0) / iterations;
    return {
      teamId: t.id,
      playoffPct: (playoffSum / iterations) * 100,
      topSeedPct: (topSeed / iterations) * 100,
      avgFinish,
      finishDistribution: counts.map((c) => (c / iterations) * 100),
    };
  });

  // Sort by playoff % descending so the dashboard reads top-down
  odds.sort((a, b) => b.playoffPct - a.playoffPct);

  return {
    iterations,
    odds,
    baseStandings,
    remainingFixtures: remaining,
  };
}

export function getTeamMap(league: LeagueData): Map<string, LeagueTeam> {
  return new Map(league.teams.map((t) => [t.id, t]));
}

/**
 * For each remaining match NOT involving my team, compute how my team's playoff
 * odds shift based on each possible outcome. All other matches simulate freely.
 * If `assumeMyTeamWinsOut` is true, my team's matches are forced wins (use this
 * for a "given we win out, do other results matter" view).
 */
export function computeOtherMatchImpact(
  league: LeagueData,
  myTeamId: string,
  iterationsPerOutcome = 3000,
  assumeMyTeamWinsOut = false,
): MatchImpact[] {
  const remaining = getRemainingMatches(league.matches).filter(
    (m) => m.home !== myTeamId && m.away !== myTeamId,
  );

  const impacts: MatchImpact[] = [];

  for (const m of remaining) {
    const variants = [
      { key: "homeWin", force: { teamId: m.home, outcome: "win" as const } },
      { key: "draw", force: { teamId: m.home, outcome: "draw" as const } },
      { key: "awayWin", force: { teamId: m.away, outcome: "win" as const } },
    ];

    const results: Record<string, number> = {};
    for (const v of variants) {
      const forced: { teamId: string; outcome: "win" | "draw" | "loss" }[] = [
        v.force,
      ];
      if (assumeMyTeamWinsOut) {
        forced.push({ teamId: myTeamId, outcome: "win" });
      }
      const sim = runSimulation(league, {
        iterations: iterationsPerOutcome,
        forcedResults: forced,
        rngSeed: hashSeed(m.home + m.away + v.key),
      });
      const myOdds = sim.odds.find((o) => o.teamId === myTeamId);
      results[v.key] = myOdds?.playoffPct ?? 0;
    }

    const outcomeProbs = matchOutcomeProbabilities(league, m, 4000);

    impacts.push({
      match: m,
      homeWinProbPct: outcomeProbs.homeWinPct,
      drawProbPct: outcomeProbs.drawPct,
      awayWinProbPct: outcomeProbs.awayWinPct,
      playoffPctIfHomeWin: results.homeWin,
      playoffPctIfDraw: results.draw,
      playoffPctIfAwayWin: results.awayWin,
    });
  }

  return impacts;
}

export function matchOutcomeProbabilities(
  league: LeagueData,
  m: LeagueMatch,
  iterations = 5000,
): { homeWinPct: number; drawPct: number; awayWinPct: number } {
  const { strengths, leagueAvgGoals } = computeTeamStrengths(
    league.teams,
    league.matches,
  );
  const rng = makeRng(hashSeed(m.home + m.away));
  let h = 0;
  let d = 0;
  let a = 0;
  for (let i = 0; i < iterations; i++) {
    const r = simulateMatch(m, strengths, leagueAvgGoals, rng);
    if (r.homeScore > r.awayScore) h++;
    else if (r.homeScore < r.awayScore) a++;
    else d++;
  }
  return {
    homeWinPct: (h / iterations) * 100,
    drawPct: (d / iterations) * 100,
    awayWinPct: (a / iterations) * 100,
  };
}

function hashSeed(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

export function predictMatch(
  league: LeagueData,
  m: LeagueMatch,
): MatchPrediction {
  const { strengths, leagueAvgGoals } = computeTeamStrengths(
    league.teams,
    league.matches,
  );
  const home = strengths.get(m.home)!;
  const away = strengths.get(m.away)!;
  const lambdaHome = expectedGoals(home, away, leagueAvgGoals);
  const lambdaAway = expectedGoals(away, home, leagueAvgGoals);
  const probs = matchOutcomeProbabilities(league, m, 5000);
  return {
    expectedHome: lambdaHome,
    expectedAway: lambdaAway,
    ...probs,
  };
}
