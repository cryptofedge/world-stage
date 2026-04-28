import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GamePhase, GameSettings, Quest } from '../types';

interface GameSliceState {
  phase: GamePhase;
  currentRegionId: string;
  unlockedRegions: string[];
  activeQuests: Quest[];
  completedQuests: string[];
  gameTime: number; // in-game days
  settings: GameSettings;
}

const initialState: GameSliceState = {
  phase: 'main_menu',
  currentRegionId: 'lagos',
  unlockedRegions: ['lagos'],
  activeQuests: [],
  completedQuests: [],
  gameTime: 0,
  settings: {
    musicVolume: 0.8,
    sfxVolume: 0.9,
    notifications: true,
    language: 'en',
  },
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setPhase: (state, action: PayloadAction<GamePhase>) => {
      state.phase = action.payload;
    },

    startNewGame: (state) => {
      state.phase = 'character_creation';
      state.currentRegionId = 'lagos';
      state.unlockedRegions = ['lagos'];
      state.activeQuests = [];
      state.completedQuests = [];
      state.gameTime = 0;
    },

    unlockRegion: (state, action: PayloadAction<string>) => {
      if (!state.unlockedRegions.includes(action.payload)) {
        state.unlockedRegions.push(action.payload);
      }
    },

    travelToRegion: (state, action: PayloadAction<string>) => {
      state.currentRegionId = action.payload;
      state.gameTime += 1; // travel costs 1 day
    },

    startQuest: (state, action: PayloadAction<Quest>) => {
      const exists = state.activeQuests.find((q) => q.id === action.payload.id);
      if (!exists) {
        state.activeQuests.push({ ...action.payload, status: 'active' });
      }
    },

    updateQuestObjective: (
      state,
      action: PayloadAction<{ questId: string; objectiveId: string; progress: number }>
    ) => {
      const quest = state.activeQuests.find((q) => q.id === action.payload.questId);
      if (!quest) return;
      const obj = quest.objectives.find((o) => o.id === action.payload.objectiveId);
      if (!obj) return;
      obj.current = Math.min(obj.target, obj.current + action.payload.progress);
      obj.completed = obj.current >= obj.target;
    },

    completeQuest: (state, action: PayloadAction<string>) => {
      state.activeQuests = state.activeQuests.filter((q) => q.id !== action.payload);
      if (!state.completedQuests.includes(action.payload)) {
        state.completedQuests.push(action.payload);
      }
    },

    advanceTime: (state, action: PayloadAction<number>) => {
      state.gameTime += action.payload;
    },

    updateSettings: (state, action: PayloadAction<Partial<GameSettings>>) => {
      state.settings = { ...state.settings, ...action.payload };
    },
  },
});

export const {
  setPhase,
  startNewGame,
  unlockRegion,
  travelToRegion,
  startQuest,
  updateQuestObjective,
  completeQuest,
  advanceTime,
  updateSettings,
} = gameSlice.actions;

export default gameSlice.reducer;
