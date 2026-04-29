// ─── regions.ts ───────────────────────────────────────────────────────────────
// World Stage — Launch Regions (v1.0)
//
// 🚀 LAUNCH REGIONS (Playable):
//   🇺🇸 USA        — Atlanta (Trap capital) + Nashville (Music City)
//   🇩🇴 DR         — Santo Domingo (Merengue & Bachata birthplace)
//   🇪🇨 Ecuador    — Quito (Andean crossroads) + Guayaquil (Pacific coast sound)
//
// 🔒 COMING SOON (Locked — future updates):
//   Lagos, Seoul, London, São Paulo, Johannesburg, Tokyo
//
// Legal frameworks: musicLaws.ts
// ──────────────────────────────────────────────────────────────────────────────

import { Region } from '../types';
import { isLaunchRegion } from './musicLaws';

// ─── Extended Region type for launch status ───────────────────────────────────

export interface ExtendedRegion extends Region {
  launchStatus: 'available' | 'coming_soon';
  legalRegion: 'usa' | 'dominican_republic' | 'ecuador' | null;
  comingSoonMessage?: string;
  dominantLanguage: string;
  currency: string;
  capitalCity?: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// 🇺🇸  USA — ATLANTA
// Capital of Hip-Hop, Trap, and R&B
// Legal: Copyright Act 1976, Music Modernization Act 2018, DMCA 1998
// PROs: ASCAP / BMI — The MLC — SoundExchange
// ─────────────────────────────────────────────────────────────────────────────

const ATLANTA: ExtendedRegion = {
  id: 'atlanta',
  name: 'Atlanta',
  country: 'United States',
  continent: 'North America',
  dominantLanguage: 'English',
  currency: 'USD',
  capitalCity: 'Atlanta, Georgia',
  legalRegion: 'usa',
  launchStatus: 'available',
  description:
    'ATL is the capital of Hip-Hop and trap. The city moves culture — a co-sign here echoes globally. Labels, producers, and artists converge in one magnetic hub. Register with ASCAP or BMI the day you arrive — every stream, every radio spin is money you\'re leaving on the table without a PRO.',
  dominantGenres: ['Hip-Hop', 'R&B', 'Trap', 'Gospel'],
  unlockRequirement: {},
  vibe: 'Trap, raw, influential',
  primaryColor: '#FF4E00',
  accentColor: '#FFCC00',
  npcs: [],
  venues: [
    {
      id: 'state_farm_arena',
      name: 'State Farm Arena',
      regionId: 'atlanta',
      capacity: 21_000,
      prestige: 5,
      performanceCost: 90_000,
      minReputation: 80,
    },
    {
      id: 'tabernacle_atl',
      name: 'The Tabernacle',
      regionId: 'atlanta',
      capacity: 2_600,
      prestige: 4,
      performanceCost: 8_000,
      minReputation: 40,
    },
    {
      id: 'magic_city_lounge',
      name: 'Magic City Studio Lounge',
      regionId: 'atlanta',
      capacity: 300,
      prestige: 3,
      performanceCost: 1_500,
      minReputation: 10,
    },
    {
      id: 'atl_open_mic',
      name: 'The Vortex Open Mic Night',
      regionId: 'atlanta',
      capacity: 80,
      prestige: 1,
      performanceCost: 0,
      minReputation: 0,
    },
  ],
  events: [
    {
      id: 'music_midtown_atl',
      name: 'Music Midtown Festival',
      regionId: 'atlanta',
      type: 'Festival',
      description: 'Atlanta\'s biggest outdoor festival. Two stages, 40K+ fans, national broadcast.',
      entryRequirement: { minLevel: 8, minGlobalReach: 30 },
      reputationBoost: 40,
    },
    {
      id: 'atl_hip_hop_awards',
      name: 'BET Hip Hop Awards',
      regionId: 'atlanta',
      type: 'Award Show',
      description: 'The most important night in Hip-Hop. Performing or winning here changes your career.',
      entryRequirement: { minLevel: 12, minGlobalReach: 50 },
      reputationBoost: 55,
    },
    {
      id: 'atl_pro_registration',
      name: 'ASCAP/BMI Registration Event',
      regionId: 'atlanta',
      type: 'Business',
      description:
        'Denise Okafor, Esq. hosts a free seminar at the BrickSquare Records offices. Learn US music law, register with a PRO, and set up self-publishing. Free to attend — mandatory for serious artists.',
      entryRequirement: {},
      reputationBoost: 5,
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// 🇺🇸  USA — NASHVILLE
// Music City — Country, Songwriting, Publishing Empires
// Legal: Same US framework + strong songwriter publishing culture
// PROs: ASCAP / BMI (Nashville HQ) — The MLC
// ─────────────────────────────────────────────────────────────────────────────

const NASHVILLE: ExtendedRegion = {
  id: 'nashville',
  name: 'Nashville',
  country: 'United States',
  continent: 'North America',
  dominantLanguage: 'English',
  currency: 'USD',
  capitalCity: 'Nashville, Tennessee',
  legalRegion: 'usa',
  launchStatus: 'available',
  description:
    'Music City. Nashville is the home of Country music and the craft of songwriting. The publishing houses here control billion-dollar catalogues — and BMI is headquartered right here. Authenticity is currency. Own your publishing or lose it forever.',
  dominantGenres: ['Country', 'Americana', 'Rock', 'Pop', 'Gospel'],
  unlockRequirement: { minLevel: 4, minGlobalReach: 10 },
  vibe: 'Authentic, narrative-driven, storied',
  primaryColor: '#8B4513',
  accentColor: '#FFD700',
  npcs: [],
  venues: [
    {
      id: 'grand_ole_opry',
      name: 'Grand Ole Opry',
      regionId: 'nashville',
      capacity: 4_400,
      prestige: 5,
      performanceCost: 20_000,
      minReputation: 60,
    },
    {
      id: 'ryman_auditorium',
      name: 'Ryman Auditorium',
      regionId: 'nashville',
      capacity: 2_362,
      prestige: 5,
      performanceCost: 15_000,
      minReputation: 50,
    },
    {
      id: 'nashville_station_inn',
      name: 'Station Inn',
      regionId: 'nashville',
      capacity: 150,
      prestige: 3,
      performanceCost: 500,
      minReputation: 15,
    },
    {
      id: 'lower_broadway',
      name: 'Lower Broadway Honky-Tonk',
      regionId: 'nashville',
      capacity: 200,
      prestige: 2,
      performanceCost: 300,
      minReputation: 0,
    },
  ],
  events: [
    {
      id: 'cma_awards',
      name: 'CMA Awards',
      regionId: 'nashville',
      type: 'Award Show',
      description: 'Country Music\'s night of nights. A billion households watch worldwide.',
      entryRequirement: { minLevel: 11, minGlobalReach: 35 },
      reputationBoost: 45,
    },
    {
      id: 'country_fan_fest',
      name: 'CMA Music Fest',
      regionId: 'nashville',
      type: 'Festival',
      description: 'Four days of live performances across downtown Nashville. Fan access like nowhere else.',
      entryRequirement: { minLevel: 6, minGlobalReach: 20 },
      reputationBoost: 30,
    },
    {
      id: 'nashville_publishing_summit',
      name: 'Nashville Publishing Summit',
      regionId: 'nashville',
      type: 'Business',
      description:
        'The publishing houses come to you. Learn about co-publishing deals, admin deals, and how to protect your songs. BMI headquarters is two blocks away.',
      entryRequirement: { minLevel: 3 },
      reputationBoost: 8,
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// 🇩🇴  DOMINICAN REPUBLIC — SANTO DOMINGO
// Birthplace of Merengue & Bachata — UNESCO Intangible Cultural Heritage
// Legal: Law 65-00 (2000) — CAFTA-DR (2006)
// Collecting: SGACEDOM (performance + mechanical) — ONDA (registration)
// ─────────────────────────────────────────────────────────────────────────────

const SANTO_DOMINGO: ExtendedRegion = {
  id: 'santo_domingo',
  name: 'Santo Domingo',
  country: 'Dominican Republic',
  continent: 'North America',
  dominantLanguage: 'Spanish',
  currency: 'DOP (Dominican Peso)',
  capitalCity: 'Santo Domingo de Guzmán',
  legalRegion: 'dominican_republic',
  launchStatus: 'available',
  description:
    'The heartbeat of the Caribbean. Santo Domingo is where merengue and bachata were born — both declared UNESCO Intangible Cultural Heritage of Humanity. The city runs on rhythm, passion, and a music industry that punches far above its weight. Register with SGACEDOM and ONDA the moment you land. Moral rights here are iron-clad — your name stays on your music forever.',
  dominantGenres: ['Merengue', 'Bachata', 'Reggaeton', 'Latin Trap', 'Salsa'],
  unlockRequirement: { minLevel: 3, minGlobalReach: 8 },
  vibe: 'Rhythmic, passionate, Caribbean heat',
  primaryColor: '#002D62',
  accentColor: '#CE1126',
  npcs: [],
  venues: [
    {
      id: 'palacio_bellas_artes',
      name: 'Palacio de Bellas Artes',
      regionId: 'santo_domingo',
      capacity: 1_800,
      prestige: 5,
      performanceCost: 12_000,
      minReputation: 55,
    },
    {
      id: 'anfiteatro_la_romana',
      name: 'Anfiteatro La Romana',
      regionId: 'santo_domingo',
      capacity: 15_000,
      prestige: 5,
      performanceCost: 45_000,
      minReputation: 75,
    },
    {
      id: 'estadio_olimpico',
      name: 'Estadio Olímpico',
      regionId: 'santo_domingo',
      capacity: 28_000,
      prestige: 5,
      performanceCost: 80_000,
      minReputation: 85,
    },
    {
      id: 'zona_colonial_plaza',
      name: 'Plaza de España — Zona Colonial',
      regionId: 'santo_domingo',
      capacity: 3_000,
      prestige: 3,
      performanceCost: 2_500,
      minReputation: 20,
    },
    {
      id: 'club_merengue_sd',
      name: 'Club Merengue',
      regionId: 'santo_domingo',
      capacity: 400,
      prestige: 3,
      performanceCost: 1_000,
      minReputation: 10,
    },
    {
      id: 'open_mic_malecon',
      name: 'Malecón Open Mic Night',
      regionId: 'santo_domingo',
      capacity: 200,
      prestige: 1,
      performanceCost: 0,
      minReputation: 0,
    },
  ],
  events: [
    {
      id: 'premios_heat',
      name: 'Premios Heat',
      regionId: 'santo_domingo',
      type: 'Award Show',
      description:
        'The Caribbean\'s most prestigious Latin music awards. Juan Luis Guerra has won more times than anyone can count — can you match his legacy?',
      entryRequirement: { minLevel: 10, minGlobalReach: 40 },
      reputationBoost: 50,
    },
    {
      id: 'festival_merengue_sd',
      name: 'Festival del Merengue',
      regionId: 'santo_domingo',
      type: 'Festival',
      description:
        'Held along the Malecón every year, this is the most important cultural event in the Dominican Republic. UNESCO-recognized genre, million-person crowd. Playing here is a career-defining moment.',
      entryRequirement: { minLevel: 7, minGlobalReach: 25 },
      reputationBoost: 45,
    },
    {
      id: 'dr_bachata_night',
      name: 'Noche de Bachata — Zona Colonial',
      regionId: 'santo_domingo',
      type: 'Open Mic',
      description:
        'Bachata performances under the stars in the oldest city in the Americas. Locals know the genre like their heartbeat — impress them.',
      entryRequirement: { minLevel: 2 },
      reputationBoost: 12,
    },
    {
      id: 'sgacedom_registration_event',
      name: 'SGACEDOM Artist Registration Day',
      regionId: 'santo_domingo',
      type: 'Business',
      description:
        'SGACEDOM opens its Santo Domingo offices for free artist onboarding. Register your works, learn about Law 65-00 and your moral rights, and meet the ONDA representatives who process copyright filings.',
      entryRequirement: {},
      reputationBoost: 5,
    },
    {
      id: 'dr_onda_copyright_workshop',
      name: 'ONDA Copyright Workshop',
      regionId: 'santo_domingo',
      type: 'Business',
      description:
        'The Oficina Nacional de Derecho de Autor hosts a free legal education session. Learn about Law 65-00, related rights (derechos conexos), and why moral rights in the DR mean your name stays on your music forever — regardless of what any contract says.',
      entryRequirement: {},
      reputationBoost: 8,
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// 🇪🇨  ECUADOR — QUITO
// Andean crossroads — Pasillo, Sanjuanito, cumbia, marimba
// Legal: Código Ingenios (2016)
// Collecting: SAYCE + SARIME + SOPROFON (triple stack) — SENADI (registration)
// ─────────────────────────────────────────────────────────────────────────────

const QUITO: ExtendedRegion = {
  id: 'quito',
  name: 'Quito',
  country: 'Ecuador',
  continent: 'South America',
  dominantLanguage: 'Spanish',
  currency: 'USD',
  capitalCity: 'Quito (San Francisco de Quito)',
  legalRegion: 'ecuador',
  launchStatus: 'available',
  description:
    'Perched at 2,850 meters in the Andes, Quito is South America\'s most intact colonial city and a UNESCO World Heritage Site. Ecuador\'s music scene blends the melancholic pasillo, the festive sanjuanito, Afro-Ecuadorian marimba, and an exploding urban music movement. Ecuador uses USD, the Código Ingenios (2016) governs IP, and uniquely — you can stack THREE collecting society registrations (SAYCE + SARIME + SOPROFON) to collect every royalty stream available.',
  dominantGenres: ['Pasillo', 'Sanjuanito', 'Cumbia', 'Marimba', 'Latin Pop', 'Urban/Trap Latino'],
  unlockRequirement: { minLevel: 3, minGlobalReach: 8 },
  vibe: 'Andean soul, colonial grandeur, rising urban heat',
  primaryColor: '#FFD100',
  accentColor: '#0033A0',
  npcs: [],
  venues: [
    {
      id: 'casa_de_la_cultura_quito',
      name: 'Casa de la Cultura Ecuatoriana',
      regionId: 'quito',
      capacity: 1_200,
      prestige: 5,
      performanceCost: 8_000,
      minReputation: 45,
    },
    {
      id: 'coliseo_rumiñahui',
      name: 'Coliseo Rumiñahui',
      regionId: 'quito',
      capacity: 10_000,
      prestige: 4,
      performanceCost: 30_000,
      minReputation: 60,
    },
    {
      id: 'estadio_rodrigo_paz',
      name: 'Estadio Rodrigo Paz Delgado',
      regionId: 'quito',
      capacity: 42_000,
      prestige: 5,
      performanceCost: 100_000,
      minReputation: 85,
    },
    {
      id: 'la_mariscal_bar',
      name: 'La Mariscal — Bar El Pobre Diablo',
      regionId: 'quito',
      capacity: 250,
      prestige: 3,
      performanceCost: 800,
      minReputation: 10,
    },
    {
      id: 'plaza_grande_quito',
      name: 'Plaza Grande Open Stage',
      regionId: 'quito',
      capacity: 2_000,
      prestige: 2,
      performanceCost: 300,
      minReputation: 0,
    },
    {
      id: 'quito_open_mic',
      name: 'Open Mic — La Floresta',
      regionId: 'quito',
      capacity: 60,
      prestige: 1,
      performanceCost: 0,
      minReputation: 0,
    },
  ],
  events: [
    {
      id: 'quito_fest',
      name: 'Quito Fest',
      regionId: 'quito',
      type: 'Festival',
      description:
        'Ecuador\'s largest music festival. International and national acts share the bill in the shadow of the Andes. A booking here broadcasts your name across South America.',
      entryRequirement: { minLevel: 8, minGlobalReach: 28 },
      reputationBoost: 42,
    },
    {
      id: 'festival_de_musica_indigena',
      name: 'Festival de Música Indígena',
      regionId: 'quito',
      type: 'Festival',
      description:
        'A celebration of Ecuador\'s indigenous musical traditions — sanjuanito, yumbo, danzante. Incorporate traditional elements respectfully and earn a buen vivir cultural bonus. Disrespect the heritage and face community backlash.',
      entryRequirement: { minLevel: 4 },
      reputationBoost: 20,
    },
    {
      id: 'sayce_triple_stack_event',
      name: 'SAYCE Triple Stack Workshop — Quito',
      regionId: 'quito',
      type: 'Business',
      description:
        'SAYCE, SARIME, and SOPROFON co-host a joint registration event. Learn about Ecuador\'s Código Ingenios, register with all three societies in one session, and start stacking royalty streams from day one. Only possible in Ecuador.',
      entryRequirement: {},
      reputationBoost: 10,
    },
    {
      id: 'senadi_ip_workshop',
      name: 'SENADI Intellectual Property Workshop',
      regionId: 'quito',
      type: 'Business',
      description:
        'The Servicio Nacional de Derechos Intelectuales (SENADI) opens registration and education to artists. Learn about the Código Ingenios, indigenous music protections, and how Ecuador\'s buen vivir philosophy shapes copyright law differently from the US and DR.',
      entryRequirement: {},
      reputationBoost: 8,
    },
    {
      id: 'premios_andinos',
      name: 'Premios Andinos de la Música',
      regionId: 'quito',
      type: 'Award Show',
      description:
        'The Andean region\'s most prestigious music awards. Covers Ecuador, Colombia, Peru, and Bolivia — winning here opens four markets simultaneously.',
      entryRequirement: { minLevel: 9, minGlobalReach: 35 },
      reputationBoost: 48,
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// 🇪🇨  ECUADOR — GUAYAQUIL
// Pacific coast hub — Afro-Ecuadorian sound, tropical, cumbia costeña
// Legal: Same Código Ingenios (2016) — SAYCE, SARIME, SOPROFON
// ─────────────────────────────────────────────────────────────────────────────

const GUAYAQUIL: ExtendedRegion = {
  id: 'guayaquil',
  name: 'Guayaquil',
  country: 'Ecuador',
  continent: 'South America',
  dominantLanguage: 'Spanish',
  currency: 'USD',
  capitalCity: 'Guayaquil (Santiago de Guayaquil)',
  legalRegion: 'ecuador',
  launchStatus: 'available',
  description:
    'Ecuador\'s largest city and main port. Guayaquil has its own coastal identity — hotter, faster, more tropical than Quito. Afro-Ecuadorian rhythms, cumbia costeña, and marimba from the Pacific coast define the sound. The city is one of South America\'s fastest-growing music markets. The same Código Ingenios and triple-stack collecting society system applies here.',
  dominantGenres: ['Cumbia costeña', 'Marimba', 'Afro-Ecuadorian', 'Reggaeton', 'Salsa', 'Urban Latino'],
  unlockRequirement: { minLevel: 5, minGlobalReach: 15, completedQuest: 'quito_sayce_registered' },
  vibe: 'Coastal heat, tropical energy, Afro-Ecuadorian pride',
  primaryColor: '#CC0000',
  accentColor: '#FFD100',
  npcs: [],
  venues: [
    {
      id: 'estadio_monumental_gye',
      name: 'Estadio Monumental Banco Pichincha',
      regionId: 'guayaquil',
      capacity: 59_000,
      prestige: 5,
      performanceCost: 120_000,
      minReputation: 88,
    },
    {
      id: 'centro_civico_gye',
      name: 'Centro Cívico Ciudad de Guayaquil',
      regionId: 'guayaquil',
      capacity: 8_500,
      prestige: 4,
      performanceCost: 25_000,
      minReputation: 55,
    },
    {
      id: 'malecon_2000_gye',
      name: 'Malecón 2000 Open Stage',
      regionId: 'guayaquil',
      capacity: 5_000,
      prestige: 3,
      performanceCost: 2_000,
      minReputation: 20,
    },
    {
      id: 'urdesa_club_gye',
      name: 'Club Urdesa — La Bahía',
      regionId: 'guayaquil',
      capacity: 350,
      prestige: 2,
      performanceCost: 600,
      minReputation: 5,
    },
  ],
  events: [
    {
      id: 'festival_marimba_gye',
      name: 'Festival Internacional de Marimba',
      regionId: 'guayaquil',
      type: 'Festival',
      description:
        'Celebrating the UNESCO-recognized marimba tradition of Ecuador\'s Pacific coast. A cultural gateway that connects you to Colombia\'s Pacific scene. Respect the tradition — the community is watching.',
      entryRequirement: { minLevel: 6, minGlobalReach: 22 },
      reputationBoost: 38,
    },
    {
      id: 'guayaquil_independencia',
      name: 'Concierto de Independencia — Oct 9',
      regionId: 'guayaquil',
      type: 'Festival',
      description:
        'Ecuador\'s Independence Day concert on October 9. The biggest national celebration in Guayaquil — performing here is a patriotic honor and an enormous reputation boost.',
      entryRequirement: { minLevel: 8, minGlobalReach: 30 },
      reputationBoost: 44,
    },
    {
      id: 'afroecuatoriano_showcase',
      name: 'Muestra Afroecuatoriana',
      regionId: 'guayaquil',
      type: 'Festival',
      description:
        'A showcase of Afro-Ecuadorian music, dance, and culture. Marimba, chigualo, chocotis — the African diaspora\'s contribution to Ecuador\'s soul. Performing here with authentic knowledge earns maximum cultural respect.',
      entryRequirement: { minLevel: 4 },
      reputationBoost: 22,
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// 🔒  COMING SOON — Future Expansion Regions
// ─────────────────────────────────────────────────────────────────────────────

const COMING_SOON_REGIONS: ExtendedRegion[] = [
  {
    id: 'lagos',
    name: 'Lagos',
    country: 'Nigeria',
    continent: 'Africa',
    dominantLanguage: 'English / Yoruba / Igbo',
    currency: 'NGN',
    legalRegion: null,
    launchStatus: 'coming_soon',
    comingSoonMessage:
      '🔒 Lagos is coming in a future update. The heartbeat of Afrobeats — where the genre was born and continues to evolve. Nigeria\'s Copyright Act and the Nigerian Copyright Commission (NCC) will govern this region. Stay tuned.',
    description: 'The heartbeat of African music. Lagos is where Afrobeats was born.',
    dominantGenres: ['Afrobeats', 'Highlife', 'Afro-House'],
    unlockRequirement: { comingSoon: true } as any,
    vibe: 'Electric, soulful, unstoppable',
    primaryColor: '#1DB954',
    accentColor: '#F5A623',
    npcs: [],
    venues: [],
    events: [],
  },
  {
    id: 'seoul',
    name: 'Seoul',
    country: 'South Korea',
    continent: 'Asia',
    dominantLanguage: 'Korean',
    currency: 'KRW',
    legalRegion: null,
    launchStatus: 'coming_soon',
    comingSoonMessage:
      '🔒 Seoul is coming in a future update. The K-Pop machine. Korea\'s Copyright Act and KOMCA (Korea Music Copyright Association) will govern this region.',
    description: 'The K-Pop machine. Seoul operates on precision, image, and fandoms that move like armies.',
    dominantGenres: ['K-Pop', 'Hip-Hop', 'R&B'],
    unlockRequirement: { comingSoon: true } as any,
    vibe: 'Polished, intense, viral',
    primaryColor: '#6C63FF',
    accentColor: '#FF6B8A',
    npcs: [],
    venues: [],
    events: [],
  },
  {
    id: 'london',
    name: 'London',
    country: 'United Kingdom',
    continent: 'Europe',
    dominantLanguage: 'English',
    currency: 'GBP',
    legalRegion: null,
    launchStatus: 'coming_soon',
    comingSoonMessage:
      '🔒 London is coming in a future update. The birthplace of Grime and Drill. The UK Copyright, Designs and Patents Act 1988 and PRS for Music will govern this region.',
    description: 'The birthplace of Grime and Drill. London\'s underground scenes turn into global movements.',
    dominantGenres: ['Grime', 'Drill', 'R&B', 'Electronic'],
    unlockRequirement: { comingSoon: true } as any,
    vibe: 'Gritty, creative, influential',
    primaryColor: '#1A1A2E',
    accentColor: '#E94560',
    npcs: [],
    venues: [],
    events: [],
  },
  {
    id: 'sao_paulo',
    name: 'São Paulo',
    country: 'Brazil',
    continent: 'South America',
    dominantLanguage: 'Portuguese',
    currency: 'BRL',
    legalRegion: null,
    launchStatus: 'coming_soon',
    comingSoonMessage:
      '🔒 São Paulo is coming in a future update. The beating heart of Latin music innovation. Brazil\'s Lei de Direitos Autorais (9.610/98) and ECAD (Escritório Central de Arrecadação e Distribuição) will govern this region.',
    description: 'The beating heart of Latin music innovation.',
    dominantGenres: ['Baile Funk', 'Samba', 'Bossa Nova', 'Latin Pop'],
    unlockRequirement: { comingSoon: true } as any,
    vibe: 'Vibrant, frenetic, soulful',
    primaryColor: '#009C3B',
    accentColor: '#FFDF00',
    npcs: [],
    venues: [],
    events: [],
  },
  {
    id: 'johannesburg',
    name: 'Johannesburg',
    country: 'South Africa',
    continent: 'Africa',
    dominantLanguage: 'Zulu / Xhosa / English',
    currency: 'ZAR',
    legalRegion: null,
    launchStatus: 'coming_soon',
    comingSoonMessage:
      '🔒 Johannesburg is coming in a future update. Where Amapiano was born. South Africa\'s Copyright Act 98 of 1978 and SAMRO will govern this region.',
    description: 'Joburg is where Amapiano was born — a genre that went from township parties to global playlists.',
    dominantGenres: ['Amapiano', 'Afro-House', 'Afrobeats'],
    unlockRequirement: { comingSoon: true } as any,
    vibe: 'Deep, grooving, township pride',
    primaryColor: '#00ADEF',
    accentColor: '#FDB913',
    npcs: [],
    venues: [],
    events: [],
  },
  {
    id: 'tokyo',
    name: 'Tokyo',
    country: 'Japan',
    continent: 'Asia',
    dominantLanguage: 'Japanese',
    currency: 'JPY',
    legalRegion: null,
    launchStatus: 'coming_soon',
    comingSoonMessage:
      '🔒 Tokyo is the final unlock — the hardest market in the world. Japan\'s Copyright Act (1970, heavily amended) and JASRAC will govern this region. Reach Diamond certification to unlock.',
    description:
      'Japan\'s music market is one of the world\'s largest and most unique. Breaking Japan is an achievement few foreign artists have managed.',
    dominantGenres: ['J-Pop', 'Electronic', 'Hip-Hop'],
    unlockRequirement: { comingSoon: true } as any,
    vibe: 'Precise, loyal, otherworldly',
    primaryColor: '#FF0050',
    accentColor: '#00D4FF',
    npcs: [],
    venues: [],
    events: [],
  },
];

// ─── Master Regions List ──────────────────────────────────────────────────────

export const REGIONS: ExtendedRegion[] = [
  // 🚀 LAUNCH REGIONS — Playable
  ATLANTA,
  NASHVILLE,
  SANTO_DOMINGO,
  QUITO,
  GUAYAQUIL,
  // 🔒 COMING SOON
  ...COMING_SOON_REGIONS,
];

// ─── Playable regions only ────────────────────────────────────────────────────

export const LAUNCH_REGIONS: ExtendedRegion[] = REGIONS.filter(
  (r) => r.launchStatus === 'available'
);

// ─── Utility Functions ────────────────────────────────────────────────────────

export const getRegionById = (id: string): ExtendedRegion | undefined =>
  REGIONS.find((r) => r.id === id);

export const getPlayableRegions = (): ExtendedRegion[] =>
  REGIONS.filter((r) => r.launchStatus === 'available');

export const getComingSoonRegions = (): ExtendedRegion[] =>
  REGIONS.filter((r) => r.launchStatus === 'coming_soon');

export const getRegionsByContinent = (continent: string): ExtendedRegion[] =>
  REGIONS.filter((r) => r.continent === continent);

export const getRegionsByCountry = (country: string): ExtendedRegion[] =>
  REGIONS.filter((r) => r.country === country);

export const getUSARegions = (): ExtendedRegion[] =>
  LAUNCH_REGIONS.filter((r) => r.legalRegion === 'usa');

export const getDRRegions = (): ExtendedRegion[] =>
  LAUNCH_REGIONS.filter((r) => r.legalRegion === 'dominican_republic');

export const getEcuadorRegions = (): ExtendedRegion[] =>
  LAUNCH_REGIONS.filter((r) => r.legalRegion === 'ecuador');

export const isRegionPlayable = (regionId: string): boolean => {
  const region = getRegionById(regionId);
  return region?.launchStatus === 'available';
};

export const getStarterRegion = (): ExtendedRegion => ATLANTA;
