import { configureStore } from '@reduxjs/toolkit';
import { setNotesToLS } from '../utils/functions';
import noteReducer from './noteSlice';

export const store = configureStore({
  reducer: noteReducer,
});

store.subscribe(() => {
  setNotesToLS(store.getState().notes);
});

export type AppDispatch = typeof store.dispatch;
