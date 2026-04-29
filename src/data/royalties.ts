// ─── royalties.ts ─────────────────────────────────────────────────────────────
// Real-world ASCAP & BMI legal data integrated into World Stage as game mechanics.
// Sources: ascap.com, bmi.com, royaltyexchange.com, soundcharts.com (2026)
// ──────────────────────────────────────────────────────────────────────────────

import { ArtistPhase, LabelPhase } from '../types';

// ─── PRO Types ────────────────────────────────────────────────────────────────

export type PROName = 'ASCAP' | 'BMI' | 'SESAC' | 'none';

export type RoyaltyType =
  | 'performance'    // Radio, TV, streaming, live venues — collected by ASCAP/BMI
  | 'mechanical'     // Downloads, physical sales, interactive streaming — NOT collected by PROs
  | 'sync'           // Film, TV, ads — negotiated directly
  | 'print'          // Sheet music — separate licensing
  | 'neighboring';   // Master recording rights (SoundExchange)

export type LicenseType =
  | 'blanket'        // Unlimited use of full PRO catalog for a flat annual fee
  | 'per_program'    // Licensed per specific show or program
  | 'per_performance'; // Licensed per individual performance (rare)

export interface PRO {
  id: PROName;
  fullName: string;
  founded: number;
  headquarters: string;
  description: string;
  businessModel: 'non_profit' | 'for_profit';
  memberCount: number;           // approximate
  catalogSize: number;           // approximate number of works
  writerJoinCost: number;        // USD — one-time fee
  publisherJoinCost: number;     // USD — one-time fee
  contractLength: number;        // years
  royaltySplit: { writer: number; publisher: number }; // percentage
  paymentFrequency: 'quarterly';
  paymentDelayMonths: number;    // months after performance quarter
  strengths: string[];
  weaknesses: string[];
  bestFor: string[];
  legalTerms: LegalTerm[];
  gameEffect: PROGameEffect;
}

export interface PROGameEffect {
  registrationCost: number;        // in-game $ to join
  registrationTimeDays: number;    // in-game days to process
  royaltyMultiplier: number;       // multiplier on stream/performance income
  businessStatBonus: number;       // +X to business stat on registration
  unlocksPhases: (ArtistPhase | LabelPhase)[];
  unlocksQuests: string[];
  description: string;
}

export interface LegalTerm {
  term: string;
  definition: string;
  relevance: 'critical' | 'important' | 'informational';
  example?: string;
}

export interface RoyaltyEvent {
  id: string;
  title: string;
  description: string;
  triggerCondition: string;
  royaltyType: RoyaltyType;
  proRequired: PROName | null;
  payoutBase: number;         // base in-game $ payout
  payoutMultiplier: string;   // formula description
  statRequirement?: Partial<{ talent: number; business: number; globalReach: number }>;
  educationalNote: string;    // real-world info shown to player
}

export interface PROQuest {
  id: string;
  title: string;
  description: string;
  proFocus: PROName;
  giverNpcId: string;
  phase: ArtistPhase | LabelPhase;
  objectives: { id: string; description: string; type: string; target: number }[];
  rewards: {
    xp: number;
    money: number;
    statBoosts?: Partial<{ business: number; talent: number; globalReach: number }>;
    unlocksPRO?: PROName;
  };
  educationalTip: string;
}

// ─── Legal Terms Dictionary ────────────────────────────────────────────────────

export const ASCAP_LEGAL_TERMS: LegalTerm[] = [
  {
    term: 'Public Performance',
    definition:
      'Any performance of a copyrighted musical work that occurs in a place open to the public, or where a substantial number of persons outside a normal family circle are gathered. Also includes any transmission via broadcast, internet stream, or telephone wire.',
    relevance: 'critical',
    example:
      'Playing your track at a venue, restaurant, club, or broadcasting it on radio/streaming platforms all count as public performances.',
  },
  {
    term: 'Blanket License',
    definition:
      'A single license that grants the music user permission to perform ANY work in the ASCAP repertory (20M+ songs) as much or as little as they like, for a flat annual fee. Covers unlimited performances without per-song accounting.',
    relevance: 'critical',
    example:
      'A radio station pays ASCAP a blanket license fee — then they can legally play any ASCAP song all year without tracking each play.',
  },
  {
    term: 'Performance Royalty',
    definition:
      'Compensation paid to songwriters and publishers when their music is publicly performed. ASCAP collects these fees from music users and distributes them back to members. 50% goes to the writer(s), 50% to the publisher(s).',
    relevance: 'critical',
    example:
      'Your song gets played on Spotify 1 million times → ASCAP collects from Spotify → distributes your share quarterly.',
  },
  {
    term: 'Writer Member',
    definition:
      'A songwriter, composer, or lyricist who joins ASCAP to receive performance royalties on their compositions. Free to join. Eligible once you have at least one song publicly performed or available on any platform.',
    relevance: 'important',
    example: 'Any artist who writes their own music should register as an ASCAP writer member immediately.',
  },
  {
    term: 'Publisher Member',
    definition:
      'A music publishing entity (company or individual acting as their own publisher) that joins ASCAP to collect the publisher\'s 50% share of performance royalties. $50 one-time fee (free if joining simultaneously as writer + publisher).',
    relevance: 'important',
    example: 'If you own your masters and publish your own music, you should register as BOTH writer and publisher to collect 100% of your performance royalties.',
  },
  {
    term: 'Work Registration',
    definition:
      'The process of officially logging each song in ASCAP\'s database so it can be tracked and royalties distributed. Must be done for every song you want to collect on. Done via ASCAP Member Access portal or mobile app.',
    relevance: 'critical',
    example: 'Without registering your works, ASCAP cannot track when they\'re performed and cannot pay you — even if you are a member.',
  },
  {
    term: 'Distribution Quarter',
    definition:
      'ASCAP distributes royalties four times per year (quarterly). Payments arrive 6–9 months after the performance quarter in which your music was played.',
    relevance: 'important',
    example: 'Music performed in Q1 (Jan–Mar) pays out approximately 6–9 months later — typically September to December of that year.',
  },
  {
    term: 'Follow the Dollar',
    definition:
      'ASCAP\'s distribution principle: licensing fees collected from a specific type of music user go back to creators whose music was used by that type of user. TV fees go to TV music creators. Streaming fees go to creators played on streaming.',
    relevance: 'informational',
    example: 'If Spotify pays ASCAP $10M in licensing fees, that $10M is distributed ONLY to artists whose songs streamed on Spotify — not split across all ASCAP members.',
  },
  {
    term: 'Cue Sheet',
    definition:
      'A document listing every piece of music used in a film, TV show, or commercial — including title, composer, publisher, and duration. Broadcasters submit cue sheets to ASCAP to trigger royalty payments for sync placements.',
    relevance: 'important',
    example: 'Your song appears in a Netflix show → Netflix submits a cue sheet → ASCAP identifies your registration and pays performance royalties.',
  },
  {
    term: 'Non-Dramatic Performance Right',
    definition:
      'The right to perform a musical composition publicly in a non-theatrical context (radio, streaming, clubs, stores). This is what ASCAP licenses. Different from Grand Rights, which cover theatrical/dramatic performances like musicals.',
    relevance: 'informational',
    example: 'ASCAP covers your song played on a radio station. A full Broadway musical production requires a separate Grand Rights license.',
  },
  {
    term: 'Statutory Damages',
    definition:
      'Legal penalties for copyright infringement without a proper license. Range from $750 to $30,000 per song per infringement. Willful infringement can reach $150,000 per song. ASCAP actively investigates and prosecutes unlicensed venues.',
    relevance: 'critical',
    example: 'A bar plays 10 ASCAP songs without a license over one night → potential liability: $7,500 to $300,000 in statutory damages.',
  },
  {
    term: 'Consent Decree',
    definition:
      'A federal court agreement (from 1941, last revised 2016) governing how ASCAP must operate — requiring it to license music to any legitimate user at a fair rate, preventing monopolistic pricing. DOJ oversees compliance.',
    relevance: 'informational',
    example: 'If a streaming service disputes ASCAP\'s licensing rate, a federal Rate Court judge can set a binding fair rate.',
  },
];

export const BMI_LEGAL_TERMS: LegalTerm[] = [
  {
    term: 'BMI Affiliate',
    definition:
      'The term BMI uses for its members — songwriters, composers, and publishers who register with BMI to collect performance royalties. BMI is a for-profit company (since 2022) but writer affiliation remains free.',
    relevance: 'critical',
    example: 'Unlike ASCAP\'s "member," BMI calls you an "affiliate." The royalty collection function is identical.',
  },
  {
    term: 'Performance Royalty (BMI)',
    definition:
      'Royalties collected by BMI from businesses, broadcasters, and digital services that publicly perform music, then distributed to affiliated songwriters and publishers. Paid quarterly. 50% to writer, 50% to publisher — same as ASCAP.',
    relevance: 'critical',
    example: 'A TV network pays BMI a blanket license. BMI tracks what aired, calculates your pro-rata share, and pays you quarterly.',
  },
  {
    term: 'BMI Writer Affiliation',
    definition:
      'Free to join for songwriters, composers, and lyricists. Two-year commitment (vs. ASCAP\'s one-year). You must wait until your BMI agreement expires before switching to another PRO.',
    relevance: 'critical',
    example: 'If you sign with BMI today, you cannot switch to ASCAP for at least 2 years — make the decision carefully.',
  },
  {
    term: 'BMI Publisher Affiliation',
    definition:
      'Setting up a publishing entity with BMI costs $175 (individual publisher), $250 (corporation/LLC), or $500 (partnership). More expensive than ASCAP\'s $50, but allows you to collect both writer and publisher shares.',
    relevance: 'important',
    example: 'An indie artist who self-publishes should register a publishing company with BMI to collect the full 100% of their performance royalties.',
  },
  {
    term: 'BMI Repertoire',
    definition:
      'BMI\'s catalog of licensed musical works — over 22.4 million songs from 1.4M+ affiliates worldwide. Slightly larger than ASCAP\'s 20M works from 1.1M members. Both catalogs are massive and cover virtually all commercial music.',
    relevance: 'informational',
    example: 'When a business buys a BMI blanket license, it can legally play all 22.4M works in BMI\'s repertoire.',
  },
  {
    term: 'Compulsory License (BMI)',
    definition:
      'A legally mandated license that allows certain uses of copyrighted music without direct negotiation, at government-set rates. Applies primarily to mechanical reproduction (CDs, downloads, digital phonorecords). BMI does NOT collect compulsory mechanical royalties — only performance royalties.',
    relevance: 'important',
    example: 'A streaming service must pay mechanical royalties under compulsory license rates set by the Copyright Royalty Board — these go through Harry Fox Agency or DistroKid, NOT BMI.',
  },
  {
    term: 'Payment Delay (BMI)',
    definition:
      'BMI pays royalties 5–6 months after the performance quarter. Slightly faster than ASCAP\'s 6–9 month delay. Both pay quarterly.',
    relevance: 'important',
    example: 'Q1 performances (Jan–Mar 2026) → BMI pays approximately June–September 2026.',
  },
  {
    term: 'BMI 2026 Payment Schedule',
    definition:
      'Q4 2025 royalties paid: May 22, 2026. Q1 2026 royalties paid: August 21, 2026. Q2 2026 royalties paid: November 20, 2026. Q3 2026 royalties paid: February 19, 2027.',
    relevance: 'informational',
    example: 'If your song blew up in January 2026 (Q1), expect your BMI check around August 21, 2026.',
  },
  {
    term: 'For-Profit Model (BMI)',
    definition:
      'In 2022, BMI transitioned from a non-profit to a for-profit company after being sold to New Mountain Capital. Unlike ASCAP (which remains non-profit and distributes 90¢ per $1 collected), BMI\'s distribution percentage is no longer publicly disclosed.',
    relevance: 'important',
    example: 'ASCAP publicly states it distributes 90% of collected fees. BMI no longer discloses this figure — a transparency disadvantage.',
  },
  {
    term: 'Pro-Rata Distribution',
    definition:
      'BMI calculates your royalty share based on the proportion of total performances your works represent during a quarter. The more your music is played relative to all BMI music played, the larger your share of collected fees.',
    relevance: 'important',
    example: 'If BMI collects $100M from radio in Q1 and your songs represent 0.001% of all radio plays, you receive $1,000 from the radio licensing pool.',
  },
  {
    term: 'Mechanical Rights (NOT covered by BMI)',
    definition:
      'The right to reproduce a musical composition — covering CDs, downloads, and interactive streaming. BMI does NOT collect mechanical royalties. These are handled separately through DistroKid, TuneCore, Harry Fox Agency, or Music Reports Inc.',
    relevance: 'critical',
    example: 'BMI collects when Spotify plays your song (performance). A separate entity collects when Spotify users save it offline or stream interactively (mechanical). You need both covered.',
  },
  {
    term: 'Sync License (NOT covered by BMI)',
    definition:
      'Permission to synchronize a musical composition with visual media (film, TV, ads, video games). BMI does NOT issue sync licenses — you or your publisher negotiate these directly. BMI only collects the performance royalties after the synced content airs.',
    relevance: 'critical',
    example: 'Your song gets placed in a Netflix film → you negotiate a sync fee directly with Netflix → then BMI collects performance royalties when the film broadcasts.',
  },
];

// ─── PRO Comparison Data ──────────────────────────────────────────────────────

export const PROS: Record<PROName, PRO | null> = {
  none: null,

  ASCAP: {
    id: 'ASCAP',
    fullName: 'American Society of Composers, Authors and Publishers',
    founded: 1914,
    headquarters: 'New York, NY',
    description:
      'The oldest and only non-profit PRO in the US. Founded in 1914, ASCAP collects and distributes performance royalties for its 1.1M+ members. Every dollar after admin costs goes back to creators.',
    businessModel: 'non_profit',
    memberCount: 1_100_000,
    catalogSize: 20_000_000,
    writerJoinCost: 0,
    publisherJoinCost: 50,
    contractLength: 1,
    royaltySplit: { writer: 50, publisher: 50 },
    paymentFrequency: 'quarterly',
    paymentDelayMonths: 7,   // avg of 6-9 months
    strengths: [
      'Non-profit — 90¢ of every $1 collected goes to members',
      'Full financial transparency (annual public reports)',
      'One-year contract — more flexibility to switch',
      'Free writer + publisher registration if joining simultaneously',
      'Strong international collection network via foreign affiliates',
      'ASCAP OnStage program pays live performance royalties',
    ],
    weaknesses: [
      'Slower payment — 6–9 months after performance quarter',
      '$50 publisher fee if not joining as writer simultaneously',
      'Some genres historically underrepresented in distribution formulas',
    ],
    bestFor: [
      'Artists who want full financial transparency',
      'Artists planning to register as both writer AND publisher',
      'Artists who want flexibility to switch PROs annually',
      'Artists with heavy TV/film sync activity (strong cue sheet processing)',
    ],
    legalTerms: ASCAP_LEGAL_TERMS,
    gameEffect: {
      registrationCost: 0,
      registrationTimeDays: 5,
      royaltyMultiplier: 1.15,     // +15% income from streams & performances
      businessStatBonus: 5,
      unlocksPhases: ['distribution', 'scaling'],
      unlocksQuests: ['register_works_ascap', 'ascap_first_royalty_check'],
      description:
        'Joining ASCAP unlocks performance royalty collection on all your tracks. Every stream, radio play, and live performance now generates royalty income paid quarterly. Business stat +5.',
    },
  },

  BMI: {
    id: 'BMI',
    fullName: 'Broadcast Music, Inc.',
    founded: 1939,
    headquarters: 'Nashville, TN',
    description:
      'Founded in 1939 by broadcasters as an alternative to ASCAP, BMI is now the largest PRO in the US with 1.4M+ affiliates and 22.4M licensed works. Transitioned to for-profit in 2022.',
    businessModel: 'for_profit',
    memberCount: 1_400_000,
    catalogSize: 22_400_000,
    strengths: [
      'Largest catalog in the US (22.4M works)',
      'Fastest payment — 5–6 months after performance quarter',
      'Free writer affiliation',
      'Strong in country, gospel, jazz, and Latin music',
      'Deep relationships with broadcasters and radio networks',
      'Excellent international collection infrastructure',
    ],
    weaknesses: [
      'For-profit since 2022 — distribution percentage no longer publicly disclosed',
      'Two-year contract — less flexibility to switch',
      'Higher publisher registration fee ($175–$500 depending on entity type)',
      'Less financial transparency than ASCAP since going for-profit',
    ],
    bestFor: [
      'Artists who want the fastest royalty payments',
      'Artists in country, gospel, jazz, or Latin genres',
      'Artists with large radio presence',
      'Artists already in Nashville or working with BMI-heavy publishers',
    ],
    writerJoinCost: 0,
    publisherJoinCost: 175,   // individual publisher (corps/LLCs = $250, partnerships = $500)
    contractLength: 2,
    royaltySplit: { writer: 50, publisher: 50 },
    paymentFrequency: 'quarterly',
    paymentDelayMonths: 5,   // avg of 5-6 months
    legalTerms: BMI_LEGAL_TERMS,
    gameEffect: {
      registrationCost: 0,
      registrationTimeDays: 5,
      royaltyMultiplier: 1.18,     // +18% income — slightly faster cashflow
      businessStatBonus: 5,
      unlocksPhases: ['distribution', 'scaling'],
      unlocksQuests: ['register_works_bmi', 'bmi_first_royalty_check'],
      description:
        'Joining BMI unlocks performance royalty collection with the largest PRO catalog in the US. Royalties arrive slightly faster than ASCAP. Business stat +5. Two-year commitment required.',
    },
  },

  SESAC: {
    id: 'SESAC',
    fullName: 'Society of European Stage Authors and Composers',
    founded: 1930,
    headquarters: 'Nashville, TN',
    description:
      'The smallest and most selective of the three major US PROs. SESAC is invitation-only — you must be scouted or referred. Smaller catalog but strong in Christian, country, and classical music.',
    businessModel: 'for_profit',
    memberCount: 30_000,
    catalogSize: 1_000_000,
    writerJoinCost: 0,        // invitation only — no public fee
    publisherJoinCost: 0,     // invitation only
    contractLength: 3,
    royaltySplit: { writer: 50, publisher: 50 },
    paymentFrequency: 'quarterly',
    paymentDelayMonths: 4,
    strengths: [
      'Fastest payments of the three major PROs',
      'Selective — personalized service and attention',
      'Strong in Christian, country, and classical markets',
      'Proactive in identifying unlicensed uses and pursuing royalties',
    ],
    weaknesses: [
      'Invitation-only — not accessible to most artists',
      'Smallest catalog (1M works vs ASCAP\'s 20M and BMI\'s 22.4M)',
      'Three-year contract — least flexibility',
      'Limited transparency on distribution methodology',
    ],
    bestFor: [
      'Established artists invited by SESAC',
      'Artists in Christian, country, or classical niches',
      'Artists who want faster payment and boutique service',
    ],
    legalTerms: [],   // populated dynamically — SESAC terms are private
    gameEffect: {
      registrationCost: 0,
      registrationTimeDays: 30,     // takes longer — requires invitation process
      royaltyMultiplier: 1.22,      // highest multiplier but hardest to unlock
      businessStatBonus: 8,
      unlocksPhases: ['certified'],
      unlocksQuests: ['sesac_invitation', 'sesac_elite_royalties'],
      description:
        'SESAC is invitation-only. Unlock this by reaching Platinum certification and 80+ business stat. The fastest paying and most selective PRO — a status symbol in the industry. Business stat +8.',
    },
  },
};

// ─── Shared Legal Concepts (ASCAP + BMI) ─────────────────────────────────────

export const SHARED_PRO_CONCEPTS: LegalTerm[] = [
  {
    term: 'Performance Rights Organization (PRO)',
    definition:
      'A company that licenses music performance rights on behalf of songwriters and publishers, collects fees from businesses and broadcasters, then distributes those fees as royalties. The three US PROs are ASCAP, BMI, and SESAC. You can only belong to ONE at a time.',
    relevance: 'critical',
    example: 'Think of a PRO as your royalty collection agent — they do the legwork of chasing down every radio station, venue, and streaming platform that plays your music.',
  },
  {
    term: 'One PRO Rule',
    definition:
      'In the US, a songwriter can only be affiliated with ONE PRO at a time. All songs must be registered with your PRO — you cannot split your catalog between ASCAP and BMI. Choose carefully.',
    relevance: 'critical',
    example: 'You cannot register some songs with ASCAP and others with BMI. Pick one, register everything there.',
  },
  {
    term: 'Mechanical Royalties vs Performance Royalties',
    definition:
      'PERFORMANCE royalties = paid when music is publicly performed (radio, streaming, live). Collected by ASCAP/BMI. MECHANICAL royalties = paid when music is reproduced (downloads, physical CDs, interactive streams). Collected by distributors (DistroKid, TuneCore) or Harry Fox Agency. You need BOTH covered to collect all your money.',
    relevance: 'critical',
    example: 'When someone streams your song on Spotify: ASCAP/BMI gets the performance royalty. Your distributor gets the mechanical royalty. Two separate checks.',
  },
  {
    term: 'Publisher\'s Share vs Writer\'s Share',
    definition:
      'Performance royalties are split 50/50 between the songwriter (writer\'s share) and the publisher (publisher\'s share). If you self-publish your own music and register as both writer and publisher with your PRO, you collect 100% of your performance royalties.',
    relevance: 'critical',
    example: 'If ASCAP owes $10,000 in performance royalties for your song: $5,000 goes to you as writer, $5,000 goes to your publisher (which could also be you if you self-publish).',
  },
  {
    term: 'Self-Publishing',
    definition:
      'When an artist acts as their own publisher — registering a publishing entity with their PRO to collect the publisher\'s 50% share of royalties themselves instead of giving it to a traditional publishing company. Maximizes your royalty income but requires more administrative work.',
    relevance: 'important',
    example: 'Artist registers with ASCAP as both writer AND publisher under "My Artist Name Publishing." Now they collect 100% of performance royalties instead of 50%.',
  },
  {
    term: 'Copyright',
    definition:
      'Legal protection that gives creators exclusive rights to their original works — including the right to reproduce, distribute, perform, and display the work. In music, there are two copyrights: the COMPOSITION (melody + lyrics, protected by songwriting) and the MASTER RECORDING (the actual recorded version).',
    relevance: 'critical',
    example: 'You write and record a song: you own the composition copyright (PRO covers this) AND the master recording copyright (SoundExchange and your distributor cover this).',
  },
  {
    term: 'SoundExchange',
    definition:
      'A separate royalty collection organization (NOT a PRO) that collects and distributes digital performance royalties for MASTER RECORDINGS on non-interactive digital radio (Pandora, SiriusXM, internet radio). Register separately from ASCAP/BMI.',
    relevance: 'important',
    example: 'Your song plays on Pandora → SoundExchange collects a royalty for the MASTER RECORDING (50% to the artist who performed, 50% to the label or rights holder). ASCAP/BMI collect separately for the COMPOSITION.',
  },
  {
    term: 'Digital Performance Right in Sound Recordings Act (DPRSRA)',
    definition:
      'US law (1995) granting performers and master rights holders the right to collect royalties when sound recordings are performed digitally via non-interactive radio (Pandora, SiriusXM). These royalties are collected by SoundExchange, NOT your PRO.',
    relevance: 'informational',
    example: 'Before 1995, featured artists received nothing from radio play of their recordings. DPRSRA created SoundExchange to fix this for digital radio specifically.',
  },
  {
    term: 'Music Publishing Deal',
    definition:
      'A contract where a songwriter assigns some or all of their publishing rights to a music publisher in exchange for services (pitching songs, collecting royalties, sync deals) and often an advance. Common splits: co-publishing (50/50 publisher share), admin deal (publisher takes 10–15% for admin only).',
    relevance: 'important',
    example: 'You sign a co-pub deal with Sony Music Publishing: they take 50% of your publisher share. You keep 100% writer share + 50% publisher share = 75% total royalties. Sony gets 25%.',
  },
  {
    term: 'Sync Licensing Fee',
    definition:
      'A one-time upfront payment for the right to synchronize your music with visual media (film, TV, commercials, video games). Negotiated directly — not collected by PROs. Can range from $500 (indie short film) to $1M+ (major commercial). PROs only collect the PERFORMANCE royalty after the content airs.',
    relevance: 'critical',
    example: 'Nike licenses your song for $250,000 (sync fee — you negotiate this). When the Nike ad airs on TV, ASCAP/BMI also collect a separate performance royalty each time it broadcasts.',
  },
];

// ─── In-Game Royalty Events ───────────────────────────────────────────────────

export const ROYALTY_EVENTS: RoyaltyEvent[] = [
  {
    id: 'first_stream_royalty',
    title: 'First Streaming Royalties',
    description:
      'Your distributor deposits your first streaming royalty check — mechanical royalties from Spotify, Apple Music, and Tidal. Small, but it\'s proof the machine is working.',
    triggerCondition: 'totalStreams >= 10000',
    royaltyType: 'mechanical',
    proRequired: null,
    payoutBase: 35,     // ~$0.003-0.005 per stream × 10K
    payoutMultiplier: 'totalStreams × 0.0035',
    educationalNote:
      'Streaming mechanical royalties average $0.003–$0.005 per stream across platforms. Spotify pays the least (~$0.003), Apple Music pays more (~$0.007). Your distributor collects these — not your PRO.',
  },
  {
    id: 'first_performance_royalty',
    title: 'First ASCAP/BMI Royalty Check',
    description:
      'Your first quarterly PRO royalty payment arrives. Performance royalties from streaming, radio, and any venues that reported playing your music. This is what PRO membership is all about.',
    triggerCondition: 'hasPRO && totalStreams >= 50000',
    royaltyType: 'performance',
    proRequired: 'ASCAP',   // or BMI — checks player's PRO
    payoutBase: 150,
    payoutMultiplier: 'totalStreams × 0.003 × proMultiplier',
    educationalNote:
      'Performance royalties arrive 5–9 months after the quarter your music was played. ASCAP pays quarterly — 6–9 months later. BMI pays 5–6 months later. Register your works immediately after joining or you\'ll miss payments.',
  },
  {
    id: 'radio_spin_royalty',
    title: 'Radio Spins Paying Off',
    description:
      'Your track got added to rotation on a regional station. The spins are stacking — your PRO is tracking every play and your next quarterly check will reflect it.',
    triggerCondition: 'hasPRO && reputation.currentRegion >= 50',
    royaltyType: 'performance',
    proRequired: 'ASCAP',
    payoutBase: 500,
    payoutMultiplier: 'radioSpins × 8.00',    // US radio pays ~$8 per spin to ASCAP/BMI
    educationalNote:
      'US radio pays approximately $8–$12 per song per play to PROs. A song in rotation at one station (3 plays/day × 30 days) can generate $720–$1,080/month in JUST radio performance royalties — before streaming is counted.',
  },
  {
    id: 'sync_deal_landed',
    title: 'Sync Deal — Film Placement',
    description:
      'A music supervisor contacted you. They want your track for an indie film. Time to negotiate a sync license — this is separate from your PRO royalties.',
    triggerCondition: 'globalReach >= 40 && tracksReleased >= 3',
    royaltyType: 'sync',
    proRequired: null,     // sync fees are direct negotiations
    payoutBase: 5000,
    payoutMultiplier: 'negotiated — base $5K indie, up to $500K+ for major film',
    statRequirement: { business: 30, globalReach: 40 },
    educationalNote:
      'Sync licensing is one of the most lucrative revenue streams in music. An indie film placement: $1K–$25K. A major streaming series: $25K–$150K. A Hollywood blockbuster: $100K–$1M+. You negotiate this DIRECTLY — your PRO is not involved in the sync fee, only the broadcast performance royalties that follow.',
  },
  {
    id: 'international_royalty',
    title: 'International Performance Royalties',
    description:
      'Your music is being played internationally. ASCAP/BMI has reciprocal agreements with foreign PROs — those organizations collect royalties in their countries and forward them to your US PRO.',
    triggerCondition: 'hasPRO && globalReach >= 60 && regionsVisited >= 3',
    royaltyType: 'performance',
    proRequired: 'ASCAP',
    payoutBase: 800,
    payoutMultiplier: 'internationalStreams × localRoyaltyRate',
    educationalNote:
      'ASCAP has reciprocal agreements with over 90 foreign PROs worldwide. When your music plays in Nigeria, the UK, Japan, or Brazil — their local PRO (MCSN, PRS, JASRAC, ECAD) collects and sends it to ASCAP, who then pays you. This is how your international streams pay royalties without you registering in every country.',
  },
  {
    id: 'diamond_publishing_windfall',
    title: 'Diamond Publishing Empire',
    description:
      'A Diamond-certified track generates massive publishing income. At 1.5B streams, performance royalties alone become life-changing generational wealth.',
    triggerCondition: 'certificationLevel === "diamond"',
    royaltyType: 'performance',
    proRequired: 'ASCAP',
    payoutBase: 4_500_000,
    payoutMultiplier: '1.5B streams × $0.003 = $4.5M+ in performance royalties alone',
    educationalNote:
      'A Diamond-certified song (1.5B streams) generates approximately: $4.5M–$7.5M in streaming performance royalties (ASCAP/BMI) + $4.5M–$10.5M in mechanical royalties (distributor) + ongoing radio royalties. If you self-publish and collect 100% of both writer and publisher shares, you keep the full amount. This is why publishing ownership matters.',
  },
];

// ─── PRO-Related Quests ────────────────────────────────────────────────────────

export const PRO_QUESTS: PROQuest[] = [
  {
    id: 'join_a_pro',
    title: 'Register with ASCAP or BMI',
    description:
      'Marcus from BrickSquare Records just schooled you: you\'ve been releasing music without collecting your performance royalties. Every stream, every radio play — you\'ve been leaving money on the table. Join a PRO TODAY.',
    proFocus: 'ASCAP',
    giverNpcId: 'npc_atlanta_exec',
    phase: 'distribution',
    objectives: [
      { id: 'o1', description: 'Research ASCAP vs BMI', type: 'research', target: 1 },
      { id: 'o2', description: 'Register as a writer member', type: 'register_pro', target: 1 },
      { id: 'o3', description: 'Register as your own publisher', type: 'register_publisher', target: 1 },
    ],
    rewards: {
      xp: 500,
      money: 0,
      statBoosts: { business: 5 },
      unlocksPRO: 'ASCAP',
    },
    educationalTip:
      'ASCAP is free to join as a writer. If you join as both writer and publisher at the same time, BOTH are free. This is the move — collect 100% of your performance royalties instead of 50%.',
  },
  {
    id: 'register_works_ascap',
    title: 'Register Your Works',
    description:
      'Joining ASCAP means nothing if your songs aren\'t registered in their system. Log into Member Access and register every track you\'ve released. Without this step, ASCAP can\'t track your plays and can\'t pay you.',
    proFocus: 'ASCAP',
    giverNpcId: 'npc_music_attorney',
    phase: 'distribution',
    objectives: [
      { id: 'o1', description: 'Register all released tracks with your PRO', type: 'register_works', target: 1 },
      { id: 'o2', description: 'Verify registration confirmation for each track', type: 'verify_registration', target: 1 },
    ],
    rewards: {
      xp: 300,
      money: 0,
      statBoosts: { business: 3 },
    },
    educationalTip:
      'Work registration is separate from membership. After joining ASCAP, allow 5 business days before registering works. For BMI, registration is instant. Every song needs its own registration — title, co-writers, their PRO affiliation, and publisher info.',
  },
  {
    id: 'bmi_first_royalty_check',
    title: 'First BMI Royalty Check',
    description:
      'You\'ve been affiliated with BMI for a quarter. The first royalty payment just hit — smaller than you expected, but this is just the beginning. Every quarter grows.',
    proFocus: 'BMI',
    giverNpcId: 'npc_music_attorney',
    phase: 'promotion',
    objectives: [
      { id: 'o1', description: 'Receive your first BMI royalty payment', type: 'collect_royalty', target: 1 },
      { id: 'o2', description: 'Reach 50,000 total streams', type: 'streams', target: 50000 },
    ],
    rewards: {
      xp: 600,
      money: 500,     // in-game royalty payment
      statBoosts: { business: 4 },
    },
    educationalTip:
      'BMI\'s 2026 payment schedule: Q4 2025 pays May 22, 2026. Q1 2026 pays August 21, 2026. Q2 2026 pays November 20, 2026. Build streams consistently every quarter — the payments compound.',
  },
  {
    id: 'self_publishing_setup',
    title: 'Become Your Own Publisher',
    description:
      'Your attorney explains it clearly: if you\'re giving up your publisher\'s share to nobody, you\'re losing 50% of your performance royalties for FREE. Register a publishing entity with your PRO and start collecting 100%.',
    proFocus: 'ASCAP',
    giverNpcId: 'npc_music_attorney',
    phase: 'scaling',
    objectives: [
      { id: 'o1', description: 'Register a publishing company with your PRO', type: 'register_publisher', target: 1 },
      { id: 'o2', description: 'Transfer all work registrations to include publisher entity', type: 'update_registrations', target: 1 },
      { id: 'o3', description: 'Receive first combined writer + publisher royalty payment', type: 'collect_royalty', target: 1 },
    ],
    rewards: {
      xp: 1000,
      money: 2000,
      statBoosts: { business: 8 },
    },
    educationalTip:
      'Self-publishing doubles your performance royalties overnight. ASCAP: free if joining writer+publisher at the same time, otherwise $50 publisher fee. BMI: $175 individual, $250 LLC, $500 partnership. Pay the fee. It pays for itself on your first royalty check.',
  },
  {
    id: 'sync_deal_quest',
    title: 'Chase the Sync Deal',
    description:
      'Your attorney has a contact — a music supervisor looking for fresh sounds for a streaming series. This could mean $25K–$75K for a placement AND ongoing performance royalties every time the episode airs.',
    proFocus: 'ASCAP',
    giverNpcId: 'npc_music_attorney',
    phase: 'scaling',
    objectives: [
      { id: 'o1', description: 'Pitch 3 tracks to the music supervisor', type: 'pitch_sync', target: 3 },
      { id: 'o2', description: 'Negotiate and execute the sync license', type: 'sign_contract', target: 1 },
      { id: 'o3', description: 'Collect sync fee and confirm ASCAP tracking', type: 'collect_royalty', target: 1 },
    ],
    rewards: {
      xp: 1500,
      money: 25000,
      statBoosts: { business: 6, globalReach: 10 },
    },
    educationalTip:
      'Sync licensing is a TWO-payment system: (1) Sync Fee — negotiate directly, paid upfront. (2) Performance Royalties — collected by ASCAP/BMI every time the content airs. A single sync placement in a hit Netflix series can generate $25K upfront + $5K–$50K/year in broadcast performance royalties indefinitely.',
  },
  {
    id: 'sesac_invitation',
    title: 'SESAC Comes Calling',
    description:
      'You didn\'t apply to SESAC — they reached out to you. A representative has been watching your numbers and your sync activity. They\'re extending an invitation to affiliate. This is elite status.',
    proFocus: 'SESAC',
    giverNpcId: 'npc_music_attorney',
    phase: 'certified',
    objectives: [
      { id: 'o1', description: 'Meet with the SESAC representative', type: 'meet_npc', target: 1 },
      { id: 'o2', description: 'Review SESAC contract terms with your attorney', type: 'review_contract', target: 1 },
      { id: 'o3', description: 'Make the decision: stay with ASCAP/BMI or move to SESAC', type: 'decision', target: 1 },
    ],
    rewards: {
      xp: 2000,
      money: 0,
      statBoosts: { business: 8, globalReach: 5 },
      unlocksPRO: 'SESAC',
    },
    educationalTip:
      'SESAC is invitation-only and represents about 30,000 affiliates vs ASCAP\'s 1.1M. They offer faster payments (4 months vs 7–9) and personalized service — but a 3-year contract commitment and reduced transparency on distribution methodology. Artists like Bob Dylan, Neil Diamond, and Adele are/were SESAC affiliates.',
  },
];

// ─── Music Attorney NPC ────────────────────────────────────────────────────────
// Add this NPC to src/data/npcs.ts in the ATLANTA section

export const MUSIC_ATTORNEY_NPC = {
  id: 'npc_music_attorney',
  name: 'Denise Okafor, Esq.',
  role: 'Music Attorney',
  regionId: 'atlanta',
  description:
    'A Harvard-trained entertainment attorney with 20 years of experience negotiating deals for Grammy-winning artists. Based in Atlanta, she represents indie artists who are serious about their business. Her fee is steep, but the education is priceless.',
  affinity: 0,
  dialogues: [
    {
      id: 'd1',
      trigger: 'first_meet',
      text: 'Let me ask you something: are you registered with ASCAP or BMI? No? Then every stream you\'ve ever gotten has been paying someone — and that someone is not you. Sit down.',
      responses: [
        {
          text: 'I had no idea. Please explain.',
          effect: { affinityChange: 15, statChange: { business: 3 } },
        },
        {
          text: 'I\'ve been focused on the music.',
          effect: { affinityChange: 5 },
        },
      ],
    },
    {
      id: 'd2',
      trigger: 'pro_registered',
      text: 'Good. You joined ASCAP or BMI. Now register your works immediately — membership alone doesn\'t collect anything. And register as your own publisher so you collect 100%, not 50%.',
      responses: [
        {
          text: 'How do I set up a publishing entity?',
          effect: { affinityChange: 10, unlockQuest: 'self_publishing_setup' },
        },
      ],
    },
    {
      id: 'd3',
      trigger: 'high_affinity',
      text: 'I have a music supervisor contact who\'s looking for fresh material. This could be your first sync placement. It won\'t be your last if you handle it right.',
      responses: [
        {
          text: 'Let\'s do it. Walk me through the process.',
          effect: { affinityChange: 20, unlockQuest: 'sync_deal_quest' },
        },
      ],
    },
  ],
  offersQuests: [
    'join_a_pro',
    'register_works_ascap',
    'self_publishing_setup',
    'sync_deal_quest',
    'sesac_invitation',
  ],
};

// ─── Royalty Tooltips (for UI display) ────────────────────────────────────────

export const ROYALTY_TOOLTIPS: Record<string, string> = {
  performance_royalty:
    'Earned when your music is publicly performed — on streaming, radio, TV, or live venues. Collected by your PRO (ASCAP or BMI) and paid quarterly.',
  mechanical_royalty:
    'Earned when your music is reproduced — downloads, physical sales, interactive streams. Collected by your distributor (DistroKid, TuneCore). Separate from PRO royalties.',
  sync_fee:
    'One-time upfront payment for using your music in film, TV, ads, or games. Negotiated directly — your PRO is not involved in this fee.',
  writer_share:
    '50% of performance royalties belong to the songwriter(s). Your PRO pays this directly to you.',
  publisher_share:
    '50% of performance royalties belong to the publisher. If you self-publish, this also goes to you — doubling your total.',
  blanket_license:
    'A flat-fee annual license allowing unlimited use of a PRO\'s entire catalog. How most venues, radio stations, and streaming services pay ASCAP/BMI.',
  pro_registration:
    'The process of registering each song in your PRO\'s database. Without this step, your PRO cannot track plays or distribute royalties — even if you\'re a member.',
  quarterly_distribution:
    'Both ASCAP and BMI pay royalties four times a year. ASCAP: 6–9 months after the performance quarter. BMI: 5–6 months after. Register early and be patient.',
};

// ─── Utility Functions ────────────────────────────────────────────────────────

export const getPROById = (id: PROName): PRO | null => PROS[id];

export const getAllPROLegalTerms = (): LegalTerm[] => [
  ...ASCAP_LEGAL_TERMS,
  ...BMI_LEGAL_TERMS,
  ...SHARED_PRO_CONCEPTS,
];

export const getLegalTermByKeyword = (keyword: string): LegalTerm | undefined =>
  getAllPROLegalTerms().find(
    (term) =>
      term.term.toLowerCase().includes(keyword.toLowerCase()) ||
      term.definition.toLowerCase().includes(keyword.toLowerCase())
  );

export const getPROQuestsByPhase = (phase: ArtistPhase | LabelPhase): PROQuest[] =>
  PRO_QUESTS.filter((q) => q.phase === phase);

export const getRoyaltyEventsByType = (type: RoyaltyType): RoyaltyEvent[] =>
  ROYALTY_EVENTS.filter((e) => e.royaltyType === type);

export const comparePROs = (): {
  winner_speed: PROName;
  winner_transparency: PROName;
  winner_catalog: PROName;
  winner_flexibility: PROName;
  winner_publisher_cost: PROName;
} => ({
  winner_speed: 'BMI',             // 5–6 months vs ASCAP's 6–9 months
  winner_transparency: 'ASCAP',    // non-profit, full public financials
  winner_catalog: 'BMI',           // 22.4M works vs ASCAP's 20M
  winner_flexibility: 'ASCAP',     // 1-year vs BMI's 2-year contract
  winner_publisher_cost: 'ASCAP',  // $50 vs BMI's $175–$500
});
