import { PlayerStats, Track, MusicGenre, Beat, Equipment } from '../types';

// ─── Track Quality Calculation ────────────────────────────────────────────────

/**
 * Calculates the quality score (0-100) of a track based on player stats,
 * equipment bonuses, and a random creativity factor.
 */
export function calculateTrackQuality(
  stats: PlayerStats,
  genre: MusicGenre,
  beat: Beat | null,
  equipment: Equipment[]
): number {
  const talentWeight = 0.4;
  const productionWeight = 0.3;
  const beatWeight = 0.2;
  const creativityWeight = 0.1;

  const equipmentBonus = equipment.reduce((sum, e) => sum + e.qualityBonus, 0);
  const beatQuality = beat ? beat.qualityScore : 30;
  const creativity = Math.random() * 30 + 10; // 10–40 random factor
  const genreBonus = getGenreStatBonus(stats, genre);

  const raw =
    stats.talent * talentWeight +
    (stats.production + Math.min(equipmentBonus, 20)) * productionWeight +
    beatQuality * beatWeight +
    creativity * creativityWeight +
    genreBonus;

  return Math.min(100, Math.round(raw));
}

/**
 * Returns a bonus based on how well the player's stats align with a genre.
 */
function getGenreStatBonus(stats: PlayerStats, genre: MusicGenre): number {
  const genreStatMap: Partial<Record<MusicGenre, keyof PlayerStats>> = {
    'Afrobeats': 'charisma',
    'Amapiano': 'charisma',
    'K-Pop': 'charisma',
    'J-Pop': 'charisma',
    'Country': 'talent',
    'Hip-Hop': 'talent',
    'Electronic': 'production',
    'Grime': 'talent',
    'Drill': 'production',
    'Baile Funk': 'charisma',
    'Samba': 'talent',
    'Reggaeton': 'charisma',
    'R&B': 'talent',
    'Pop': 'charisma',
  };

  const primaryStat = genreStatMap[genre];
  return primaryStat ? stats[primaryStat] * 0.15 : stats.talent * 0.1;
}

// ─── Stream Projection ────────────────────────────────────────────────────────

/**
 * Projects initial streams for a track based on quality and regional reputation.
 */
export function projectInitialStreams(
  qualityScore: number,
  regionReputation: number,
  globalReach: number
): number {
  const base = qualityScore * 100;
  const repMultiplier = 1 + regionReputation / 50;
  const reachBonus = globalReach * 200;
  const viral = Math.random() < 0.05 ? 5 : 1; // 5% chance of viral boost

  return Math.floor((base * repMultiplier + reachBonus) * viral);
}

// ─── Reputation Gain ─────────────────────────────────────────────────────────

export function calculateRepGain(track: Track, charisma: number): number {
  const base = track.qualityScore * 0.5;
  const charismaBonus = charisma * 0.2;
  return Math.min(20, Math.round(base + charismaBonus));
}

// ─── XP Calculation ──────────────────────────────────────────────────────────

export function calculateTrackXP(qualityScore: number, streams: number): number {
  const qualityXP = qualityScore * 2;
  const streamXP = Math.min(streams / 1000, 200);
  return Math.round(qualityXP + streamXP);
}

export function calculatePerformanceXP(venuePrestge: number, audienceReaction: number): number {
  return Math.round(venuePrestge * 50 + audienceReaction * 30);
}

// ─── Performance Outcome ─────────────────────────────────────────────────────

export type PerformanceResult = {
  success: boolean;
  audienceReaction: number; // 0-100
  repGained: number;
  moneyEarned: number;
  xpEarned: number;
};

export function simulatePerformance(
  stats: PlayerStats,
  venuePrestige: number,
  regionReputation: number
): PerformanceResult {
  const performanceScore =
    stats.talent * 0.4 +
    stats.charisma * 0.4 +
    regionReputation * 0.2 +
    (Math.random() * 20 - 10); // variance

  const audienceReaction = Math.min(100, Math.max(0, Math.round(performanceScore)));
  const success = audienceReaction >= 40;
  const repGained = success ? Math.round(audienceReaction * 0.3 * venuePrestige) : 0;
  const moneyEarned = success ? Math.round(audienceReaction * venuePrestige * 10) : 0;
  const xpEarned = calculatePerformanceXP(venuePrestige, audienceReaction);

  return { success, audienceReaction, repGained, moneyEarned, xpEarned };
}

// ─── Contract Negotiation ────────────────────────────────────────────────────

export type ContractOffer = {
  royaltyRate: number;
  advanceMoney: number;
  albumsOwed: number;
  durationDays: number;
};

export function generateContractOffer(
  businessStat: number,
  reputation: number,
  globalReach: number
): ContractOffer {
  const negotiationPower = (businessStat + reputation + globalReach) / 3;
  const royaltyRate = Math.min(0.5, 0.15 + negotiationPower * 0.003);
  const advance = Math.round(negotiationPower * 500 + Math.random() * 5000);
  const albumsOwed = negotiationPower > 50 ? 2 : 3;
  const durationDays = 365;

  return { royaltyRate, advanceMoney: advance, albumsOwed, durationDays };
}

// ─── Level Up Message ────────────────────────────────────────────────────────

export function getLevelTitle(level: number): string {
  const titles: Record<number, string> = {
    1: 'Open Mic Rookie',
    3: 'Street Buzz',
    5: 'Local Name',
    8: 'Regional Act',
    12: 'Continental Star',
    16: 'Global Rising',
    20: 'World Stage Icon',
    25: 'Legend',
  };

  const thresholds = Object.keys(titles).map(Number).sort((a, b) => b - a);
  const matched = thresholds.find((t) => level >= t);
  return matched ? titles[matched] : 'Unknown';
}
