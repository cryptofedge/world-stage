import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  Player, PlayerStats, Track, Equipment, Contract,
  WardrobeItem, ArtistPhase, SocialPlatform, ArtistAesthetic,
  CERT_THRESHOLDS, CertificationLevel,
} from '../types';

interface PlayerState {
  data: Player | null;
}

const initialState: PlayerState = { data: null };

const DEFAULT_IMAGE_PROFILE = {
  completed: false,
  aesthetic: null,
  wardrobeScore: 0,
  photoshootDone: false,
  pressPhotoUrl: null,
  socialSetup: false,
  brandColors: [],
  stylistHired: false,
  imageScore: 0,
};

function recalcImageScore(player: Player): number {
  let score = 0;
  score += Math.min(30, player.inventory.wardrobeItems.reduce((s, w) => s + w.imageBonus, 0));
  score += player.imageProfile.photoshootDone ? 20 : 0;
  score += Math.min(20, player.socialAccounts.length * 10);
  score += player.imageProfile.aesthetic ? 10 : 0;
  score += Math.min(20, player.stats.image);
  return Math.min(100, score);
}

function getCertification(streams: number): CertificationLevel {
  if (streams >= CERT_THRESHOLDS.diamond) return 'diamond';
  if (streams >= CERT_THRESHOLDS.multi_platinum) return 'multi_platinum';
  if (streams >= CERT_THRESHOLDS.platinum) return 'platinum';
  if (streams >= CERT_THRESHOLDS.gold) return 'gold';
  return 'none';
}

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    createPlayer: (state, action: PayloadAction<{
      name: string;
      artistName: string;
      careerPath: import('../types').CareerPath;
    }>) => {
      const { name, artistName, careerPath } = action.payload;
      const startingMoney = careerPath === 'label' ? 500 : 50;
      state.data = {
        id: Date.now().toString(),
        name,
        artistName,
        careerPath,
        artistPhase: 'origins',
        level: 1,
        xp: 0,
        xpToNextLevel: 500,
        stats: {
          talent: 10, charisma: 10, business: 5,
          production: 5, globalReach: 0, hustle: 5, image: 0,
        },
        currentRegionId: 'lagos',
        inventory: { equipment: [], contracts: [], beats: [], wardrobeItems: [], merch: [] },
        reputation: { lagos: 0 },
        relationships: [],
        discography: [],
        achievements: [],
        certifications: [],
        money: startingMoney,
        totalStreams: 0,
        socialAccounts: [],
        imageProfile: DEFAULT_IMAGE_PROFILE,
        activeJob: null,
        energy: 100,
        createdAt: Date.now(),
      };
    },

    gainXP: (state, action: PayloadAction<number>) => {
      if (!state.data) return;
      state.data.xp += action.payload;
      while (state.data.xp >= state.data.xpToNextLevel) {
        state.data.xp -= state.data.xpToNextLevel;
        state.data.level += 1;
        state.data.xpToNextLevel = Math.floor(state.data.xpToNextLevel * 1.4);
      }
    },

    updateStats: (state, action: PayloadAction<Partial<PlayerStats>>) => {
      if (!state.data) return;
      Object.entries(action.payload).forEach(([key, value]) => {
        const stat = key as keyof PlayerStats;
        state.data!.stats[stat] = Math.min(100, Math.max(0, state.data!.stats[stat] + (value ?? 0)));
      });
      if (state.data) {
        state.data.imageProfile.imageScore = recalcImageScore(state.data);
      }
    },

    gainMoney: (state, action: PayloadAction<number>) => {
      if (!state.data) return;
      state.data.money = Math.max(0, state.data.money + action.payload);
    },

    updateReputation: (state, action: PayloadAction<{ regionId: string; amount: number }>) => {
      if (!state.data) return;
      const { regionId, amount } = action.payload;
      const current = state.data.reputation[regionId] ?? 0;
      state.data.reputation[regionId] = Math.min(100, Math.max(0, current + amount));
    },

    travelToRegion: (state, action: PayloadAction<string>) => {
      if (!state.data) return;
      state.data.currentRegionId = action.payload;
      if (!(action.payload in state.data.reputation)) {
        state.data.reputation[action.payload] = 0;
      }
    },

    // ── Image phase actions ──────────────────────────────────────────────────

    purchaseWardrobeItem: (state, action: PayloadAction<WardrobeItem>) => {
      if (!state.data) return;
      state.data.inventory.wardrobeItems.push(action.payload);
      state.data.imageProfile.wardrobeScore = Math.min(
        100,
        state.data.imageProfile.wardrobe