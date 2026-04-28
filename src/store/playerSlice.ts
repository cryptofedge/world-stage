import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Player, PlayerStats, Track, Equipment, Contract, Quest } from '../types';

interface PlayerState {
  data: Player | null;
}

const initialState: PlayerState = {
  data: null,
};

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    createPlayer: (state, action: PayloadAction<{ name: string; artistName: string }>) => {
      state.data = {
        id: Date.now().toString(),
        name: action.payload.name,
        artistName: action.payload.artistName,
        level: 1,
        xp: 0,
        xpToNextLevel: 500,
        stats: {
          talent: 10,
          charisma: 10,
          business: 5,
          production: 5,
          globalReach: 0,
        },
        currentRegionId: 'lagos',
        inventory: { equipment: [], contracts: [], beats: [] },
        reputation: { lagos: 0 },
        relationships: [],
        discography: [],
        achievements: [],
        money: 500,
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
        state.data!.stats[stat] = Math.min(100, Math.max(0, state.data!.stats[stat] + value));
      });
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

    releaseTrack: (state, action: PayloadAction<Track>) => {
      if (!state.data) return;
      state.data.discography.push(action.payload);
    },

    addEquipment: (state, action: PayloadAction<Equipment>) => {
      if (!state.data) return;
      state.data.inventory.equipment.push(action.payload);
    },

    signContract: (state, action: PayloadAction<Contract>) => {
      if (!state.data) return;
      state.data.inventory.contracts.push({ ...action.payload, signed: true });
      state.data.money += action.payload.advanceMoney;
    },

    updateNpcAffinity: (
      state,
      action: PayloadAction<{ npcId: string; change: number }>
    ) => {
      if (!state.data) return;
      const rel = state.data.relationships.find((r) => r.npcId === action.payload.npcId);
      if (rel) {
        rel.affinity = Math.min(100, Math.max(-100, rel.affinity + action.payload.change));
        rel.status = getRelationshipStatus(rel.affinity);
      } else {
        const newAffinity = Math.min(100, Math.max(-100, action.payload.change));
        state.data.relationships.push({
          npcId: action.payload.npcId,
          affinity: newAffinity,
          status: getRelationshipStatus(newAffinity),
          history: [],
        });
      }
    },

    unlockAchievement: (state, action: PayloadAction<string>) => {
      if (!state.data) return;
      if (!state.data.achievements.includes(action.payload)) {
        state.data.achievements.push(action.payload);
      }
    },
  },
});

function getRelationshipStatus(affinity: number) {
  if (affinity <= -50) return 'rival';
  if (affinity < 10) return 'stranger';
  if (affinity < 30) return 'acquaintance';
  if (affinity < 60) return 'ally';
  if (affinity < 80) return 'collaborator';
  return 'friend';
}

export const {
  createPlayer,
  gainXP,
  updateStats,
  gainMoney,
  updateReputation,
  travelToRegion,
  releaseTrack,
  addEquipment,
  signContract,
  updateNpcAffinity,
  unlockAchievement,
} = playerSlice.actions;

export default playerSlice.reducer;
