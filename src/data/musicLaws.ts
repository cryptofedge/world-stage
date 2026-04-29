// ─── musicLaws.ts ─────────────────────────────────────────────────────────────
// Verified music industry laws for the World Stage launch regions:
//   🇺🇸 United States of America
//   🇩🇴 Dominican Republic
//   🇪🇨 Ecuador
//
// Sources verified against:
//   - U.S. Copyright Office (copyright.gov)
//   - WIPO Lex (wipo.int/wipolex)
//   - Law 65-00 (Dominican Republic)
//   - Código Orgánico de la Economía Social del Conocimiento (Ecuador, 2016)
//   - SAYCE (sayce.com.ec), SGACEDOM, ONDA, ASCAP, BMI
// ──────────────────────────────────────────────────────────────────────────────

// ─── Core Types ───────────────────────────────────────────────────────────────

export type LaunchRegion = 'usa' | 'dominican_republic' | 'ecuador';

export type LawCategory =
  | 'copyright'          // Ownership & exclusive rights
  | 'performance_rights' // Public performance licensing
  | 'mechanical_rights'  // Reproduction licensing
  | 'moral_rights'       // Non-economic author rights
  | 'neighboring_rights' // Performers, phonogram producers, broadcasters
  | 'contract_law'       // Deal structures, work-for-hire, 360 deals
  | 'enforcement'        // Penalties, infringement, litigation
  | 'digital_law'        // Streaming, DMCA, online platforms
  | 'cultural_heritage'; // UNESCO protections, national cultural law

export type LawSeverity = 'foundational' | 'important' | 'informational';

export interface MusicLaw {
  id: string;
  title: string;
  localTitle?: string;           // Name in local language if applicable
  jurisdiction: LaunchRegion;
  category: LawCategory;
  severity: LawSeverity;
  statute: string;               // Official law citation
  yearEnacted: number;
  lastAmended?: number;
  summary: string;               // Plain-English summary
  detail: string;                // Full explanation
  penalties?: PenaltyStructure;
  gameRelevance: string;         // How this law affects gameplay
  inGameEvent?: string;          // Event ID this law can trigger
}

export interface PenaltyStructure {
  civil?: string;
  criminal?: string;
  fineMin?: number;
  fineMax?: number;
  prisonMin?: string;
  prisonMax?: string;
  currency: 'USD' | 'DOP' | 'USD_Ecuador'; // Ecuador uses USD
}

export interface CollectingSociety {
  id: string;
  name: string;
  localName: string;
  acronym: string;
  jurisdiction: LaunchRegion;
  founded: number;
  type: 'PRO' | 'mechanical' | 'neighboring_rights' | 'general';
  represents: string[];          // Who they collect for
  collects: string[];            // What royalty types they collect
  membershipCost: number;        // USD equivalent
  membershipCostCurrency: string;
  workRegistrationCost?: string;
  memberCount?: number;
  catalogSize?: number;
  paymentFrequency: string;
  internationalAffiliations: string[];
  howToJoin: string;
  gameEffect: {
    royaltyMultiplier: number;
    businessStatBonus: number;
    registrationTimeDays: number;
    description: string;
  };
}

export interface CountryMusicLawProfile {
  country: string;
  region: LaunchRegion;
  flag: string;
  copyrightDuration: string;
  copyrightBornAt: string;       // 'creation' or 'registration'
  registrationRequired: boolean;
  primaryLegislation: string;
  governingBody: string;
  collectingSocieties: CollectingSociety[];
  laws: MusicLaw[];
  keyFacts: string[];
  genresProtected: string[];     // Culturally significant genres
  unescoHeritage?: string[];
  gameStartingInfo: string;      // Shown to player when entering this region
}

// ─────────────────────────────────────────────────────────────────────────────
// 🇺🇸  UNITED STATES OF AMERICA
// ─────────────────────────────────────────────────────────────────────────────

const USA_COLLECTING_SOCIETIES: CollectingSociety[] = [
  {
    id: 'ascap',
    name: 'American Society of Composers, Authors and Publishers',
    localName: 'American Society of Composers, Authors and Publishers',
    acronym: 'ASCAP',
    jurisdiction: 'usa',
    founded: 1914,
    type: 'PRO',
    represents: ['Songwriters', 'Composers', 'Music Publishers'],
    collects: ['Public performance royalties'],
    membershipCost: 0,
    membershipCostCurrency: 'USD',
    workRegistrationCost: 'Free via Member Access portal',
    memberCount: 1_100_000,
    catalogSize: 20_000_000,
    paymentFrequency: 'Quarterly (6–9 months after performance quarter)',
    internationalAffiliations: ['CISAC', '90+ reciprocal agreements worldwide'],
    howToJoin:
      'Apply free at ascap.com. Eligible once you have one song publicly performed or available on any platform. Register as both writer AND publisher simultaneously to waive all fees and collect 100% of performance royalties.',
    gameEffect: {
      royaltyMultiplier: 1.15,
      businessStatBonus: 5,
      registrationTimeDays: 5,
      description:
        'Joining ASCAP activates performance royalty collection on all tracks. Every stream, radio play, and live performance now earns quarterly royalties. Business +5.',
    },
  },
  {
    id: 'bmi',
    name: 'Broadcast Music, Inc.',
    localName: 'Broadcast Music, Inc.',
    acronym: 'BMI',
    jurisdiction: 'usa',
    founded: 1939,
    type: 'PRO',
    represents: ['Songwriters', 'Composers', 'Music Publishers'],
    collects: ['Public performance royalties'],
    membershipCost: 0,
    membershipCostCurrency: 'USD',
    workRegistrationCost: 'Free via BMI.com',
    memberCount: 1_400_000,
    catalogSize: 22_400_000,
    paymentFrequency: 'Quarterly (5–6 months after performance quarter)',
    internationalAffiliations: ['85+ reciprocal agreements worldwide'],
    howToJoin:
      'Apply free at bmi.com as a writer. Publisher registration costs $175 (individual), $250 (corporation/LLC), or $500 (partnership). Two-year membership commitment — choose carefully.',
    gameEffect: {
      royaltyMultiplier: 1.18,
      businessStatBonus: 5,
      registrationTimeDays: 3,
      description:
        'BMI pays slightly faster than ASCAP (5–6 months vs 6–9). Largest catalog in the US. Two-year commitment. Business +5.',
    },
  },
  {
    id: 'the_mlc',
    name: 'The Mechanical Licensing Collective',
    localName: 'The Mechanical Licensing Collective',
    acronym: 'MLC',
    jurisdiction: 'usa',
    founded: 2021,
    type: 'mechanical',
    represents: ['Songwriters', 'Music Publishers'],
    collects: ['Mechanical royalties from interactive streaming (Spotify, Apple Music, Amazon)'],
    membershipCost: 0,
    membershipCostCurrency: 'USD',
    workRegistrationCost: 'Free — register at themlc.com',
    paymentFrequency: 'Monthly (distributed from streaming services)',
    internationalAffiliations: ['Music Modernization Act (MMA 2018)'],
    howToJoin:
      'Register at themlc.com. Free for songwriters and publishers. The MLC collects mechanical royalties from all US interactive streaming services under the blanket license created by the Music Modernization Act (2018).',
    gameEffect: {
      royaltyMultiplier: 1.10,
      businessStatBonus: 3,
      registrationTimeDays: 7,
      description:
        'Registering with The MLC captures mechanical royalties from Spotify, Apple Music, and other streaming services — separate from ASCAP/BMI performance royalties. Doubles your streaming income streams. Business +3.',
    },
  },
  {
    id: 'soundexchange',
    name: 'SoundExchange',
    localName: 'SoundExchange',
    acronym: 'SoundExchange',
    jurisdiction: 'usa',
    founded: 2003,
    type: 'neighboring_rights',
    represents: ['Featured artists', 'Session musicians', 'Master rights holders (labels)'],
    collects: ['Digital performance royalties for sound recordings on non-interactive digital radio (Pandora, SiriusXM, internet radio)'],
    membershipCost: 0,
    membershipCostCurrency: 'USD',
    paymentFrequency: 'Quarterly',
    internationalAffiliations: ['100+ reciprocal agreements for neighboring rights'],
    howToJoin:
      'Register free at soundexchange.com. Artists collect 45% of SoundExchange royalties, labels collect 50%, and session musicians/vocalists collect 5% via AFM & SAG-AFTRA Intellectual Property Rights Distribution Fund.',
    gameEffect: {
      royaltyMultiplier: 1.08,
      businessStatBonus: 2,
      registrationTimeDays: 10,
      description:
        'SoundExchange collects digital radio royalties for your MASTER RECORDING — separate from ASCAP/BMI which cover the composition. Required to collect from Pandora, SiriusXM, and internet radio. Business +2.',
    },
  },
];

const USA_LAWS: MusicLaw[] = [
  {
    id: 'usa_copyright_act_1976',
    title: 'Copyright Act of 1976',
    jurisdiction: 'usa',
    category: 'copyright',
    severity: 'foundational',
    statute: '17 U.S.C. §§ 101 et seq.',
    yearEnacted: 1976,
    summary:
      'The primary US copyright law. Grants creators six exclusive rights over their original works from the moment of creation — no registration required for protection.',
    detail:
      'The Copyright Act of 1976 is the cornerstone of US music copyright law. Under Section 106, copyright owners hold six exclusive rights: (1) Reproduction — the right to copy the work; (2) Derivative Works — the right to create remixes, samples, or adaptations; (3) Distribution — the right to sell or distribute copies; (4) Public Performance — the right to perform the work publicly; (5) Public Display; and (6) Digital Audio Transmission — the right to transmit via digital audio (Section 106(6), added later by DPRSRA). Copyright protection lasts for the life of the author plus 70 years. For works made for hire or anonymous works, protection lasts 95 years from publication or 120 years from creation, whichever is shorter. Copyright is born at the moment of creation — registration with the US Copyright Office is not required for protection but IS required before filing an infringement lawsuit.',
    gameRelevance:
      'Every track you record is automatically copyrighted the moment it\'s fixed in a tangible form. No registration required to own it — but you must register before suing anyone who steals it.',
  },
  {
    id: 'usa_section_106_exclusive_rights',
    title: 'Section 106 — Six Exclusive Rights',
    jurisdiction: 'usa',
    category: 'copyright',
    severity: 'foundational',
    statute: '17 U.S.C. § 106',
    yearEnacted: 1976,
    summary:
      'Grants copyright holders six exclusive rights over their musical works. Anyone who exercises these rights without permission infringes copyright.',
    detail:
      'Section 106 is the beating heart of US music copyright. The six exclusive rights are: Reproduction (sampling your music without a license violates this), Creating Derivative Works (remixes require clearance), Distribution (selling your music), Public Performance (ASCAP/BMI license this to venues and broadcasters), Public Display, and Digital Audio Transmission (SoundExchange collects for this). Critically, in music there are TWO copyrights for every song: the Composition Copyright (melody + lyrics, owned by songwriter/publisher) and the Sound Recording Copyright (the actual recorded performance, owned by artist/label). Each copyright has its own set of exclusive rights and its own royalty streams.',
    gameRelevance:
      'Sampling another artist\'s music without clearance violates their exclusive rights. Performing at a venue without a PRO license violates the venue\'s obligation. Understanding these rights determines how you negotiate contracts and license your music.',
  },
  {
    id: 'usa_section_115_mechanical',
    title: 'Section 115 — Compulsory Mechanical License',
    jurisdiction: 'usa',
    category: 'mechanical_rights',
    severity: 'foundational',
    statute: '17 U.S.C. § 115',
    yearEnacted: 1909,
    lastAmended: 2018,
    summary:
      'Allows anyone to record a cover version of a previously released song without the copyright owner\'s permission — as long as statutory royalty rates are paid. Massively reformed by the Music Modernization Act in 2018.',
    detail:
      'Section 115 established the compulsory mechanical license — one of the most important provisions in US music law. Once a song has been publicly distributed, anyone can record a new version (a "cover") and distribute it by paying the statutory mechanical rate set by the Copyright Royalty Board. The rate for physical/downloads is 9.1 cents per song under 5 minutes. The Music Modernization Act (2018) completely reformed Section 115 for the streaming era by creating a blanket mechanical license administered by The MLC — meaning streaming services now pay one blanket fee to The MLC instead of negotiating with millions of individual rights holders. The MLC then distributes royalties to registered songwriters and publishers.',
    gameRelevance:
      'When you cover another artist\'s song in the game, you trigger Section 115 mechanics. When your original songs are covered or streamed, The MLC collects mechanical royalties on your behalf — but only if you\'re registered.',
    inGameEvent: 'first_mechanical_royalty',
  },
  {
    id: 'usa_section_114_digital_performance',
    title: 'Section 114 — Digital Performance Rights in Sound Recordings',
    jurisdiction: 'usa',
    category: 'neighboring_rights',
    severity: 'important',
    statute: '17 U.S.C. § 114',
    yearEnacted: 1995,
    lastAmended: 1998,
    summary:
      'Grants sound recording owners (artists and labels) the right to collect royalties when their recordings are played on non-interactive digital radio services like Pandora, SiriusXM, and internet radio stations.',
    detail:
      'Prior to the Digital Performance Right in Sound Recordings Act (1995), sound recording owners had NO right to collect when their recordings were broadcast on radio. Section 114 created this right — but only for DIGITAL audio transmissions. Traditional terrestrial radio (AM/FM) still does NOT pay performance royalties to artists or labels in the US — only to songwriters through ASCAP/BMI. For non-interactive digital radio (Pandora, SiriusXM, internet radio), SoundExchange collects the Section 114 royalties: 45% goes to featured artists, 50% to the master rights holder (usually the label), and 5% to session musicians via a fund. Interactive streaming services (Spotify, Apple Music) are covered under a separate license system negotiated directly.',
    gameRelevance:
      'Register with SoundExchange to collect your 45% artist share every time your song plays on Pandora or SiriusXM. Your label takes 50% — another reason to own your masters.',
  },
  {
    id: 'usa_dmca_1998',
    title: 'Digital Millennium Copyright Act (DMCA)',
    jurisdiction: 'usa',
    category: 'digital_law',
    severity: 'foundational',
    statute: 'Pub. L. 105-304, 17 U.S.C. §§ 512, 1201–1205',
    yearEnacted: 1998,
    summary:
      'Modernized US copyright law for the internet era. Created the "safe harbor" system protecting platforms (YouTube, Spotify, Instagram) from liability for user-uploaded infringing content — in exchange for removing it when notified.',
    detail:
      'The DMCA has two critical components for musicians: (1) Section 512 Safe Harbor — Online platforms are shielded from copyright liability if they remove infringing content promptly after receiving a takedown notice from the rights holder. This is why YouTube removes videos when you file a DMCA claim and why you can "claim" revenue from videos using your music. (2) Section 1201 Anti-Circumvention — Makes it illegal to bypass digital rights management (DRM) systems protecting copyrighted works. The DMCA\'s safe harbor is why Instagram, TikTok, and YouTube exist as they do — without it, they\'d be liable every time a user uploaded a copyrighted song. The 2026 Supreme Court case Cox Communications v. Sony Music Entertainment further refined ISP secondary liability under the DMCA, with the Court ruling that ISPs can be held secondarily liable when they willfully turn a blind eye to repeat infringers.',
    gameRelevance:
      'When someone uses your music without permission on a streaming platform, you can file a DMCA takedown. When a platform detects your song in someone\'s video, Content ID (YouTube\'s automated DMCA system) can route that video\'s ad revenue to you instead of the uploader.',
    inGameEvent: 'dmca_takedown_filed',
  },
  {
    id: 'usa_music_modernization_act',
    title: 'Music Modernization Act (MMA)',
    jurisdiction: 'usa',
    category: 'mechanical_rights',
    severity: 'foundational',
    statute: 'Pub. L. 115-264, 17 U.S.C. § 115',
    yearEnacted: 2018,
    summary:
      'The most significant US music copyright reform in decades. Created The MLC to manage mechanical royalties from streaming, gave pre-1972 artists federal copyright protection, and established royalty rights for producers and engineers.',
    detail:
      'The MMA has three titles: Title I — The Music Licensing Modernization Act: Replaced the antiquated per-song mechanical licensing system with a blanket license for streaming. Created The Mechanical Licensing Collective (MLC), a nonprofit designated to administer blanket licenses and distribute mechanical royalties from all US interactive streaming services. All streaming services pay into The MLC; The MLC distributes to registered rights holders. Unmatched royalties (songs with no registered owner) are held for 3 years, then distributed to publishers based on market share. Title II — Compensating Legacy Artists for their Songs, Service, & Important Contributions to Society (CLASSICS Act): Extended federal copyright protection to sound recordings made before February 15, 1972 — previously these were only protected under state law. Title III — The Allocation for Music Producers (AMP Act): Established a mechanism for producers, mixers, and sound engineers to receive royalties collected by SoundExchange.',
    gameRelevance:
      'Register your works with The MLC to collect mechanical royalties from Spotify, Apple Music, Amazon Music, and all other US interactive streaming services. This is separate from your ASCAP/BMI registration — you need BOTH.',
    inGameEvent: 'mlc_royalty_check',
  },
  {
    id: 'usa_work_for_hire',
    title: 'Work Made for Hire Doctrine',
    jurisdiction: 'usa',
    category: 'contract_law',
    severity: 'foundational',
    statute: '17 U.S.C. § 101 (Definition), § 201(b)',
    yearEnacted: 1976,
    summary:
      'When a work is created as "work for hire," the employer or commissioning party — NOT the creator — is considered the legal author and copyright owner. Common in recording contracts where labels claim ownership of masters.',
    detail:
      'Work-for-hire is one of the most consequential and often misunderstood concepts in music law. A work is "made for hire" in two situations: (1) Works created by an employee within the scope of their employment — the employer owns the copyright. (2) Works specially ordered or commissioned — only if BOTH parties sign a written work-for-hire agreement AND the work falls into one of nine specific categories (which includes "part of a motion picture or other audiovisual work" but NOT standalone sound recordings). This means a label cannot legally make an artist\'s sound recordings "work for hire" through a contract alone — this was established in the Termination Rights debate. However, labels routinely include work-for-hire language in recording contracts anyway, and artists sign without understanding the implications. Session musicians and producers who sign work-for-hire agreements give up all rights and royalties to their work. Critically, if a work is NOT work-for-hire, the original creator has Termination Rights — the right to reclaim copyright 35 years after transfer (under 17 U.S.C. § 203).',
    gameRelevance:
      'Every contract you sign in the game may contain work-for-hire language. Signing one means the label owns your music permanently. Refusing or negotiating keeps you in control of your masters — the most valuable asset in your catalog.',
    inGameEvent: 'work_for_hire_contract_offered',
  },
  {
    id: 'usa_termination_rights',
    title: 'Termination Rights — 35-Year Rule',
    jurisdiction: 'usa',
    category: 'contract_law',
    severity: 'important',
    statute: '17 U.S.C. § 203',
    yearEnacted: 1976,
    summary:
      'Authors (or their heirs) can reclaim copyright ownership 35 years after signing it away — regardless of what the contract says. This is non-waivable by contract.',
    detail:
      'Section 203 gives songwriters and artists a second chance. If you assigned your copyright to a label or publisher, you (or your heirs) have the right to terminate that transfer between 35 and 40 years later — even if your contract says otherwise. The termination window opens 35 years after the transfer and stays open for 5 years. You must serve advance notice (2 to 10 years before termination). The termination right cannot be waived or contracted away — no language in a record deal can override it. This has become enormously relevant as the music of the 1970s–80s enters the 35-year window. Taylor Swift\'s catalog dispute (re-recording her masters) is a high-profile example of what happens when artists try to navigate copyright ownership — in her case, a sale of masters rather than a direct Section 203 situation.',
    gameRelevance:
      'If you signed away your masters early in your career, a late-game quest unlocks Termination Rights reclaim after reaching Diamond certification and 35 in-game years. Reclaiming your masters unlocks the highest royalty multipliers in the game.',
    inGameEvent: 'reclaim_masters_35_year',
  },
  {
    id: 'usa_360_deal',
    title: '360 Deal — Multiple Rights Agreement',
    jurisdiction: 'usa',
    category: 'contract_law',
    severity: 'important',
    statute: 'Common law contract — no specific statute; governed by general contract principles',
    yearEnacted: 2003,
    summary:
      'A recording contract where the label takes a percentage of ALL artist revenue streams — not just music sales — including touring, merchandise, endorsements, and publishing. Became standard in the mid-2000s as physical sales declined.',
    detail:
      'A 360 deal (also called a "multiple rights deal") gives a record label a percentage of every revenue stream an artist generates: typically 15–30% of touring income, 20–30% of merchandise, 20–25% of endorsements and brand deals, and sometimes a share of publishing and acting income. The label justifies this by arguing that its marketing and development investment creates the artist\'s brand — which generates all these income streams. For artists, 360 deals are dangerous because every expense the label incurs (recording, marketing, videos) is recoupable against future royalties AND the label\'s share of all other income. An artist can be selling out arenas and still owe the label money. Key negotiating points: limit 360 provisions to specific revenue streams; negotiate sunset clauses (360 provisions expire after X albums); ensure the label share drops as you achieve certain sales milestones.',
    gameRelevance:
      'When Marcus from BrickSquare Records offers you a 360 deal, your lawyer Denise will flag it. Accept for a massive advance but surrender income across all streams, or negotiate a shorter-term deal with better terms. The choice shapes your financial path through the game.',
    inGameEvent: 'bricksquare_360_offer',
  },
  {
    id: 'usa_fair_use',
    title: 'Fair Use Doctrine',
    jurisdiction: 'usa',
    category: 'copyright',
    severity: 'important',
    statute: '17 U.S.C. § 107',
    yearEnacted: 1976,
    summary:
      'Allows limited use of copyrighted material without permission for purposes such as criticism, commentary, news reporting, education, and parody. The most misunderstood provision in copyright law.',
    detail:
      'Fair use is a defense to copyright infringement — not a right. Courts evaluate four factors: (1) Purpose and Character — Commercial use weighs against fair use; transformative works (adding new meaning) favor it. (2) Nature of the Work — Factual works are more likely to be fair use than highly creative works. (3) Amount Used — Using less of the original favors fair use, but even small amounts can be infringement if they\'re the "heart" of the work. (4) Market Effect — If your use substitutes for the original in the market, it is unlikely to be fair use. Parody (directly commenting on the original work) is generally protected; satire (using someone\'s music to comment on something else) is NOT automatically protected. Critically: "I only used 6 seconds" is NOT a safe harbor. There is no legal rule that a certain number of seconds is automatically fair use — this is a widespread myth.',
    gameRelevance:
      'Sampling in the game always requires clearance. The "6-second rule" is a myth flagged by Denise when you attempt to sample. Parody tracks of an NPC\'s song may qualify as fair use and unlock a special dialogue.',
    inGameEvent: 'sampling_incident',
  },
  {
    id: 'usa_copyright_infringement_penalties',
    title: 'Copyright Infringement — Civil & Criminal Penalties',
    jurisdiction: 'usa',
    category: 'enforcement',
    severity: 'foundational',
    statute: '17 U.S.C. §§ 501–513',
    yearEnacted: 1976,
    lastAmended: 1999,
    summary:
      'Copyright infringement carries civil penalties of $750–$30,000 per work (up to $150,000 for willful infringement) and criminal penalties of up to $250,000 in fines and 5 years in prison for commercial piracy.',
    detail:
      'Civil infringement: A copyright owner can elect to receive either actual damages (proven economic loss) or statutory damages without proving actual harm. Statutory damages range from $750 to $30,000 per infringed work, at the court\'s discretion. For willful infringement (the infringer knew it was wrong), damages can reach $150,000 per work. Criminal infringement: Commercial-scale piracy can result in up to 5 years in prison and $250,000 in fines per offense. The No Electronic Theft Act (1997) extended criminal penalties to non-commercial digital infringement. DMCA violations (circumventing copy protection) carry up to $500,000 and 5 years in prison for a first offense. A key 2026 Supreme Court ruling (Cox Communications v. Sony Music Entertainment) confirmed that ISPs can face secondary liability when they willfully ignore repeat infringers on their networks, opening a new era of ISP accountability.',
    penalties: {
      civil: '$750–$30,000 per work (statutory damages); up to $150,000 for willful infringement',
      criminal: 'Up to $250,000 fine and 5 years in prison for commercial piracy',
      fineMin: 750,
      fineMax: 150_000,
      prisonMin: 'Misdemeanor for non-commercial',
      prisonMax: '5 years for commercial infringement',
      currency: 'USD',
    },
    gameRelevance:
      'If you release a track sampling an unlicensed beat in the game, you face a civil claim — draining your cash and reputation. Repeated infringement triggers a criminal subplot involving the music industry\'s legal enforcement arm.',
    inGameEvent: 'copyright_lawsuit_served',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// 🇩🇴  DOMINICAN REPUBLIC
// ─────────────────────────────────────────────────────────────────────────────

const DR_COLLECTING_SOCIETIES: CollectingSociety[] = [
  {
    id: 'sgacedom',
    name: 'Sociedad General de Autores, Compositores y Editores de la República Dominicana',
    localName: 'Sociedad General de Autores, Compositores y Editores de la República Dominicana',
    acronym: 'SGACEDOM',
    jurisdiction: 'dominican_republic',
    founded: 1982,
    type: 'general',
    represents: ['Songwriters', 'Composers', 'Music Editors/Publishers'],
    collects: ['Public performance royalties', 'Mechanical royalties', 'Broadcasting royalties'],
    membershipCost: 0,
    membershipCostCurrency: 'DOP',
    paymentFrequency: 'Quarterly',
    internationalAffiliations: ['CISAC', 'LATINAUTOR', 'BIEM'],
    howToJoin:
      'Register with SGACEDOM in Santo Domingo. Submit your compositions, proof of authorship, and identification. SGACEDOM registers your works and begins collecting performance royalties from radio stations, TV channels, nightclubs, hotels, and streaming services operating in the Dominican Republic.',
    gameEffect: {
      royaltyMultiplier: 1.12,
      businessStatBonus: 4,
      registrationTimeDays: 10,
      description:
        'SGACEDOM collects performance and mechanical royalties from all venues, broadcasters, and streaming services in the Dominican Republic. Business +4.',
    },
  },
  {
    id: 'onda_dr',
    name: 'Oficina Nacional de Derecho de Autor',
    localName: 'Oficina Nacional de Derecho de Autor',
    acronym: 'ONDA',
    jurisdiction: 'dominican_republic',
    founded: 2000,
    type: 'general',
    represents: ['All copyright holders requiring registration'],
    collects: ['Does not collect royalties — government registration office only'],
    membershipCost: 0,
    membershipCostCurrency: 'DOP',
    workRegistrationCost: 'Nominal government filing fee (~DOP 1,000–5,000 depending on work type)',
    paymentFrequency: 'N/A — registration body',
    internationalAffiliations: ['WIPO', 'Ministry of Industry, Commerce and Mipymes'],
    howToJoin:
      'File registration application at ONDA (onda.gob.do). Submit a written request with supporting documents. ONDA grants a resolution within 30 days. Registration is not required for copyright protection but is strongly advised — it creates an official public record of authorship.',
    gameEffect: {
      royaltyMultiplier: 1.0,
      businessStatBonus: 3,
      registrationTimeDays: 30,
      description:
        'ONDA registration creates an official government record of your copyright in the Dominican Republic. Required for legal enforcement actions. Unlocks the DR lawsuit defense mechanic. Business +3.',
    },
  },
];

const DR_LAWS: MusicLaw[] = [
  {
    id: 'dr_ley_65_00',
    title: 'Law No. 65-00 on Copyright',
    localTitle: 'Ley No. 65-00 sobre Derecho de Autor',
    jurisdiction: 'dominican_republic',
    category: 'copyright',
    severity: 'foundational',
    statute: 'Ley No. 65-00, agosto 21 de 2000, con Reglamento de Aplicación del marzo 14 de 2001',
    yearEnacted: 2000,
    lastAmended: 2006,
    summary:
      'The Dominican Republic\'s primary copyright law. Protects literary, artistic, and scientific works from the moment of creation. Covers songwriters, performers, phonogram producers, and broadcasters. Amended in 2006 to comply with CAFTA-DR by extending protection to life + 70 years.',
    detail:
      'Law 65-00 is the cornerstone of Dominican copyright law, enacted to comply with WTO requirements and later amended in 2006 under the Dominican Republic-Central America-United States Free Trade Agreement (CAFTA-DR). Key provisions: COPYRIGHT PROTECTION — Covers any original intellectual creation, whether literary, artistic, or scientific, fixed in any tangible form. Specifically protects musical compositions with or without lyrics. MORAL RIGHTS — Authors hold perpetual, inalienable moral rights: the right to attribution (claim authorship), the right to integrity (object to modifications that harm their honor or reputation), the right to disclosure (decide when and how to publish), and the right to withdraw (retract published works). ECONOMIC RIGHTS — Authors hold exclusive rights to reproduction, distribution, public performance, communication, translation, and adaptation. These economic rights can be transferred or licensed. RELATED RIGHTS (Derechos Conexos) — Separate from copyright, performers (artists) hold rights over their performances for 50 years. Phonogram producers hold rights over recordings for 50 years. Broadcasters hold rights over their broadcasts for 25 years. DURATION — Life of the author plus 70 years (extended from 50 years by 2006 CAFTA-DR amendment). REGISTRATION — Not required for protection but handled by ONDA. Processing time: 30 days maximum.',
    gameRelevance:
      'In the Dominican Republic, your music is protected from the moment you create it. However, registering with ONDA creates a legal record critical for enforcing your rights. Moral rights mean that even if you sell your music, you can still object to changes that damage your reputation.',
  },
  {
    id: 'dr_moral_rights',
    title: 'Moral Rights of Authors',
    localTitle: 'Derechos Morales del Autor',
    jurisdiction: 'dominican_republic',
    category: 'moral_rights',
    severity: 'important',
    statute: 'Ley No. 65-00, Artículos 18–25',
    yearEnacted: 2000,
    summary:
      'Moral rights in the Dominican Republic are perpetual, inalienable, and cannot be waived or transferred by contract. Artists retain them even after selling all economic rights to their music.',
    detail:
      'Dominican copyright law, following the civil law tradition, places strong emphasis on moral rights. Unlike the US (which has very limited moral rights in music), the Dominican Republic grants: (1) Right of Attribution (Derecho de Paternidad) — The perpetual right to be identified as the author of your work. A label cannot legally remove your name from your own music. (2) Right of Integrity (Derecho de Integridad) — The right to object to any modification, mutilation, or use of your work that would harm your honor or reputation. A label cannot legally alter your lyrics or production in a way you find damaging. (3) Right of Disclosure (Derecho de Divulgación) — The right to decide whether and how to publish your work for the first time. (4) Right of Withdrawal (Derecho de Retiro o Arrepentimiento) — The right to withdraw your work from circulation, even after publication, subject to compensation for economic damages caused. MORAL RIGHTS ARE PERPETUAL — they survive the author\'s death and pass to heirs. They CANNOT be contracted away.',
    gameRelevance:
      'In the Dominican Republic, even if a label buys all your economic rights, you can still sue them for changing your music in damaging ways. A late-game event involves a label remixing your bachata without permission — you can invoke your moral rights to force them to restore the original.',
    inGameEvent: 'moral_rights_violation_dr',
  },
  {
    id: 'dr_related_rights',
    title: 'Related Rights — Performers, Phonogram Producers & Broadcasters',
    localTitle: 'Derechos Conexos',
    jurisdiction: 'dominican_republic',
    category: 'neighboring_rights',
    severity: 'important',
    statute: 'Ley No. 65-00, Artículos 115–163',
    yearEnacted: 2000,
    summary:
      'Separate from composition copyright, the Dominican Republic grants exclusive rights to performers (50 years), phonogram producers (50 years), and broadcasters (25 years) over their respective contributions.',
    detail:
      'Law 65-00 follows the Rome Convention framework for related rights (derechos conexos): PERFORMER\'S RIGHTS (Derechos de los Artistas Intérpretes y Ejecutantes) — A performing artist (singer, musician) holds exclusive rights over their performance: the right to authorize fixation (recording), broadcasting, and reproduction of their performance. Duration: 50 years from the year of performance. PHONOGRAM PRODUCER\'S RIGHTS — The entity that finances and organizes the recording (typically a record label) holds rights over the phonogram (master recording): the right to authorize reproduction, distribution, and public communication. Duration: 50 years from publication or 50 years from fixation if unpublished. BROADCASTER\'S RIGHTS — TV and radio stations hold rights over their broadcasts for 25 years.',
    gameRelevance:
      'As a recording artist in Santo Domingo, you hold related rights over your performances independent of composition copyright. If you own your masters, you also hold phonogram producer rights. Know the difference between what you write (composition copyright) and what you record (related rights).',
  },
  {
    id: 'dr_cafta_dr',
    title: 'CAFTA-DR Intellectual Property Obligations',
    localTitle: 'DR-CAFTA — Derechos de Propiedad Intelectual',
    jurisdiction: 'dominican_republic',
    category: 'copyright',
    severity: 'important',
    statute: 'Dominican Republic-Central America-United States Free Trade Agreement, Chapter 15, 2006',
    yearEnacted: 2006,
    summary:
      'The US-DR free trade agreement requires the Dominican Republic to maintain TRIPS-plus intellectual property standards — including life + 70 years copyright duration, criminal penalties for piracy, and a functional anti-circumvention law (equivalent to DMCA).',
    detail:
      'CAFTA-DR Chapter 15 obligated the Dominican Republic to upgrade its copyright law to US standards in several areas: (1) Copyright term extended to life + 70 years (from 50 years). (2) Criminal penalties for willful copyright infringement on a commercial scale, even when there is no direct financial gain. (3) Technological protection measures (TPM) — Anti-circumvention provisions similar to the US DMCA Section 1201. (4) Enhanced border measures — Customs authorities can seize infringing goods. (5) ISP liability provisions similar to DMCA Section 512 safe harbor. The 2006 amendment to Law 65-00 implemented these obligations.',
    gameRelevance:
      'When you release music in the Dominican Republic, US-level IP protections apply — including anti-piracy enforcement similar to the DMCA. Working with US-based platforms is legally smoother because DR and USA operate under the same CAFTA-DR framework.',
  },
  {
    id: 'dr_enforcement_penalties',
    title: 'Copyright Infringement — Dominican Republic Penalties',
    localTitle: 'Infracciones y Sanciones — Ley 65-00',
    jurisdiction: 'dominican_republic',
    category: 'enforcement',
    severity: 'foundational',
    statute: 'Ley No. 65-00, Artículos 186–196',
    yearEnacted: 2000,
    lastAmended: 2006,
    summary:
      'Criminal copyright infringement carries 3 months to 3 years in prison. Civil fines range from approximately $9,000 to $180,000 USD. The Dominican Republic was previously cited by the IIPA for high piracy rates and has since significantly strengthened enforcement.',
    detail:
      'Law 65-00 establishes both civil and criminal liability for copyright infringement. CRIMINAL PENALTIES: Most criminal infringements carry imprisonment from 3 months to 3 years. Aggravated commercial piracy can carry higher sentences. The ONDA oversees enforcement and can refer cases to prosecutors. CIVIL PENALTIES: Civil fines range from approximately DOP 500,000 (~$9,000 USD) to DOP 10,000,000+ (~$180,000 USD) depending on scale. Seizure and destruction of infringing goods is also available. ENFORCEMENT HISTORY: The Dominican Republic was historically listed on the IIPA Special 301 Watch List for high piracy rates — particularly in software and music. Since Law 65-00 and CAFTA-DR compliance, enforcement has significantly improved. Annual registration with ONDA is required for video clubs, retailers, and audiovisual importers/distributors (Article 109 of the Implementing Regulations). CULTURAL PROTECTION: The Dominican government specifically emphasizes protection of merengue and bachata as UNESCO-recognized Intangible Cultural Heritage, with SGACEDOM representing these genres\' artists.',
    penalties: {
      civil: 'DOP 500,000–10,000,000+ (~$9,000–$180,000 USD)',
      criminal: '3 months to 3 years imprisonment',
      fineMin: 9_000,
      fineMax: 180_000,
      prisonMin: '3 months',
      prisonMax: '3 years',
      currency: 'DOP',
    },
    gameRelevance:
      'Pirating or infringing music in Santo Domingo triggers civil claims and potential criminal investigation. The penalties are serious and your reputation in the DR takes a major hit — affecting your ability to book venues and work with NPCs.',
    inGameEvent: 'dr_copyright_raid',
  },
  {
    id: 'dr_unesco_merengue_bachata',
    title: 'UNESCO Intangible Cultural Heritage — Merengue & Bachata',
    localTitle: 'Patrimonio Cultural Inmaterial de la Humanidad — Merengue y Bachata',
    jurisdiction: 'dominican_republic',
    category: 'cultural_heritage',
    severity: 'important',
    statute: 'UNESCO Convention for the Safeguarding of the Intangible Cultural Heritage (2003); DR National Cultural Law',
    yearEnacted: 2016,
    lastAmended: 2019,
    summary:
      'Merengue was inscribed on UNESCO\'s Representative List of Intangible Cultural Heritage in 2016. Bachata followed in 2019. The Dominican government actively protects these genres as national cultural treasures — affecting how they can be used commercially.',
    detail:
      'The Dominican Republic\'s two signature music genres carry UNESCO Intangible Cultural Heritage status: MERENGUE — Inscribed in 2016. A fast-paced dance music originating in the 19th century, merengue is considered the Dominican national music. UNESCO recognized it for its role in national identity, social inclusion, and the country\'s African and European cultural synthesis. SGACEDOM president Valerio de León Severino specifically cited this designation in his 2024 statements about the importance of protecting artist rights for genre sustainability. BACHATA — Inscribed in 2019. Born in the rural margins of Dominican society in the 1960s, bachata evolved from an "underground" working-class genre into a global phenomenon, with artists like Juan Luis Guerra, Romeo Santos, and Aventura bringing it to worldwide recognition. LEGAL IMPLICATIONS: UNESCO heritage status does not restrict the music\'s use or commercialization, but it elevates national awareness of its protection. The Dominican government has a cultural interest in ensuring artists working in these genres are properly compensated — reinforcing Law 65-00 enforcement in these areas.',
    gameRelevance:
      'Recording merengue or bachata in Santo Domingo grants a Cultural Heritage bonus — increased reputation, SGACEDOM royalty multipliers, and access to exclusive UNESCO-tier events. Commercializing these genres disrespectfully (without proper attribution) triggers moral rights actions from local NPCs.',
    inGameEvent: 'record_bachata_santo_domingo',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// 🇪🇨  ECUADOR
// ─────────────────────────────────────────────────────────────────────────────

const ECUADOR_COLLECTING_SOCIETIES: CollectingSociety[] = [
  {
    id: 'sayce',
    name: 'Sociedad de Autores y Compositores Ecuatorianos',
    localName: 'Sociedad de Autores y Compositores Ecuatorianos',
    acronym: 'SAYCE',
    jurisdiction: 'ecuador',
    founded: 1973,
    type: 'general',
    represents: ['Songwriters', 'Composers', 'Music Authors'],
    collects: ['Public performance royalties', 'Broadcasting royalties', 'Digital streaming royalties', 'Public event royalties'],
    membershipCost: 0,
    membershipCostCurrency: 'USD',
    workRegistrationCost: '$4.56 for 1–10 works',
    memberCount: 3_000,
    paymentFrequency: 'Quarterly, with monthly platform access to verify royalties',
    internationalAffiliations: ['CISAC', 'LATINAUTOR', '9M+ global creators network'],
    howToJoin:
      'Apply at sayce.com.ec or visit their offices in Quito or Guayaquil. Contact: infosayce@com.ec or socios@sayce.com.ec. Submit compositions, proof of authorship, and ID. SAYCE registers your works and collects royalties from radio, TV, streaming platforms, and public events in Ecuador. Any organizer of a public entertainment event where music is performed MUST obtain prior SAYCE authorization.',
    gameEffect: {
      royaltyMultiplier: 1.10,
      businessStatBonus: 4,
      registrationTimeDays: 14,
      description:
        'SAYCE collects performance royalties from all Ecuadorian broadcasters, streaming services, and public events. Any venue hosting your music in Ecuador must pay SAYCE — you receive your share quarterly. Business +4.',
    },
  },
  {
    id: 'sarime',
    name: 'Sociedad de Artistas, Intérpretes y Músicos Ejecutantes del Ecuador',
    localName: 'Sociedad de Artistas, Intérpretes y Músicos Ejecutantes del Ecuador',
    acronym: 'SARIME',
    jurisdiction: 'ecuador',
    founded: 1990,
    type: 'neighboring_rights',
    represents: ['Performing artists', 'Musicians', 'Interpreters'],
    collects: ['Neighboring rights royalties for performing artists on recordings'],
    membershipCost: 0,
    membershipCostCurrency: 'USD',
    paymentFrequency: 'Quarterly',
    internationalAffiliations: ['SCAPR', 'LATINAUTOR'],
    howToJoin:
      'Register with SARIME in Ecuador. As a performing artist (singer, musician) you collect neighboring rights separate from composition royalties. SAYME collects when your recorded performance is broadcast or played publicly.',
    gameEffect: {
      royaltyMultiplier: 1.06,
      businessStatBonus: 2,
      registrationTimeDays: 14,
      description:
        'SARIME collects neighboring rights (derechos conexos) for your performances — separate from SAYCE\'s composition royalties. Both registrations together maximize your Ecuadorian royalty income. Business +2.',
    },
  },
  {
    id: 'soprofon',
    name: 'Sociedad de Productores de Fonogramas del Ecuador',
    localName: 'Sociedad de Productores de Fonogramas del Ecuador',
    acronym: 'SOPROFON',
    jurisdiction: 'ecuador',
    founded: 1995,
    type: 'neighboring_rights',
    represents: ['Phonogram producers', 'Record labels', 'Master rights holders'],
    collects: ['Neighboring rights royalties for phonogram producers (master recording royalties)'],
    membershipCost: 0,
    membershipCostCurrency: 'USD',
    paymentFrequency: 'Quarterly',
    internationalAffiliations: ['IFPI', 'LATINAUTOR'],
    howToJoin:
      'Register with SOPROFON if you own master recordings (as an independent artist who self-produces or as a label). SOPROFON collects the phonogram producer\'s share of neighboring rights when your master recordings are broadcast or publicly performed.',
    gameEffect: {
      royaltyMultiplier: 1.06,
      businessStatBonus: 2,
      registrationTimeDays: 14,
      description:
        'If you own your masters, SOPROFON collects the producer\'s share of neighboring rights. Triple your Ecuadorian royalty streams: SAYCE (composition) + SARIME (performance) + SOPROFON (master). Business +2.',
    },
  },
  {
    id: 'senadi',
    name: 'Servicio Nacional de Derechos Intelectuales',
    localName: 'Servicio Nacional de Derechos Intelectuales',
    acronym: 'SENADI',
    jurisdiction: 'ecuador',
    founded: 2016,
    type: 'general',
    represents: ['All intellectual property rights holders requiring registration'],
    collects: ['Does not collect royalties — government registration and enforcement body'],
    membershipCost: 0,
    membershipCostCurrency: 'USD',
    workRegistrationCost: 'Nominal government fee; see derechosintelectuales.gob.ec',
    paymentFrequency: 'N/A — government registration body',
    internationalAffiliations: ['WIPO', 'Ecuadorian government (Ministry-level)'],
    howToJoin:
      'File at derechosintelectuales.gob.ec. SENADI replaced the former IEPI (Instituto Ecuatoriano de la Propiedad Intelectual) following the 2016 Código Orgánico reforms. SENADI administers copyright registration, industrial property, and plant variety rights.',
    gameEffect: {
      royaltyMultiplier: 1.0,
      businessStatBonus: 3,
      registrationTimeDays: 21,
      description:
        'SENADI registration creates an official Ecuadorian government copyright record — essential for legal enforcement. Unlocks the Ecuador lawsuit defense mechanic and the Código Ingenios educational quest. Business +3.',
    },
  },
];

const ECUADOR_LAWS: MusicLaw[] = [
  {
    id: 'ec_codigo_ingenios_2016',
    title: 'Organic Code of the Social Economy of Knowledge, Creativity and Innovation',
    localTitle: 'Código Orgánico de la Economía Social de los Conocimientos, Creatividad e Innovación (Código Ingenios)',
    jurisdiction: 'ecuador',
    category: 'copyright',
    severity: 'foundational',
    statute: 'Registro Oficial Suplemento No. 899, 9 de diciembre de 2016',
    yearEnacted: 2016,
    summary:
      'Ecuador\'s comprehensive intellectual property law, replacing the former Ley de Propiedad Intelectual. Establishes copyright protection from the moment of creation, governs all three collecting societies (SAYCE, SARIME, SOPROFON), and introduced significant reforms to balance creator rights with public access to knowledge.',
    detail:
      'The Código Ingenios (formally the Código Orgánico de la Economía Social de los Conocimientos, Creatividad e Innovación) is Ecuador\'s landmark 2016 intellectual property reform. Key provisions for music: COPYRIGHT ORIGIN — Copyright is born by the sole fact of creation ("por el solo hecho de la creación"), independently of its merit, purpose, or mode of expression. No registration required for protection. DURATION — Life of the author plus 70 years. For works owned by legal entities, 70 years from publication. MORAL RIGHTS — Perpetual, inalienable: right of attribution, right of integrity, right of disclosure, right of withdrawal. ECONOMIC RIGHTS — Reproduction, distribution, public communication, transformation, and making available online. NEIGHBORING RIGHTS (Derechos Conexos) — Performers: 50 years from performance. Phonogram producers: 50 years from publication. Broadcasters: 50 years from broadcast. COLLECTING SOCIETIES — Three recognized societies: SAYCE (authors/composers), SARIME (performers), SOPROFON (phonogram producers). Any organizer of a public entertainment event where music is performed must obtain SAYCE authorization with mandatory payment of minimum legal tariffs set by the Ministry of Education and Culture. SENADI OVERSIGHT — Replaced IEPI as the government authority administering copyright registration and enforcement.',
    gameRelevance:
      'Every track you create in Ecuador is automatically protected under the Código Ingenios. Register with all three collecting societies (SAYCE, SARIME, SOPROFON) to collect the full stack of royalties: composition, performance, and master recording rights.',
  },
  {
    id: 'ec_sayce_mandatory_license',
    title: 'SAYCE Mandatory Authorization for Public Events',
    localTitle: 'Autorización Obligatoria de SAYCE para Eventos Públicos',
    jurisdiction: 'ecuador',
    category: 'performance_rights',
    severity: 'foundational',
    statute: 'Código Ingenios 2016, Art. 103; Executive Decree No. 2280 (SAYCE establishment)',
    yearEnacted: 1973,
    lastAmended: 2016,
    summary:
      'Any organizer of a public entertainment event in Ecuador where music is performed MUST obtain prior SAYCE authorization and pay minimum legal tariffs. No exceptions. Failure to comply constitutes copyright infringement.',
    detail:
      'Ecuador\'s mandatory SAYCE licensing requirement is one of the strictest in Latin America. The law requires: (1) Any public event organizer — concert promoter, nightclub, hotel, restaurant, radio station, TV channel, or streaming service operating in Ecuador — must obtain prior authorization from SAYCE before using music from any repertoire (national or international). (2) SAYCE issues the license on behalf of all affiliated authors and composers, including through reciprocal agreements with CISAC member societies worldwide (covering virtually all commercial music). (3) The tariffs (amounts charged) are set by minimum legal rates established by the Ministry of Education and Culture — they are not negotiable below the statutory minimum. (4) Proceeds collected go directly to authors and composers — SAYCE is legally required to distribute collected fees to rights holders. (5) Work registration with SAYCE costs $4.56 for 1–10 works. The monthly platform lets members track royalties and verify registered works. EXECUTIVE DECREE No. 2280 formally established SAYCE. CISAC and LATINAUTOR affiliations mean SAYCE collects on behalf of international repertoire through reciprocal agreements — and distributes to international societies when Ecuadorian music plays abroad.',
    gameRelevance:
      'Every venue in Ecuador (Quito, Guayaquil) must display a SAYCE license. As an artist registered with SAYCE, every licensed event that plays your music generates quarterly royalties. Venues caught without a SAYCE license trigger a compliance event where you can collect damages.',
    inGameEvent: 'sayce_venue_enforcement',
  },
  {
    id: 'ec_moral_rights',
    title: 'Moral Rights of Authors — Ecuador',
    localTitle: 'Derechos Morales — Código Ingenios',
    jurisdiction: 'ecuador',
    category: 'moral_rights',
    severity: 'important',
    statute: 'Código Ingenios 2016, Artículos 100–105',
    yearEnacted: 2016,
    summary:
      'Ecuadorian authors hold perpetual, inalienable moral rights over their works — including the rights of attribution, integrity, disclosure, and withdrawal — regardless of any contract or transfer of economic rights.',
    detail:
      'Ecuador\'s Código Ingenios grants strong moral rights following the civil law tradition: (1) Right of Attribution (Paternidad) — Perpetual right to be identified as the author of your work. Cannot be contracted away. (2) Right of Integrity (Integridad) — Right to oppose any modification, distortion, or mutilation of your work that harms your honor or reputation. This right survives the transfer of all economic rights. (3) Right of Disclosure (Divulgación) — Right to decide if, when, and how your work is made public for the first time. (4) Right of Withdrawal (Retiro) — Right to withdraw your work from commerce, subject to compensating those who suffered economic harm from the withdrawal. SPECIAL PROVISION — Ecuador\'s Código Ingenios includes a notable provision balancing copyright with public access to knowledge and culture — reflecting Ecuador\'s constitution\'s "buen vivir" (sumak kawsay) principle that knowledge should serve collective social wellbeing. This creates a stronger public domain and fair use framework than the US.',
    gameRelevance:
      'In Ecuador, even after signing a label deal, your moral rights protect your artistic integrity. A major game event involves a Quito-based label altering your pasillo or cumbia recording without consent — you invoke your moral rights to demand restoration and collect damages.',
    inGameEvent: 'moral_rights_violation_ec',
  },
  {
    id: 'ec_neighboring_rights',
    title: 'Neighboring Rights — Three-Society System',
    localTitle: 'Derechos Conexos — Sistema Tripartito',
    jurisdiction: 'ecuador',
    category: 'neighboring_rights',
    severity: 'important',
    statute: 'Código Ingenios 2016, Artículos 134–162',
    yearEnacted: 2016,
    summary:
      'Ecuador operates a three-society system for neighboring rights: SAYCE (authors/composers), SARIME (performing artists), and SOPROFON (phonogram producers). Each covers a different right — and independent artists who write, perform, and own their masters can register with all three.',
    detail:
      'Ecuador\'s tripartite neighboring rights system mirrors the Rome Convention framework: PERFORMERS\' RIGHTS (SARIME) — Performing artists (singers, musicians) hold exclusive rights over their performances for 50 years: right to authorize fixation, broadcasting, and reproduction of performances. SARIME collects and distributes these royalties. PHONOGRAM PRODUCER RIGHTS (SOPROFON) — The entity owning the master recording holds rights for 50 years from publication. SOPROFON collects on behalf of labels and independent artists who own their masters. BROADCASTER RIGHTS — Radio and TV stations hold rights over their specific broadcasts for 50 years. CRITICAL FOR INDEPENDENT ARTISTS — An independent artist who writes their own songs, performs them, and self-produces is entitled to collect from ALL THREE societies simultaneously: SAYCE (as author/composer), SARIME (as performing artist), SOPROFON (as phonogram producer). This triple-stack dramatically increases total royalty income compared to artists who have signed away masters or publishing to third parties.',
    gameRelevance:
      'Ecuador is the only launch region where you can stack three collecting society registrations. Register with SAYCE + SARIME + SOPROFON as an independent artist to maximize every royalty stream. A dedicated quest "Triple Stack" unlocks when you complete all three registrations in Quito.',
    inGameEvent: 'ecuador_triple_stack_complete',
  },
  {
    id: 'ec_buen_vivir_public_access',
    title: 'Buen Vivir — Public Interest Limitations on Copyright',
    localTitle: 'Buen Vivir / Sumak Kawsay — Limitaciones al Derecho de Autor por Interés Público',
    jurisdiction: 'ecuador',
    category: 'copyright',
    severity: 'informational',
    statute: 'Constitución del Ecuador (2008), Art. 322; Código Ingenios 2016, Artículos 209–220',
    yearEnacted: 2008,
    lastAmended: 2016,
    summary:
      'Ecuador\'s Constitution enshrines "buen vivir" (good living / sumak kawsay in Kichwa) as a constitutional right. This principle shapes intellectual property law to balance individual creator rights with collective social access to knowledge and culture.',
    detail:
      'Ecuador is unique among the launch regions in having a constitutionally-embedded philosophy that directly shapes copyright law. The 2008 Constitution and the 2016 Código Ingenios reflect Ecuador\'s indigenous Kichwa concept of sumak kawsay (buen vivir — living well in harmony with community and nature). In IP law, this manifests as: BROADER FAIR USE/PUBLIC INTEREST EXCEPTIONS — Ecuador\'s exceptions to copyright are wider than the US, allowing educational use, use by people with disabilities, cultural preservation, and community access to knowledge with fewer restrictions. INDIGENOUS KNOWLEDGE PROTECTION — The Código Ingenios specifically protects traditional indigenous knowledge and collective cultural heritage — including traditional music of Ecuador\'s many indigenous communities. FOLKLORIC EXPRESSIONS — Traditional music, dance, and cultural expressions of Ecuadorian peoples are protected as collective heritage rather than individual copyright. Open-source and creative commons culture is actively promoted by the government. This means a more accessible creative environment but also means certain traditional Ecuadorian music cannot be commercialized without community consent.',
    gameRelevance:
      'In Quito, you can freely incorporate traditional Ecuadorian musical elements in your productions without legal risk — but commercializing indigenous music requires community consent and triggers a special Cultural Respect mechanic. Getting it right boosts your local reputation massively.',
    inGameEvent: 'incorporate_ecuadorian_tradition',
  },
  {
    id: 'ec_enforcement_penalties',
    title: 'Copyright Infringement Penalties — Ecuador',
    localTitle: 'Infracciones y Sanciones — Código Ingenios',
    jurisdiction: 'ecuador',
    category: 'enforcement',
    severity: 'important',
    statute: 'Código Ingenios 2016, Artículos 527–545; Código Orgánico Integral Penal (COIP), Art. 232',
    yearEnacted: 2016,
    summary:
      'Copyright infringement in Ecuador carries civil damages and criminal penalties of 1 to 3 years in prison plus fines, with SENADI overseeing administrative enforcement and the COIP governing criminal prosecution.',
    detail:
      'SENADI (formerly IEPI) is the primary administrative enforcement authority for intellectual property in Ecuador. CIVIL ENFORCEMENT: Injunctions to stop infringing activity. Seizure and destruction of infringing materials. Compensation for actual economic damages suffered. CRIMINAL ENFORCEMENT (Código Orgánico Integral Penal, COIP, Art. 232): Criminal infringement at commercial scale is punishable by 1 to 3 years in prison. Fines calculated based on the economic value of the infringed works. ADMINISTRATIVE SANCTIONS: SENADI can impose administrative fines and order cessation of infringing activities without a court proceeding — faster enforcement than civil litigation. SAYCE ENFORCEMENT — As the mandatory licensing authority, SAYCE has standing to pursue any venue or event organizer that uses music without a valid SAYCE license. This is actively enforced through inspections of nightclubs, hotels, radio stations, and streaming operations.',
    penalties: {
      civil: 'Actual damages + injunctions + seizure of infringing materials',
      criminal: '1 to 3 years imprisonment (commercial-scale infringement)',
      prisonMin: '1 year',
      prisonMax: '3 years',
      currency: 'USD_Ecuador',
    },
    gameRelevance:
      'In Quito and Guayaquil, SENADI inspectors can shut down venues operating without SAYCE licenses — and they do. As an artist, you benefit when competitors are caught infringing. If you\'re caught infringing, you face prison time in Ecuador — the criminal threat is real and a major game tension point.',
    inGameEvent: 'senadi_inspection_quito',
  },
];

// ─── Country Profiles ─────────────────────────────────────────────────────────

export const COUNTRY_LAW_PROFILES: Record<LaunchRegion, CountryMusicLawProfile> = {
  usa: {
    country: 'United States of America',
    region: 'usa',
    flag: '🇺🇸',
    copyrightDuration: 'Life of author + 70 years. Works made for hire: 95 years from publication or 120 years from creation.',
    copyrightBornAt: 'creation',
    registrationRequired: false,
    primaryLegislation: 'Copyright Act of 1976 (17 U.S.C.); Music Modernization Act (2018); Digital Millennium Copyright Act (1998)',
    governingBody: 'U.S. Copyright Office (Library of Congress); Copyright Royalty Board',
    collectingSocieties: USA_COLLECTING_SOCIETIES,
    laws: USA_LAWS,
    keyFacts: [
      'Copyright is automatic at creation — no registration required for protection',
      'Registration with US Copyright Office required BEFORE filing an infringement lawsuit',
      'Two separate copyrights exist for every song: Composition (melody + lyrics) and Master Recording',
      'PROs (ASCAP, BMI) cover performance royalties; The MLC covers mechanical royalties from streaming',
      'SoundExchange covers digital radio (Pandora, SiriusXM) — separate from PROs',
      'Work-for-hire contracts transfer full copyright to the commissioning party — avoid signing these for your original music',
      '360 deals give labels a share of ALL income — touring, merch, endorsements, publishing',
      'Termination rights allow reclaiming copyright 35 years after signing it away (17 U.S.C. § 203)',
      'Statutory damages: $750–$30,000 per work; up to $150,000 for willful infringement',
      'The "6-second rule" for sampling is a myth — there is no safe amount to sample without clearance',
    ],
    genresProtected: ['All genres — no specific cultural heritage designations in US law for music'],
    gameStartingInfo:
      'You\'re in Atlanta — the US has the most complex music law system in the world. Four different organizations collect your royalties: ASCAP or BMI (performance), The MLC (mechanical streaming), and SoundExchange (digital radio). Register with all four to collect every dollar you\'re owed. Your music attorney Denise Okafor, Esq. is here to walk you through it.',
  },

  dominican_republic: {
    country: 'Dominican Republic',
    region: 'dominican_republic',
    flag: '🇩🇴',
    copyrightDuration: 'Life of author + 70 years (extended from 50 years in 2006 under CAFTA-DR)',
    copyrightBornAt: 'creation',
    registrationRequired: false,
    primaryLegislation: 'Law No. 65-00 on Copyright (2000); Implementing Regulations (2001); CAFTA-DR Chapter 15 (2006)',
    governingBody: 'Oficina Nacional de Derecho de Autor (ONDA) — under Ministry of Industry, Commerce and Mipymes',
    collectingSocieties: DR_COLLECTING_SOCIETIES,
    laws: DR_LAWS,
    keyFacts: [
      'Copyright is automatic at the moment of creation — no registration required for protection',
      'Register with ONDA for an official record — required before filing infringement lawsuits',
      'SGACEDOM is the collecting society for authors, composers, and publishers',
      'Moral rights are PERPETUAL and INALIENABLE — cannot be contracted away, even in a 360 deal',
      'Related rights: performers (50 years), phonogram producers (50 years), broadcasters (25 years)',
      'CAFTA-DR aligned Dominican IP law with US standards — similar DMCA-style anti-circumvention provisions apply',
      'Criminal penalties: 3 months to 3 years in prison for copyright infringement',
      'Civil fines: DOP 500,000–10,000,000+ (~$9,000–$180,000 USD)',
      'Merengue inscribed on UNESCO Intangible Cultural Heritage in 2016',
      'Bachata inscribed on UNESCO Intangible Cultural Heritage in 2019',
      'ONDA processes copyright registrations within 30 days',
    ],
    genresProtected: ['Merengue', 'Bachata'],
    unescoHeritage: [
      'Merengue — UNESCO Representative List of Intangible Cultural Heritage of Humanity (2016)',
      'Bachata — UNESCO Representative List of Intangible Cultural Heritage of Humanity (2019)',
    ],
    gameStartingInfo:
      'Welcome to Santo Domingo — the birthplace of merengue and bachata, both UNESCO Intangible Cultural Heritage. Dominican law is strong on moral rights — even if you sign a deal, you permanently retain the right to your name and the integrity of your music. Register with SGACEDOM and ONDA, then hit the stages. Merengue and bachata tracks recorded here get a Cultural Heritage bonus that unlocks exclusive regional events.',
  },

  ecuador: {
    country: 'Ecuador',
    region: 'ecuador',
    flag: '🇪🇨',
    copyrightDuration: 'Life of author + 70 years. Legal entities: 70 years from publication.',
    copyrightBornAt: 'creation',
    registrationRequired: false,
    primaryLegislation: 'Código Orgánico de la Economía Social de los Conocimientos, Creatividad e Innovación — Código Ingenios (2016); Executive Decree No. 2280 (SAYCE)',
    governingBody: 'Servicio Nacional de Derechos Intelectuales (SENADI)',
    collectingSocieties: ECUADOR_COLLECTING_SOCIETIES,
    laws: ECUADOR_LAWS,
    keyFacts: [
      'Copyright born at moment of creation — no registration required',
      'Register with SENADI for official government record; required for enforcement',
      'THREE collecting societies: SAYCE (authors/composers), SARIME (performers), SOPROFON (masters)',
      'Independent artists who write, perform, and own masters can register with all THREE — maximizing royalties',
      'SAYCE authorization is MANDATORY for any public event using music — no exceptions',
      'SAYCE work registration costs $4.56 for 1–10 works',
      'Moral rights are perpetual and inalienable under the Código Ingenios',
      'The "buen vivir" (sumak kawsay) constitutional principle creates broader public interest copyright exceptions',
      'Indigenous traditional music is protected as collective heritage — not individual copyright',
      'Criminal penalties: 1 to 3 years in prison for commercial-scale infringement (COIP Art. 232)',
      'SENADI can impose administrative sanctions without court proceedings — faster enforcement',
      'Ecuador uses USD as its national currency since 2000 — no currency conversion for international royalties',
    ],
    genresProtected: ['Pasillo', 'Cumbia', 'Sanjuanito', 'Bomba afroecuatoriana', 'Marimba', 'Traditional indigenous music'],
    unescoHeritage: [
      'Marimba music and traditional chants of the Colombian and Ecuadorian Pacific coast — UNESCO Intangible Cultural Heritage (2015)',
    ],
    gameStartingInfo:
      'You\'re in Quito — Ecuador\'s music law is unique: three collecting societies, a constitutional "buen vivir" philosophy protecting public access to culture, and indigenous music traditions that can\'t be commercialized without community consent. Register with SAYCE, SARIME, and SOPROFON to stack all three royalty streams. This is the only region where you can do that — and it changes your financial game completely.',
  },
};

// ─── Cross-Region Comparison ──────────────────────────────────────────────────

export interface RegionLawComparison {
  category: string;
  usa: string;
  dominican_republic: string;
  ecuador: string;
}

export const REGION_LAW_COMPARISONS: RegionLawComparison[] = [
  {
    category: 'Copyright Duration',
    usa: 'Life + 70 years (individual); 95 yrs from pub (corporate)',
    dominican_republic: 'Life + 70 years',
    ecuador: 'Life + 70 years (individual); 70 yrs from pub (legal entity)',
  },
  {
    category: 'Copyright Born At',
    usa: 'Moment of creation — no registration required',
    dominican_republic: 'Moment of creation — no registration required',
    ecuador: 'Moment of creation — no registration required',
  },
  {
    category: 'Collecting Societies',
    usa: 'ASCAP or BMI (performance) + The MLC (mechanical) + SoundExchange (digital radio)',
    dominican_republic: 'SGACEDOM (performance + mechanical); ONDA (registration only)',
    ecuador: 'SAYCE (composition) + SARIME (performance) + SOPROFON (masters) — stack all 3',
  },
  {
    category: 'Moral Rights',
    usa: 'Very limited in music — only visual art has strong moral rights (VARA)',
    dominican_republic: 'Strong, perpetual, inalienable — cannot be contracted away',
    ecuador: 'Strong, perpetual, inalienable — reinforced by buen vivir constitutional principle',
  },
  {
    category: 'Criminal Infringement Penalty',
    usa: 'Up to 5 years prison + $250,000 fine (commercial piracy)',
    dominican_republic: '3 months to 3 years prison',
    ecuador: '1 to 3 years prison (COIP Art. 232)',
  },
  {
    category: 'Civil Fine Range',
    usa: '$750–$150,000 per work (statutory)',
    dominican_republic: '~$9,000–$180,000 USD (DOP equivalent)',
    ecuador: 'Actual damages + injunctions + seizure',
  },
  {
    category: 'Digital Law (DMCA equivalent)',
    usa: 'DMCA (1998) — safe harbor, anti-circumvention, takedown notices',
    dominican_republic: 'CAFTA-DR Chapter 15 anti-circumvention provisions (2006)',
    ecuador: 'Código Ingenios digital provisions (2016) + WIPO Internet Treaties',
  },
  {
    category: 'UNESCO Cultural Heritage',
    usa: 'No specific music genres designated',
    dominican_republic: 'Merengue (2016) and Bachata (2019)',
    ecuador: 'Marimba and Pacific coast chants (2015); indigenous music as collective heritage',
  },
  {
    category: 'Public Event Licensing',
    usa: 'Venue must hold ASCAP and/or BMI blanket license',
    dominican_republic: 'SGACEDOM license required for public music use',
    ecuador: 'SAYCE authorization MANDATORY for any public event — no exceptions',
  },
  {
    category: 'Indigenous/Traditional Music',
    usa: 'No specific federal protection as collective heritage',
    dominican_republic: 'Limited — merengue/bachata UNESCO heritage reinforces cultural sensitivity',
    ecuador: 'Full collective heritage protection under Código Ingenios — community consent required for commercialization',
  },
];

// ─── Utility Functions ────────────────────────────────────────────────────────

export const getLawsByRegion = (region: LaunchRegion): MusicLaw[] =>
  COUNTRY_LAW_PROFILES[region].laws;

export const getLawsByCategory = (region: LaunchRegion, category: LawCategory): MusicLaw[] =>
  COUNTRY_LAW_PROFILES[region].laws.filter((l) => l.category === category);

export const getCollectingSocietiesByRegion = (region: LaunchRegion): CollectingSociety[] =>
  COUNTRY_LAW_PROFILES[region].collectingSocieties;

export const getCountryProfile = (region: LaunchRegion): CountryMusicLawProfile =>
  COUNTRY_LAW_PROFILES[region];

export const getLawById = (id: string): MusicLaw | undefined => {
  for (const profile of Object.values(COUNTRY_LAW_PROFILES)) {
    const found = profile.laws.find((l) => l.id === id);
    if (found) return found;
  }
  return undefined;
};

export const getAllLaunchRegions = (): LaunchRegion[] =>
  ['usa', 'dominican_republic', 'ecuador'];

export const isLaunchRegion = (regionId: string): boolean =>
  ['usa', 'dominican_republic', 'ecuador'].includes(regionId);
