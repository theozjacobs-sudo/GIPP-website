export interface LeagueTeam {
  id: string;
  name: string;
  shortName: string;
}

export interface LeagueMatch {
  matchday: number;
  date: string;
  home: string;
  away: string;
  homeScore: number | null;
  awayScore: number | null;
}

export interface LeagueData {
  season: string;
  league: string;
  venue: string;
  playoffSpots: number;
  myTeamId: string;
  sourceUrl: string;
  lastUpdated: string;
  teams: LeagueTeam[];
  matches: LeagueMatch[];
}

export interface StandingsRow {
  teamId: string;
  played: number;
  wins: number;
  draws: number;
  losses: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  points: number;
}

export interface TeamStrength {
  attack: number;
  defense: number;
  gamesPlayed: number;
}

export interface PlayoffOdds {
  teamId: string;
  playoffPct: number;
  topSeedPct: number;
  avgFinish: number;
  finishDistribution: number[];
}

export interface SimulationResult {
  iterations: number;
  odds: PlayoffOdds[];
  baseStandings: StandingsRow[];
  remainingFixtures: LeagueMatch[];
}

export interface MatchPrediction {
  expectedHome: number;
  expectedAway: number;
  homeWinPct: number;
  drawPct: number;
  awayWinPct: number;
}

export interface MatchImpact {
  match: LeagueMatch;
  homeWinProbPct: number;
  drawProbPct: number;
  awayWinProbPct: number;
  playoffPctIfHomeWin: number;
  playoffPctIfDraw: number;
  playoffPctIfAwayWin: number;
}
