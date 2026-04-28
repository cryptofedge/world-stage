import { Quest } from '../types';

export const QUESTS: Quest[] = [
  // ─── LAGOS ──────────────────────────────────────────────────────────────────
  {
    id: 'lagos_find_your_sound',
    title: 'Find Your Sound',
    description:
      'Mama Yetunde wants you to dig into your roots before chasing global fame. Record a track that tells YOUR story — not what you think people want to hear.',
    regionId: 'lagos',
    giverNpcId: 'npc_lagos_mentor',
    status: 'available',
    objectives: [
      { id: 'o1', description: 'Record your first original track', type: 'record_track', target: 1, current: 0, completed: false },
      { id: 'o2', description: 'Perform at Lekki Open Mic Night', type: 'perform', target: 1, current: 0, completed: false },
    ],
    rewards: {
      xp: 200,
      money: 1000,
      statBoosts: { talent: 5, charisma: 3 },
    },
  },
  {
    id: 'lagos_beat_session',
    title: 'Studio Session with DJ Eko',
    description:
      'DJ Eko has offered studio time. Make the most of it — record something that showcases your style over one of his beats.',
    regionId: 'lagos',
    giverNpcId: 'npc_lagos_producer',
    status: 'locked',
    objectives: [
      { id: 'o1', description: 'Record a track with DJ Eko\'s beat', type: 'record_track', target: 1, current: 0, completed: false },
      { id: 'o2', description: 'Earn 500 streams in Lagos', type: 'gain_rep', target: 10, current: 0, completed: false },
    ],
    rewards: {
      xp: 350,
      money: 3000,
      statBoosts: { production: 4, talent: 2 },
    },
  },
  {
    id: 'lagos_label_showcase',
    title: 'AfroGold Showcase',
    description:
      'Temi Adeyemi wants to see you perform for a label showcase. Fill the room and make an impression. This could change everything.',
    regionId: 'lagos',
    giverNpcId: 'npc_lagos_exec',
    status: 'locked',
    objectives: [
      { id: 'o1', description: 'Gain 30 reputation in Lagos', type: 'gain_rep', target: 30, current: 0, completed: false },
      { id: 'o2', description: 'Perform at Eko Hotel Stage', type: 'perform', target: 1, current: 0, completed: false },
      { id: 'o3', description: 'Have at least 2 tracks released', type: 'record_track', target: 2, current: 0, completed: false },
    ],
    rewards: {
      xp: 800,
      money: 15000,
      statBoosts: { business: 5, globalReach: 5 },
      unlockRegion: 'london',
    },
  },
  {
    id: 'lagos_collab_eko',
    title: 'The Collab',
    description:
      'DJ Eko wants to co-produce a proper single together. This could be your first viral hit.',
    regionId: 'lagos',
    giverNpcId: 'npc_lagos_producer',
    status: 'locked',
    objectives: [
      { id: 'o1', description: 'Co-produce a track with DJ Eko', type: 'record_track', target: 1, current: 0, completed: false },
      { id: 'o2', description: 'Reach 10,000 streams', type: 'gain_rep', target: 50, current: 0, completed: false },
    ],
    rewards: {
      xp: 600,
      money: 8000,
      statBoosts: { talent: 4, globalReach: 8 },
    },
  },

  // ─── LONDON ─────────────────────────────────────────────────────────────────
  {
    id: 'london_ends_showcase',
    title: 'Prove Yourself to the Ends',
    description:
      'Skepta Jr. wants to see you perform at The Ends Yard. No backing tracks, no gloss. Just you and the crowd.',
    regionId: 'london',
    giverNpcId: 'npc_london_producer',
    status: 'locked',
    objectives: [
      { id: 'o1', description: 'Travel to London', type: 'travel', target: 1, current: 0, completed: false },
      { id: 'o2', description: 'Perform at The Ends Yard', type: 'perform', target: 1, current: 0, completed: false },
    ],
    rewards: {
      xp: 400,
      money: 2000,
      statBoosts: { charisma: 5, globalReach: 3 },
    },
  },
  {
    id: 'london_press_feature',
    title: 'The Buzz Feature',
    description:
      'Zoe Clarke will write a feature on you — if you can give her a story worth telling. Record something meaningful and sit down for an interview.',
    regionId: 'london',
    giverNpcId: 'npc_london_journalist',
    status: 'locked',
    objectives: [
      { id: 'o1', description: 'Release a track in London', type: 'record_track', target: 1, current: 0, completed: false },
      { id: 'o2', description: 'Meet with Zoe for an interview', type: 'meet_npc', target: 1, current: 0, completed: false },
    ],
    rewards: {
      xp: 700,
      money: 0,
      statBoosts: { globalReach: 12, charisma: 3 },
    },
  },

  // ─── SEOUL ──────────────────────────────────────────────────────────────────
  {
    id: 'seoul_idol_training',
    title: 'The HanWave Method',
    description:
      'Park Jae-won offers you a spot in HanWave\'s 3-week intensive training programme. Gruelling — but the stat boosts are real.',
    regionId: 'seoul',
    giverNpcId: 'npc_seoul_exec',
    status: 'locked',
    objectives: [
      { id: 'o1', description: 'Complete vocal training (3 sessions)', type: 'perform', target: 3, current: 0, completed: false },
      { id: 'o2', description: 'Complete performance workshop', type: 'perform', target: 1, current: 0, completed: false },
    ],
    rewards: {
      xp: 1000,
      money: 0,
      statBoosts: { talent: 8, charisma: 6, production: 4 },
    },
  },
  {
    id: 'seoul_label_deal',
    title: 'HanWave Contract',
    description:
      'Park Jae-won is ready to offer you a contract with HanWave Entertainment. Read carefully — label deals cut both ways.',
    regionId: 'seoul',
    giverNpcId: 'npc_seoul_exec',
    status: 'locked',
    objectives: [
      { id: 'o1', description: 'Gain 70 reputation in Seoul', type: 'gain_rep', target: 70, current: 0, completed: false },
      { id: 'o2', description: 'Release 2 tracks in Seoul', type: 'record_track', target: 2, current: 0, completed: false },
      { id: 'o3', description: 'Earn ₩10,000,000 (~$8,000)', type: 'earn_money', target: 8000, current: 0, completed: false },
    ],
    rewards: {
      xp: 2000,
      money: 50000,
      statBoosts: { business: 10, globalReach: 20 },
      unlockRegion: 'tokyo',
    },
  },
];

export const getQuestById = (id: string): Quest | undefined =>
  QUESTS.find((q) => q.id === id);

export const getQuestsByRegion = (regionId: string): Quest[] =>
  QUESTS.filter((q) => q.regionId === regionId);

export const getAvailableQuests = (regionId: string, completedQuestIds: string[]): Quest[] =>
  QUESTS.filter(
    (q) => q.regionId === regionId && q.status === 'available' && !completedQuestIds.includes(q.id)
  );
