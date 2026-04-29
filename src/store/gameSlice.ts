import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GamePhase, GameSettings, Quest, CareerPath } from '../types';

interface GameSliceState {
  phase: GamePhase;
  careerPath: CareerPath | null;
  currentRegionId: string;
  unlockedRegions: string[];
  activeQuests: Quest[];
  completedQuests: string[];
  gameTime: number;
  settings: GameSettings;
  winConditionMet: boolean;
  diamondArtistId: string | null;
}

const initialState: GameSliceState = {
  phase: 'main_menu',
  careerPath: null,
  currentRegionId: 'lagos',
  unlockedRegions: ['lagos'],
  activeQuests: [],
  completedQuests: [],
  gameTime: 0,
  winConditionMet: false,
  diamondArtistId: null,
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

    setCareerPath: (state, action: PayloadAction<CareerPath>) => {
      state.careerPath = action.payload;
    },

    startNewGame: (state) => {
      state.phase = 'path_selection';
      state.careerPath = null;
      state.currentRegionId = 'lagos';
      state.unlockedRegions = ['lagos'];
      state.activeQuests = [];
      state.completedQuests = [];
      state.gameTime = 0;
      state.winConditionMet = false;
      state.diamondArtistId = null;
    },

    unlockRegion: (state, action: PayloadAction<string>) => {
      if (!state.unlockedRegions.includes(action.payload)) {
        state.unlockedRegions.push(action.payload);
      }
    },

    travelToRegion: (state, action: PayloadAction<string>) => {
      state.currentRegionId = action.payload;
      state.gameTime += 1;
    },

    startQuest: (state, action: PayloadAction<Quest>) => {
      if (!state.activeQuests.find((q) => q.id === action.payload.id)) {
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

    triggerVictory: (state, action: PayloadAction<{ artistId: string }>) => {
      state.winConditionMet = true;
      state.diamondArtistId = action.payload.artistI