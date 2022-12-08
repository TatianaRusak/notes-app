import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { IInitialState, INote } from '../types';

const initialState: IInitialState = {
  notes: [],
  error: '',
};

export const fetchNotes = createAsyncThunk<INote[], undefined, { rejectValue: string }>(
  'notes/fetchNotes',
  async function () {
    const responce = await fetch('http://localhost:3001/notes');
    const data = await responce.json();
    return data;
  }
);

const noteSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    addNote(state, action) {
      state.notes.push(action.payload);
    },
    editNote(state, action) {
      state.notes.map((note) => {
        if (note.id === action.payload.id) {
          return action.payload;
        }
        return note;
      });
    },
    removeNote(state, action) {
      state.notes = state.notes.filter((note) => note.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotes.pending, (state) => {
        state.error = '';
      })
      .addCase(fetchNotes.fulfilled, (state, action) => {
        state.notes = action.payload;
        state.error = '';
      })
      .addCase(fetchNotes.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export const { addNote, editNote, removeNote } = noteSlice.actions;

export default noteSlice.reducer;
