import { ArtistPhase, LabelPhase } from '../types';

export interface PhaseInfo {
  id: ArtistPhase | LabelPhase;
  title: string;
  subtitle: string;
  description: string;
  emoji: string;
  color: string;
  unlockCondition: string;
  tips: string[];
  objectives: string[];
}

export const ARTIST_PHASES: Record<ArtistPhase, PhaseInfo> = {
  origins: {
    id: 'origins',
    title: 'The Grind',
    subtitle: 'Origins',
    emoji: '🧱',
    color: '#888',
    description:
      'You have $50, a dream, and nothing else. Get a day job. Save money. Write every spare moment. This is where legends are built — or broken.',
    unlockCondition: 'Starting phase',
    tips: [
      'Take shifts whenever you can — every dollar counts',
      'Practice your craft daily to build talent even without studio access',
      'Do hustle gigs on the side for extra cash',
      'You need at least $500 before moving forward',
    ],
    objectives: [
      'Save $500',
      'Build Talent stat to 20',
      'Complete 5 hustle gigs',
    ],
  },

  image: {
    id: 'image',
    title: 'Build the Brand',
    subtitle: 'Image Phase',
    emoji: '🎨',
    color: '#F5A623',
    description:
      'Before a single note drops, people need to know WHO you are. Your image IS your first impression. Choose your aesthetic, build your wardrobe, book a photoshoot, set up your socials. In 2025, the look travels before the music does.',
    unlockCondition: 'Save $500 + Talent 20',
    tips: [
      'Pick an aesthetic that feels authentic — trends change, identity doesn\'t',
      'A great photographer can make a $200 outfit look like $2,000',
      'Set up Instagram and TikTok BEFORE you release any music',
      'Consistency across platforms builds recognition',
      'Your image score needs to hit 60 before you can enter the studio',
    ],
    objectives: [
      'Choose your aesthetic',
      'Buy a wardrobe set ($30 minimum)',
      'Book and complete a photoshoot',
      'Set up at least 2 social media accounts',
      'Post 3 pieces of content',
      'Reach Image Score of 60',
    ],
  },

  pre_production: {
    id: 'pre_production',
    title: 'Pre-Production',
    subtitle: 'Writing & Beats',
    emoji: '✍️',
    color: '#6C63FF',
    description:
      'You have the look. Now you need the songs. Buy beats, write your lyrics, and prepare at least 3 tracks before you book studio time. Showing up to the studio unprepared wastes money you don\'t have.',
    unlockCondition: 'Image Score 60+',
    tips: [
      'Non-exclusive beats ($30-100) are fine to start',
      'Exclusive beats ($200-500) give you full ownership',
      'Write multiple versions of each song before recording',
      'Listen to the region\'s top artists — understand what resonates',
    ],
    objectives: [
      'Buy at least 2 beats',
      'Write 3 songs',
      'Save $300 for studio time',
    ],
  },

  recording: {
    id: 'recording',
    title: 'In the Studio',
    subtitle: 'Recording Phase',
    emoji: '🎙️',
    color: '#1DB954',
    description:
      'Studio time costs money — every hour you waste is money burned. Book your session, lay your tracks, and get them mixed and mastered. Quality matters. A bad-sounding record kills buzz before it starts.',
    unlockCondition: '3 songs written + $300',
    tips: [
      'Studio rates: $50-200/hour — budget for 3-4 hours per track',
      'Mix & master adds $100-500 per track but transforms quality',
      'Start with one single — don\'t dump a whole project at once',
      'Equipment you own (microphone, interface) reduces studio costs',
    ],
    objectives: [
      'Record your first track',
      'Mix & master it',
      'Reach quality score of 50+',
    ],
  },

  distribution: {
    id: 'distribution',
    title: 'Get It Out',
    subtitle: 'Distribution & Release',
    emoji: '📤',
    color: '#00D4FF',
    description:
      'The record is done. Now the world needs to hear it. Sign with a distributor, upload your track, and craft your release strategy. A single dropped with no strategy gets buried. A single dropped right can change your life.',
    unlockCondition: '1 recorded track (quality 50+)',
    tips: [
      'DistroKid ($20/yr) keeps 100% royalties — great for starters',
      'Release a single first — not an album',
      'Schedule your release 2-4 weeks out to pitch playlists',
      'Release on a Friday (industry standard)',
      'Pitch to Spotify playlists 7 days before release',
    ],
    objectives: [
      'Sign with a distributor',
      'Release your first single',
      'Pitch to 3 playlists',
    ],
  },

  promotion: {
    id: 'promotion',
    title: 'Promo Mode',
    subtitle: 'Promotion Phase',
    emoji: '📱',
    color: '#FF6B8A',
    description:
      'Great music doesn\'t promote itself. Post content daily. Make a music video. Reach out to blogs. Get on playlists. Perform anywhere that will have you. Build the fanbase track by track, post by post.',
    unlockCondition: 'First single released',
    tips: [
      'TikTok reaches new audiences fastest — use your song as a sound',
      'Music videos multiply your streams significantly',
      'Blogs and press features build credibility',
      'Consistency beats perfection — post daily even when engagement is low',
      'Collaborate with other artists to cross-pollinate fanbases',
    ],
    objectives: [
      'Reach 10,000 total streams',
      'Grow to 1,000 social media followers',
      'Get featured on 1 blog or playlist',
      'Release a music video',
    ],
  },

  touring: {
    id: 'touring',
    title: 'Hit the Road',
    subtitle: 'Touring Phase',
    emoji: '🚌',
    color: '#F5A623',
    description:
      'Streams build fans. Live shows build die-hards. Start at open mics and local venues, build your reputation, then scale up to city tours, regional runs, and eventually world tours. Merch and ticket sales become a major income stream here.',
    unlockCondition: '10K streams + 1K followers',
    tips: [
      'Open mic → Local venue → City shows → Regional tour → National → World',
      'Every step up requires more rep and more money for logistics',
      'Hire a tour manager when you\'re doing 10+ shows — you can\'t do it alone',
      'Merch at shows prints money — set up a merch table from day one',
      'Festival bookings unlock at significant rep levels',
    ],
    objectives: [
      'Perform at an Open Mic',
      'Complete your first Local show',
      'Set up a merch line',
      'Complete a City Tour (5 shows)',
      'Reach 1M total streams',
    ],
  },

  certified: {
    id: 'certified',
    title: 'Certified',
    subtitle: 'Certification Grind',
    emoji: '💎',
    color: '#00D4FF',
    description:
      'You\'re an established artist now. The grind doesn\'t stop — it escalates. Keep releasing, keep touring, keep building. Gold at 75M streams. Platinum at 150M. Multi-Platinum at 300M. Diamond at 1.5 BILLION. Win the game. Go Diamond.',
    unlockCondition: '1M total streams',
    tips: [
      '🥉 Gold: 75M streams (500K units)',
      '🥈 Platinum: 150M streams (1M units)',
      '💿 Multi-Platinum: 300M streams (2M units)',
      '💎 Diamond: 1.5B streams (10M units) ← WIN CONDITION',
      'Sync deals (TV/film/ads) can dramatically boost streams',
      'World tours multiply your reach exponentially',
      'Collaborations with global artists unlock cross-market streams',
    ],
    objectives: [
      'Go Gold (75M streams)',
      'Go Platinum (150M streams)',
      'Go Multi-Platinum (300M streams)',
      '💎 GO DIAMOND (1.5B streams) — YOU WIN',
    ],
  },
};

export const LABEL_PHASES: Record<LabelPhase, PhaseInfo> = {
  foundation: {
    id: 'foundation',
    title: 'Build the Label',
    subtitle: 'Foundation Phase',
    emoji: '🏗️',
    color: '#6C63FF',
    description:
      'Every major label started as an idea. Register your LLC, open a business bank account, design your brand. This is the infrastructure that everything else runs on.',
    unlockCondition: 'Starting phase',
    tips: [
      'LLC registration costs $50-500 depending on state',
      'A business bank account keeps finances clean for tax purposes',
      'Your label brand should reflect the music you want to sign',
      'Set up a distribution deal early — you\'ll need it when music is ready',
    ],
    objectives: [
      'Register your label as an LLC',
      'Open a business bank account',
      'Design your label brand',
      'Set up a distribution deal',
    ],
  },

  scouting: {
    id: 'scouting',
    title: 'Find the Talent',
    subtitle: 'Scouting Phase',
    emoji: '🔍',
    color: '#F5A623',
    description:
      'The best labels don\'t find artists — artists find them. But you\'re not there yet. Scour open mics, dig through SoundCloud, check Instagram Reels, hit local shows. You\'re looking for raw talent with a story to tell.',
    unlockCondition: 'Label foundation complete',
    tips: [
      'Check artists\' existing social following and engagement',
      'High talent + low following = opportunity',
      'High following + low talent = short-term play',
      'The best artists have both story AND sound',
      'Look for hunger — not just ability',
    ],
    objectives: [
      'Scout 5 potential artists',
      'Evaluate their talent, charisma, and following',
      'Shortlist 2 candidates',
    ],
  },

  signing: {
    id: 'signing',
    title: 'Lock In the Deal',
    subtitle: 'Signing Phase',
    emoji: '✍️',
    color: '#1DB954',
    description:
      'Contracts are everything. Be fair — the industry has a history of exploiting artists. A 50/50 split builds trust and loyalty. A 90/10 split in your favor might work once. Offer advances, be transparent, treat artists like partners.',
    unlockCondition: 'Shortlisted 1+ artist',
    tips: [
      '50/50 splits are standard and fair for indie labels',
      'Advances bind the artist to deliver — keep them reasonable',
      'Lock in 2-3 albums minimum so your investment has time to pay off',
      'Get a music attorney to review all contracts',
      'Signing a rival region\'s artist can backfire — read the room',
    ],
    objectives: [
      'Sign your first artist',
      'Negotiate fair contract terms',
      'Pay signing advance',
    ],
  },

  development: {
    id: 'development',
    title: 'Develop the Artist',
    subtitle: 'Artist Development',
    emoji: '🎨',
    color: '#FF6B8A',
    description:
      'Raw talent needs shaping. This is where labels earn their keep. Build the artist\'s image, get them vocal coaching, select the right beats, develop their social media presence. You\'re building a star — take it seriously.',
    unlockCondition: 'First artist signed',
    tips: [
      'Image development is non-negotiable — even talented artists need a visual identity',
      'Vocal coaching: 6-10 sessions minimum for significant improvement',
      'Beat selection should match the artist\'s region and genre',
      'Social media presence must be built BEFORE the release',
      'A developed artist performs better in every subsequent phase',
    ],
    objectives: [
      'Complete image development for your first artist',
      'Book 5 vocal coaching sessions',
      'Select 3 beats for recording',
      'Build artist to 5K social followers',
    ],
  },

  recording: {
    id: 'recording',
    title: 'Fund the Sessions',
    subtitle: 'Recording Phase',
    emoji: '🎙️',
    color: '#1DB954',
    description:
      'You\'re paying for studio time, production, mixing and mastering. Budget carefully — this is where labels lose money if artists aren\'t prepared. A well-developed artist in a well-funded session produces gold.',
    unlockCondition: 'Artist development complete',
    tips: [
      'Budget $500-2000 per track for a professional result',
      'Mixing and mastering is not optional — it\'s the difference between amateur and professional',
      'Start with a 2-track single package before committing to an album budget',
      'Track quality directly impacts stream performance',
    ],
    objectives: [
      'Record 2 tracks with your artist',
      'Mix & master both tracks',
      'Achieve quality score 65+',
    ],
  },

  marketing: {
    id: 'marketing',
    title: 'Make Noise',
    subtitle: 'Marketing Phase',
    emoji: '📢',
    color: '#FF4E00',
    description:
      'Distribution gets it on platforms. Marketing gets it heard. Music videos, playlist pitching, blog features, TikTok campaigns, radio — all of it. Every dollar spent on marketing returns in streams and reputation.',
    unlockCondition: 'First single recorded',
    tips: [
      'Music videos are the highest ROI marketing investment',
      'Playlist pitching services ($100-500) can land editorial playlists',
      'Blog features build SEO and credibility',
      'TikTok organic reach is still unmatched for music discovery',
      'Radio is expensive but transforms regional rep',
    ],
    objectives: [
      'Release artist\'s first single',
      'Fund a music video',
      'Pitch to 5 playlists',
      'Reach 100K streams on debut track',
    ],
  },

  touring: {
    id: 'touring',
    title: 'Book the Tour',
    subtitle: 'Tour Support',
    emoji: '🎪',
    color: '#F5A623',
    description:
      'Live performance builds real fans. You\'re funding and coordinating your artist\'s live rollout — from local venue bookings to supporting slots on major tours. Tour revenue starts coming back to the label here.',
    unlockCondition: '100K streams on first single',
    tips: [
      'Start with supporting slots to minimize upfront costs',
      'Tour merchandise is often more profitable than ticket revenue',
      'A strong live show creates social content that drives more streams',
      'Festivals are prestige bookings — negotiate aggressively',
    ],
    objectives: [
      'Book 5 live shows for your artist',
      'Set up artist merch line',
      'Complete a regional tour',
    ],
  },

  scaling: {
    id: 'scaling',
    title: 'Build the Empire',
    subtitle: 'Scaling Phase',
    emoji: '🏢',
    color: '#C9B037',
    description:
      'One successful artist funds the next one. Sign your second artist. Launch a publishing arm. Chase sync deals. The label is becoming a real business now — protect the culture, scale the revenue.',
    unlockCondition: 'First artist at 1M streams',
    tips: [
      'Sync deals (film, TV, ads) pay upfront fees and boost streams',
      'Publishing admin companies collect royalties you\'d otherwise miss',
      'A second artist diversifies revenue if the first one slows',
      'Label reputation now attracts better artists — use that leverage',
    ],
    objectives: [
      'Sign a second artist',
      'Land one sync deal',
      'Set up publishing admin',
      'Reach $100K total label revenue',
    ],
  },

  certified: {
    id: 'certified',
    title: 'Go Diamond',
    subtitle: 'Win Condition',
    emoji: '💎',
    color: '#00D4FF',
    description:
      'Everything you\'ve built comes down to this. One artist. 1.5 billion streams. Diamond certification. The pinnacle of the music industry. This is what you started the label for.',
    unlockCondition: 'Label fully scaled',
    tips: [
      '💎 Diamond = 1.5B streams on one track (10M units)',
      'World tours dramatically accelerate stream counts',
      'Multiple singles keep one artist in the cultural conversation',
      'Collaborations with Diamond-tier artists from other regions unlock massive crossover streams',
      'Sync deals on major films or TV shows can add 100M+ streams overnight',
    ],
    objectives: [
      'Get one artist to Gold (75M streams)',
      'Get one artist to Platinum (150M streams)',
      'Get one artist to Multi-Platinum (300M streams)',
      '💎 GET ONE ARTIST TO DIAMOND (1.5B streams) — YOU WIN',
    ],
  },
};

export const getArtistPhaseInfo = (phase: ArtistPhase): PhaseInfo => ARTIST_PHASES[phase];
export const getLabelPhaseInfo = (phase: LabelPhase): PhaseInfo => LABEL_PHASES[phase];
