// ─── digitalPlatformLaws.ts ───────────────────────────────────────────────────
// Verified digital, social media & content platform laws for World Stage
// launch regions: 🇺🇸 USA · 🇩🇴 Dominican Republic · 🇪🇨 Ecuador
//
// Covers: streaming DSPs, social media platforms, Content ID, UGC licensing,
// micro-sync, AI music policy, WIPO internet treaties, platform enforcement,
// and artist-specific digital rights per jurisdiction.
//
// Sources verified 2026:
//   copyright.gov · ascap.com · bmi.com · themlc.com · soundexchange.com
//   wipo.int · onda.gob.do · sayce.com.ec · derechosintelectuales.gob.ec
//   support.google.com/youtube · tiktok.com · meta.com
// ─────────────────────────────────────────────────────────────────────────────

import { LaunchRegion } from './musicLaws';

// ─── Core Types ───────────────────────────────────────────────────────────────

export type DigitalPlatformType =
  | 'streaming_dsp'         // Spotify, Apple Music, Amazon Music, Tidal, Deezer
  | 'video_platform'        // YouTube, Vevo
  | 'short_form_video'      // TikTok, Instagram Reels, YouTube Shorts, Snapchat
  | 'live_streaming'        // Twitch, Instagram Live, YouTube Live, Facebook Live
  | 'social_media'          // Instagram, Facebook, Twitter/X, Snapchat, Pinterest
  | 'digital_radio'         // Pandora, SiriusXM, iHeartRadio (non-interactive)
  | 'download_store'        // iTunes, Bandcamp, Amazon Music HD
  | 'podcast_platform'      // Spotify, Apple Podcasts, Anchor
  | 'content_id_system'     // YouTube Content ID, Meta Rights Manager, TikTok's system
  | 'ai_music_platform';    // Suno, Udio, Soundraw, other AI music tools

export type DigitalRoyaltyType =
  | 'streaming_performance' // PRO collects — ASCAP/BMI/SGACEDOM/SAYCE
  | 'streaming_mechanical'  // MLC/distributor collects — per interactive stream
  | 'digital_radio'         // SoundExchange — non-interactive digital radio
  | 'micro_sync'            // Platform-negotiated UGC sync — TikTok, IG, YouTube
  | 'content_id_revenue'    // YouTube ad revenue redirected via Content ID
  | 'download_mechanical'   // Per-download mechanical rate
  | 'sync_fee';             // One-time negotiated sync fee

export type ContentIDAction =
  | 'monetize'  // Redirect ad revenue to rights holder (most common)
  | 'track'     // Track views/usage only — no monetization or block
  | 'block'     // Remove video entirely from platform
  | 'block_some_regions'; // Block in specific countries, monetize in others

export interface DigitalPlatform {
  id: string;
  name: string;
  type: DigitalPlatformType;
  headquarters: string;
  licenseModel: string;
  royaltiesPerStream?: string;
  mechanicalCollector?: string;
  performanceCollector?: string;
  masterCollector?: string;
  contentEnforcement: string;
  artistTakeaway: string;
  availableInRegions: LaunchRegion[];
  platformDeal?: PlatformLicenseDeal;
  gameEffect: PlatformGameEffect;
}

export interface PlatformLicenseDeal {
  withPROs: string[];
  withLabels: string[];
  coverageScope: string;
  exclusions: string[];
  artistCollectsVia: string;
}

export interface PlatformGameEffect {
  streamsMultiplier: number;     // Multiplier on stream count growth
  reachBonus: number;            // Global reach stat bonus per milestone
  royaltyMultiplier: number;     // Multiplier on royalty income from this platform
  reputationBonus: number;       // Reputation boost per milestone hit
  unlockCondition?: string;      // What the player needs to access this platform
  description: string;
}

export interface DigitalLegalTerm {
  id: string;
  term: string;
  localTerm?: string;            // Spanish translation where applicable
  category: 'platform' | 'royalty' | 'enforcement' | 'ai' | 'ugc' | 'international';
  appliesTo: LaunchRegion[];
  platforms?: string[];          // Specific platforms this applies to
  severity: 'critical' | 'important' | 'informational';
  definition: string;
  detail: string;
  realWorldExample: string;
  gameRelevance: string;
  legalBasis: string;            // Statute, treaty, or agreement
}

export interface PlatformEnforcementAction {
  id: string;
  name: string;
  platform: string;
  jurisdiction: LaunchRegion | 'global';
  description: string;
  triggerCondition: string;
  consequences: string[];
  artistResponse: string[];
  gameEvent?: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// 🌐  DIGITAL PLATFORMS — Active in All Launch Regions
// ─────────────────────────────────────────────────────────────────────────────

export const DIGITAL_PLATFORMS: Record<string, DigitalPlatform> = {

  // ── STREAMING DSPs ────────────────────────────────────────────────────────

  spotify: {
    id: 'spotify',
    name: 'Spotify',
    type: 'streaming_dsp',
    headquarters: 'Stockholm, Sweden',
    licenseModel:
      'Spotify holds a blanket mechanical license from The MLC (US) and negotiates master recording licenses directly with labels and distributors. Separate performance licenses are negotiated with ASCAP/BMI (US), SGACEDOM (DR), and SAYCE (Ecuador) via their respective reciprocal networks.',
    royaltiesPerStream: '$0.003–$0.005 per stream (varies by market, listener tier, and country)',
    mechanicalCollector: 'The MLC (USA) — blanket license under Music Modernization Act 2018',
    performanceCollector: 'ASCAP or BMI (USA) · SGACEDOM (Dominican Republic) · SAYCE (Ecuador)',
    masterCollector: 'Paid directly to distributor/label via sound recording license deal',
    contentEnforcement:
      'Spotify uses content fingerprinting and automated rights matching to enforce licenses. Rights holders can claim catalog via distributor or direct licensing deal. No public "takedown" system like YouTube — rights are pre-cleared via licensing agreements.',
    artistTakeaway:
      'As an independent artist, your distributor (DistroKid, TuneCore, CD Baby, etc.) delivers your music to Spotify and collects both master recording income and mechanical royalties on your behalf. Your PRO (ASCAP/BMI/SGACEDOM/SAYCE) collects performance royalties separately. Register with The MLC directly to ensure mechanical royalties are not lost as "unmatched" royalties.',
    availableInRegions: ['usa', 'dominican_republic', 'ecuador'],
    platformDeal: {
      withPROs: ['ASCAP', 'BMI', 'SESAC', 'SGACEDOM', 'SAYCE', '90+ PROs worldwide via reciprocal agreements'],
      withLabels: ['Universal Music Group', 'Sony Music Entertainment', 'Warner Music Group', 'Independent labels via distributor agreements'],
      coverageScope: 'Global — available in 180+ countries including USA, Dominican Republic, and Ecuador',
      exclusions: [
        'Podcasts with music require separate licensing',
        'Sync/video content not covered by streaming license',
        'DJ mixes and live recordings require additional clearances',
      ],
      artistCollectsVia: 'Distributor (master + mechanical) + PRO (performance) + The MLC (US mechanical backup)',
    },
    gameEffect: {
      streamsMultiplier: 1.4,
      reachBonus: 8,
      royaltyMultiplier: 1.15,
      reputationBonus: 12,
      unlockCondition: 'Upload first track via distributor',
      description:
        'Spotify is your primary streaming platform. Getting on editorial playlists (Discover Weekly, New Music Friday) triggers massive stream spikes. Each 1M streams = $3,000–$5,000 in combined royalties across ASCAP/BMI + distributor + MLC. Register your works with The MLC to ensure you collect all mechanical royalties.',
    },
  },

  apple_music: {
    id: 'apple_music',
    name: 'Apple Music',
    type: 'streaming_dsp',
    headquarters: 'Cupertino, California, USA',
    licenseModel:
      'Apple Music pays higher per-stream rates than Spotify (~$0.007–$0.01) and operates under the same MLC blanket mechanical license for US interactive streaming. Master recording rights are licensed directly with labels/distributors. Performance royalties collected by PROs.',
    royaltiesPerStream: '~$0.007–$0.01 per stream — highest among major DSPs',
    mechanicalCollector: 'The MLC (USA blanket license) · Local PRO equivalent in DR and Ecuador',
    performanceCollector: 'ASCAP or BMI (USA) · SGACEDOM (DR) · SAYCE (Ecuador)',
    masterCollector: 'Paid directly to distributor/label',
    contentEnforcement:
      'Rights are pre-cleared via distributor agreements. Apple uses rights fingerprinting. No public Content ID system — disputes handled through distributor/label direct agreements with Apple.',
    artistTakeaway:
      'Apple Music pays approximately double Spotify\'s per-stream rate. For artists with significant listeners on Apple Music, this meaningfully increases total streaming income. Apple Music for Artists dashboard provides detailed streaming analytics including song-by-song breakdown by country — including Dominican Republic and Ecuador data.',
    availableInRegions: ['usa', 'dominican_republic', 'ecuador'],
    gameEffect: {
      streamsMultiplier: 1.3,
      reachBonus: 7,
      royaltyMultiplier: 1.25,
      reputationBonus: 10,
      unlockCondition: 'Upload first track via distributor',
      description:
        'Apple Music pays ~2x Spotify per stream. Fewer streams but higher income per stream. Getting on Apple Music\'s editorial playlists (Today\'s Hits, Hip-Hop/Rap Essentials, etc.) is high-value. Apple\'s 50M+ subscriber base includes heavy Latin music users — crucial for DR and Ecuador market reach.',
    },
  },

  amazon_music: {
    id: 'amazon_music',
    name: 'Amazon Music',
    type: 'streaming_dsp',
    headquarters: 'Seattle, Washington, USA',
    licenseModel:
      'Same MLC blanket mechanical license for US. Master recordings licensed directly. Amazon Music Unlimited (paid tier) pays higher per-stream rates than Amazon Prime Music (included-with-Prime tier).',
    royaltiesPerStream: '$0.004–$0.012 per stream (varies by tier — Unlimited vs. Prime)',
    mechanicalCollector: 'The MLC (USA) · Distributor in other regions',
    performanceCollector: 'ASCAP or BMI (USA) · SGACEDOM (DR) · SAYCE (Ecuador)',
    masterCollector: 'Paid to distributor/label',
    contentEnforcement: 'Rights pre-cleared via distributor/label agreements. No public takedown system.',
    artistTakeaway:
      'Amazon Music Unlimited subscribers (paid tier) generate higher per-stream rates than Prime Music listeners. Amazon\'s Alexa voice requests ("Alexa, play [artist]") count as streams. Latin music playlists on Amazon Music have grown significantly, expanding DR and Ecuador artist reach.',
    availableInRegions: ['usa', 'dominican_republic', 'ecuador'],
    gameEffect: {
      streamsMultiplier: 1.1,
      reachBonus: 5,
      royaltyMultiplier: 1.12,
      reputationBonus: 7,
      description:
        'Amazon Music Unlimited pays up to $0.012 per stream — highest when Alexa plays your music. Activating Amazon Alexa playlists unlocks a passive daily stream bonus. Good secondary income after Spotify/Apple.',
    },
  },

  tidal: {
    id: 'tidal',
    name: 'TIDAL',
    type: 'streaming_dsp',
    headquarters: 'New York, USA',
    licenseModel:
      'TIDAL operates on negotiated master recording licenses and MLC blanket mechanical license (US). Known for HiFi audio quality and higher artist royalty rates — TIDAL pays the highest per-stream rate of all major DSPs. Co-owned by artists including Jay-Z and Rihanna.',
    royaltiesPerStream: '~$0.01–$0.013 per stream (HiFi subscribers generate highest rates)',
    mechanicalCollector: 'The MLC (USA) · Distributor in other regions',
    performanceCollector: 'ASCAP or BMI (USA) · SGACEDOM (DR) · SAYCE (Ecuador)',
    masterCollector: 'Paid to distributor/label',
    contentEnforcement: 'Rights pre-cleared. TIDAL emphasizes fair artist compensation as platform policy.',
    artistTakeaway:
      'TIDAL pays the highest per-stream royalty rate. Smaller user base than Spotify but audiophile/premium demographic. TIDAL Rising program promotes emerging artists. The artist ownership angle (Jay-Z, Rihanna) makes it culturally significant — a co-sign here carries reputational weight.',
    availableInRegions: ['usa', 'dominican_republic', 'ecuador'],
    gameEffect: {
      streamsMultiplier: 0.8,
      reachBonus: 4,
      royaltyMultiplier: 1.35,
      reputationBonus: 15,
      unlockCondition: 'globalReach >= 20',
      description:
        'TIDAL pays the highest per-stream rate in the game (+35% royalty multiplier). Smaller audience but premium fans. A TIDAL Rising feature unlocks a prestige reputation bonus. Artist-owned platform — getting co-signed here is a major credibility event.',
    },
  },

  // ── VIDEO PLATFORMS ───────────────────────────────────────────────────────

  youtube: {
    id: 'youtube',
    name: 'YouTube',
    type: 'video_platform',
    headquarters: 'San Bruno, California, USA',
    licenseModel:
      'YouTube has negotiated direct licensing deals with all major labels and PROs globally. Music is licensed via the YouTube Music licensing framework. YouTube pays performance royalties to PROs via direct deals (not through the MLC blanket license). Content ID enforces rights automatically for all uploaded content.',
    royaltiesPerStream: '$0.001–$0.008 per view (varies enormously by ad revenue, viewer geography, and monetization status)',
    mechanicalCollector: 'Distributor via YouTube Content ID monetization (redirected ad revenue)',
    performanceCollector: 'ASCAP/BMI via YouTube-PRO licensing deal · SGACEDOM · SAYCE',
    masterCollector: 'Distributor or label via YouTube sound recording license agreement',
    contentEnforcement:
      'Content ID — YouTube\'s automated fingerprinting system. Scans every uploaded video against a database of registered audio fingerprints. Rights holders can set policy: Monetize (redirect ad revenue), Track (analytics only), or Block (remove from YouTube entirely). Geography-specific policies allowed.',
    artistTakeaway:
      'YouTube is the world\'s largest music discovery platform. Register your music with a distributor that offers Content ID (DistroKid, TuneCore, CD Baby all include it) — this ensures ad revenue from anyone using your music in their videos is redirected to you instead of kept by YouTube. Content ID claim ≠ copyright strike. A claim redirects money. A strike removes content and can terminate channels.',
    availableInRegions: ['usa', 'dominican_republic', 'ecuador'],
    platformDeal: {
      withPROs: ['ASCAP', 'BMI', 'SESAC', 'SGACEDOM', 'SAYCE', 'CISAC member societies worldwide'],
      withLabels: ['All major labels + independent labels via distributor agreements'],
      coverageScope: 'Global — available worldwide including USA, Dominican Republic, Ecuador',
      exclusions: [
        'Videos with manually disabled monetization do not generate royalties',
        'Videos geographically blocked by rights holder generate no income in blocked region',
        'Fair use content may not be monetizable even with Content ID claim',
      ],
      artistCollectsVia: 'Distributor (Content ID ad revenue + sound recording) + PRO (YouTube performance royalty deal)',
    },
    gameEffect: {
      streamsMultiplier: 2.0,
      reachBonus: 15,
      royaltyMultiplier: 0.9,
      reputationBonus: 20,
      unlockCondition: 'Release first music video',
      description:
        'YouTube generates the highest reach multiplier — views here translate to massive reputation and global reach gains. Lower per-view royalties than Spotify, but music videos on YouTube are non-negotiable for career growth. Content ID activation turns every fan\'s tribute video into passive income. Getting a YouTube editorial feature (YouTube Music\'s Artist Spotlight) is a massive career event.',
    },
  },

  // ── SHORT-FORM VIDEO ──────────────────────────────────────────────────────

  tiktok: {
    id: 'tiktok',
    name: 'TikTok',
    type: 'short_form_video',
    headquarters: 'Los Angeles, USA / Singapore (ByteDance)',
    licenseModel:
      'TikTok has negotiated direct licensing deals with all major labels and PROs — including ASCAP, BMI, and international collecting societies. Personal users can add licensed music to personal (non-commercial) videos without additional licensing. Business accounts and branded content require separate sync licenses. TikTok pays micro-sync royalties via these platform deals.',
    royaltiesPerStream: '$0.03 per 1,000 video creations using your sound (approximately $0.00003 per creation); additional royalties per view on videos using your sound',
    mechanicalCollector: 'TikTok pays rights holders via distributor agreements — not through MLC',
    performanceCollector: 'ASCAP/BMI via TikTok-PRO direct licensing deal · SGACEDOM · SAYCE',
    masterCollector: 'Paid to distributor/label via TikTok sound recording license',
    contentEnforcement:
      'TikTok uses automated audio fingerprinting to detect copyrighted music. Rights holders can have content removed, restricted, or monetized through distributor/label partnerships. TikTok\'s DMCA-like system allows rights holders to submit takedown requests. TikTok\'s license with labels/PROs means most music is pre-cleared for personal use.',
    artistTakeaway:
      'TikTok\'s cultural impact on music discovery is unmatched in 2026 — a song going viral on TikTok translates directly into Spotify streams and career momentum. Register your music with a distributor that has a TikTok distribution deal to ensure your music appears in TikTok\'s sound library and generates micro-sync royalties. Business accounts (brands using your music for ads) require a separate sync license — negotiate this directly. NOTE: TikTok faced US regulatory scrutiny under national security law in 2024-2025 — the platform\'s US availability has been subject to ongoing legal proceedings.',
    availableInRegions: ['usa', 'dominican_republic', 'ecuador'],
    platformDeal: {
      withPROs: ['ASCAP', 'BMI', 'SOCAN', 'SGACEDOM', 'SAYCE', 'PRS', 'CISAC member societies'],
      withLabels: ['Universal Music Group', 'Sony Music', 'Warner Music', 'Believe/TuneCore partnership (July 2020)'],
      coverageScope: 'Personal/non-commercial use globally; business use requires additional licensing',
      exclusions: [
        'Commercial/branded content requires separate sync license regardless of platform deal',
        'Live performances broadcast on TikTok may require additional clearances',
        'Pre-1972 sound recordings may have additional clearance requirements',
      ],
      artistCollectsVia: 'Distributor (micro-sync royalties from TikTok sound library) + PRO (performance royalties)',
    },
    gameEffect: {
      streamsMultiplier: 3.0,
      reachBonus: 25,
      royaltyMultiplier: 0.7,
      reputationBonus: 35,
      unlockCondition: 'tracksReleased >= 1',
      description:
        'TikTok has the highest reach multiplier in the game. A viral TikTok moment (sound used in 10K+ videos) triggers a "Viral Moment" event that spikes streams across all platforms simultaneously. Royalties per use are tiny — but the reputation and reach explosion is priceless. Having your sound go viral on TikTok is a career-changing event.',
    },
  },

  instagram: {
    id: 'instagram',
    name: 'Instagram / Meta',
    type: 'short_form_video',
    headquarters: 'Menlo Park, California, USA',
    licenseModel:
      'Meta (Instagram + Facebook) has negotiated licensing deals with all major labels and PROs. Licensed music is available in Instagram\'s in-app music library for personal Reels, Stories, and posts. Meta\'s Rights Manager system (equivalent to YouTube Content ID) detects copyrighted music in user posts. Business accounts using music in promotional content require separate sync licenses — Meta\'s personal-use license explicitly excludes commercial purposes.',
    royaltiesPerStream: 'Micro-sync royalties paid via distributor/label partnership with Meta; rates not publicly disclosed',
    mechanicalCollector: 'Paid via Meta licensing agreements to distributors/labels',
    performanceCollector: 'ASCAP/BMI via Meta-PRO direct licensing deal · SGACEDOM · SAYCE',
    masterCollector: 'Paid to distributor/label via Meta sound recording license',
    contentEnforcement:
      'Meta Rights Manager — equivalent to YouTube Content ID for Facebook and Instagram. Rights holders submit audio fingerprints; Meta scans user content. Rights holders can: block content, allow content (track only), or monetize through ad revenue redirection. Instagram Live is particularly vulnerable — live streams with copyrighted music often get muted in real-time by automated detection.',
    artistTakeaway:
      'Instagram is critical for artist branding and fan engagement. Getting your music into Instagram\'s in-app library ensures fans can add it to Reels without copyright issues — and generates micro-sync royalties. Watch out: if a business uses your music in a sponsored post without a sync license, file a Rights Manager takedown. Instagram Live muting is a real issue — if you perform covers live on Instagram, your stream may be muted automatically.',
    availableInRegions: ['usa', 'dominican_republic', 'ecuador'],
    platformDeal: {
      withPROs: ['ASCAP', 'BMI', 'SESAC', 'SGACEDOM', 'SAYCE', 'CISAC societies worldwide'],
      withLabels: ['Universal Music Group', 'Sony Music', 'Warner Music', 'Symphonic Distribution partnership'],
      coverageScope: 'Personal non-commercial use globally via in-app music library',
      exclusions: [
        'Commercial/promotional use by business accounts NOT covered — separate sync license required',
        'Instagram Live performances of cover songs may be muted by automated detection',
        'Stories with copyrighted music may be restricted in certain countries',
      ],
      artistCollectsVia: 'Distributor (micro-sync via Meta deal) + PRO (performance via Meta-PRO deal)',
    },
    gameEffect: {
      streamsMultiplier: 1.5,
      reachBonus: 18,
      royaltyMultiplier: 0.6,
      reputationBonus: 22,
      description:
        'Instagram drives reputation and image stats more than royalties. Going viral on Instagram Reels triggers a Social Viral Event. Brands using your music on Instagram without a sync license trigger a Rights Manager income event. Maintaining 100K+ Instagram followers unlocks brand deal opportunities.',
    },
  },

  // ── DIGITAL RADIO ─────────────────────────────────────────────────────────

  pandora: {
    id: 'pandora',
    name: 'Pandora',
    type: 'digital_radio',
    headquarters: 'Oakland, California, USA',
    licenseModel:
      'Pandora is a non-interactive digital radio service — listeners cannot choose specific songs. Operates under the statutory Section 114 compulsory license (Digital Performance Right in Sound Recordings Act). SoundExchange collects sound recording royalties. Pandora also holds PRO licenses for composition performance royalties.',
    royaltiesPerStream: '~$0.002 per stream (lower than interactive services due to statutory compulsory license rate)',
    mechanicalCollector: 'None — non-interactive radio does not trigger mechanical royalties',
    performanceCollector: 'ASCAP/BMI (composition performance) + SoundExchange (sound recording performance)',
    masterCollector: 'SoundExchange: 45% to featured artist, 50% to master rights holder, 5% to session musicians',
    contentEnforcement: 'Statutory license — Pandora does not need individual rights holder permission to play music. SoundExchange collects and distributes automatically.',
    artistTakeaway:
      'Register with SoundExchange (soundexchange.com — free) to collect your 45% artist share from Pandora plays. If you are your own label, also claim the 50% master rights holder share — giving you 95% of the SoundExchange distribution. Without SoundExchange registration, Pandora royalties are held in escrow and eventually distributed based on market share — not necessarily reaching you.',
    availableInRegions: ['usa'],
    gameEffect: {
      streamsMultiplier: 0.7,
      reachBonus: 5,
      royaltyMultiplier: 1.08,
      reputationBoost: 5,
      reputationBonus: 5,
      unlockCondition: 'Register with SoundExchange',
      description:
        'Pandora is US-only. Lower royalty rate but passive income — your music plays without needing new uploads. SoundExchange registration is required to collect. Register as both featured artist AND master rights holder to collect 95% instead of 45%.',
    },
  },

  siriusxm: {
    id: 'siriusxm',
    name: 'SiriusXM',
    type: 'digital_radio',
    headquarters: 'New York, USA',
    licenseModel:
      'SiriusXM is a satellite and online non-interactive radio service. Operates under the Section 114 statutory compulsory license for sound recordings. SoundExchange collects sound recording royalties. PRO performance licenses cover composition royalties. SiriusXM is one of the largest SoundExchange royalty payers.',
    royaltiesPerStream: 'Varies by channel and agreement — generally $0.002–$0.005 per play',
    mechanicalCollector: 'None — non-interactive service',
    performanceCollector: 'ASCAP/BMI (composition) + SoundExchange (sound recording)',
    masterCollector: 'SoundExchange: 45% featured artist, 50% master rights holder, 5% session musicians',
    contentEnforcement: 'Statutory license — SiriusXM plays music under compulsory license. No Content ID.',
    artistTakeaway:
      'SiriusXM\'s 34M+ subscribers generate substantial SoundExchange royalties. Getting your song added to SiriusXM\'s Hits 1, BPM, or Hip-Hop Nation channels generates significant passive income. A SiriusXM exclusive premiere is a major PR event. Register with SoundExchange to collect.',
    availableInRegions: ['usa'],
    gameEffect: {
      streamsMultiplier: 0.9,
      reachBonus: 8,
      royaltyMultiplier: 1.12,
      reputationBonus: 15,
      unlockCondition: 'globalReach >= 30',
      description:
        'A SiriusXM feature unlocks after reaching 30 global reach. Satellite radio generates consistent passive SoundExchange income and major credibility. Getting your song on a major SiriusXM channel (Hits 1) is a milestone event — massive reputation spike.',
    },
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// 📋  DIGITAL LEGAL TERMS — All Regions
// ─────────────────────────────────────────────────────────────────────────────

export const DIGITAL_LEGAL_TERMS: DigitalLegalTerm[] = [

  // ── USA DIGITAL TERMS ──────────────────────────────────────────────────────

  {
    id: 'dmca_safe_harbor',
    term: 'DMCA Safe Harbor (Section 512)',
    category: 'platform',
    appliesTo: ['usa'],
    platforms: ['YouTube', 'TikTok', 'Instagram', 'Facebook', 'Twitch', 'SoundCloud', 'Twitter/X'],
    severity: 'critical',
    definition:
      'A legal shield that protects online platforms from copyright infringement liability for content uploaded by their users — as long as the platform promptly removes infringing content when notified by rights holders.',
    detail:
      'Section 512 of the DMCA (1998) created the "safe harbor" framework that allowed YouTube, Instagram, TikTok, and every other user-generated content platform to exist legally. Without it, platforms would be liable for every infringing song a user uploaded. The safe harbor has four provisions: (1) Transitory Digital Network Communications — immunity for mere transmission. (2) System Caching — immunity for automatic caching. (3) User-Stored Content — immunity for hosting user content IF the platform designates a DMCA agent, removes content when notified, and does not profit directly from specific infringement. (4) Information Location Tools — immunity for search engines. KEY LIMITATION (2026): The Supreme Court\'s Cox Communications v. Sony Music Entertainment (March 25, 2026) ruling confirmed that ISPs/platforms CANNOT claim safe harbor when they "willfully turn a blind eye" to known repeat infringers. Platforms with systematic infringer policies can now face secondary liability. PRACTICAL IMPACT: This is why YouTube, TikTok, and Instagram are legally required to respond to DMCA takedown notices — they need safe harbor to operate. As an artist, your DMCA takedown notice forces platforms to act within 24–72 hours or lose their legal protection.',
    realWorldExample:
      'A fan uploads your song to YouTube without permission. You file a DMCA takedown notice. YouTube must remove the video within 24–72 hours to maintain safe harbor protection. The uploader can file a counter-notice, at which point YouTube may restore the video — and you must file a lawsuit within 10 business days to prevent reinstatement.',
    gameRelevance:
      'In the game, when someone uses your music without a license on a platform, you can file a DMCA takedown. This generates income (if you monetize via Content ID) or removes the infringement. Filing too many false takedowns has consequences — counter-notices and reputation damage.',
    legalBasis: '17 U.S.C. § 512; Cox Communications v. Sony Music Entertainment, 607 U.S. ___ (2026)',
  },
  {
    id: 'content_id',
    term: 'YouTube Content ID',
    category: 'platform',
    appliesTo: ['usa', 'dominican_republic', 'ecuador'],
    platforms: ['YouTube'],
    severity: 'critical',
    definition:
      'YouTube\'s automated copyright management system that scans every uploaded video against a database of registered audio fingerprints. When a match is found, rights holders can monetize, track, or block the content — globally or by country.',
    detail:
      'Content ID is how YouTube enforces copyright at scale — processing over 500 hours of video uploaded per minute. HOW IT WORKS: (1) A rights holder (artist, label, or distributor) submits a reference file (their sound recording) to YouTube. (2) YouTube generates an audio fingerprint and adds it to the Content ID database. (3) Every video uploaded to YouTube is automatically scanned against this database. (4) Matches generate a "Content ID claim." THREE POLICIES available to rights holders: MONETIZE — YouTube serves ads on the matching video and routes the ad revenue to the rights holder. The most common policy for music. TRACK — Simply monitors views and analytics. No monetization or removal. BLOCK — Removes the video from YouTube entirely (or restricts it in specific countries). GEOGRAPHY SPECIFICITY: Policies can be set differently by country. Rights holders can monetize in the US, track in the Dominican Republic, and block in Ecuador — all from the same dashboard. CONTENT ID CLAIM vs. COPYRIGHT STRIKE: A Content ID claim is a monetization mechanism — not a punishment. The uploader\'s channel is not penalized. A copyright strike (from a manual DMCA takedown) does penalize the channel. Three strikes = channel termination. ACCESSING CONTENT ID: Content ID access is available through most major distributors (DistroKid, TuneCore, CD Baby, DistroKid) or directly through YouTube\'s partner program.',
    realWorldExample:
      'Your song gets used in 5,000 fan videos on YouTube. With Content ID set to "Monetize," every ad served on those 5,000 videos generates revenue routed to your distributor. You collect royalties from millions of views without uploading a single video yourself.',
    gameRelevance:
      'Activating Content ID in the game creates a passive income stream from all fan-created content using your music on YouTube. Setting geography-specific policies lets you optimize revenue by region. A viral fan video campaign triggers a Content ID windfall event.',
    legalBasis: '17 U.S.C. § 512 (DMCA Safe Harbor); YouTube Terms of Service; YouTube Partner Program Agreement',
  },
  {
    id: 'meta_rights_manager',
    term: 'Meta Rights Manager',
    category: 'platform',
    appliesTo: ['usa', 'dominican_republic', 'ecuador'],
    platforms: ['Instagram', 'Facebook'],
    severity: 'important',
    definition:
      'Meta\'s content protection and rights management system for Facebook and Instagram — the equivalent of YouTube\'s Content ID. Rights holders submit audio fingerprints; Meta scans user-generated content and enforces set policies.',
    detail:
      'Meta Rights Manager operates across both Facebook and Instagram, covering: audio fingerprinting (matching your sound recording in any video), video fingerprinting (matching your music video content), image matching (for artwork/album covers), and text matching (for lyrics). FOUR POLICY OPTIONS: (1) Block — Remove content from the platform. (2) Monitor — Track usage without action. (3) Monetize — Serve ads and route revenue to rights holder (limited availability vs. YouTube\'s full monetization). (4) Restrict — Limit distribution (e.g., prevent sharing). INSTAGRAM LIVE MUTING: Meta\'s automated detection system mutes copyrighted music in Instagram Live streams in real-time. This affects artists who perform cover songs live on Instagram — the stream may be partially muted without warning. POST-STREAM DETECTION: Videos posted from Instagram Live are scanned after upload and may have music removed, volume reduced, or the video blocked entirely. BUSINESS ACCOUNT EXCLUSION: Meta\'s platform-level license for music covers PERSONAL accounts only. Business accounts, Creator accounts running paid promotions, or any branded/sponsored content REQUIRES a separate sync license — even if the music is licensed for personal use on the platform.',
    realWorldExample:
      'A business uses your song in an Instagram ad without a sync license. Meta\'s Rights Manager detects it via audio fingerprinting and flags the content. You can file a formal infringement claim to have it removed and potentially seek damages for the unauthorized commercial use.',
    gameRelevance:
      'Brands in the game will attempt to use your music without a sync license on Instagram/Facebook. Rights Manager detection triggers an income event (if you monetize) or a legal dispute (if they\'ve used it commercially). Managing your Rights Manager policy is a mid-game business mechanic.',
    legalBasis: '17 U.S.C. § 512 (DMCA); Meta Terms of Service; Meta-PRO licensing agreements',
  },
  {
    id: 'micro_sync_royalties',
    term: 'Micro-Sync Royalties',
    category: 'royalty',
    appliesTo: ['usa', 'dominican_republic', 'ecuador'],
    platforms: ['TikTok', 'Instagram', 'YouTube Shorts', 'Facebook', 'Snapchat'],
    severity: 'important',
    definition:
      'Royalties earned when your music is paired with user-generated short-form video content on social media platforms. Unlike traditional sync licensing (negotiated per placement), micro-sync royalties are collected at scale through platform licensing deals and distributor partnerships.',
    detail:
      'Micro-sync (or "micro-synchronization") is the fastest-growing royalty stream in music, driven by TikTok, Instagram Reels, and YouTube Shorts. TRADITIONAL SYNC vs. MICRO-SYNC: Traditional sync = one negotiated license per placement (e.g., $50K for a Netflix show). Micro-sync = millions of user-generated placements at tiny rates per placement. HOW IT WORKS: (1) Platform negotiates a blanket deal with labels/distributors covering UGC (user-generated content) use. (2) When a user adds your song to their video, the platform records the "sync" event. (3) Platform pays the label/distributor based on total volume of uses and views. (4) Distributor passes through your share (after their cut). TIKTOK RATE: Approximately $0.03 per 1,000 video creations + additional per-view royalties. Rates are not publicly standardized. INSTAGRAM/FACEBOOK: Meta pays micro-sync royalties through distributor deals — rates vary by deal terms and not publicly disclosed. COLLECTING: Your distributor collects micro-sync royalties on your behalf from platform deals. PERFORMANCE ROYALTIES: Separate from micro-sync, your PRO (ASCAP/BMI/SGACEDOM/SAYCE) also collects performance royalties from the same platforms via direct PRO licensing deals. SYNC ROYALTIES GROWTH: Sync licensing (including micro-sync) saw a 24.8% rise from 2021–2022 (RIAA) and now represents ~30% of all US music publishing royalties.',
    realWorldExample:
      'Your song is used in 2 million TikTok videos, each generating 10,000 average views. TikTok pays $0.03 per 1,000 creations = $60. But your ASCAP/BMI deal with TikTok also generates performance royalties from those same views — potentially adding hundreds more. Then Content ID on YouTube Short re-posts generates additional income. Micro-sync stacks.',
    gameRelevance:
      'Going viral on TikTok triggers a Micro-Sync Windfall event — the game calculates your total micro-sync earnings across all platforms simultaneously. Your distributor choice affects how much of the platform royalty passes through to you. Registering with SAYCE ensures your Ecuadorian micro-sync royalties are collected.',
    legalBasis: 'Platform licensing deals (TikTok-PRO, Meta-PRO agreements); ASCAP/BMI micro-sync licensing; 17 U.S.C. § 106 (sync right)',
  },
  {
    id: 'ugc_license',
    term: 'User Generated Content (UGC) License',
    category: 'ugc',
    appliesTo: ['usa', 'dominican_republic', 'ecuador'],
    platforms: ['TikTok', 'Instagram', 'YouTube', 'Facebook', 'Twitch', 'Snapchat'],
    severity: 'important',
    definition:
      'A license that permits personal, non-commercial use of copyrighted music in user-generated content on social media platforms. Negotiated between platforms and rights holders (labels, publishers, PROs) at the institutional level — not individually by users.',
    detail:
      'When you add a song to your TikTok or Instagram Reel, you are NOT personally licensing that music. The platform has already negotiated a UGC license with the rights holders on your behalf. KEY POINTS: PERSONAL USE ONLY — UGC licenses exclusively cover personal, non-commercial content. The moment a user creates content for advertising, brand promotion, or any commercial purpose, the platform-level UGC license does NOT apply — a separate sync license is required. BUSINESS ACCOUNT EXCLUSION — Business accounts on all major platforms are explicitly excluded from UGC license coverage. A restaurant using your song in an Instagram Story promoting their menu requires a sync license — even if individuals can freely use that song in personal Stories. WHAT UGC LICENSES DO NOT COVER: Live broadcast performances of cover songs, podcasts incorporating music, theatrical performances streamed online, and any content used in paid advertising. ISP SECONDARY LIABILITY (2026 update): Following Cox Communications v. Sony Music Entertainment (March 25, 2026), platforms that systematically enable UGC copyright infringement without enforcement may face secondary liability even with safe harbor claims — reinforcing why platforms aggressively enforce UGC licensing compliance.',
    realWorldExample:
      'A fan posts a TikTok using your song — this is covered by TikTok\'s UGC license. Your distributor collects a micro-sync royalty. A clothing brand uses the same song in a paid TikTok ad without a sync license — this is NOT covered by TikTok\'s UGC license. You can file a claim and demand payment.',
    gameRelevance:
      'The UGC license distinction is a key mechanic — fan videos are income, commercial use without a sync license is infringement. A brand deal mechanic unlocks when a company wants to use your song commercially — negotiate the sync fee or let your lawyer handle it.',
    legalBasis: 'Platform-PRO licensing agreements; 17 U.S.C. §§ 106, 512; Cox Communications v. Sony Music Entertainment (2026)',
  },
  {
    id: 'digital_service_provider',
    term: 'Digital Service Provider (DSP)',
    category: 'platform',
    appliesTo: ['usa', 'dominican_republic', 'ecuador'],
    platforms: ['Spotify', 'Apple Music', 'Amazon Music', 'TIDAL', 'Deezer', 'YouTube Music'],
    severity: 'critical',
    definition:
      'The legal term for music streaming platforms. DSPs must obtain TWO licenses for every song they stream: (1) a sound recording license (from the label/artist who owns the master) and (2) a musical composition license (from the publisher/songwriter — via The MLC for US mechanical rights, and via PROs for performance rights).',
    detail:
      'Every DSP must secure two distinct copyright licenses per song: SOUND RECORDING LICENSE — Covers the specific recorded version. Negotiated between the DSP and the master rights holder (label or self-releasing artist). DSPs typically pay labels/artists a per-stream royalty for this license, passed through via distributor. MUSICAL COMPOSITION LICENSE — Has TWO components: (a) Mechanical License: Covers reproduction/interactive streaming. In the US, DSPs obtain a blanket mechanical license from The MLC (created by the Music Modernization Act 2018). The MLC distributes mechanical royalties to registered songwriters/publishers. Spotify, Apple, Amazon, and others paid $424.38M in historical unmatched mechanical royalties to The MLC in 2023. (b) Performance License: Covers public performance of the composition. Licensed from PROs (ASCAP/BMI in the US, SGACEDOM in DR, SAYCE in Ecuador). DSPs pay PROs, who distribute to registered members. WHAT THIS MEANS FOR ARTISTS: Every stream generates at least three separate royalty payments: master recording royalty (via distributor), mechanical royalty (via The MLC/distributor), and performance royalty (via your PRO). Missing ANY registration means missing that royalty stream.',
    realWorldExample:
      'Your song streams 1 million times on Spotify: (1) Distributor pays you $3,000–$5,000 for master recording + mechanical. (2) ASCAP/BMI pays you ~$1,500 for composition performance royalties. (3) The MLC sends an additional check for unmatched mechanical royalties if your distributor missed any. Three checks for one million streams.',
    gameRelevance:
      'Understanding the DSP licensing stack unlocks the full royalty chain in the game. The tutorial has Denise explain: "Spotify owes you THREE checks. Are you registered to receive all three?" Each missing registration is income lost.',
    legalBasis: '17 U.S.C. §§ 106, 114, 115; Music Modernization Act (2018); MLC blanket license agreement',
  },
  {
    id: 'copyright_royalty_board',
    term: 'Copyright Royalty Board (CRB)',
    category: 'royalty',
    appliesTo: ['usa'],
    severity: 'important',
    definition:
      'A US federal administrative body that sets statutory royalty rates for digital music services every five years. The CRB\'s rates determine how much streaming platforms pay per song — including the mechanical royalty rates that directly impact songwriter income.',
    detail:
      'The Copyright Royalty Board (CRB) operates within the Library of Congress and consists of three Copyright Royalty Judges. Every five years, the CRB conducts rate proceedings to set the statutory mechanical royalty rates that DSPs must pay for interactive streaming and downloads. THE PHONORECORDS PROCEEDINGS: The CRB\'s "Phonorecords" proceedings set mechanical royalty rates. Phonorecords IV (for 2023–2027) is currently in effect and set a proposed settlement for songwriter mechanical royalty rates. THE WEBIV PROCEEDINGS: Sets rates for non-interactive webcasting (Pandora, internet radio) — affects SoundExchange royalties. PRACTICAL IMPACT FOR SONGWRITERS: The CRB rate determines how much The MLC collects from Spotify, Apple, Amazon, etc. for each stream. Songwriter advocacy groups (NSAI, NMPA) routinely lobby for higher CRB rates. DSPs often challenge CRB rate increases — when rates go up, streaming services may appeal. All parties (songwriters, publishers, DSPs) can participate in CRB rate proceedings. A proposed settlement has been reached for 2023–2027 songwriter mechanical royalty rates, pending CRB approval.',
    realWorldExample:
      'The CRB sets a mechanical rate of $0.00091 per stream in 2026. Spotify streams your song 10 million times — The MLC collects $9,100 in mechanical royalties from Spotify and distributes to you as the registered songwriter.',
    gameRelevance:
      'CRB rate changes are a mid-game economic event. When the CRB raises rates, your royalty income increases passively. When DSPs lobby against increases, a legal advocacy quest unlocks where you can support songwriters\' rights and boost your industry reputation.',
    legalBasis: '17 U.S.C. § 801 et seq.; Phonorecords IV (2023–2027 rate period)',
  },
  {
    id: 'ai_music_copyright_policy',
    term: 'AI-Generated Music Copyright & PRO Registration Policy (2025)',
    category: 'ai',
    appliesTo: ['usa'],
    platforms: ['Suno', 'Udio', 'Soundraw', 'All DSPs', 'All social platforms'],
    severity: 'critical',
    definition:
      'On October 28, 2025, ASCAP, BMI, and SOCAN jointly announced policies governing registration of AI-generated music. Partially AI-generated works (human + AI collaboration) ARE eligible for PRO registration and royalty collection. Fully AI-generated works (no human creative input) are NOT eligible.',
    detail:
      'The October 28, 2025 ASCAP-BMI-SOCAN joint AI policy announcement established the framework for AI music copyright in the US: PARTIALLY AI-GENERATED WORKS — Defined as musical works combining AI-generated elements with human authorship. Examples: using AI to generate a chord progression that a human then arranges, writes lyrics for, and records. These ARE eligible for ASCAP/BMI registration and royalty collection. The human author is considered the copyright owner. FULLY AI-GENERATED WORKS — Defined as compositions created entirely by AI tools with no human creative contribution beyond the prompt. These are NOT eligible for ASCAP/BMI registration. They have NO copyright protection under current US law (following the Thaler v. Perlmutter precedent — courts have held that copyright requires human authorship). TRAINING DATA POSITION: All three PROs stated that "AI technology companies ingesting and training models on copyrighted musical works without permission is not fair use, but theft." This position supports lawsuits filed by rights holders against AI companies using copyrighted music for training. AI IN GAME CONTEXT: Ecuador\'s Código Ingenios and the Dominican Republic\'s Law 65-00 have not yet issued formal AI music policies — international frameworks from WIPO are being developed. US law is most developed on this issue as of 2026.',
    realWorldExample:
      'You use Suno to generate a beat, then write original lyrics, record vocals, and arrange the production. This qualifies as a partially AI-generated work — register it with ASCAP/BMI. A song generated entirely by Suno with only a text prompt and no human creative modification cannot be registered or copyrighted.',
    gameRelevance:
      'In the late game, AI production tools unlock as equipment. Using them changes your copyright status — partially AI-assisted tracks can still be registered with your PRO, but fully AI-generated tracks cannot collect royalties. Denise flags AI contract clauses that attempt to classify all AI-assisted work as "fully AI" to strip your rights.',
    legalBasis: 'ASCAP/BMI/SOCAN Joint AI Registration Policy (October 28, 2025); Thaler v. Perlmutter (D.D.C. 2023); US Copyright Office AI Policy Guidance (2024)',
  },
  {
    id: 'twitch_music_licensing',
    term: 'Twitch / Live Streaming Music Licensing',
    category: 'platform',
    appliesTo: ['usa', 'dominican_republic', 'ecuador'],
    platforms: ['Twitch', 'Instagram Live', 'YouTube Live', 'Facebook Live'],
    severity: 'important',
    definition:
      'Live streaming platforms operate under different licensing conditions than pre-recorded content. Most platform-level music licenses DO NOT cover live performance of copyrighted music. Artists streaming live performances of cover songs face automated muting and potential DMCA strikes.',
    detail:
      'LIVE STREAMING IS A COPYRIGHT MINEFIELD: Unlike pre-recorded UGC content, live streaming creates unique licensing challenges. TWITCH\'s DMCA HISTORY: Twitch has faced massive DMCA enforcement waves (2020–2024) as rights holders demanded royalties for copyrighted music played during streams. Twitch lacks a comprehensive music license for live performances — streamers who play copyrighted background music risk: automatic audio muting of VODs (video on demand recordings), DMCA takedown notices from rights holders, and account suspension for repeat infringers. WHAT TWITCH DOES HAVE: Twitch licenses with labels for its "Soundtrack by Twitch" library — a curated catalog of music pre-cleared for streaming. Using this library avoids DMCA issues. INSTAGRAM LIVE MUTING: Meta\'s automated system detects copyrighted music during Instagram Live and mutes it in real-time. This can interrupt live performances of cover songs mid-stream. YOUTUBE LIVE: Same copyright rules as YouTube — a copyright claim on a live stream can result in stream termination. Artists performing original music they own are fully protected. SOLUTION FOR ARTISTS: For your own original music, you have full rights to perform it live on any platform. Cover songs require either (a) a platform with a cover song license (most don\'t have one for live) or (b) a pre-arranged license with the songwriter\'s publisher.',
    realWorldExample:
      'You perform a bachata cover on Instagram Live. Meta\'s automated system detects the copyrighted bachata composition mid-performance and mutes the audio. Your stream continues visually but silently — killing the performance. Performing original songs avoids this entirely.',
    gameRelevance:
      'Live streaming events in the game can be interrupted by automated DMCA muting if you attempt to perform cover songs without proper licensing. Performing only originals guarantees uninterrupted live streams and maximum reputation gain.',
    legalBasis: '17 U.S.C. §§ 106, 512 (DMCA); Platform-specific terms of service',
  },

  // ── DOMINICAN REPUBLIC DIGITAL TERMS ──────────────────────────────────────

  {
    id: 'dr_digital_copyright_framework',
    term: 'Dominican Republic Digital Copyright Framework',
    localTerm: 'Marco Digital de Derechos de Autor — Ley 65-00 y CAFTA-DR',
    category: 'platform',
    appliesTo: ['dominican_republic'],
    severity: 'critical',
    definition:
      'Law 65-00 covers copyright violations through ICT (information and communications technology) systems, including online and digital platforms. The 2006 CAFTA-DR implementation added anti-circumvention provisions equivalent to the US DMCA, and the Dominican Republic has actively prosecuted digital streaming piracy.',
    detail:
      'The Dominican Republic\'s digital copyright framework is built on Law 65-00 (2000) and strengthened by the CAFTA-DR implementation (2006) and ongoing enforcement: DIGITAL COVERAGE UNDER LAW 65-00: The law covers reproduction, distribution, and communication of protected works via digital means — including streaming, downloading, and online distribution. Copyright violation via digital platforms (piracy websites, illegal streaming services, unauthorized streaming) is expressly covered. CAFTA-DR ANTI-CIRCUMVENTION: Similar to DMCA Section 1201, the CAFTA-DR implementation prohibits circumventing digital rights management (DRM) systems protecting copyrighted content. Hacking streaming services, using VPNs to bypass geo-restrictions for piracy, or cracking DRM on digital music files is criminally prosecutable. OPERATION DOMO (2025): A landmark enforcement action dismantled a major streaming piracy network in the Dominican Republic. 30 prosecutors, 19 raids, six defendants arrested. The network illegally resold signals from streaming platforms (Netflix, cable TV) using advanced technology, operated internationally, accepted cryptocurrency, and generated approximately $10 million in illicit revenue. Coordinated with US Homeland Security Investigations (HSI). IPTV66 TAKEDOWN: Dominican law enforcement dismantled IPTV66, an illegal streaming service, following referral from Alliance for Creativity and Entertainment (ACE). INTERNATIONAL COOPERATION: The Dominican Republic actively cooperates with US HSI, ACE, and international IP enforcement agencies — reflecting the CAFTA-DR framework\'s commitment to aligned IP enforcement. SOCIAL MEDIA PLATFORMS IN DR: All major platforms (Spotify, YouTube, TikTok, Instagram) operate under their standard global terms in the Dominican Republic. Platform-level PRO licensing with SGACEDOM ensures Dominican artists collect performance royalties from streams in the DR.',
    realWorldExample:
      'A piracy network in Santo Domingo illegally streams your music through an unauthorized platform charging subscriptions. Operation Domo-style enforcement can shut it down — ONDA coordinates with prosecutors and international agencies. Your SGACEDOM registration is evidence of your rights when criminal charges are filed.',
    gameRelevance:
      'In Santo Domingo, a late-game event involves an illegal streaming operation using your music. You can report to ONDA, triggering a joint enforcement action that shuts down the piracy, restores your royalties, and generates a major reputation boost in the DR market.',
    legalBasis: 'Ley No. 65-00, Art. applicable digital provisions; CAFTA-DR Chapter 15 anti-circumvention; Decree 362-01',
  },
  {
    id: 'dr_sgacedom_digital_licensing',
    term: 'SGACEDOM Digital Licensing — Streaming & Social Media',
    localTerm: 'Licencias Digitales de SGACEDOM — Streaming y Redes Sociales',
    category: 'platform',
    appliesTo: ['dominican_republic'],
    severity: 'critical',
    definition:
      'SGACEDOM collects performance royalties from streaming services and social media platforms operating in the Dominican Republic through its CISAC and LATINAUTOR affiliations. Platforms serving Dominican users must hold valid SGACEDOM licenses.',
    detail:
      'SGACEDOM\'s role in digital licensing in the Dominican Republic: STREAMING PLATFORMS: Spotify, Apple Music, YouTube, and all other major streaming platforms operating in the Dominican Republic pay performance royalties to SGACEDOM under CISAC and LATINAUTOR reciprocal agreements. When your song streams in the Dominican Republic, SGACEDOM collects the performance royalty from the platform and distributes it to you as a registered member (if you\'re affiliated with ASCAP, BMI, or SAYCE, your home PRO forwards your share from SGACEDOM through reciprocal agreements). SOCIAL MEDIA: TikTok, Instagram/Meta, and YouTube have direct deals with SGACEDOM or pay through CISAC/LATINAUTOR framework, covering Dominican user activity. SGACEDOM MEMBERSHIP FOR DR ARTISTS: Registering directly with SGACEDOM (rather than relying on reciprocal agreements) provides faster, more direct royalty collection for Dominican Republic streams and performances. SGACEDOM also collects mechanical royalties — unlike US PROs which only collect performance royalties (mechanicals go to The MLC in the US). In the DR, SGACEDOM covers BOTH performance and mechanical royalties for its members. DIGITAL PUBLIC COMMUNICATION: Any website, app, or platform operating in the DR that makes music available to the public (streaming, download, even background music on a website) must obtain SGACEDOM authorization and pay applicable tariffs.',
    realWorldExample:
      'Your song gets 500,000 streams in the Dominican Republic on Spotify. Spotify pays SGACEDOM under its CISAC licensing agreement. SGACEDOM distributes the performance royalty to you as a registered member — or, if you\'re an ASCAP/BMI member, your US PRO receives it from SGACEDOM via reciprocal agreement and passes it to you quarterly.',
    gameRelevance:
      'Registering with SGACEDOM in Santo Domingo is mandatory to maximize Dominican Republic streaming income. Without SGACEDOM registration or a home PRO with a reciprocal agreement, your DR streaming royalties sit unclaimed.',
    legalBasis: 'Ley No. 65-00; SGACEDOM membership agreement; CISAC reciprocal agreements; LATINAUTOR framework',
  },
  {
    id: 'dr_anti_circumvention',
    term: 'Anti-Circumvention Law — Dominican Republic',
    localTerm: 'Medidas Tecnológicas de Protección — CAFTA-DR, Cap. 15',
    category: 'enforcement',
    appliesTo: ['dominican_republic'],
    severity: 'important',
    definition:
      'The CAFTA-DR implementation (Law No. 424-06, 2006) requires the Dominican Republic to prohibit circumvention of digital rights management (DRM) systems, parallel to the US DMCA Section 1201. Bypassing digital copy protection on music is criminally prosecutable.',
    detail:
      'Following CAFTA-DR Chapter 15, the Dominican Republic implemented anti-circumvention provisions covering: (1) Prohibition on circumventing technological protection measures (TPMs) that control access to copyrighted works — includes DRM on streaming services and digital downloads. (2) Prohibition on distributing tools designed to circumvent DRM. (3) ISP accountability provisions encouraging cooperation with rights holders in removing infringing content. PRACTICAL IMPACT: Using software or services to download DRM-protected Spotify tracks, crack Apple Music\'s FairPlay protection, or bypass streaming geo-restrictions for piracy purposes is illegal in the Dominican Republic under these provisions. ENFORCEMENT: ONDA oversees administrative enforcement. Criminal prosecution handled by the Procuraduría Especializada de Propiedad Intelectual (Specialized IP Prosecutor\'s Office). International cooperation with ACE, RIAA, and US HSI as demonstrated by Operation Domo (2025) and IPTV66 takedown.',
    realWorldExample:
      'A Santo Domingo-based website offers free downloads of DRM-protected Dominican and international music. ONDA reports this to the IP Prosecutor\'s Office. Combined with ACE referral, Dominican law enforcement raids the operation — prosecuted under both Law 65-00 and the CAFTA-DR anti-circumvention provisions.',
    gameRelevance:
      'An illegal download site uses your DR music catalog. Triggering enforcement via ONDA generates a joint prosecution event and royalty recovery — plus major reputation gain in the Santo Domingo market for standing up for artists\' rights.',
    legalBasis: 'Ley No. 424-06 (CAFTA-DR Implementation); CAFTA-DR Chapter 15; Ley No. 65-00 Art. 186–196',
  },

  // ── ECUADOR DIGITAL TERMS ─────────────────────────────────────────────────

  {
    id: 'ec_wipo_internet_treaties',
    term: 'WIPO Internet Treaties — Ecuador',
    localTerm: 'Tratados de Internet de la OMPI — Ecuador',
    category: 'international',
    appliesTo: ['ecuador'],
    platforms: ['Spotify', 'YouTube', 'TikTok', 'Instagram', 'Apple Music', 'All DSPs'],
    severity: 'critical',
    definition:
      'Ecuador has ratified both WIPO Internet Treaties — the WIPO Copyright Treaty (WCT) and the WIPO Performances and Phonograms Treaty (WPPT) — establishing the international digital copyright framework alongside the Código Ingenios 2016.',
    detail:
      'Ecuador\'s digital copyright framework for online platforms is grounded in two WIPO treaties: WIPO COPYRIGHT TREATY (WCT, 1996): Extends copyright protection to the digital environment. Creates the "making available right" — authors have the exclusive right to make their works available online, including streaming. Requires protection for technological protection measures (TPMs/DRM). Requires protection for rights management information (RMI). WIPO PERFORMANCES AND PHONOGRAMS TREATY (WPPT, 1996): Grants performers and phonogram producers the "making available right" for their recordings online. Protecting digital sound recordings in the same way as literary works online. IMPLEMENTATION IN ECUADOR: The Código Ingenios 2016 implements both WIPO treaties domestically. Article 100 of the Código Ingenios explicitly recognizes digital rights for authors, performers, and phonogram producers. SENADI enforces digital rights through its anti-piracy mandate. SAYCE, SARIME, and SOPROFON each have digital licensing mandates covering streaming and online platforms. PRACTICAL RESULT: All major streaming platforms (Spotify, Apple Music, YouTube, Amazon Music) that operate in Ecuador must comply with Ecuador\'s Código Ingenios digital provisions, the WCT and WPPT, and obtain licenses from SAYCE (compositions), SARIME (performances), and SOPROFON (phonograms) through the CISAC/LATINAUTOR reciprocal framework.',
    realWorldExample:
      'Spotify operates in Ecuador under its standard global terms, backed by licensing deals with SAYCE via CISAC. When your song streams in Ecuador, Spotify pays SAYCE under the CISAC agreement. SAYCE distributes to you if you\'re a member, or to your home PRO via reciprocal agreement.',
    gameRelevance:
      'Ecuador\'s WIPO treaty compliance means all global platforms pay royalties for Ecuadorian streams. Register with SAYCE to collect them. The triple-stack (SAYCE + SARIME + SOPROFON) ensures you collect ALL digital royalty streams available in Ecuador from every stream.',
    legalBasis: 'WIPO Copyright Treaty (1996); WIPO Performances and Phonograms Treaty (1996); Código Ingenios 2016, Art. 100; Ecuador WIPO membership',
  },
  {
    id: 'ec_sayce_digital_mandatory',
    term: 'SAYCE Mandatory Digital Licensing — Ecuador',
    localTerm: 'Licencia Digital Obligatoria de SAYCE — Plataformas Online y Redes Sociales',
    category: 'platform',
    appliesTo: ['ecuador'],
    severity: 'critical',
    definition:
      'Any digital platform, streaming service, website, or app operating in Ecuador that makes music publicly available must obtain SAYCE authorization. This extends the mandatory public event licensing requirement to the digital environment — platforms without a SAYCE license operating in Ecuador are in violation.',
    detail:
      'Ecuador\'s mandatory SAYCE licensing extends fully into the digital and social media space: STREAMING PLATFORMS: Spotify, Apple Music, YouTube, Amazon Music, Deezer, and all other streaming services operating in Ecuador must hold valid SAYCE licenses (and SARIME/SOPROFON licenses for neighboring rights) to legally distribute music in the country. These are obtained through CISAC and LATINAUTOR reciprocal agreements. SOCIAL MEDIA: TikTok, Instagram, Facebook, Twitter/X operating in Ecuador must hold SAYCE licenses covering performance rights for music used in user content. DIGITAL RADIO AND PODCASTS: Online radio stations and podcasts using music in Ecuador require SAYCE authorization and payment of minimum legal tariffs. WEBSITES AND APPS: Any commercial website or mobile app playing background music publicly in Ecuador — including retail websites, apps with audio features — requires a SAYCE license. SENADI ENFORCEMENT: SENADI has assumed anti-piracy competencies and actively monitors digital platforms for compliance. Non-compliant platforms operating in Ecuador can face administrative sanctions, injunctions, and criminal referrals. ORGANIC LAW ON COMMUNICATION (2019 amendment): Ecuador\'s broadcasting/communication law requires all broadcast entities (including digital broadcasters) to comply with intellectual property regulations — including mandatory SAYCE licensing.',
    realWorldExample:
      'A new Ecuadorian music streaming startup launches in Quito without obtaining SAYCE, SARIME, and SOPROFON licenses. SENADI issues an administrative order requiring the platform to cease operations or immediately obtain the required licenses and pay backdated tariffs. The startup must pay retroactive royalties to all rights holders for the unlicensed period.',
    gameRelevance:
      'In Quito, a mid-game event involves an unlicensed streaming app using your music. Filing with SENADI triggers an enforcement action, recovers your royalties, and awards a "Rights Defender" reputation badge that boosts your standing in the Ecuadorian market.',
    legalBasis: 'Código Ingenios 2016, Art. 103; Executive Decree No. 2280 (SAYCE); Ley Orgánica de Comunicación (amended 2019); WIPO Internet Treaties',
  },
  {
    id: 'ec_digital_piracy_enforcement',
    term: 'SENADI Digital Piracy Enforcement — Ecuador',
    localTerm: 'Combate a la Piratería Digital — SENADI',
    category: 'enforcement',
    appliesTo: ['ecuador'],
    severity: 'important',
    definition:
      'SENADI (Servicio Nacional de Derechos Intelectuales) has assumed expanded anti-piracy competencies under the Código Ingenios 2016, including jurisdiction over digital piracy, illegal streaming, and unauthorized online distribution of music in Ecuador.',
    detail:
      'SENADI\'s digital enforcement mandate: ADMINISTRATIVE POWERS: SENADI can issue administrative sanctions without going through the court system — faster enforcement than civil litigation. This includes ordering websites blocked, apps removed from stores, and services shut down. CRIMINAL REFERRALS: For commercial-scale digital piracy, SENADI refers cases to prosecutors for criminal proceedings under COIP Article 232 (1–3 years prison). ANTI-PIRACY OPERATIONS: SENADI coordinates with Ecuador\'s National Police and prosecutors for physical and digital anti-piracy operations. Website blocking: SENADI has authority to request ISPs block piracy websites operating in Ecuador. SOCIAL MEDIA TAKEDOWNS: SENADI can initiate takedown requests against social media accounts illegally distributing copyrighted Ecuadorian music. INDIGENOUS KNOWLEDGE PROTECTION: SENADI has a special mandate to protect traditional indigenous knowledge and cultural expressions — including traditional music — from unauthorized commercial use online. BUEN VIVIR DIGITAL: Ecuador\'s Código Ingenios also promotes open access to knowledge while protecting creator rights — striking a balance between anti-piracy enforcement and public access that is unique among the launch regions.',
    realWorldExample:
      'An illegal music download website based outside Ecuador offers free downloads of your registered SENADI works. SENADI requests Ecuadorian ISPs to block access to the site, files a complaint with international IP enforcement organizations, and refers the case to prosecutors if operators are identifiable.',
    gameRelevance:
      'SENADI is your enforcement ally in Ecuador. Filing piracy reports unlocks enforcement events that generate royalty recovery income and reputation boosts. Participating in SENADI\'s indigenous music protection initiative unlocks cultural quests in the Quito and Guayaquil regions.',
    legalBasis: 'Código Ingenios 2016; COIP Art. 232; Ley Orgánica de Comunicación; SENADI Resolution No. 045-2024-DG-SENADI',
  },
  {
    id: 'ec_organic_law_communication',
    term: 'Organic Law on Communication — Digital Broadcasting Rights',
    localTerm: 'Ley Orgánica de Comunicación — Derechos de Difusión Digital',
    category: 'platform',
    appliesTo: ['ecuador'],
    severity: 'informational',
    definition:
      'Ecuador\'s Organic Law on Communication (amended 2019) governs all broadcasting and media entities, including digital media, requiring compliance with intellectual property laws and establishing minimum percentages of Ecuadorian music content in broadcasting.',
    detail:
      'The Organic Law on Communication applies to digital broadcasting in Ecuador and contains provisions specifically relevant to musicians: ECUADORIAN MUSIC QUOTA: The law establishes mandatory minimums for Ecuadorian music content — broadcast entities (including digital radio) must dedicate a percentage of their programming to Ecuadorian national music. This creates a built-in promotional advantage for Ecuadorian artists on local platforms. COPYRIGHT COMPLIANCE REQUIREMENT: All communication entities (radio, TV, digital broadcasters, streaming aggregators based in Ecuador) must comply with SAYCE, SARIME, and SOPROFON licensing requirements as a condition of operation. CONTENT REGULATION: Digital content platforms operating in Ecuador are subject to Ecuadorian communication law, including requirements around responsible content standards. NATIONAL MUSIC PROMOTION: The law includes provisions for state promotion of Ecuadorian musical heritage — which benefits artists working in traditional genres (pasillo, sanjuanito, marimba, bomba afroecuatoriana) by requiring their inclusion in national media programming.',
    realWorldExample:
      'An Ecuadorian digital radio station must allocate a minimum percentage of airtime to Ecuadorian national music. Recording a pasillo or sanjuanito track in Quito means your music qualifies for this quota — increasing the likelihood of radio play without additional promotion.',
    gameRelevance:
      'Recording traditional Ecuadorian genres (pasillo, sanjuanito) in Quito or Guayaquil qualifies your music for the National Music Quota — generating automatic radio airplay passive income without a promotional campaign. Cultural prestige mechanic unique to Ecuador.',
    legalBasis: 'Ley Orgánica de Comunicación (as amended February 20, 2019); Código Ingenios 2016',
  },

  // ── INTERNATIONAL / CROSS-REGION DIGITAL TERMS ───────────────────────────

  {
    id: 'wipo_internet_treaties_global',
    term: 'WIPO Internet Treaties — Global Framework',
    localTerm: 'Tratados de Internet de la OMPI',
    category: 'international',
    appliesTo: ['usa', 'dominican_republic', 'ecuador'],
    severity: 'important',
    definition:
      'Two 1996 WIPO treaties that form the international digital copyright framework: the WIPO Copyright Treaty (WCT) and the WIPO Performances and Phonograms Treaty (WPPT). All three launch regions have ratified both treaties, creating a consistent baseline digital copyright framework across USA, Dominican Republic, and Ecuador.',
    detail:
      'All three launch regions are signatories to both WIPO Internet Treaties, creating a unified baseline: WCT KEY PROVISIONS: "Making available right" — exclusive right to authorize online distribution of works. Mandatory protection of technological protection measures (DRM). Mandatory protection of rights management information (RMI — artist name, title, ISRC codes embedded in digital files). WPPT KEY PROVISIONS: Same making available right extended to performers and phonogram producers. Performers\' rights for digital transmissions of their recorded performances. PRACTICAL CROSS-REGIONAL IMPACT: Because all three launch regions have ratified both treaties, the same core digital rights framework applies across the USA, Dominican Republic, and Ecuador. Artists registered in their home country can enforce their digital rights in all three countries through the treaty framework. ISRC CODES: International Standard Recording Codes uniquely identify sound recordings globally. Every track should have an ISRC — this is the global identifier used by streaming platforms, Content ID, Rights Manager, and all digital rights management systems to attribute plays to the correct rights holder. Free ISRC codes are provided by most distributors.',
    realWorldExample:
      'You\'re a Dominican artist registered with SGACEDOM. Your music is being illegally streamed in Ecuador. Ecuador\'s SENADI recognizes your rights under the WPPT and can enforce against the Ecuadorian pirate — because both countries ratified the same treaty.',
    gameRelevance:
      'The WIPO treaty framework enables cross-border enforcement events. As you expand into all three regions, your rights follow you automatically. The ISRC code registration tutorial unlocks the full global royalty tracking mechanic.',
    legalBasis: 'WIPO Copyright Treaty (1996); WIPO Performances and Phonograms Treaty (1996); Berne Convention',
  },
  {
    id: 'isrc_code',
    term: 'ISRC Code — International Standard Recording Code',
    category: 'platform',
    appliesTo: ['usa', 'dominican_republic', 'ecuador'],
    platforms: ['Spotify', 'Apple Music', 'YouTube', 'TikTok', 'All DSPs', 'Content ID', 'ASCAP', 'BMI', 'SGACEDOM', 'SAYCE', 'SoundExchange'],
    severity: 'critical',
    definition:
      'A unique 12-character alphanumeric code assigned to each sound recording. The global standard used by all streaming platforms, Content ID systems, PROs, and collecting societies to identify and track your specific recording — ensuring royalties are attributed to you and not misidentified.',
    detail:
      'ISRC codes are the backbone of global royalty tracking. WITHOUT AN ISRC: Your recording cannot be properly identified by Content ID, Rights Manager, or streaming platform tracking systems. Royalties may go to the wrong artist or sit as "unmatched" royalties in The MLC or PRO accounts. HOW TO GET ONE: Most distributors (DistroKid, TuneCore, CD Baby) automatically assign ISRCs when you upload. You can also register directly at isrc.ifpi.org. HOW IT WORKS: Your ISRC is embedded in the digital file metadata. Every stream, download, or content ID match references this code. PROs use ISRCs to match performances to your registration. SoundExchange uses ISRCs to track digital radio plays. The MLC uses ISRCs to match mechanical royalties to the correct songwriter. ISRC vs. UPC: ISRC identifies a specific recording (sound recording copyright). UPC (Universal Product Code) identifies the overall product/release (album or single). Both are needed for proper tracking. ACROSS ALL THREE REGIONS: ISRC codes are internationally recognized — the same code identifies your recording in the USA, Dominican Republic, and Ecuador. All collecting societies (ASCAP, BMI, SGACEDOM, SAYCE, SARIME, SOPROFON) reference ISRCs in their databases.',
    realWorldExample:
      'Your track "Besos de Bachata" gets 2 million streams on Spotify — but without an ISRC, Spotify can\'t match the stream to your registration. The mechanical royalties go to The MLC\'s unmatched pool. Register the ISRC and claim those royalties — The MLC holds them for 3 years before distribution.',
    gameRelevance:
      'ISRC codes are assigned automatically when you record a track in the game. Missing ISRC registration triggers a "Lost Royalties" event — your streaming income is reduced until you complete the registration quest. The MLC unmatched royalties quest recovers previously lost mechanical income.',
    legalBasis: 'ISO 3901:2019 (ISRC Standard); Music Modernization Act 2018; WIPO Copyright Treaty Art. 12; All platform terms of service',
  },
  {
    id: 'distributor_digital_gate',
    term: 'Digital Distributor — Gateway to All Platforms',
    category: 'platform',
    appliesTo: ['usa', 'dominican_republic', 'ecuador'],
    platforms: ['Spotify', 'Apple Music', 'Amazon Music', 'TIDAL', 'YouTube Music', 'TikTok', 'Instagram', 'All DSPs'],
    severity: 'critical',
    definition:
      'A digital distributor (DistroKid, TuneCore, CD Baby, Amuse, UnitedMasters, etc.) is the legal intermediary between an independent artist and all digital platforms. Distributors hold master delivery agreements with every major DSP, collect master recording royalties and mechanical royalties, and pass through earnings to artists — minus their fee.',
    detail:
      'Your digital distributor is your most important business relationship as an independent artist. WHAT DISTRIBUTORS DO: Deliver your music to 150+ streaming platforms globally (Spotify, Apple Music, YouTube Music, Amazon, Deezer, Tidal, TikTok, etc.). Assign ISRCs and UPCs. Collect master recording income from all platforms. Collect mechanical royalties from streaming (pass through from MLC blanket license). Provide Content ID for YouTube (most distributors). Pay you quarterly or monthly based on platform reports. BUSINESS MODELS: Annual subscription (DistroKid: $22.99/yr — keeps 0% of royalties). Per-release fee (TuneCore: $9.99/single, $29.99/album — keeps 0% of royalties). Revenue share (some distributors take 10–30% of royalties but charge no upfront fee). CROSS-REGION IMPORTANCE: In all three launch regions (USA, Dominican Republic, Ecuador), your distributor delivers your music to local Spotify, Apple Music, and YouTube licensing. Your distributor is NOT your PRO — they cover master recording income, not performance royalties. You need BOTH: a distributor (master + mechanical) AND a PRO (performance royalties). DISTROKID vs. TUNECORE vs. CD BABY: DistroKid is cheapest at $22.99/yr unlimited releases. TuneCore charges per release but keeps 0%. CD Baby charges per release and takes nothing long-term. All three offer Content ID. For emerging artists: DistroKid is most cost-effective at high release volume.',
    realWorldExample:
      'You sign up for DistroKid ($22.99/year). Upload your track. DistroKid delivers to Spotify, Apple Music, YouTube, TikTok, Amazon, Deezer — in the USA, Dominican Republic, Ecuador, and 160+ other markets simultaneously. Your ISRC is assigned automatically. Content ID activates for YouTube. You collect 100% of master + mechanical royalties monthly.',
    gameRelevance:
      'Choosing your distributor is an early-game decision with long-term consequences. DistroKid (cheapest, unlimited releases) vs. TuneCore (per-release, same royalty split) vs. CD Baby (one-time fee, small revenue share) — each affects your cash flow differently. Your distributor unlocks access to all digital platforms simultaneously across all three regions.',
    legalBasis: 'Distributor-DSP master delivery agreements; Music Modernization Act 2018 (MLC blanket license); Platform terms of service',
  },
];

// ─── Platform Enforcement Actions ─────────────────────────────────────────────

export const PLATFORM_ENFORCEMENT_ACTIONS: PlatformEnforcementAction[] = [
  {
    id: 'youtube_content_id_claim',
    name: 'YouTube Content ID Claim',
    platform: 'YouTube',
    jurisdiction: 'global',
    description:
      'Automated Content ID detection flags a video using your music. Rights holder can Monetize, Track, or Block.',
    triggerCondition: 'Your music is detected in any YouTube video',
    consequences: [
      'MONETIZE: Ad revenue redirected to you — most common policy',
      'TRACK: Usage tracked but no action — for analytics only',
      'BLOCK: Video removed from YouTube globally or in specific countries',
    ],
    artistResponse: [
      'Set your Content ID policy via distributor dashboard',
      'Appeal false claims against your own content immediately',
      'For commercial brand use without sync license: dispute + demand sync fee',
    ],
    gameEvent: 'content_id_claim_received',
  },
  {
    id: 'dmca_takedown_usa',
    name: 'DMCA Takedown Notice',
    platform: 'YouTube / Instagram / TikTok / Twitch / SoundCloud',
    jurisdiction: 'usa',
    description:
      'Manual legal takedown request under DMCA Section 512. Forces platform to remove infringing content within 24–72 hours to maintain safe harbor protection.',
    triggerCondition: 'Unauthorized use of your music by another user or brand',
    consequences: [
      'Platform removes infringing content within 24–72 hours',
      'Uploader receives copyright strike (YouTube) or account warning',
      'Three copyright strikes on YouTube = permanent channel termination',
    ],
    artistResponse: [
      'File takedown notice through your distributor or directly via platform tool',
      'Monitor for counter-notice within 10 business days',
      'If counter-notice filed, you must file lawsuit within 10 business days to prevent reinstatement',
      'For commercial misuse (brand without sync license): demand payment before or instead of takedown',
    ],
    gameEvent: 'dmca_takedown_filed',
  },
  {
    id: 'dr_onda_digital_report',
    name: 'ONDA Digital Copyright Complaint — Dominican Republic',
    platform: 'Any platform operating in Dominican Republic',
    jurisdiction: 'dominican_republic',
    description:
      'Filing a digital copyright complaint with ONDA triggers administrative investigation and potential criminal referral for commercial-scale infringement.',
    triggerCondition: 'Unauthorized online use of your music in the Dominican Republic',
    consequences: [
      'ONDA investigates and can issue administrative sanctions',
      'Criminal referral to Procuraduría Especializada de Propiedad Intelectual',
      'Potential coordination with US Homeland Security Investigations (HSI) for international cases',
      'Asset seizure in cases involving significant illicit profits (as in Operation Domo 2025)',
    ],
    artistResponse: [
      'Register ONDA copyright as primary evidence of ownership',
      'File complaint at onda.gob.do with ONDA registration number and evidence of infringement',
      'Coordinate with SGACEDOM for collective enforcement action',
      'For streaming piracy operations: request ONDA refer to ACE (Alliance for Creativity and Entertainment)',
    ],
    gameEvent: 'dr_digital_piracy_report',
  },
  {
    id: 'ec_senadi_digital_action',
    name: 'SENADI Digital Anti-Piracy Action — Ecuador',
    platform: 'Any platform operating in Ecuador',
    jurisdiction: 'ecuador',
    description:
      'SENADI can issue administrative orders blocking piracy sites, ordering platforms to remove infringing content, and referring commercial piracy for criminal prosecution under COIP Article 232.',
    triggerCondition: 'Unauthorized online distribution of your music in Ecuador',
    consequences: [
      'SENADI administrative order — no court proceeding needed',
      'ISP blocking of piracy websites upon SENADI request',
      'Criminal prosecution: 1–3 years prison for commercial infringement (COIP Art. 232)',
      'Civil damages: actual economic losses + injunction + seizure of infringing materials',
    ],
    artistResponse: [
      'Register with SENADI for official copyright record (derechosintelectuales.gob.ec)',
      'File complaint with SENADI including SENADI registration number and evidence',
      'Coordinate with SAYCE for collective enforcement action',
      'For indigenous music misappropriation: special SENADI indigenous knowledge protection track',
    ],
    gameEvent: 'ec_senadi_action_filed',
  },
  {
    id: 'instagram_live_muting',
    name: 'Instagram Live Auto-Muting',
    platform: 'Instagram',
    jurisdiction: 'global',
    description:
      'Meta\'s automated system detects copyrighted music during an Instagram Live stream and mutes the audio in real-time, without warning.',
    triggerCondition: 'Performing or playing copyrighted cover songs during Instagram Live',
    consequences: [
      'Stream audio muted instantly — viewers see video only',
      'VOD recording may have extended muted sections',
      'Repeated violations may result in live streaming restrictions',
    ],
    artistResponse: [
      'Perform ONLY your own original music during Instagram Live to avoid muting',
      'For cover songs: obtain permission from the publisher before streaming',
      'Announce to viewers if muting occurs to maintain audience connection',
      'Use Instagram\'s licensed in-app music library for background music only',
    ],
    gameEvent: 'instagram_live_muted',
  },
];

// ─── Platform Royalty Rate Card ───────────────────────────────────────────────

export const PLATFORM_ROYALTY_RATES: Record<string, {
  perStream: string;
  paymentFrequency: string;
  collectedBy: string[];
  notes: string;
}> = {
  spotify: {
    perStream: '$0.003–$0.005',
    paymentFrequency: 'Monthly to distributor; quarterly to PRO',
    collectedBy: ['Distributor (master + mechanical)', 'ASCAP/BMI/SGACEDOM/SAYCE (performance)', 'The MLC (US mechanical backup)'],
    notes: 'Rates vary by market, listener subscription tier, and country. Dominican Republic and Ecuador streams pay lower per-stream rates than US streams due to lower ad revenue markets.',
  },
  apple_music: {
    perStream: '$0.007–$0.010',
    paymentFrequency: 'Monthly to distributor; quarterly to PRO',
    collectedBy: ['Distributor (master + mechanical)', 'ASCAP/BMI/SGACEDOM/SAYCE (performance)'],
    notes: 'Highest consistent per-stream rate among major DSPs. No free tier — all listeners are paid subscribers, generating higher royalties per stream.',
  },
  amazon_music: {
    perStream: '$0.004–$0.012',
    paymentFrequency: 'Monthly to distributor; quarterly to PRO',
    collectedBy: ['Distributor (master + mechanical)', 'ASCAP/BMI/SGACEDOM/SAYCE (performance)'],
    notes: 'Unlimited (paid) tier pays significantly more than Prime Music (included with Amazon Prime). Alexa voice requests count as streams.',
  },
  tidal: {
    perStream: '$0.010–$0.013',
    paymentFrequency: 'Monthly to distributor; quarterly to PRO',
    collectedBy: ['Distributor (master + mechanical)', 'ASCAP/BMI/SGACEDOM/SAYCE (performance)'],
    notes: 'Highest per-stream rate of all major DSPs. Smaller audience but premium subscribers. HiFi quality tier generates maximum rates.',
  },
  youtube: {
    perStream: '$0.001–$0.008 per view',
    paymentFrequency: 'Monthly via AdSense/distributor; quarterly to PRO',
    collectedBy: ['Distributor (Content ID ad revenue + sound recording)', 'ASCAP/BMI/SGACEDOM/SAYCE (YouTube-PRO deal)'],
    notes: 'Enormous variation based on ad revenue, video length, viewer geography, and whether Content ID is active. Official music videos (via VEVO or YouTube Music) generate higher rates than Content ID claims on fan videos.',
  },
  tiktok: {
    perStream: '~$0.03 per 1,000 video creations; additional per-view royalties',
    paymentFrequency: 'Quarterly via distributor',
    collectedBy: ['Distributor (micro-sync royalties)', 'ASCAP/BMI/SGACEDOM/SAYCE (TikTok-PRO deal)'],
    notes: 'Royalties are calculated on video creations using your sound + views, not traditional streams. Viral TikTok sounds (10K+ videos) generate disproportionate income and career momentum. TikTok US availability subject to ongoing regulatory proceedings (2024–2026).',
  },
  pandora: {
    perStream: '~$0.002 per stream',
    paymentFrequency: 'Quarterly via SoundExchange',
    collectedBy: ['SoundExchange (sound recording: 45% artist + 50% master holder + 5% session musicians)', 'ASCAP/BMI (composition performance)'],
    notes: 'USA only. Statutory compulsory license — no individual negotiation. Register with SoundExchange to collect.',
  },
  siriusxm: {
    perStream: '$0.002–$0.005 per play',
    paymentFrequency: 'Quarterly via SoundExchange',
    collectedBy: ['SoundExchange (same split as Pandora)', 'ASCAP/BMI (composition performance)'],
    notes: 'USA only. 34M+ subscribers. Satellite + streaming. A feature on a major SiriusXM channel generates substantial SoundExchange income and career credibility.',
  },
};

// ─── Utility Functions ────────────────────────────────────────────────────────

export const getDigitalTermsByRegion = (region: LaunchRegion): DigitalLegalTerm[] =>
  DIGITAL_LEGAL_TERMS.filter((t) => t.appliesTo.includes(region));

export const getDigitalTermsByCategory = (
  category: DigitalLegalTerm['category']
): DigitalLegalTerm[] =>
  DIGITAL_LEGAL_TERMS.filter((t) => t.category === category);

export const getDigitalTermsByPlatform = (platformName: string): DigitalLegalTerm[] =>
  DIGITAL_LEGAL_TERMS.filter(
    (t) => t.platforms?.some((p) => p.toLowerCase().includes(platformName.toLowerCase()))
  );

export const getPlatformById = (id: string): DigitalPlatform | undefined =>
  DIGITAL_PLATFORMS[id];

export const getPlatformsByRegion = (region: LaunchRegion): DigitalPlatform[] =>
  Object.values(DIGITAL_PLATFORMS).filter((p) => p.availableInRegions.includes(region));

export const getEnforcementActionsByJurisdiction = (
  jurisdiction: LaunchRegion | 'global'
): PlatformEnforcementAction[] =>
  PLATFORM_ENFORCEMENT_ACTIONS.filter(
    (a) => a.jurisdiction === jurisdiction || a.jurisdiction === 'global'
  );

export const getRoyaltyRateForPlatform = (platformId: string) =>
  PLATFORM_ROYALTY_RATES[platformId] ?? null;

export const getAllDigitalPlatforms = (): DigitalPlatform[] =>
  Object.values(DIGITAL_PLATFORMS);

export const getCriticalDigitalTerms = (): DigitalLegalTerm[] =>
  DIGITAL_LEGAL_TERMS.filter((t) => t.severity === 'critical');
