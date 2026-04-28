import { NPC } from '../types';

export const NPCS: NPC[] = [
  // ─── LAGOS ──────────────────────────────────────────────────────────────────
  {
    id: 'npc_lagos_producer',
    name: 'DJ Eko',
    role: 'Producer',
    regionId: 'lagos',
    description: 'A legendary beat-maker from Surulere. His drums hit different — he\'s produced for the biggest acts in West Africa and is always hunting fresh talent.',
    affinity: 0,
    dialogues: [
      { id: 'd1', trigger: 'first_meet', text: 'So you\'re the new one making noise? I\'ve heard a few bars. Not bad... not great. Come back when you\'ve got something real.', responses: [
        { text: 'I\'ll show you what I\'ve got.', effect: { affinityChange: 5 } },
        { text: 'I\'m already the real deal.', effect: { affinityChange: -5 } },
      ]},
      { id: 'd2', trigger: 'high_affinity', text: 'You know what? You\'ve grown. Let\'s cook something together. My studio, tomorrow night.', responses: [
        { text: 'Say less.', effect: { affinityChange: 10, unlockQuest: 'lagos_collab_eko' } },
      ]},
    ],
    offersQuests: ['lagos_beat_session', 'lagos_collab_eko'],
  },
  {
    id: 'npc_lagos_exec',
    name: 'Temi Adeyemi',
    role: 'Label Executive',
    regionId: 'lagos',
    description: 'Head of A&R at AfroGold Records — the most powerful indie label in West Africa. She signs artists based on potential AND business sense.',
    affinity: 0,
    dialogues: [
      { id: 'd1', trigger: 'first_meet', text: 'I sign artists, not egos. If you can\'t fill a room in Lagos, I\'m not interested. Prove the streets believe in you first.', responses: [
        { text: 'Fair enough. I\'ll earn it.', effect: { affinityChange: 8 } },
        { text: 'The streets already know me.', effect: { affinityChange: -3 } },
      ]},
    ],
    offersQuests: ['lagos_label_showcase'],
  },
  {
    id: 'npc_lagos_mentor',
    name: 'Mama Yetunde',
    role: 'Mentor',
    regionId: 'lagos',
    description: 'A retired highlife legend. She\'s seen every generation of Nigerian music rise and fall. Her wisdom is invaluable if you\'re willing to listen.',
    affinity: 10,
    dialogues: [
      { id: 'd1', trigger: 'first_meet', text: 'Every great artist has a song that tells their truth. What is yours? Come, sit down. Tell me where you\'re from.', responses: [
        { text: 'I want to share my story with the world.', effect: { affinityChange: 15, statChange: { talent: 3 } } },
        { text: 'I want to be famous.', effect: { affinityChange: -5 } },
      ]},
    ],
    offersQuests: ['lagos_find_your_sound'],
  },

  // ─── SEOUL ──────────────────────────────────────────────────────────────────
  {
    id: 'npc_seoul_exec',
    name: 'Park Jae-won',
    role: 'Label Executive',
    regionId: 'seoul',
    description: 'CEO of HanWave Entertainment, one of Seoul\'s Big Three agencies. Precise, calculated, and obsessed with global market potential.',
    affinity: 0,
    dialogues: [
      { id: 'd1', trigger: 'first_meet', text: 'Our system trains artists for years before debut. You think you can shortcut that? Impress me with your performance discipline first.', responses: [
        { text: 'I\'m ready to work harder than anyone.', effect: { affinityChange: 10 } },
        { text: 'I\'ve already paid my dues elsewhere.', effect: { affinityChange: 3 } },
      ]},
    ],
    offersQuests: ['seoul_label_deal', 'seoul_idol_training'],
  },
  {
    id: 'npc_seoul_collab',
    name: 'YUNA',
    role: 'Collaborator',
    regionId: 'seoul',
    description: 'A rising K-Pop soloist with a huge fanbase. Collaborating with her could open the Asian market — but she\'s selective about who she works with.',
    affinity: 0,
    dialogues: [
      { id: 'd1', trigger: 'first_meet', text: 'My fans are my family. I only collaborate with artists who respect that relationship. Show me you understand what loyalty means.', responses: [
        { text: 'I respect your relationship with your fans deeply.', effect: { affinityChange: 12 } },
      ]},
    ],
    offersQuests: ['seoul_crossover_collab'],
  },

  // ─── LONDON ─────────────────────────────────────────────────────────────────
  {
    id: 'npc_london_producer',
    name: 'Skepta Jr.',
    role: 'Producer',
    regionId: 'london',
    description: 'A Grime architect from North London. His beats have launched careers. He respects authenticity over everything — if you\'re not from the ends, you\'d better act right.',
    affinity: 0,
    dialogues: [
      { id: 'd1', trigger: 'first_meet', text: 'Long ting. Another one trying to use London for clout. What have you actually got to say though? Road don\'t care about your CV.', responses: [
        { text: 'I\'m here to learn and contribute, not just take.', effect: { affinityChange: 10 } },
        { text: 'My music speaks for itself.', effect: { affinityChange: 5 } },
      ]},
    ],
    offersQuests: ['london_grime_session', 'london_ends_showcase'],
  },
  {
    id: 'npc_london_journalist',
    name: 'Zoe Clarke',
    role: 'Journalist',
    regionId: 'london',
    description: 'Music Editor at The Buzz UK — the most read music publication in Britain. A glowing review from Zoe can launch a career. A bad one can end it.',
    affinity: 0,
    dialogues: [
      { id: 'd1', trigger: 'first_meet', text: 'I write about artists who have something to say. Not just sounds — stories. Give me a reason to write about you.', responses: [
        { text: 'I\'m trying to bridge cultures through music.', effect: { affinityChange: 15 } },
        { text: 'I\'ve got the biggest stream numbers in my region.', effect: { affinityChange: -5 } },
      ]},
    ],
    offersQuests: ['london_press_feature'],
  },

  // ─── ATLANTA ────────────────────────────────────────────────────────────────
  {
    id: 'npc_atlanta_exec',
    name: 'Marcus "Trap Lord" Williams',
    role: 'Label Executive',
    regionId: 'atlanta',
    description: 'Founder of BrickSquare Records. He built his empire from nothing and respects artists who carry that same energy. Money talks, but so does the culture.',
    affinity: 0,
    dialogues: [
      { id: 'd1', trigger: 'first_meet', text: 'ATL don\'t play. This city will make you or eat you. I\'ve seen both happen overnight. What makes you different?', responses: [
        { text: 'I bring a global sound that Atlanta hasn\'t heard yet.', effect: { affinityChange: 12 } },
        { text: 'I outwork everybody in the room.', effect: { affinityChange: 8 } },
      ]},
    ],
    offersQuests: ['atl_feature_deal', 'atl_studio_grind'],
  },

  // ─── SÃO PAULO ──────────────────────────────────────────────────────────────
  {
    id: 'npc_sp_producer',
    name: 'MC Beija-Flor',
    role: 'Producer',
    regionId: 'sao_paulo',
    description: 'A Baile Funk legend from Vila Isabel. He lives and breathes the favela sound — if you can earn his respect, the São Paulo streets will embrace you.',
    affinity: 0,
    dialogues: [
      { id: 'd1', trigger: 'first_meet', text: 'Ei, gringo. Você sabe o que é o funk de verdade? Dance with us first. Then we talk music.', responses: [
        { text: 'I\'m here to learn, not just collaborate.', effect: { affinityChange: 15 } },
        { text: 'I\'ve been studying Brazilian music for years.', effect: { affinityChange: 8 } },
      ]},
    ],
    offersQuests: ['sp_baile_night', 'sp_funk_collab'],
  },
];

export const getNpcById = (id: string): NPC | undefined =>
  NPCS.find((n) => n.id === id);

export const getNpcsByRegion = (regionId: string): NPC[] =>
  NPCS.filter((n) => n.regionId === regionId);
