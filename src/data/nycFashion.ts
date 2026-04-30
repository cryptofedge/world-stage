// ─────────────────────────────────────────────────────────────────────────────
// nycFashion.ts — NYC High Fashion & Urban Brand System
// World Stage: Music Industry RPG
//
// Sources & Research (2025–2026):
//  • Complex "Best Streetwear Brands 2025" — Supreme, KITH, ALD, Denim Tears
//  • East Village Buyers "Most Influential NYC Streetwear Brands 2025"
//  • Business of Fashion — Hip-Hop x Fashion partnerships
//  • Highsnobiety — Hip-Hop's first endorsement deal history
//  • Dapper Dan of Harlem — dapperdanofharlem.com + Hollywood Reporter Met Gala 2025
//  • Accio.com — NYC Hip Hop Fashion Trends 2025
//  • Launchmetrics — Doechii/Thom Browne $6.3M media impact value Grammy 2025
//  • Supreme/Playboi Carti collab: $2.5M media impact in 10 days (2025)
//  • A$AP Rocky x Moncler Genius: $2.3M media impact (2025)
//  • Pharrell Williams — Louis Vuitton Men's Creative Director
//  • Wu Wear — Wu-Tang Clan rapper-owned NYC brand
//
// ─────────────────────────────────────────────────────────────────────────────

// ─── ENUMS & CORE TYPES ──────────────────────────────────────────────────────

export type FashionTier =
  | 'underground'    // Thrift store, no-name, local NYC vendors
  | 'streetwear'     // Core NYC streetwear — Supreme, Only NY
  | 'luxury_street'  // KITH, ALD, Noah NYC — elevated streetwear
  | 'high_fashion'   // Gucci, Versace, Thom Browne, Moncler
  | 'icon'           // Dapper Dan custom, Louis Vuitton collab, bespoke

export type FashionCategory =
  | 'streetwear'
  | 'luxury'
  | 'sneakers'
  | 'accessories'
  | 'custom_couture'
  | 'activewear'
  | 'denim'
  | 'outerwear'

export type EndorsementType =
  | 'gifting'           // Brand sends free clothes — no pay, just exposure
  | 'paid_post'         // Single Instagram/TikTok post deal
  | 'ambassador'        // Season-long ambassador, paid + product
  | 'collab_capsule'    // Co-designed limited capsule collection
  | 'creative_director' // Full creative director role (rare, top-tier)
  | 'equity_deal'       // Equity stake in the brand

export type DripStatBonus =
  | 'image'
  | 'social_following'
  | 'label_attention'
  | 'sync_opportunity'
  | 'booking_fee'
  | 'street_credibility'
  | 'crossover_appeal'

export type BoroughOrigin =
  | 'manhattan'
  | 'brooklyn'
  | 'queens'
  | 'bronx'
  | 'harlem'    // Culturally distinct — heart of Black NYC fashion
  | 'downtown'  // SoHo / Nolita / LES

// ─── NYC FASHION BRAND ───────────────────────────────────────────────────────

export interface NYCFashionBrand {
  id: string
  name: string
  shortName: string
  founded: number
  founder: string
  boroughOrigin: BoroughOrigin
  tier: FashionTier
  categories: FashionCategory[]
  flagship: string              // NYC store address / neighborhood
  description: string           // Real-world brand story
  nycLegacy: string             // Why this brand MATTERS to NYC culture
  artistsWorn: string[]         // Real artists associated with brand
  priceRange: {
    low: number                 // USD — cheapest item
    high: number                // USD — most expensive item
  }
  dropCulture: boolean          // Does this brand do limited drops?
  resaleMultiplier: number      // Average resale value vs retail (1.0 = same)
  endorsementAvailable: boolean
  endorsementTypes: EndorsementType[]
  endorsementDealValue: {
    gifting?: number            // USD value of gifting package per season
    paid_post?: number          // USD per sponsored post
    ambassador?: number         // USD per season
    collab_capsule?: number     // USD for capsule deal
    creative_director?: number  // USD annual
  }
  gameEffect: {
    dripScoreBoost: number      // +X to player's Drip Score (0–100)
    imageStatBonus: number      // +X to Image stat
    socialFollowingBoost: number // +X% to social media following
    streetCredBonus: number     // +X to Street Cred stat
    bookingFeeMultiplier: number // Multiplier on venue booking fees
    labelInterestBoost: number  // +X% chance labels notice player
    unlocksBoroughEvents: BoroughOrigin[] // What areas open up
  }
  unlockRequirement?: {
    minLevel?: number
    minDripScore?: number
    minSocialFollowing?: number  // in thousands
    completedQuest?: string
  }
  inGameEvent: string           // Flavor text for when player wears/signs
  gameRelevance: string
}

// ─── ENDORSEMENT DEAL ────────────────────────────────────────────────────────

export interface FashionEndorsementDeal {
  id: string
  brandId: string
  dealType: EndorsementType
  dealName: string
  description: string
  realWorldExample: string
  requirements: {
    minLevel: number
    minDripScore: number
    minSocialFollowing: number  // thousands
    minStreams?: number         // millions
    completedQuest?: string
  }
  compensation: {
    cashPerMonth: number
    freeProductValuePerMonth: number
    equityPercent?: number
    royaltyPerUnit?: number     // For collab capsules
  }
  duration: 'one_time' | 'seasonal' | 'annual' | 'multi_year'
  durationMonths: number
  exclusivity: 'none' | 'category' | 'full'  // Can you wear competitors?
  gameEffects: {
    monthlyIncome: number
    dripScoreBoost: number
    imageStatBonus: number
    socialFollowingBoostPercent: number
    streetCredBonus: number
    bookingFeeMultiplier: number
    mediaValuePerPost?: number   // $$ in media impact value per post
  }
  risks: string[]               // What can go wrong / cancel clause triggers
  inGameEvent: string
}

// ─── DRIP SCORE SYSTEM ───────────────────────────────────────────────────────

export interface DripScoreTier {
  tier: FashionTier
  minScore: number
  maxScore: number
  label: string
  description: string
  perks: string[]
  nycReputation: string
  gameUnlocks: string[]
}

// ─── STYLE OUTFIT ────────────────────────────────────────────────────────────

export interface ArtistOutfit {
  id: string
  name: string
  description: string
  brands: string[]              // brand IDs
  totalCost: number             // USD to purchase
  dripScore: number             // 0–100
  tier: FashionTier
  occasion: ('everyday' | 'show' | 'music_video' | 'fashion_week' | 'award_show' | 'label_meeting' | 'interview')[]
  gameEffects: {
    imageStatBonus: number
    streetCredBonus: number
    bookingFeeMultiplier: number
    socialFollowingBoostPercent: number
    labelInterestBoost: number
  }
  nycNeighborhoodBonus?: BoroughOrigin   // Extra bonus in this borough
  unlockRequirement?: {
    minDripScore?: number
    minLevel?: number
    completedQuest?: string
  }
  flavorText: string
}

// ─── NYC FASHION STORE / LOCATION ────────────────────────────────────────────

export interface NYCFashionStore {
  id: string
  name: string
  borough: BoroughOrigin
  address: string
  type: 'flagship' | 'boutique' | 'vintage' | 'consignment' | 'atelier' | 'sneaker_shop'
  brandIds: string[]
  description: string
  culturalSignificance: string
  gameEffect: {
    dripScoreBoost: number
    streetCredBonus: number
    socialFollowingBoost: number
    specialItems?: string[]
  }
  visitCost: number             // USD to "shop" per session
  unlockRequirement?: {
    minDripScore?: number
    minLevel?: number
  }
  inGameEvent: string
}

// ─── NPC: STYLIST ─────────────────────────────────────────────────────────────

export interface FashionNPC {
  id: string
  name: string
  role: string
  borough: BoroughOrigin
  description: string
  realWorldInspiration: string
  services: string[]
  costPerSession: number
  gameEffect: {
    dripScoreBoost: number
    imageStatBonus: number
    unlocksBrands: string[]
    unlocksOutfits: string[]
    unlocksEndorsements: string[]
  }
  dialogue: {
    firstMeet: string
    afterHire: string
    maxLevel: string
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// DATA: NYC FASHION BRANDS
// ─────────────────────────────────────────────────────────────────────────────

export const NYC_FASHION_BRANDS: Record<string, NYCFashionBrand> = {

  // ── SUPREME ──────────────────────────────────────────────────────────────
  supreme: {
    id: 'supreme',
    name: 'Supreme',
    shortName: 'Supreme',
    founded: 1994,
    founder: 'James Jebbia',
    boroughOrigin: 'downtown',
    tier: 'streetwear',
    categories: ['streetwear', 'accessories', 'outerwear'],
    flagship: '274 Lafayette St, SoHo, Manhattan',
    description:
      'Founded in 1994 by James Jebbia on Lafayette Street, Supreme began as a downtown hub for NYC skaters, graffiti artists, and rebels. Known for limited weekly "drops" that sell out in seconds, Supreme revolutionized streetwear with scarcity-driven hype culture. Acquired by VF Corporation in 2020, it remains the defining NYC streetwear label worldwide.',
    nycLegacy:
      'Supreme invented modern drop culture. The Lafayette St box logo became the most recognizable symbol in streetwear globally — born on a NYC sidewalk. Every Thursday drop line is a New York cultural institution.',
    artistsWorn: [
      'Playboi Carti', 'Tyler the Creator', 'A$AP Rocky', 'Jay-Z', 'Nas',
      'Kendrick Lamar', 'Lil Uzi Vert', 'Young Thug', 'Travis Scott'
    ],
    priceRange: { low: 38, high: 1200 },
    dropCulture: true,
    resaleMultiplier: 3.5,
    endorsementAvailable: true,
    endorsementTypes: ['gifting', 'collab_capsule'],
    endorsementDealValue: {
      gifting: 800,
      collab_capsule: 250000,
    },
    gameEffect: {
      dripScoreBoost: 18,
      imageStatBonus: 12,
      socialFollowingBoost: 8,
      streetCredBonus: 20,
      bookingFeeMultiplier: 1.15,
      labelInterestBoost: 10,
      unlocksBoroughEvents: ['downtown', 'brooklyn'],
    },
    unlockRequirement: { minLevel: 3, minDripScore: 25 },
    inGameEvent:
      'You cop a Supreme box logo hoodie before Thursday drop sells out. Your street cred spikes overnight — fans spot you in SoHo and post everywhere.',
    gameRelevance:
      'Wearing Supreme signals you are authentic NYC street culture. Unlocks Downtown Manhattan venues and boosts social following through organic hype posts.',
  },

  // ── KITH ─────────────────────────────────────────────────────────────────
  kith: {
    id: 'kith',
    name: 'KITH',
    shortName: 'KITH',
    founded: 2011,
    founder: 'Ronnie Fieg',
    boroughOrigin: 'brooklyn',
    tier: 'luxury_street',
    categories: ['streetwear', 'sneakers', 'activewear', 'accessories'],
    flagship: '337 Lafayette St, Nolita, Manhattan (multiple NYC locations)',
    description:
      'Founded by Ronnie Fieg in 2011, KITH evolved from a sneaker boutique in Brooklyn into one of the most powerful luxury streetwear brands in the world. Known for its KITH Treats cereal bar inside every flagship (a cultural destination in itself), KITH collaborates with Nike, New Balance, Versace, and dozens more. Blends athletic heritage with elevated fashion.',
    nycLegacy:
      'Ronnie Fieg grew up in Queens and started KITH in Brooklyn — a true NYC rags-to-riches brand story. The Treats bar turned sneaker shopping into a cultural experience. KITH put Brooklyn luxury streetwear on the global map.',
    artistsWorn: [
      'Drake', 'LeBron James', 'A$AP Rocky', 'Cardi B', 'Travis Scott',
      'Lil Baby', 'Gunna', 'Post Malone', 'Bad Bunny'
    ],
    priceRange: { low: 55, high: 1500 },
    dropCulture: true,
    resaleMultiplier: 2.2,
    endorsementAvailable: true,
    endorsementTypes: ['gifting', 'paid_post', 'ambassador', 'collab_capsule'],
    endorsementDealValue: {
      gifting: 1200,
      paid_post: 8000,
      ambassador: 75000,
      collab_capsule: 400000,
    },
    gameEffect: {
      dripScoreBoost: 22,
      imageStatBonus: 18,
      socialFollowingBoost: 12,
      streetCredBonus: 15,
      bookingFeeMultiplier: 1.20,
      labelInterestBoost: 18,
      unlocksBoroughEvents: ['brooklyn', 'manhattan', 'queens'],
    },
    unlockRequirement: { minLevel: 4, minDripScore: 35, minSocialFollowing: 50 },
    inGameEvent:
      'Ronnie Fieg\'s team DMs you about gifting. You\'re spotted at the KITH Treats bar in Nolita — the paparazzi shot goes viral before you finish your cereal.',
    gameRelevance:
      'KITH endorsement dramatically boosts label interest and booking fees. The brand\'s crossover with luxury gives your image both street authenticity and industry polish.',
  },

  // ── AIMÉ LEON DORE (ALD) ─────────────────────────────────────────────────
  aime_leon_dore: {
    id: 'aime_leon_dore',
    name: 'Aimé Leon Dore',
    shortName: 'ALD',
    founded: 2014,
    founder: 'Teddy Santis',
    boroughOrigin: 'queens',
    tier: 'luxury_street',
    categories: ['streetwear', 'accessories', 'activewear'],
    flagship: '9 Mulberry St, Nolita, Manhattan',
    description:
      'Founded in March 2014 by Teddy Santis in Queens, NYC, Aimé Leon Dore draws inspiration from basketball, \'90s hip-hop, Mediterranean culture, and the everyday style of Queens. The brand became a darling of the fashion world for its tasteful, story-rich approach to streetwear. Santis was appointed Creative Director of New Balance Made in USA — cementing ALD\'s prestige.',
    nycLegacy:
      'ALD put Queens on the high-fashion map. Teddy Santis\' references to Queens bodegas, blacktop courts, and late-night diners turned neighborhood nostalgia into global luxury. The Mulberry St flagship became a pilgrimage site.',
    artistsWorn: [
      'Kendrick Lamar', 'A$AP Rocky', 'Pusha T', 'Benny the Butcher',
      'Conway the Machine', 'Don Toliver', 'Central Cee'
    ],
    priceRange: { low: 70, high: 900 },
    dropCulture: true,
    resaleMultiplier: 1.8,
    endorsementAvailable: true,
    endorsementTypes: ['gifting', 'paid_post', 'ambassador', 'collab_capsule'],
    endorsementDealValue: {
      gifting: 1000,
      paid_post: 10000,
      ambassador: 90000,
      collab_capsule: 350000,
    },
    gameEffect: {
      dripScoreBoost: 24,
      imageStatBonus: 20,
      socialFollowingBoost: 10,
      streetCredBonus: 14,
      bookingFeeMultiplier: 1.22,
      labelInterestBoost: 22,
      unlocksBoroughEvents: ['queens', 'manhattan', 'brooklyn'],
    },
    unlockRequirement: { minLevel: 4, minDripScore: 40, minSocialFollowing: 75 },
    inGameEvent:
      'Teddy Santis personally puts you in ALD x New Balance kicks before your Nolita photoshoot. The press picks it up — publications are calling you "the most stylish artist in Queens right now."',
    gameRelevance:
      'ALD boosts crossover appeal — both hip-hop heads and fashion editors take notice. Highest label interest boost of the luxury_street tier brands.',
  },

  // ── NOAH NYC ─────────────────────────────────────────────────────────────
  noah_nyc: {
    id: 'noah_nyc',
    name: 'Noah NYC',
    shortName: 'Noah',
    founded: 2015,
    founder: 'Brendon Babenzien',
    boroughOrigin: 'downtown',
    tier: 'luxury_street',
    categories: ['streetwear', 'outerwear', 'accessories'],
    flagship: '195 Mulberry St, Nolita, Manhattan',
    description:
      'Founded in 2015 by Brendon Babenzien after his tenure as Supreme\'s Creative Director, Noah NYC merges skate culture, punk, surf, and NYC street sensibility with sustainable practices. Known for its activist messaging, environmental responsibility, and premium quality basics that never beg for attention.',
    nycLegacy:
      'Noah carries Supreme\'s downtown DNA while adding conscience. The brand proves NYC streetwear can have principles — it donates 1% of sales to environmental causes and refuses fast fashion tactics.',
    artistsWorn: [
      'Tyler the Creator', 'Frank Ocean', 'Mac DeMarco', 'Blood Orange',
      'Alex G', 'Vampire Weekend'
    ],
    priceRange: { low: 45, high: 600 },
    dropCulture: false,
    resaleMultiplier: 1.3,
    endorsementAvailable: true,
    endorsementTypes: ['gifting', 'ambassador'],
    endorsementDealValue: {
      gifting: 700,
      ambassador: 40000,
    },
    gameEffect: {
      dripScoreBoost: 16,
      imageStatBonus: 14,
      socialFollowingBoost: 7,
      streetCredBonus: 12,
      bookingFeeMultiplier: 1.10,
      labelInterestBoost: 14,
      unlocksBoroughEvents: ['downtown', 'brooklyn'],
    },
    unlockRequirement: { minLevel: 3, minDripScore: 28 },
    inGameEvent:
      'Noah sends you a care package with a handwritten note from Babenzien. You wear the collab tee in your acoustic set video — indie blogs go nuts.',
    gameRelevance:
      'Noah unlocks crossover appeal into indie/alternative music scenes, expanding your fanbase beyond hip-hop and unlocking Downtown Manhattan\'s independent venue circuit.',
  },

  // ── ONLY NY ──────────────────────────────────────────────────────────────
  only_ny: {
    id: 'only_ny',
    name: 'Only NY',
    shortName: 'Only NY',
    founded: 2007,
    founder: 'Bobby Hundreds & team (NYC collective)',
    boroughOrigin: 'manhattan',
    tier: 'streetwear',
    categories: ['streetwear', 'accessories'],
    flagship: '186 Orchard St, Lower East Side, Manhattan',
    description:
      'Founded in 2007, Only NY is a community-based NYC streetwear and skate brand whose graphic-driven approach captures the pulse of New York City. From borough pride tees to NYC Transit collab pieces, Only NY is authentic to the bone — priced for real New Yorkers.',
    nycLegacy:
      'Only NY represents the working-class NYC artist — no hype machine, no celebrity placements needed. Every design is a love letter to the five boroughs.',
    artistsWorn: [
      'Joey Bada$$', 'Pro Era collective', 'Wiki', 'Ransom', 'Bodega Bamz'
    ],
    priceRange: { low: 28, high: 180 },
    dropCulture: false,
    resaleMultiplier: 1.1,
    endorsementAvailable: true,
    endorsementTypes: ['gifting', 'paid_post'],
    endorsementDealValue: {
      gifting: 400,
      paid_post: 1500,
    },
    gameEffect: {
      dripScoreBoost: 10,
      imageStatBonus: 8,
      socialFollowingBoost: 4,
      streetCredBonus: 18,
      bookingFeeMultiplier: 1.05,
      labelInterestBoost: 6,
      unlocksBoroughEvents: ['manhattan', 'bronx', 'brooklyn'],
    },
    unlockRequirement: { minLevel: 1, minDripScore: 5 },
    inGameEvent:
      'You rock an Only NY LES tee at your open mic. The crowd recognizes it immediately — local heads give you respect you can\'t buy with money.',
    gameRelevance:
      'Entry-level brand for new artists. Highest street_credibility-to-cost ratio in the game. Essential for the underground → streetwear transition.',
  },

  // ── DAPPER DAN OF HARLEM ─────────────────────────────────────────────────
  dapper_dan: {
    id: 'dapper_dan',
    name: 'Dapper Dan of Harlem',
    shortName: 'Dapper Dan',
    founded: 1982,
    founder: 'Daniel Day (Dapper Dan)',
    boroughOrigin: 'harlem',
    tier: 'icon',
    categories: ['custom_couture', 'luxury', 'accessories'],
    flagship: '9 E 125th St, Harlem, Manhattan (Dapper Dan\'s Atelier)',
    description:
      'Daniel Day — known as Dapper Dan — opened his legendary Harlem boutique in 1982 and redefined what luxury meant for Black America. He took European fashion house logos (Gucci, Louis Vuitton, MCM) and tailored them into one-of-a-kind pieces for hip-hop artists, athletes, and Harlem\'s elite. Raided by fashion houses in 1992, he was vindicated when Gucci partnered with him in 2017, reopening his Harlem atelier in 2018. In 2025, he wore a custom zoot suit at the Met Gala featuring the Sankofa bird. His "Dream Connection" program (June 2025) mentors young Harlem entrepreneurs.',
    nycLegacy:
      'Dapper Dan is THE architect of hip-hop fashion. Before designers dressed rappers, Dapper Dan dressed rappers. LL Cool J, Salt-N-Pepa, Big Daddy Kane, Mike Tyson — all wore Dapper Dan. He brought high fashion to Harlem when Harlem wasn\'t welcomed at high fashion.',
    artistsWorn: [
      'LL Cool J', 'Salt-N-Pepa', 'Big Daddy Kane', 'Eric B. & Rakim',
      'Jay-Z', 'Diddy', 'Nas', 'A$AP Rocky', 'Cardi B', 'Offset', 'Lil Kim',
      'Mike Tyson', 'Floyd Mayweather'
    ],
    priceRange: { low: 2500, high: 50000 },
    dropCulture: false,
    resaleMultiplier: 8.0,
    endorsementAvailable: true,
    endorsementTypes: ['gifting', 'collab_capsule', 'creative_director'],
    endorsementDealValue: {
      gifting: 5000,
      collab_capsule: 1500000,
      creative_director: 5000000,
    },
    gameEffect: {
      dripScoreBoost: 40,
      imageStatBonus: 35,
      socialFollowingBoost: 25,
      streetCredBonus: 40,
      bookingFeeMultiplier: 1.60,
      labelInterestBoost: 45,
      unlocksBoroughEvents: ['harlem', 'manhattan', 'bronx', 'brooklyn', 'queens'],
    },
    unlockRequirement: {
      minLevel: 8,
      minDripScore: 70,
      minSocialFollowing: 500,
      completedQuest: 'harlem_legend_status',
    },
    inGameEvent:
      'You walk into 125th Street and Dapper Dan himself greets you at the door. He takes your measurements for a custom piece. When photos drop, every outlet from Vogue to XXL runs the story.',
    gameRelevance:
      'The single highest Drip Score boost in the game. Unlocks ALL five NYC boroughs simultaneously. A Dapper Dan custom piece transforms your career trajectory — from artist to icon.',
  },

  // ── WU WEAR (WU-TANG) ────────────────────────────────────────────────────
  wu_wear: {
    id: 'wu_wear',
    name: 'Wu Wear',
    shortName: 'Wu Wear',
    founded: 1995,
    founder: 'RZA / Wu-Tang Clan',
    boroughOrigin: 'brooklyn',
    tier: 'streetwear',
    categories: ['streetwear', 'accessories'],
    flagship: 'Originally Staten Island; online + NYC pop-ups',
    description:
      'Wu Wear was launched by RZA and the Wu-Tang Clan in 1995 as the first major rapper-owned clothing brand — predating most hip-hop fashion ventures by a decade. Featuring the iconic W logo and Wu-Tang symbol, it translates the Clan\'s gritty NYC aesthetics (Staten Island + Brooklyn) into hoodies, tracksuits, beanies, and tees. Revived multiple times and still active in NYC pop-up culture.',
    nycLegacy:
      'Wu Wear proved rappers could own fashion — not just wear it. Before Jay-Z had Rocawear or Diddy had Sean John, Wu-Tang had Wu Wear. It\'s the blueprint for rapper-owned brands in NYC.',
    artistsWorn: [
      'Wu-Tang Clan (all members)', 'Method Man', 'Ghostface Killah',
      'Raekwon', 'GZA', 'ODB (Ol\' Dirty Bastard)', 'Nas (collab era)'
    ],
    priceRange: { low: 35, high: 250 },
    dropCulture: false,
    resaleMultiplier: 2.0,
    endorsementAvailable: false,  // You start your OWN brand instead
    endorsementTypes: [],
    endorsementDealValue: {},
    gameEffect: {
      dripScoreBoost: 14,
      imageStatBonus: 10,
      socialFollowingBoost: 6,
      streetCredBonus: 22,
      bookingFeeMultiplier: 1.08,
      labelInterestBoost: 8,
      unlocksBoroughEvents: ['brooklyn', 'manhattan', 'bronx'],
    },
    unlockRequirement: { minLevel: 2, minDripScore: 15 },
    inGameEvent:
      'You find a vintage Wu Wear 36 Chambers hoodie at a BK thrift. Wearing it onstage at S.O.B.s, old-school fans rush the front — the energy is different.',
    gameRelevance:
      'Wearing Wu Wear signals deep hip-hop knowledge and old-school authenticity. Triggers unique dialogue from veteran NPC artists and unlocks Brooklyn underground venues.',
  },

  // ── AWAKE NY ─────────────────────────────────────────────────────────────
  awake_ny: {
    id: 'awake_ny',
    name: 'Awake NY',
    shortName: 'Awake NY',
    founded: 2012,
    founder: 'Angelo Baque',
    boroughOrigin: 'downtown',
    tier: 'luxury_street',
    categories: ['streetwear', 'accessories'],
    flagship: '43 Canal St, Lower East Side, Manhattan',
    description:
      'Founded in 2012 by Angelo Baque, former Brand Director of Supreme, Awake NY infuses streetwear with visual art, social activism, and NYC multicultural identity. Known for powerful graphic tees that reference political movements, Afro-Latino culture, and New York City history. Collaborations with Carhartt, Timberland, and New Balance have elevated its profile.',
    nycLegacy:
      'Awake NY represents the post-Supreme generation of downtown NYC fashion — more conscious, more diverse, and more politically engaged. Angelo Baque brought his LES immigrant experience to every piece.',
    artistsWorn: [
      'Pharrell Williams', 'Swizz Beatz', 'A$AP Rocky', 'Brockhampton',
      'Cordae', 'Smino', 'Saba'
    ],
    priceRange: { low: 50, high: 450 },
    dropCulture: true,
    resaleMultiplier: 1.6,
    endorsementAvailable: true,
    endorsementTypes: ['gifting', 'ambassador', 'collab_capsule'],
    endorsementDealValue: {
      gifting: 600,
      ambassador: 45000,
      collab_capsule: 180000,
    },
    gameEffect: {
      dripScoreBoost: 18,
      imageStatBonus: 16,
      socialFollowingBoost: 9,
      streetCredBonus: 16,
      bookingFeeMultiplier: 1.14,
      labelInterestBoost: 16,
      unlocksBoroughEvents: ['downtown', 'brooklyn', 'bronx'],
    },
    unlockRequirement: { minLevel: 3, minDripScore: 30, minSocialFollowing: 30 },
    inGameEvent:
      'Angelo Baque slides into your DMs after seeing your single art. He wants to co-create a tee around your next project. The collab drops the same week as your EP.',
    gameRelevance:
      'Awake NY boosts your artist narrative — it signals you stand for something beyond the music. Unlocks sync licensing opportunities with socially conscious brands.',
  },

  // ── HELLSTAR ─────────────────────────────────────────────────────────────
  hellstar: {
    id: 'hellstar',
    name: 'Hellstar',
    shortName: 'Hellstar',
    founded: 2020,
    founder: 'Sean Holland',
    boroughOrigin: 'manhattan',
    tier: 'streetwear',
    categories: ['streetwear', 'accessories'],
    flagship: 'NYC pop-ups + online (Soho activation events)',
    description:
      'Founded in 2020 by Sean Holland, Hellstar erupted onto the NYC streetwear scene with dark, mystical graphics combining sci-fi, spirituality, and street aesthetics. One of the fastest-growing brands in NYC by 2024–2025. Ranked #10 in Complex\'s Best Streetwear Brands 2025. Worn heavily across Gen-Z drill and rap circles.',
    nycLegacy:
      'Hellstar represents the new NYC streetwear wave — born during the pandemic, exploded post-COVID. It proves you don\'t need a Lafayette St address to dominate NYC fashion.',
    artistsWorn: [
      'Gunna', 'Lil Baby', 'Offset', 'Playboi Carti', 'Ken Carson',
      'Destroy Lonely', 'Yeat', 'Central Cee'
    ],
    priceRange: { low: 85, high: 700 },
    dropCulture: true,
    resaleMultiplier: 2.8,
    endorsementAvailable: true,
    endorsementTypes: ['gifting', 'paid_post', 'ambassador'],
    endorsementDealValue: {
      gifting: 600,
      paid_post: 5000,
      ambassador: 50000,
    },
    gameEffect: {
      dripScoreBoost: 20,
      imageStatBonus: 14,
      socialFollowingBoost: 15,
      streetCredBonus: 17,
      bookingFeeMultiplier: 1.18,
      labelInterestBoost: 13,
      unlocksBoroughEvents: ['manhattan', 'brooklyn'],
    },
    unlockRequirement: { minLevel: 2, minDripScore: 20, minSocialFollowing: 20 },
    inGameEvent:
      'You flex a Hellstar tee in your IG story. It gets reposted by the brand\'s official account to their 2M followers. Your notifications break.',
    gameRelevance:
      'Highest social following boost in the streetwear tier. Essential for Gen-Z audience building and unlocking TikTok algorithm boosts in the digital platform system.',
  },

  // ── SP5DER ────────────────────────────────────────────────────────────────
  sp5der: {
    id: 'sp5der',
    name: 'Sp5der',
    shortName: 'Sp5der',
    founded: 2021,
    founder: 'Gunna (Sergio Kitchens) & team',
    boroughOrigin: 'manhattan',
    tier: 'streetwear',
    categories: ['streetwear', 'accessories'],
    flagship: 'NYC pop-ups + Atlanta (NYC adoption heavy)',
    description:
      'Launched in 2021 with heavy ties to Atlanta trap culture but immediately absorbed into NYC streetwear through Gunna, Young Thug, and their NYC-connected peers. Sp5der\'s web-motif graphics and neon colorways became one of the most recognizable looks of 2023–2025. Ranked #14 in Complex\'s Best Streetwear Brands 2025. A staple in NYC drill and rap.',
    nycLegacy:
      'Sp5der represents the NYC x Atlanta pipeline — where trap music meets NYC fashion energy. The brand\'s NYC pop-ups consistently draw lines around the block.',
    artistsWorn: [
      'Gunna', 'Young Thug', 'Playboi Carti', 'Lil Uzi Vert', 'Ice Spice',
      'Cardi B', 'Offset', 'Central Cee', 'Nettspend'
    ],
    priceRange: { low: 75, high: 600 },
    dropCulture: true,
    resaleMultiplier: 2.5,
    endorsementAvailable: true,
    endorsementTypes: ['gifting', 'paid_post', 'ambassador'],
    endorsementDealValue: {
      gifting: 500,
      paid_post: 4500,
      ambassador: 45000,
    },
    gameEffect: {
      dripScoreBoost: 16,
      imageStatBonus: 12,
      socialFollowingBoost: 14,
      streetCredBonus: 15,
      bookingFeeMultiplier: 1.14,
      labelInterestBoost: 11,
      unlocksBoroughEvents: ['manhattan', 'brooklyn', 'bronx'],
    },
    unlockRequirement: { minLevel: 2, minDripScore: 18, minSocialFollowing: 15 },
    inGameEvent:
      'You pull up to a Bronx cypher in full Sp5der. A producer from Atlanta who\'s in town immediately clocks it and introduces himself. "I heard your stuff — we should work."',
    gameRelevance:
      'Sp5der builds the NYC x Atlanta bridge. Unlocks cross-regional collaborations between Atlanta (ATLANTA region) and NYC artists.',
  },

  // ── DENIM TEARS ──────────────────────────────────────────────────────────
  denim_tears: {
    id: 'denim_tears',
    name: 'Denim Tears',
    shortName: 'Denim Tears',
    founded: 2019,
    founder: 'Tremaine Emory',
    boroughOrigin: 'downtown',
    tier: 'luxury_street',
    categories: ['denim', 'streetwear', 'accessories'],
    flagship: 'NYC activations (born in ATL, shaped by NYC + London)',
    description:
      'Founded in 2019 by Tremaine Emory (a.k.a. Denim Tears), the brand uses fashion to convey potent symbols and icons rooted in African American history. The cotton wreath motif — referencing the history of cotton picking in America — made Denim Tears one of the most culturally significant and discussed fashion brands of the decade. Ranked #8 in Complex\'s Best Streetwear Brands 2025.',
    nycLegacy:
      'Denim Tears brings the pain and pride of Black American history into fashion. Tremaine Emory\'s NYC connections (former Supreme creative) made this brand part of the NYC fashion conversation immediately.',
    artistsWorn: [
      'Kanye West', 'Travis Scott', 'Tyler the Creator', 'Pharrell Williams',
      'Frank Ocean', 'Pusha T', 'A$AP Rocky', 'Ye', 'Virgil Abloh (tribute)'
    ],
    priceRange: { low: 150, high: 1200 },
    dropCulture: true,
    resaleMultiplier: 3.0,
    endorsementAvailable: true,
    endorsementTypes: ['gifting', 'collab_capsule'],
    endorsementDealValue: {
      gifting: 1500,
      collab_capsule: 500000,
    },
    gameEffect: {
      dripScoreBoost: 26,
      imageStatBonus: 22,
      socialFollowingBoost: 11,
      streetCredBonus: 24,
      bookingFeeMultiplier: 1.25,
      labelInterestBoost: 24,
      unlocksBoroughEvents: ['downtown', 'brooklyn', 'harlem'],
    },
    unlockRequirement: {
      minLevel: 5,
      minDripScore: 50,
      minSocialFollowing: 100,
      completedQuest: 'release_social_justice_track',
    },
    inGameEvent:
      'Tremaine Emory sends you a Denim Tears cotton wreath hoodie after seeing your track about Black America. You wear it in your music video. The imagery goes global.',
    gameRelevance:
      'Denim Tears unlocks narrative-driven marketing opportunities and boosts press coverage beyond music media (fashion press, culture blogs). Triggers unique "cultural impact" quest chain.',
  },

  // ── GUCCI (NYC / DAPPER DAN ERA) ─────────────────────────────────────────
  gucci: {
    id: 'gucci',
    name: 'Gucci',
    shortName: 'Gucci',
    founded: 1921,
    founder: 'Guccio Gucci (NYC prominence via Dapper Dan, 1980s)',
    boroughOrigin: 'manhattan',
    tier: 'high_fashion',
    categories: ['luxury', 'accessories', 'outerwear'],
    flagship: '840 Madison Ave, Upper East Side, Manhattan',
    description:
      'Italian luxury house globally. In NYC, Gucci\'s cultural relevance was forged in the 1980s–90s when Dapper Dan used its logo patterns in custom hip-hop pieces. After the iconic 2017 partnership with Dapper Dan, Gucci has cemented its place as the luxury house most intertwined with hip-hop and Black American culture.',
    nycLegacy:
      'Gucci in NYC is inseparable from Dapper Dan\'s Harlem. The brand once shut him down — then realized he\'d given them their coolest chapter. The Dapper Dan x Gucci reconciliation is a NYC fashion story for the ages.',
    artistsWorn: [
      'Jay-Z', 'Cardi B', 'Offset', 'A$AP Rocky', 'Lil Pump',
      'Gucci Mane', 'Tyler the Creator', '2 Chainz', 'Lil Uzi Vert'
    ],
    priceRange: { low: 450, high: 8000 },
    dropCulture: false,
    resaleMultiplier: 1.4,
    endorsementAvailable: true,
    endorsementTypes: ['gifting', 'ambassador', 'collab_capsule'],
    endorsementDealValue: {
      gifting: 8000,
      ambassador: 500000,
      collab_capsule: 3000000,
    },
    gameEffect: {
      dripScoreBoost: 32,
      imageStatBonus: 28,
      socialFollowingBoost: 18,
      streetCredBonus: 20,
      bookingFeeMultiplier: 1.45,
      labelInterestBoost: 35,
      unlocksBoroughEvents: ['manhattan', 'harlem', 'brooklyn'],
    },
    unlockRequirement: {
      minLevel: 7,
      minDripScore: 60,
      minSocialFollowing: 250,
    },
    inGameEvent:
      'Gucci\'s PR team reaches out after your platinum certification. You\'re invited to their Madison Ave private suite. When you leave, the gifting bag alone is worth $8,000.',
    gameRelevance:
      'Gucci marks the transition from streetwear artist to mainstream fashion icon. Unlocks fashion week attendance events and triggers crossover label deals.',
  },

  // ── LOUIS VUITTON (NYC / PHARRELL ERA) ───────────────────────────────────
  louis_vuitton: {
    id: 'louis_vuitton',
    name: 'Louis Vuitton',
    shortName: 'LV',
    founded: 1854,
    founder: 'Louis Vuitton (NYC scene via Pharrell Williams, Men\'s CD 2023)',
    boroughOrigin: 'manhattan',
    tier: 'icon',
    categories: ['luxury', 'accessories'],
    flagship: '1 E 57th St, Midtown Manhattan',
    description:
      'The most valuable luxury brand in the world. In the music world, LV\'s NYC chapter became pivotal when Pharrell Williams was named Men\'s Creative Director in 2023 following the death of Virgil Abloh. Pharrell\'s debut collection and subsequent shows merged hip-hop aesthetics with French luxury at the highest level possible.',
    nycLegacy:
      'Louis Vuitton in NYC music culture is about legacy and arrival. When Virgil Abloh became LV\'s Men\'s CD, it signaled that hip-hop culture had conquered the pinnacle of fashion. Pharrell continuing that legacy cements it permanently.',
    artistsWorn: [
      'Jay-Z', 'Beyoncé', 'Pharrell Williams', 'Kanye West', 'A$AP Rocky',
      'Tyler the Creator', 'Drake', 'Travis Scott', 'Doechii', 'Bad Bunny'
    ],
    priceRange: { low: 600, high: 25000 },
    dropCulture: false,
    resaleMultiplier: 1.5,
    endorsementAvailable: true,
    endorsementTypes: ['gifting', 'ambassador', 'creative_director'],
    endorsementDealValue: {
      gifting: 15000,
      ambassador: 1000000,
      creative_director: 10000000,
    },
    gameEffect: {
      dripScoreBoost: 38,
      imageStatBonus: 34,
      socialFollowingBoost: 22,
      streetCredBonus: 18,
      bookingFeeMultiplier: 1.55,
      labelInterestBoost: 42,
      unlocksBoroughEvents: ['manhattan', 'harlem', 'brooklyn', 'queens'],
    },
    unlockRequirement: {
      minLevel: 9,
      minDripScore: 75,
      minSocialFollowing: 750,
      completedQuest: 'global_chart_top_10',
    },
    inGameEvent:
      'Pharrell\'s team contacts you about being in an LV campaign. The shoot is in Paris, but the press tour includes NYC Fashion Week. You\'re on the cover of GQ.',
    gameRelevance:
      'Louis Vuitton is a pinnacle brand — achieving LV endorsement signals you\'ve transcended music and become a global cultural figure. Unlocks international tour event chains.',
  },

  // ── THOM BROWNE ──────────────────────────────────────────────────────────
  thom_browne: {
    id: 'thom_browne',
    name: 'Thom Browne',
    shortName: 'Thom Browne',
    founded: 2001,
    founder: 'Thom Browne',
    boroughOrigin: 'manhattan',
    tier: 'high_fashion',
    categories: ['luxury', 'accessories', 'outerwear'],
    flagship: '100 Hudson St, Tribeca, Manhattan',
    description:
      'New York City-based luxury fashion house founded in 2001 by Thom Browne, known for deconstructed tailoring, grey flannel suiting, and avant-garde runway presentations. Exploded in hip-hop cultural relevance when Doechii wore Thom Browne to the 2025 Grammy Awards, generating $6.3 million in media impact value according to Launchmetrics — one of the highest single-event media values in recent fashion history.',
    nycLegacy:
      'Thom Browne proved NYC high fashion can be theatrical AND wearable. His Tribeca atelier is a NYC institution. Doechii\'s 2025 Grammy moment put Thom Browne permanently in the hip-hop fashion conversation.',
    artistsWorn: [
      'Doechii', 'Beyoncé', 'Jay-Z', 'LeBron James', 'Kim Kardashian',
      'Usher', 'Janelle Monáe', 'Frank Ocean'
    ],
    priceRange: { low: 800, high: 12000 },
    dropCulture: false,
    resaleMultiplier: 1.3,
    endorsementAvailable: true,
    endorsementTypes: ['gifting', 'ambassador'],
    endorsementDealValue: {
      gifting: 12000,
      ambassador: 600000,
    },
    gameEffect: {
      dripScoreBoost: 30,
      imageStatBonus: 30,
      socialFollowingBoost: 16,
      streetCredBonus: 12,
      bookingFeeMultiplier: 1.40,
      labelInterestBoost: 32,
      unlocksBoroughEvents: ['manhattan', 'brooklyn'],
    },
    unlockRequirement: {
      minLevel: 7,
      minDripScore: 58,
      minSocialFollowing: 200,
      completedQuest: 'award_show_performance',
    },
    inGameEvent:
      'Thom Browne dresses you for the award show. Every outlet is photographing you on the red carpet. Launchmetrics calculates your media impact value at $6.3M within 48 hours.',
    gameRelevance:
      'Thom Browne triggers the "Award Show Moment" event — one of the highest single-event media impact boosts in the game. Equivalent to a viral moment.',
  },
}

// ─────────────────────────────────────────────────────────────────────────────
// DRIP SCORE TIERS
// ─────────────────────────────────────────────────────────────────────────────

export const DRIP_SCORE_TIERS: DripScoreTier[] = [
  {
    tier: 'underground',
    minScore: 0,
    maxScore: 19,
    label: 'No Drip',
    description: 'Thrift store finds, hand-me-downs, local NYC vendors. Authentic but unpolished.',
    perks: ['Access to open mic venues', 'Respect from underground heads'],
    nycReputation: 'That artist who stays true — needs a stylist though.',
    gameUnlocks: ['Open mic events', 'Bronx & Brooklyn underground circuits'],
  },
  {
    tier: 'streetwear',
    minScore: 20,
    maxScore: 44,
    label: 'Street Certified',
    description: 'Supreme, Only NY, Wu Wear, Hellstar — you look the part in any NYC borough.',
    perks: [
      '+10% social media following growth',
      'Unlocks mid-tier venues',
      'Brands start gifting',
      'Booking fees increase 10–18%',
    ],
    nycReputation: 'Heads notice what you\'re wearing on the block.',
    gameUnlocks: [
      'NYC streetwear store visits',
      'Brand gifting deals',
      'S.O.B.s, Bowery Ballroom, Brooklyn Steel events',
    ],
  },
  {
    tier: 'luxury_street',
    minScore: 45,
    maxScore: 64,
    label: 'Elevated',
    description: 'KITH, ALD, Noah, Awake, Denim Tears — fashion press starts paying attention.',
    perks: [
      '+20% social following growth',
      'Fashion week invitations (NYFW)',
      'Ambassador deals available',
      'Labels approach YOU',
      'Booking fees increase 20–25%',
    ],
    nycReputation: 'Style blogs are writing think-pieces about your fits.',
    gameUnlocks: [
      'NYFW attendance events',
      'Fashion-music collab quests',
      'Magazine cover opportunities',
      'Sync licensing premium tier',
    ],
  },
  {
    tier: 'high_fashion',
    minScore: 65,
    maxScore: 84,
    label: 'Fashion Icon',
    description: 'Gucci, Thom Browne, Versace — you\'re front row at Fashion Week, not the audience.',
    perks: [
      '+35% social following growth',
      'International press coverage',
      'Award show red carpet bookings',
      'Luxury brand ambassador deals',
      'Booking fees increase 40–55%',
    ],
    nycReputation: 'Vogue, GQ, and WWD are all covering your style.',
    gameUnlocks: [
      'Award show performance events',
      'International venue unlocks (teaser)',
      'Major label mega-deals',
      'Fashion x music hybrid deals',
    ],
  },
  {
    tier: 'icon',
    minScore: 85,
    maxScore: 100,
    label: 'NYC Legend',
    description: 'Dapper Dan custom, Louis Vuitton campaign, Met Gala invite. You ARE the culture.',
    perks: [
      '+50% social following growth',
      'Met Gala invitation',
      'Creative Director offers',
      'All NYC venues unlocked',
      'Booking fees at maximum multiplier',
      'International tour unlocked',
    ],
    nycReputation: 'Museums are planning exhibits about your career.',
    gameUnlocks: [
      'Met Gala event chain',
      'International regions preview',
      'Legacy quest line: "Architect of Culture"',
      'All NYC borough events fully unlocked',
    ],
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// ARTIST OUTFITS — Curated NYC Looks
// ─────────────────────────────────────────────────────────────────────────────

export const ARTIST_OUTFITS: ArtistOutfit[] = [
  {
    id: 'les_local',
    name: 'LES Local',
    description: 'Only NY tee, Levi\'s 501s, beat-up Nike Air Force 1s from the local sneaker shop. This is real New York.',
    brands: ['only_ny'],
    totalCost: 180,
    dripScore: 12,
    tier: 'underground',
    occasion: ['everyday', 'show'],
    gameEffects: {
      imageStatBonus: 5,
      streetCredBonus: 15,
      bookingFeeMultiplier: 1.02,
      socialFollowingBoostPercent: 2,
      labelInterestBoost: 3,
    },
    nycNeighborhoodBonus: 'manhattan',
    flavorText: '"You look like you\'ve been on these streets your whole life." — Every real New Yorker who sees you.',
  },
  {
    id: 'brooklyn_wave',
    name: 'Brooklyn Wave',
    description: 'Wu Wear hoodie layered under a Supreme box logo tee, Timberland 6-inch boots, gold chain. Classic BK energy.',
    brands: ['wu_wear', 'supreme'],
    totalCost: 620,
    dripScore: 28,
    tier: 'streetwear',
    occasion: ['everyday', 'show', 'interview'],
    gameEffects: {
      imageStatBonus: 14,
      streetCredBonus: 22,
      bookingFeeMultiplier: 1.12,
      socialFollowingBoostPercent: 7,
      labelInterestBoost: 9,
    },
    nycNeighborhoodBonus: 'brooklyn',
    flavorText: '"That\'s that real Brooklyn sh*t." — Producer at the session',
  },
  {
    id: 'queens_luxury',
    name: 'Queens Luxury',
    description: 'ALD bucket hat, KITH Quarter-Zip, New Balance 990v6 (ALD collab), Avirex leather jacket from Jamaica Ave. Queens raised.',
    brands: ['aime_leon_dore', 'kith'],
    totalCost: 1450,
    dripScore: 48,
    tier: 'luxury_street',
    occasion: ['show', 'label_meeting', 'interview', 'music_video'],
    gameEffects: {
      imageStatBonus: 24,
      streetCredBonus: 18,
      bookingFeeMultiplier: 1.25,
      socialFollowingBoostPercent: 13,
      labelInterestBoost: 22,
    },
    nycNeighborhoodBonus: 'queens',
    unlockRequirement: { minDripScore: 35, minLevel: 4 },
    flavorText: '"I didn\'t know Queens had it like that." — A&R at Atlantic Records after your showcase.',
  },
  {
    id: 'harlem_royalty',
    name: 'Harlem Royalty',
    description: 'Full Dapper Dan custom suit — LV monogram fabric, handmade in his 125th St atelier. Gold Presidential Rolex. Gator shoes. You are HARLEM.',
    brands: ['dapper_dan', 'louis_vuitton'],
    totalCost: 28000,
    dripScore: 92,
    tier: 'icon',
    occasion: ['award_show', 'fashion_week', 'music_video', 'interview'],
    gameEffects: {
      imageStatBonus: 40,
      streetCredBonus: 42,
      bookingFeeMultiplier: 1.65,
      socialFollowingBoostPercent: 30,
      labelInterestBoost: 50,
    },
    nycNeighborhoodBonus: 'harlem',
    unlockRequirement: { minDripScore: 80, minLevel: 8, completedQuest: 'harlem_legend_status' },
    flavorText: '"I\'ve dressed champions, kings, and legends. Now I\'m dressing you." — Dapper Dan',
  },
  {
    id: 'nolita_editorial',
    name: 'Nolita Editorial',
    description: 'Denim Tears cotton wreath jeans, Awake NY graphic tee, Noah NYC overshirt, ALD x New Balance 550s. Fashion press eats this up.',
    brands: ['denim_tears', 'awake_ny', 'noah_nyc', 'aime_leon_dore'],
    totalCost: 2800,
    dripScore: 62,
    tier: 'luxury_street',
    occasion: ['fashion_week', 'interview', 'music_video', 'label_meeting'],
    gameEffects: {
      imageStatBonus: 28,
      streetCredBonus: 20,
      bookingFeeMultiplier: 1.30,
      socialFollowingBoostPercent: 16,
      labelInterestBoost: 28,
    },
    nycNeighborhoodBonus: 'downtown',
    unlockRequirement: { minDripScore: 50, minLevel: 5, completedQuest: 'release_social_justice_track' },
    flavorText: '"This might be the best-dressed artist in New York right now." — Complex Magazine',
  },
  {
    id: 'grammy_moment',
    name: 'Grammy Moment',
    description: 'Custom Thom Browne tailored suit, Gucci accessories, Louboutin shoes. The cameras cannot look away.',
    brands: ['thom_browne', 'gucci'],
    totalCost: 18000,
    dripScore: 78,
    tier: 'high_fashion',
    occasion: ['award_show', 'fashion_week'],
    gameEffects: {
      imageStatBonus: 36,
      streetCredBonus: 14,
      bookingFeeMultiplier: 1.50,
      socialFollowingBoostPercent: 22,
      labelInterestBoost: 38,
    },
    unlockRequirement: { minDripScore: 65, minLevel: 7, completedQuest: 'award_show_performance' },
    flavorText: 'Launchmetrics calculates your red carpet appearance at $6.3M in media impact value within 24 hours.',
  },
  {
    id: 'gen_z_drip',
    name: 'Gen Z Drip',
    description: 'Hellstar oversized tee, Sp5der shorts, Nike x Travis Scott collab sneakers, rhinestone chain. TikTok was made for this fit.',
    brands: ['hellstar', 'sp5der'],
    totalCost: 980,
    dripScore: 34,
    tier: 'streetwear',
    occasion: ['everyday', 'show', 'music_video'],
    gameEffects: {
      imageStatBonus: 16,
      streetCredBonus: 17,
      bookingFeeMultiplier: 1.16,
      socialFollowingBoostPercent: 18,
      labelInterestBoost: 12,
    },
    nycNeighborhoodBonus: 'manhattan',
    unlockRequirement: { minDripScore: 20, minLevel: 2 },
    flavorText: 'The fit gets reposted by 14 different sneaker accounts before you even perform.',
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// NYC FASHION STORES & LOCATIONS
// ─────────────────────────────────────────────────────────────────────────────

export const NYC_FASHION_STORES: NYCFashionStore[] = [
  {
    id: 'supreme_lafayette',
    name: 'Supreme Lafayette St',
    borough: 'downtown',
    address: '274 Lafayette St, SoHo, Manhattan',
    type: 'flagship',
    brandIds: ['supreme'],
    description: 'The original Supreme flagship. Thursday drop lines stretch around the block. The single most culturally important streetwear retail location on earth.',
    culturalSignificance: 'This is ground zero of modern streetwear culture. The Lafayette St box logo sticker started here in 1994.',
    gameEffect: {
      dripScoreBoost: 8,
      streetCredBonus: 12,
      socialFollowingBoost: 5,
      specialItems: ['supreme_box_logo_hoodie', 'supreme_drop_exclusive'],
    },
    visitCost: 200,
    unlockRequirement: { minDripScore: 15 },
    inGameEvent: 'You make it to the front of the Thursday drop line at 6am. The limited hoodie is yours — and so is a photo that goes viral by noon.',
  },
  {
    id: 'dapper_dan_atelier',
    name: 'Dapper Dan\'s Atelier',
    borough: 'harlem',
    address: '9 E 125th St, Harlem, Manhattan',
    type: 'atelier',
    brandIds: ['dapper_dan'],
    description: 'Dapper Dan\'s legendary Harlem atelier — reopened in 2018 in partnership with Gucci after decades of raids and legal battles. A bespoke couture space where hip-hop legends have been fitted since the 1980s. Every stitch is hand-sewn. Every piece is one-of-a-kind.',
    culturalSignificance: 'The most historically significant fashion location in hip-hop. This is where LL Cool J got fitted, where Big Daddy Kane got his look, where Harlem\'s fashion culture was born.',
    gameEffect: {
      dripScoreBoost: 25,
      streetCredBonus: 30,
      socialFollowingBoost: 15,
      specialItems: ['dapper_dan_custom_suit', 'harlem_legacy_piece'],
    },
    visitCost: 5000,
    unlockRequirement: { minDripScore: 60, minLevel: 6 },
    inGameEvent: 'You walk into the Atelier and Dapper Dan himself emerges from the back. "I heard your music," he says. "Let\'s talk about your look."',
  },
  {
    id: 'kith_treats_nolita',
    name: 'KITH Nolita (with Treats)',
    borough: 'downtown',
    address: '337 Lafayette St, Nolita, Manhattan',
    type: 'flagship',
    brandIds: ['kith'],
    description: 'KITH\'s primary NYC flagship featuring the legendary KITH Treats cereal bar — the most Instagrammed interior in NYC streetwear. Shopping here isn\'t just retail; it\'s a full cultural experience. Carries exclusive NYC-only colorways and collaborations.',
    culturalSignificance: 'Ronnie Fieg turned shopping into an event. The KITH Treats bar made this store a cultural landmark — artists, athletes, and celebrities are photographed here weekly.',
    gameEffect: {
      dripScoreBoost: 12,
      streetCredBonus: 8,
      socialFollowingBoost: 10,
      specialItems: ['kith_nyc_exclusive', 'kith_treats_collab_bowl'],
    },
    visitCost: 400,
    unlockRequirement: { minDripScore: 30, minLevel: 3 },
    inGameEvent: 'You\'re spotted at the Treats bar by a music blogger. The photo caption: "World Stage\'s newest artist living their best life at KITH."',
  },
  {
    id: 'ald_mulberry',
    name: 'Aimé Leon Dore Flagship',
    borough: 'downtown',
    address: '9 Mulberry St, Nolita, Manhattan',
    type: 'flagship',
    brandIds: ['aime_leon_dore'],
    description: 'ALD\'s Nolita flagship is the most curated retail space in NYC streetwear. Designed to evoke a Queens living room crossed with a Parisian boutique. Carries ALD mainline, ALD x New Balance exclusives, and seasonal capsule drops.',
    culturalSignificance: 'ALD Mulberry became a pilgrimage site for the "elevated streetwear" generation. Teddy Santis turned his Queens childhood memories into a destination for the world.',
    gameEffect: {
      dripScoreBoost: 14,
      streetCredBonus: 9,
      socialFollowingBoost: 9,
      specialItems: ['ald_nb_collab_exclusive', 'ald_seasonal_capsule'],
    },
    visitCost: 350,
    unlockRequirement: { minDripScore: 35, minLevel: 4 },
    inGameEvent: 'Teddy Santis is at the store when you visit. He recognizes your music. "Queens made both of us," he says.',
  },
  {
    id: 'stadium_goods_midtown',
    name: 'Stadium Goods',
    borough: 'manhattan',
    address: '47 Howard St, SoHo, Manhattan',
    type: 'sneaker_shop',
    brandIds: ['supreme', 'kith', 'aime_leon_dore', 'sp5der', 'hellstar'],
    description: 'NYC\'s premier sneaker and streetwear consignment marketplace. Thousands of rare, limited, and deadstock sneakers and apparel from every major brand. If it\'s sold out everywhere else, Stadium Goods has it — at a price.',
    culturalSignificance: 'Stadium Goods turned sneaker flipping into a legitimate NYC industry. It\'s the go-to for artists who need a specific rare piece for a video shoot or performance immediately.',
    gameEffect: {
      dripScoreBoost: 6,
      streetCredBonus: 5,
      socialFollowingBoost: 4,
      specialItems: ['rare_deadstock_sneakers', 'sold_out_collab_pickup'],
    },
    visitCost: 500,
    inGameEvent: 'You find the exact pair you need for the video shoot. $800 for resale — but on camera, they\'re priceless.',
  },
  {
    id: 'only_ny_les',
    name: 'Only NY Lower East Side',
    borough: 'manhattan',
    address: '186 Orchard St, Lower East Side, Manhattan',
    type: 'boutique',
    brandIds: ['only_ny'],
    description: 'Only NY\'s LES flagship — affordable, local, authentic. The anti-hype boutique in a city obsessed with hype. Borough pride graphics, NYC Transit collaborations, and real-deal New York fashion at prices actual New Yorkers can afford.',
    culturalSignificance: 'Only NY represents the working NYC artist. No celebrity placement, no inflated prices, just love for the five boroughs.',
    gameEffect: {
      dripScoreBoost: 5,
      streetCredBonus: 10,
      socialFollowingBoost: 3,
      specialItems: ['only_ny_borough_tee', 'nyc_transit_collab'],
    },
    visitCost: 60,
    inGameEvent: 'You buy a borough pride tee for $45. A local rapper at the register says, "I\'ve heard your stuff. Keep going."',
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// FASHION NPCs
// ─────────────────────────────────────────────────────────────────────────────

export const FASHION_NPCS: FashionNPC[] = [
  {
    id: 'marcus_style',
    name: 'Marcus "Drip God" Thompson',
    role: 'Celebrity Stylist — Harlem / Midtown',
    borough: 'harlem',
    description: 'Marcus Thompson grew up in Harlem watching Dapper Dan dress legends. He apprenticed under a Gucci PR stylist, then started his own practice dressing emerging NYC artists. He knows every brand rep, every showroom, and every PR contact in NYC fashion.',
    realWorldInspiration: 'Inspired by stylists like Law Roach (Zendaya) and Ugo Mozie (Travis Scott, Jhené Aiko) — the architect behind artist visual identities.',
    services: [
      'Image consultation ($500/session)',
      'Brand introduction referrals',
      'Full look curation for videos, shows, award nights',
      'Endorsement deal negotiation support',
      'NYFW access coordination',
    ],
    costPerSession: 500,
    gameEffect: {
      dripScoreBoost: 15,
      imageStatBonus: 12,
      unlocksBrands: ['gucci', 'thom_browne', 'dapper_dan', 'louis_vuitton'],
      unlocksOutfits: ['harlem_royalty', 'grammy_moment', 'nolita_editorial'],
      unlocksEndorsements: ['gucci_ambassador', 'thom_browne_ambassador'],
    },
    dialogue: {
      firstMeet: '"I\'ve been watching your movement. You\'ve got sound — now let\'s get you a LOOK. Book a session and we\'ll build your visual identity from the ground up."',
      afterHire: '"I put you in Dapper Dan\'s contact. When he calls, answer on the first ring. This is a once-in-a-generation cosign."',
      maxLevel: '"You don\'t need me anymore. You ARE the reference now. Call me when you\'re dressing OTHER artists."',
    },
  },
  {
    id: 'jasmine_brand',
    name: 'Jasmine Rivera',
    role: 'NYC Brand Deal Broker — Brooklyn',
    borough: 'brooklyn',
    description: 'Jasmine Rivera is a brand partnership broker who connects emerging NYC artists with streetwear and luxury brands for endorsement deals. Former marketing director at KITH, she left to run her own boutique agency repping artists across streetwear, sneaker, and lifestyle deals.',
    realWorldInspiration: 'Inspired by music x fashion brand deal agents who brokered deals like Lil Baby x Porsche, Central Cee x Nike, and the wave of streetwear ambassador programs.',
    services: [
      'Brand deal sourcing and negotiation',
      'Endorsement contract review',
      'Social media posting strategy for brand deals',
      'Capsule collab development',
    ],
    costPerSession: 750,
    gameEffect: {
      dripScoreBoost: 8,
      imageStatBonus: 6,
      unlocksBrands: ['kith', 'hellstar', 'sp5der', 'awake_ny'],
      unlocksOutfits: ['brooklyn_wave', 'gen_z_drip'],
      unlocksEndorsements: ['kith_ambassador', 'hellstar_ambassador', 'sp5der_ambassador'],
    },
    dialogue: {
      firstMeet: '"I\'ve brokered deals for six platinum artists and I\'m very selective. Your numbers aren\'t there yet but I see potential. Build your social following to 50K and come back."',
      afterHire: '"Supreme just asked about you after that post. I\'m setting up the gifting call for next week."',
      maxLevel: '"You just closed a $400K capsule deal with KITH. Ronnie Fieg loves you. I want 15% — you won\'t find anyone who\'ll get you those numbers."',
    },
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// ENDORSEMENT DEALS DATABASE
// ─────────────────────────────────────────────────────────────────────────────

export const FASHION_ENDORSEMENT_DEALS: FashionEndorsementDeal[] = [
  {
    id: 'supreme_gifting',
    brandId: 'supreme',
    dealType: 'gifting',
    dealName: 'Supreme Season Gifting',
    description: 'Supreme sends you a seasonal package: 2 box logo hoodies, 3 tees, accessories. No payment — just exposure. You post organically.',
    realWorldExample: 'Supreme gifting programs historically go to artists with street credibility regardless of chart position.',
    requirements: {
      minLevel: 3,
      minDripScore: 25,
      minSocialFollowing: 15,
    },
    compensation: {
      cashPerMonth: 0,
      freeProductValuePerMonth: 800,
    },
    duration: 'seasonal',
    durationMonths: 3,
    exclusivity: 'none',
    gameEffects: {
      monthlyIncome: 0,
      dripScoreBoost: 10,
      imageStatBonus: 8,
      socialFollowingBoostPercent: 5,
      streetCredBonus: 12,
      bookingFeeMultiplier: 1.10,
      mediaValuePerPost: 25000,
    },
    risks: [
      'If you wear a competitor brand in a post during gifting period, they cancel quietly',
      'No payment — if the deal leaks you look like you\'re working for free',
    ],
    inGameEvent: 'UPS drops a Supreme box at your door. You post the unboxing. 200K views in 6 hours.',
  },
  {
    id: 'kith_ambassador',
    brandId: 'kith',
    dealType: 'ambassador',
    dealName: 'KITH Season Ambassador',
    description: 'Full seasonal ambassador deal with KITH. Includes product ($1,200/month), $6,250/month cash, 4 sponsored posts. One in-store appearance at flagship.',
    realWorldExample: 'KITH ambassador programs modeled after deals with artists like Drake, Lil Baby, and NBA players who became walking KITH advertisements.',
    requirements: {
      minLevel: 4,
      minDripScore: 35,
      minSocialFollowing: 50,
    },
    compensation: {
      cashPerMonth: 6250,
      freeProductValuePerMonth: 1200,
    },
    duration: 'seasonal',
    durationMonths: 6,
    exclusivity: 'category',  // Can't wear competing premium streetwear
    gameEffects: {
      monthlyIncome: 6250,
      dripScoreBoost: 14,
      imageStatBonus: 12,
      socialFollowingBoostPercent: 10,
      streetCredBonus: 10,
      bookingFeeMultiplier: 1.18,
      mediaValuePerPost: 80000,
    },
    risks: [
      'Category exclusivity blocks you from wearing KITH competitors (ALD, Noah) during term',
      'Cancellation clause triggered by any public controversy',
      'Social media minimum post requirements — miss 2 posts and deal is voided',
    ],
    inGameEvent: 'Ronnie Fieg personally announces you on KITH\'s Instagram. 1.2M followers see it. Your DMs break.',
  },
  {
    id: 'ald_capsule',
    brandId: 'aime_leon_dore',
    dealType: 'collab_capsule',
    dealName: 'ALD x [Artist] Capsule Collection',
    description: 'Co-designed 6-piece capsule collection with Aimé Leon Dore. Your story, your neighborhood, your aesthetic — translated into ALD\'s luxury streetwear language. Limited 500 units.',
    realWorldExample: 'ALD has done capsules with New Balance, Drake, and Porsche — always limited, always sold out.',
    requirements: {
      minLevel: 6,
      minDripScore: 50,
      minSocialFollowing: 150,
      completedQuest: 'release_album',
    },
    compensation: {
      cashPerMonth: 29167,  // $350K over 12 months
      freeProductValuePerMonth: 2000,
      royaltyPerUnit: 18,   // $18 per unit sold
    },
    duration: 'annual',
    durationMonths: 12,
    exclusivity: 'full',
    gameEffects: {
      monthlyIncome: 29167,
      dripScoreBoost: 22,
      imageStatBonus: 20,
      socialFollowingBoostPercent: 18,
      streetCredBonus: 18,
      bookingFeeMultiplier: 1.30,
      mediaValuePerPost: 200000,
    },
    risks: [
      'Full exclusivity: no other brand deals during capsule period',
      'If capsule undersells (<300 units), second collection unlikely',
      'Creative disputes with Teddy Santis over design direction possible',
    ],
    inGameEvent: 'ALD x [Your Name] drops on a Thursday. Sold out in 4 minutes. StockX listings hit 3x retail by Friday.',
  },
  {
    id: 'dapper_dan_custom',
    brandId: 'dapper_dan',
    dealType: 'gifting',
    dealName: 'Dapper Dan Custom Commission',
    description: 'Dapper Dan commissions a one-of-a-kind custom piece for you — his personal blessing. Not a deal with terms, but a cultural co-sign that money cannot fully buy. He decides who gets this.',
    realWorldExample: 'Dapper Dan has dressed Jay-Z, Cardi B, and A$AP Rocky in custom pieces — the decision is always his. He dressed Doechii for the 2025 BET Awards.',
    requirements: {
      minLevel: 8,
      minDripScore: 70,
      minSocialFollowing: 500,
      completedQuest: 'harlem_legend_status',
    },
    compensation: {
      cashPerMonth: 0,
      freeProductValuePerMonth: 5000,
    },
    duration: 'one_time',
    durationMonths: 1,
    exclusivity: 'none',
    gameEffects: {
      monthlyIncome: 0,
      dripScoreBoost: 30,
      imageStatBonus: 28,
      socialFollowingBoostPercent: 25,
      streetCredBonus: 35,
      bookingFeeMultiplier: 1.50,
      mediaValuePerPost: 6300000,  // Based on Doechii Grammy data
    },
    risks: [
      'If you disrespect Harlem culture publicly, he publicly rescinds the piece',
      'The piece is one-of-a-kind — wearing it creates enormous public expectations',
    ],
    inGameEvent: 'The photograph of you in the Dapper Dan custom piece gets picked up by GQ, Complex, and Vogue simultaneously. Launchmetrics values the media impact at $6.3M.',
  },
  {
    id: 'gucci_ambassador',
    brandId: 'gucci',
    dealType: 'ambassador',
    dealName: 'Gucci Artist Ambassador',
    description: 'Official Gucci ambassador deal. Monthly product drops, $41,667/month cash, appearances at Gucci events, and a full campaign shoot on Madison Ave.',
    realWorldExample: 'Gucci ambassador deals modeled after partnerships with Cardi B, A$AP Rocky, and Jared Leto — six-figure annual commitments.',
    requirements: {
      minLevel: 7,
      minDripScore: 60,
      minSocialFollowing: 250,
    },
    compensation: {
      cashPerMonth: 41667,  // $500K/year
      freeProductValuePerMonth: 3000,
    },
    duration: 'annual',
    durationMonths: 12,
    exclusivity: 'category',
    gameEffects: {
      monthlyIncome: 41667,
      dripScoreBoost: 20,
      imageStatBonus: 22,
      socialFollowingBoostPercent: 15,
      streetCredBonus: 14,
      bookingFeeMultiplier: 1.40,
      mediaValuePerPost: 350000,
    },
    risks: [
      'Category exclusivity — no LV, Prada, Balenciaga deals simultaneously',
      'Any legal trouble triggers morality clause cancellation',
      'Required to attend minimum 2 Gucci events per year (scheduling conflicts possible)',
    ],
    inGameEvent: 'Gucci runs your face on a billboard in Times Square and on Madison Ave. Your mom sees it and cries.',
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// UTILITY FUNCTIONS
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Get a brand by ID
 */
export function getBrandById(brandId: string): NYCFashionBrand | undefined {
  return NYC_FASHION_BRANDS[brandId]
}

/**
 * Get all brands by tier
 */
export function getBrandsByTier(tier: FashionTier): NYCFashionBrand[] {
  return Object.values(NYC_FASHION_BRANDS).filter(b => b.tier === tier)
}

/**
 * Get all brands by borough origin
 */
export function getBrandsByBorough(borough: BoroughOrigin): NYCFashionBrand[] {
  return Object.values(NYC_FASHION_BRANDS).filter(b => b.boroughOrigin === borough)
}

/**
 * Get all brands a player can access given their current stats
 */
export function getAccessibleBrands(
  playerLevel: number,
  playerDripScore: number,
  playerSocialFollowing: number,  // in thousands
  completedQuests: string[]
): NYCFashionBrand[] {
  return Object.values(NYC_FASHION_BRANDS).filter(brand => {
    const req = brand.unlockRequirement
    if (!req) return true
    if (req.minLevel && playerLevel < req.minLevel) return false
    if (req.minDripScore && playerDripScore < req.minDripScore) return false
    if (req.minSocialFollowing && playerSocialFollowing < req.minSocialFollowing) return false
    if (req.completedQuest && !completedQuests.includes(req.completedQuest)) return false
    return true
  })
}

/**
 * Get available endorsement deals for a player
 */
export function getAvailableEndorsementDeals(
  playerLevel: number,
  playerDripScore: number,
  playerSocialFollowing: number,
  completedQuests: string[]
): FashionEndorsementDeal[] {
  return FASHION_ENDORSEMENT_DEALS.filter(deal => {
    const req = deal.requirements
    if (playerLevel < req.minLevel) return false
    if (playerDripScore < req.minDripScore) return false
    if (playerSocialFollowing < req.minSocialFollowing) return false
    if (req.completedQuest && !completedQuests.includes(req.completedQuest)) return false
    return true
  })
}

/**
 * Calculate a player's Drip Score based on brands worn
 */
export function calculateDripScore(brandIds: string[]): number {
  let score = 0
  const seen = new Set<string>()
  for (const id of brandIds) {
    if (seen.has(id)) continue  // No double-stacking same brand
    seen.add(id)
    const brand = NYC_FASHION_BRANDS[id]
    if (brand) score += brand.gameEffect.dripScoreBoost
  }
  return Math.min(100, score)
}

/**
 * Get the Drip Score tier for a given score
 */
export function getDripScoreTier(score: number): DripScoreTier {
  return (
    DRIP_SCORE_TIERS.find(t => score >= t.minScore && score <= t.maxScore) ??
    DRIP_SCORE_TIERS[0]
  )
}

/**
 * Get outfits available for a given occasion
 */
export function getOutfitsForOccasion(
  occasion: ArtistOutfit['occasion'][number]
): ArtistOutfit[] {
  return ARTIST_OUTFITS.filter(o => o.occasion.includes(occasion))
}

/**
 * Get stores in a specific borough
 */
export function getStoresByBorough(borough: BoroughOrigin): NYCFashionStore[] {
  return NYC_FASHION_STORES.filter(s => s.borough === borough)
}

/**
 * Get the total endorsement income per month for active deals
 */
export function getTotalEndorsementIncome(activeDealIds: string[]): number {
  return FASHION_ENDORSEMENT_DEALS
    .filter(d => activeDealIds.includes(d.id))
    .reduce((sum, d) => sum + d.gameEffects.monthlyIncome, 0)
}

/**
 * Check if player has reached icon status (Dapper Dan or LV tier)
 */
export function isIconStatus(dripScore: number): boolean {
  return dripScore >= 85
}

/**
 * Get top brands for maximum booking fee boost
 */
export function getTopBookingFeeBoostBrands(): NYCFashionBrand[] {
  return Object.values(NYC_FASHION_BRANDS)
    .sort((a, b) => b.gameEffect.bookingFeeMultiplier - a.gameEffect.bookingFeeMultiplier)
    .slice(0, 5)
}

// ─────────────────────────────────────────────────────────────────────────────
// EXPORTS
// ─────────────────────────────────────────────────────────────────────────────

export const NYC_BRAND_COUNT = Object.keys(NYC_FASHION_BRANDS).length
export const TOTAL_ENDORSEMENT_DEALS = FASHION_ENDORSEMENT_DEALS.length
export const TOTAL_OUTFITS = ARTIST_OUTFITS.length
export const TOTAL_STORES = NYC_FASHION_STORES.length

export default NYC_FASHION_BRANDS
