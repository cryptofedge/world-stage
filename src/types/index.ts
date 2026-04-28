// ─── Player ──────────────────────────────────────────────────────────────────

export interface Player {
  id: string;
  name: string;
  artistName: string;
  level: number;
  xp: number;
  xpToNextLevel: number;
  stats: PlayerStats;
  currentRegionId: string;
  inventory: Inventory;
  reputation: Record<string, number>; // regionId → 0-100
  relationships: Relationship[];
  discography: Track[];
  achievements: string[];
  money: number;
  createdAt: number;
}

export interface PlayerStats {
  talent: number;       // 0-100 — raw musical ability
  charisma: number;     // 0-100 — stage presence, networking
  business: number;     // 0-100 — deal-making, contracts
  production: number;   // 0-100 — studio craft
  globalReach: number;  // 0-100 — cross-cultural appeal
}

export interface Inventory {
  equipment: Equipment[];
  contracts: Contract[];
  beats: Beat[];
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
  vibe: string;          // flavour text
  primaryColor: string;  // hex, for UI theming
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

export type MusicGenre =
  | 'Afrobeats'
  | 'Amapiano'
  | 'K-Pop'
  | 'J-Pop'
  | 'Country'
  | 'Hip-Hop'
  | 'R&B'
  | 'Pop'
  | 'Rock'
  | 'Electronic'
  | 'Dancehall'
  | 'Reggaeton'
  | 'Samba'
  | 'Baile Funk'
  | 'Grime'
  | 'Drill'
  | 'Cumbia'
  | 'Highlife'
  | 'Bossa Nova'
  | 'Latin Pop'
  | 'Bollywood'
  | 'Arabic Pop'
  | 'Afro-House';

export interface UnlockRequirement {
  minLevel?: number;
  minGlobalReach?: number;
  completedQuest?: string;
  minMoney?: number;
}

// ─── NPCs ─────────────────────────────────────────────────────────────────────

export interface NPC {
  id: string;
  name: string;
  role: NPCRole;
  regionId: string;
  description: string;
  affinity: number; // -100 to 100 — starts neutral (0)
  dialogues: Dialogue[];
  offersQuests: string[];
}

export type NPCRole =
  | 'Label Executive'
  | 'Producer'
  | 'Collaborator'
  | 'Manager'
  | 'Journalist'
  | 'Rival Artist'
  | 'Venue Owner'
  | 'Street Promoter'
  | 'Fan'
  | 'Mentor';

export interface Dialogue {
  id: string;
  trigger: 'first_meet' | 'low_affinity' | 'high_affinity' | 'quest_offer' | 'quest_complete';
  text: string;
  responses?: DialogueResponse[];
}

export interface DialogueResponse {
  text: string;
  effect: DialogueEffect;
}

export interface DialogueEffect {
  affinityChange?: number;
  statChange?: Partial<PlayerStats>;
  moneyChange?: number;
  unlockQuest?: string;
  startQuest?: string;
}

// ─── Music Production ─────────────────────────────────────────────────────────

export interface Track {
  id: string;
  title: string;
  genre: MusicGenre;
  regionId: string;
  qualityScore: number; // 0-100
  streams: number;
  releaseDate: number;
  collaborators: string[]; // NPC ids
  reputationGained: Record<string, number>; // regionId → rep earned
}

export interface Beat {
  id: string;
  name: string;
  genre: MusicGenre;
  bpm: number;
  qualityScore: number;
  producerId?: string; // NPC id if purchased
}

export interface Equipment {
  id: string;
  name: string;
  type: 'Microphone' | 'DAW' | 'Interface' | 'Instrument' | 'Headphones';
  qualityBonus: number; // added to track quality rolls
  cost: number;
}

// ─── Business ─────────────────────────────────────────────────────────────────

export interface Contract {
  id: string;
  type: 'Record Deal' | 'Distribution' | 'Endorsement' | 'Publishing' | 'Tour';
  label: string;
  regionId: string;
  royaltyRate: number;    // 0-1
  advanceMoney: number;
  albumsOwed: number;
  expiresAt: number;      // timestamp
  signed: boolean;
}

// ─── Quests & Events ──────────────────────────────────────────────────────────

export interface Quest {
  id: string;
  title: string;
  description: string;
  regionId: string;
  giverNpcId: string;
  objectives: QuestObjective[];
  rewards: QuestReward;
  status: 'locked' | 'available' | 'active' | 'completed' | 'failed';
}

export interface QuestObjective {
  id: string;
  description: string;
  type: 'record_track' | 'perform' | 'meet_npc' | 'earn_money' | 'gain_rep' | 'travel';
  target: number;
  current: number;
  completed: boolean;
}

export interface QuestReward {
  xp: number;
  money: number;
  statBoosts?: Partial<PlayerStats>;
  unlockRegion?: string;
  unlockNpc?: string;
  item?: Equipment | Beat;
}

export interface GameEvent {
  id: string;
  name: string;
  regionId: string;
  type: 'Festival' | 'Award Show' | 'Open Mic' | 'Battle' | 'Showcase';
  description: string;
  entryRequirement: UnlockRequirement;
  reputationBoost: number;
}

export interface Venue {
  id: string;
  name: string;
  regionId: string;
  capacity: number;
  prestige: number; // 1-5
  performanceCost: number;
  minReputation: number;
}

// ─── Relationships ────────────────────────────────────────────────────────────

export interface Relationship {
  npcId: string;
  affinity: number;
  status: 'stranger' | 'acquaintance' | 'ally' | 'collaborator' | 'rival' | 'friend';
  history: string[]; // log of interactions
}

// ─── Game State ───────────────────────────────────────────────────────────────

export type GamePhase = 'main_menu' | 'character_creation' | 'playing' | 'game_over';

export interface GameState {
  phase: GamePhase;
  player: Player | null;
  currentRegionId: string;
  unlockedRegions: string[];
  activeQuests: Quest[];
  completedQuests: string[];
  gameTime: number; // in-game days
  settings: GameSettings;
}

export interface GameSettings {
  musicVolume: number;
  sfxVolume: number;
  notifications: boolean;
  language: string;
}
