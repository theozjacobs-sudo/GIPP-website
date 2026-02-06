import type { Player, Enemy, Position } from "@/types";
import teamData from "@/data/team.json";
import enemyData from "@/data/enemies.json";

/**
 * Get the full GIPP F.C. roster, typed and ready to go.
 *
 * Data is loaded from the static JSON seed file at build time.
 * In a production app this would likely hit a CMS or database.
 */
export function getTeamRoster(): Player[] {
  return teamData as Player[];
}

/**
 * Filter the roster by position.
 *
 * @param position - "GK" | "DEF" | "MID" | "FWD"
 * @returns Players in that position, in their original order.
 *
 * @example
 * const midfielders = getTeamByPosition("MID");
 */
export function getTeamByPosition(position: Position): Player[] {
  return getTeamRoster().filter((p) => p.position === position);
}

/**
 * Look up a single player by their unique ID.
 *
 * @returns The matching Player, or `undefined` if not found.
 */
export function getPlayerById(id: string): Player | undefined {
  return getTeamRoster().find((p) => p.id === id);
}

/**
 * Get all rival teams, sorted by threat level (highest threat first).
 *
 * If two enemies share the same threat level they are sub-sorted
 * by total matches played (descending) for consistency.
 */
export function getEnemies(): Enemy[] {
  return (enemyData as Enemy[]).sort((a, b) => {
    if (b.threatLevel !== a.threatLevel) {
      return b.threatLevel - a.threatLevel;
    }
    const totalA = a.record.wins + a.record.losses + a.record.draws;
    const totalB = b.record.wins + b.record.losses + b.record.draws;
    return totalB - totalA;
  });
}

/**
 * Look up a single enemy by their unique ID.
 *
 * @returns The matching Enemy, or `undefined` if not found.
 */
export function getEnemyById(id: string): Enemy | undefined {
  return (enemyData as Enemy[]).find((e) => e.id === id);
}

/**
 * Roster stats at a glance.
 */
export function getRosterStats() {
  const roster = getTeamRoster();
  return {
    total: roster.length,
    byPosition: {
      GK: roster.filter((p) => p.position === "GK").length,
      DEF: roster.filter((p) => p.position === "DEF").length,
      MID: roster.filter((p) => p.position === "MID").length,
      FWD: roster.filter((p) => p.position === "FWD").length,
    },
    captains: roster.filter((p) => p.isCaptain),
  };
}
