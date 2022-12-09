import { configureStore } from '@reduxjs/toolkit';
import { setDataToLS } from '../utils/functions';
import noteReducer from './noteSlice';

export const store = configureStore({
  reducer: noteReducer,
});

store.subscribe(() => {
  setDataToLS('NOTES', store.getState().notes);
  setDataToLS('TAGS', store.getState().tags);
});

export type AppDispatch = typeof store.dispatch;
