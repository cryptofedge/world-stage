import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CertificationLevel, CERT_THRESHOLDS } from '../types';

// ── Types ────────────────────────────────────────────────────────────────────

export interface RosterArtist {
  id: string;
  name: string;
  genre: string;
  region: string;
  potential: number;   // 1-10
  emoji: string;
  streams: number;
  advancePaid: number;
  royaltyRate: number; // % label keeps
  certification: CertificationLevel;
  signedAt: number;
}

interface LabelState {
  roster: RosterArtist[];
  totalRoyaltiesEarned: number;
  totalAdvancesPaid: number;
}

const initialState: LabelState = {
  roster: [],
  totalRoyaltiesEarned: 0,
  totalAdvancesPaid: 0,
};

// ── Helpers ──────────────────────────────────────────────────────────────────

export function getCertForStreams(streams: number): CertificationLevel {
  if (streams >= CERT_THRESHOLDS.diamond) return 'diamond';
  if (streams >= CERT_THRESHOLDS.multi_platinum) return 'multi_platinum';
  if (streams >= CERT_THRESHOLDS.platinum) return 'platinum';
  if (streams >= CERT_THRESHOLDS.gold) return 'gold';
  return 'none';
}

// ── Slice ────────────────────────────────────────────────────────────────────

const labelSlice = createSlice({
  name: 'label',
  initialState,
  reducers: {
    signArtistToLabel: (state, action: PayloadAction<RosterArtist>) => {
      if (!state.roster.find((a) => a.id === action.payload.id)) {
        state.roster.push(action.payload);
        state.totalAdvancesPaid += action.payload.advancePaid;
      }
    },

    addStreamsToRosterArtist: (
      state,
      action: PayloadAction<{ artistId: string; streams: number; royaltyRevenue: number }>
    ) => {
      const artist = state.roster.find((a) => a.id === action.payload.artistId);
      if (!artist) return;
      artist.streams += action.payload.streams;
      artist.certification = getCertForStreams(artist.streams);
      state.totalRoyaltiesEarned += action.payload.royaltyRevenue;
    },

    releaseRosterArtist: (state, action: PayloadAction<string>) => {
      state.roster = state.roster.filter((a) => a.id !== action.payload);
    },

    resetLabel: (state) => {
      state.roster = [];
      state.totalRoyaltiesEarned = 0;
      state.totalAdvancesPaid = 0;
    },
  },
});

export const {
  signArtistToLabel, addStreamsToRosterArtist, releaseRosterArtist, resetLabel,
} = labelSlice.actions;

export default labelSlice.reducer;
