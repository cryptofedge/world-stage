import { configureStore } from '@reduxjs/toolkit';
import playerReducer from './playerSlice';
import gameReducer from './gameSlice';
import labelReducer from './labelSlice';

export const store = configureStore({
  reducer: {
    player: playerReducer,
    game: gameReducer,
    label: labelReducer,
  },
});

export type RootState = ReturnType<typeof 