import { Region } from '../types';

export const REGIONS: Region[] = [
  // ─── STARTER REGION ─────────────────────────────────────────────────────────
  {
    id: 'lagos',
    name: 'Lagos',
    country: 'Nigeria',
    continent: 'Africa',
    description:
      'The heartbeat of African music. Lagos is where Afrobeats was born — a city of hustle, creativity, and relentless energy. Every street corner has a sound.',
    dominantGenres: ['Afrobeats', 'Highlife', 'Afro-House'],
    unlockRequirement: {},
    vibe: 'Electric, soulful, unstoppable',
    primaryColor: '#1DB954',
    accentColor: '#F5A623',
    npcs: [],
    venues: [
      { id: 'eko_hotel_stage', name: 'Eko Hotel Stage', regionId: 'lagos', capacity: 2000, prestige: 4, performanceCost: 5000, minReputation: 30 },
      { id: 'surulere_club', name: 'Surulere Sound Club', regionId: 'lagos', capacity: 400, prestige: 2, performanceCost: 500, minReputation: 0 },
    ],
    events: [
      { id: 'afronation_lagos', name: 'Afronation Lagos', regionId: 'lagos', type: 'Festival', description: 'The biggest Afrobeats festival on the continent.', entryRequirement: { minLevel: 5, minGlobalReach: 20 }, reputationBoost: 35 },
      { id: 'lagos_open_mic', name: 'Lekki Open Mic Night', regionId: 'lagos', type: 'Open Mic', description: 'Where legends start. Show your raw talent.', entryRequirement: {}, reputationBoost: 5 },
    ],
  },

  // ─── REGION 2 ────────────────────────────────────────────────────────────────
  {
    id: 'seoul',
    name: 'Seoul',
    country: 'South Korea',
    continent: 'Asia',
    description:
      'The K-Pop machine. Seoul operates on precision, image, and fandoms that move like armies. Breaking into the Korean market means mastering performance, visuals, and social strategy.',
    dominantGenres: ['K-Pop', 'Hip-Hop', 'R&B'],
    unlockRequirement: { minLevel: 5, minGlobalReach: 15 },
    vibe: 'Polished, intense, viral',
    primaryColor: '#6C63FF',
    accentColor: '#FF6B8A',
    npcs: [],
    venues: [
      { id: 'olympic_gymnasium', name: 'Seoul Olympic Gymnasium', regionId: 'seoul', capacity: 15000, prestige: 5, performanceCost: 50000, minReputation: 70 },
      { id: 'hongdae_club', name: 'Hongdae Underground Club', regionId: 'seoul', capacity: 200, prestige: 2, performanceCost: 800, minReputation: 0 },
    ],
    events: [
      { id: 'mama_awards', name: 'MAMA Awards', regionId: 'seoul', type: 'Award Show', description: 'Asia\'s most prestigious music awards. A global broadcast moment.', entryRequirement: { minLevel: 10, minGlobalReach: 40 }, reputationBoost: 50 },
      { id: 'hongdae_battle', name: 'Hongdae Dance & Rap Battle', regionId: 'seoul', type: 'Battle', description: 'Street credibility is everything here.', entryRequirement: { minLevel: 3 }, reputationBoost: 10 },
    ],
  },

  // ─── REGION 3 ────────────────────────────────────────────────────────────────
  {
    id: 'london',
    name: 'London',
    country: 'United Kingdom',
    continent: 'Europe',
    description:
      'The birthplace of Grime and Drill. London\'s underground scenes turn into global movements — if you earn the respect of the ends, the world follows.',
    dominantGenres: ['Grime', 'Drill', 'R&B', 'Electronic'],
    unlockRequirement: { minLevel: 4, minGlobalReach: 10 },
    vibe: 'Gritty, creative, influential',
    primaryColor: '#1A1A2E',
    accentColor: '#E94560',
    npcs: [],
    venues: [
      { id: 'o2_arena', name: 'The O2 Arena', regionId: 'london', capacity: 20000, prestige: 5, performanceCost: 80000, minReputation: 75 },
      { id: 'fabric_london', name: 'Fabric', regionId: 'london', capacity: 1500, prestige: 4, performanceCost: 3000, minReputation: 25 },
      { id: 'ends_yard', name: 'The Ends Yard', regionId: 'london', capacity: 150, prestige: 1, performanceCost: 200, minReputation: 0 },
    ],
    events: [
      { id: 'brit_awards', name: 'BRIT Awards', regionId: 'london', type: 'Award Show', description: 'The pinnacle of British music recognition.', entryRequirement: { minLevel: 12, minGlobalReach: 50 }, reputationBoost: 45 },
      { id: 'notting_hill_carnival', name: 'Notting Hill Carnival', regionId: 'london', type: 'Festival', description: 'Culture, community, and sound systems.', entryRequirement: { minLevel: 4 }, reputationBoost: 20 },
    ],
  },

  // ─── REGION 4 ────────────────────────────────────────────────────────────────
  {
    id: 'atlanta',
    name: 'Atlanta',
    country: 'United States',
    continent: 'North America',
    description:
      'ATL is the capital of Hip-Hop and trap. The city moves culture — a co-sign here echoes globally. Labels, producers, and artists converge in one magnetic hub.',
    dominantGenres: ['Hip-Hop', 'R&B', 'Trap'],
    unlockRequirement: { minLevel: 6, minGlobalReach: 20 },
    vibe: 'Trap, raw, influential',
    primaryColor: '#FF4E00',
    accentColor: '#FFCC00',
    npcs: [],
    venues: [
      { id: 'state_farm_arena', name: 'State Farm Arena', regionId: 'atlanta', capacity: 21000, prestige: 5, performanceCost: 90000, minReputation: 80 },
      { id: 'magic_city', name: 'Magic City Studio Lounge', regionId: 'atlanta', capacity: 300, prestige: 3, performanceCost: 1500, minReputation: 10 },
    ],
    events: [
      { id: 'ath_music_midtown', name: 'Music Midtown', regionId: 'atlanta', type: 'Festival', description: 'ATL\'s biggest outdoor festival.', entryRequirement: { minLevel: 8, minGlobalReach: 30 }, reputationBoost: 40 },
    ],
  },

  // ─── REGION 5 ────────────────────────────────────────────────────────────────
  {
    id: 'sao_paulo',
    name: 'São Paulo',
    country: 'Brazil',
    continent: 'South America',
    description:
      'The beating heart of Latin music innovation. São Paulo blends Baile Funk, Samba, and Bossa Nova with global sounds — a city that never stops dancing.',
    dominantGenres: ['Baile Funk', 'Samba', 'Bossa Nova', 'Latin Pop'],
    unlockRequirement: { minLevel: 5, minGlobalReach: 18 },
    vibe: 'Vibrant, frenetic, soulful',
    primaryColor: '#009C3B',
    accentColor: '#FFDF00',
    npcs: [],
    venues: [
      { id: 'allianz_parque', name: 'Allianz Parque', regionId: 'sao_paulo', capacity: 45000, prestige: 5, performanceCost: 100000, minReputation: 85 },
      { id: 'favela_stage', name: 'Vila Madalena Stage', regionId: 'sao_paulo', capacity: 500, prestige: 2, performanceCost: 600, minReputation: 0 },
    ],
    events: [
      { id: 'lollapalooza_br', name: 'Lollapalooza Brasil', regionId: 'sao_paulo', type: 'Festival', description: 'One of the world\'s top festivals, now on South American soil.', entryRequirement: { minLevel: 10, minGlobalReach: 45 }, reputationBoost: 50 },
    ],
  },

  // ─── REGION 6 ────────────────────────────────────────────────────────────────
  {
    id: 'nashville',
    name: 'Nashville',
    country: 'United States',
    continent: 'North America',
    description:
      'Music City. Nashville is the home of Country music and songwriting craft. The publishing houses here control billion-dollar catalogues. Authenticity is currency.',
    dominantGenres: ['Country', 'Rock', 'Pop'],
    unlockRequirement: { minLevel: 7, minGlobalReach: 15 },
    vibe: 'Authentic, narrative-driven, storied',
    primaryColor: '#8B4513',
    accentColor: '#FFD700',
    npcs: [],
    venues: [
      { id: 'grand_ole_opry', name: 'Grand Ole Opry', regionId: 'nashville', capacity: 4400, prestige: 5, performanceCost: 20000, minReputation: 60 },
      { id: 'lower_broadway', name: 'Lower Broadway Honky-Tonk', regionId: 'nashville', capacity: 200, prestige: 2, performanceCost: 300, minReputation: 0 },
    ],
    events: [
      { id: 'cma_awards', name: 'CMA Awards', regionId: 'nashville', type: 'Award Show', description: 'Country Music\'s night of nights.', entryRequirement: { minLevel: 11, minGlobalReach: 35 }, reputationBoost: 40 },
    ],
  },

  // ─── REGION 7 ────────────────────────────────────────────────────────────────
  {
    id: 'johannesburg',
    name: 'Johannesburg',
    country: 'South Africa',
    continent: 'Africa',
    description:
      'Joburg is where Amapiano was born — a genre that went from township parties to global playlists in five years. Log drums, piano, and a deep groove define this city.',
    dominantGenres: ['Amapiano', 'Afro-House', 'Afrobeats'],
    unlockRequirement: { minLevel: 6, minGlobalReach: 22 },
    vibe: 'Deep, grooving, township pride',
    primaryColor: '#00ADEF',
    accentColor: '#FDB913',
    npcs: [],
    venues: [
      { id: 'fnb_stadium', name: 'FNB Stadium', regionId: 'johannesburg', capacity: 94000, prestige: 5, performanceCost: 120000, minReputation: 90 },
      { id: 'jozi_yard', name: 'Jozi Yard', regionId: 'johannesburg', capacity: 600, prestige: 3, performanceCost: 800, minReputation: 15 },
    ],
    events: [
      { id: 'standard_bank_joy', name: 'Standard Bank Joy of Jazz', regionId: 'johannesburg', type: 'Festival', description: 'A celebration of jazz and its African roots.', entryRequirement: { minLevel: 7, minGlobalReach: 28 }, reputationBoost: 35 },
    ],
  },

  // ─── REGION 8 (LATE GAME) ────────────────────────────────────────────────────
  {
    id: 'tokyo',
    name: 'Tokyo',
    country: 'Japan',
    continent: 'Asia',
    description:
      'Japan\'s music market is one of the world\'s largest — and most unique. Physical sales still matter. Fan clubs are institutions. Idol culture runs deep. Breaking Japan is an achievement few foreign artists have managed.',
    dominantGenres: ['J-Pop', 'Electronic', 'Hip-Hop'],
    unlockRequirement: { minLevel: 12, minGlobalReach: 55, completedQuest: 'seoul_label_deal' },
    vibe: 'Precise, loyal, otherworldly',
    primaryColor: '#FF0050',
    accentColor: '#00D4FF',
    npcs: [],
    venues: [
      { id: 'tokyo_dome', name: 'Tokyo Dome', regionId: 'tokyo', capacity: 55000, prestige: 5, performanceCost: 150000, minReputation: 90 },
      { id: 'shibuya_club', name: 'Shibuya Club Quattro', regionId: 'tokyo', capacity: 700, prestige: 3, performanceCost: 2000, minReputation: 30 },
    ],
    events: [
      { id: 'fuji_rock', name: 'Fuji Rock Festival', regionId: 'tokyo', type: 'Festival', description: 'Japan\'s most prestigious outdoor music festival.', entryRequirement: { minLevel: 14, minGlobalReach: 60 }, reputationBoost: 55 },
    ],
  },
];

export const getRegionById = (id: string): Region | undefined =>
  REGIONS.find((r) => r.id === id);

export const getRegionsByContinent = (continent: string): Region[] =>
  REGIONS.filter((r) => r.continent === continent);

export const getStarterRegion = (): Region => REGIONS[0]; // Lagos
