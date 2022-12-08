import { configureStore } from '@reduxjs/toolkit';
import noteReducer from './noteSlice';

export const store = configureStore({
  reducer: noteReducer,
});

export type AppDispatch = typeof store.dispatch;
