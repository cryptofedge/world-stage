// ─── Career Path ──────────────────────────────────────────────────────────────

export type CareerPath = 'artist' | 'label';

// ─── Career Phases ────────────────────────────────────────────────────────────

export type ArtistPhase =
  | 'origins'        // Broke, day job, saving money, writing lyrics
  | 'image'          // Build your look before any music
  | 'pre_production' // Beat buying, songwriting, studio hunting
  | 'recording'      // Book & record in the studio
  | 'distribution'   // Upload, release strategy
  | 'promotion'      // Social media, videos, press, playlists
  | 'touring'        // Live shows → world tours
  | 'certified';     // Gold → Platinum → Diamond grind

export type LabelPhase =
  | 'foundation'     // Register LLC, branding, bank account
  | 'scouting'       // Find unsigned talent
  | 'signing'        // Negotiate & lock in contracts
  | 'development'    // Develop artists: image, coaching, beats
  | 'recording'      // Fund studio sessions for artists
  | 'marketing'      // Campaigns, playlists, press, music videos
  | 'touring'        // Book & support tours for your roster
  | 'scaling'        // Multiple artists, sync deals, publishing
  | 'certified';     // Win: one artist hits Diamond

// ─── Certification ────────────────────────────────────────────────────────────

export type CertificationLevel = 'none' | 'gold' | 'platinum' | 'multi_platinum' | 'diamond';

export interface Certification {
  level: CertificationLevel;
  trackId?: string;
  artistId?: string;
  achievedAt?: number;
}

// Thresholds: 150 streams = 1 unit (RIAA standard)
// Gold = 500K units = 75M streams
// Platinum = 1M units = 150M streams
// Multi-Platinum = 2M units = 300M streams
// Diamond = 10M units = 1.5B streams
export const CERT_THRESHOLDS: Record<CertificationLevel, number> = {
  none: 0,
  gold: 75_000_000,
  platinum: 150_000_000,
  multi_platinum: 300_000_000,
  diamond: 1_500_000_000,
};

// ─── Image System ─────────────────────────────────────────────────────────────

export interface ImageProfile {
  completed: boolean;
  aesthetic: ArtistAesthetic | null;
  wardrobeScore: number;     // 0-100
  photoshootDone: boolean;
  pressPhotoUrl: string | null;
  socialSetup: boolean;
  brandColors: string[];
  stylistHired: boolean;
  imageScore: number;        // 0-100 — overall image rating
}

export type ArtistAesthetic =
  | 'Street'
  | 'Luxury'
  | 'Afrocentric'
  | 'Minimalist'
  | 'Avant-garde'
  | 'Vintage'
  | 'Futuristic'
  | 'Raw & Authentic';

export interface WardrobeItem {
  id: string;
  name: string;
  cost: number;
  imageBonus: number;
  aesthetic: ArtistAesthetic;
  description: string;
}

export interface Photographer {
  id: string;
  name: string;
  cost: number;
  quality: number;   // 1-5
  specialty: string;
  description: string;
}

// ─── Social Media ─────────────────────────────────────────────────────────────

export type SocialPlatform = 'Instagram' | 'TikTok' | 'YouTube' | 'Twitter/X' | 'Facebook';

export interface SocialAccount {
  platform: SocialPlatform;
  handle: string;
  followers: number;
  engagementRate: number;  // 0-1
  postsCount: number;
  verified: boolean;
  monthlyGrowth: number;
}

export interface ContentPost {
  id: string;
  platform: SocialPlatform;
  type: 'behind_the_scenes' | 'music_snippet' | 'lifestyle' | 'announcement' | 'challenge' | 'collab';
  quality: number;
  reachGained: number;
  followersGained: number;
  postedAt: number;
}

export interface ViralMoment {
  id: string;
  platform: SocialPlatform;
  description: string;
  followersGained: number;
  streamsGained: number;
  occurredAt: number;
}

// ─── Day Jobs / Hustle ────────────────────────────────────────────────────────

export interface DayJob {
  id: string;
  title: string;
  description: string;
  hourlyPay: number;
  hoursPerShift: number;
  energyCost: number;        // 0-100 — drains time/energy
  timeCostDays: number;      // in-game days per shift
  availablePhases: ArtistPhase[];
}

export interface HustleGig {
  id: string;
  title: string;
  description: string;
  payout: number;
  successChance: number;   // 0-1
  statRequirement?: Partial<PlayerStats>;
  rewardType: 'money' | 'money_and_xp' | 'money_and_rep' | 'network';
}

// ─── Player ──────────────────────────────────────────────────────────────────

export interface Player {
  id: string;
  name: string;
  artistName: string;
  careerPath: CareerPath;
  artistPhase: ArtistPhase;
  level: number;
  xp: number;
  xpToNextLevel: number;
  stats: PlayerStats;
  currentRegionId: string;
  inventory: Inventory;
  reputation: Record<string, number>;   // regionId → 0-100
  relationships: Relationship[];
  discography: Track[];
  achievements: string[];
  certifications: Certification[];
  money: number;
  totalStreams: number;
  socialAccounts: SocialAccount[];
  imageProfile: ImageProfile;
  activeJob: DayJob | null;
  energy: number;           // 0-100 — regenerates each day
  createdAt: number;
}

export interface PlayerStats {
  talent: number;       // 0-100
  charisma: number;     // 0-100
  business: number;     // 0-100
  production: number;   // 0-100
  globalReach: number;  // 0-100
  hustle: number;       // 0-100 — new: grind ethic, work rate
  image: number;        // 0-100 — new: visual brand strength
}

export interface Inventory {
  equipment: Equipment[];
  contracts: Contract[];
  beats: Beat[];
  wardrobeItems: WardrobeItem[];
  merch: MerchLine[];
}

// ─── World ────────────────────────────────────────────────────────────────────

export interface Region {
  id: string;
  name: string;
  country: string;
  continent: Continent;
  description: string;
  dominantGenres: MusicGenre[];
  unlockRequirement: UnlockRequirement;
  vibe: string;
  primaryColor: string;
  accentColor: string;
  npcs: NPC[];
  venues: Venue[];
  events: GameEvent[];
}

export type Continent =
  | 'Africa'
  | 'Asia'
  | 'Europe'
  | 'North America'
  | 'South America'
  | 'Oceania';

e