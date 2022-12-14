import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { IInitialState, INote } from '../types';
import { getDataFromLS } from '../utils/functions';

const existingNotes = getDataFromLS('NOTES');
const availableTags = getDataFromLS('TAGS');

const initialState: IInitialState = {
  notes: existingNotes,
  filteredNotes: [],
  noMatches: false,
  tags: availableTags,
  error: '',
  selectedNote: null,
  formError: {
    errorTitle: false,
    errorText: false,
  },
};

export const fetchNotes = createAsyncThunk<INote[], undefined, { rejectValue: string }>(
  'notes/fetchNotes',
  async function () {
    const responce = await fetch('http://localhost:3001/notes');
    const data = await responce.json();
    return data;
  }
);

export const noteSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    addNote(state, action) {
      state.notes.push(action.payload);
    },
    updateNote(state, action) {
      state.notes.map((note) => {
        if (note.id === action.payload.id) {
          note.title = action.payload.title;
          note.text = action.payload.text;
          note.tags = action.payload.tags;
          note.tagsIds = action.payload.tagsIds;
        }
        return note;
      });
    },
    removeNote(state, action) {
      state.notes = state.notes.filter((note) => note.id !== action.payload);
    },
    selectNote(state, action) {
      state.selectedNote = action.payload;
    },
    setFilteredNotes(state, action) {
      state.filteredNotes = action.payload;
    },
    removeFromFilteredNotes(state, action) {
      state.filteredNotes = state.filteredNotes.filter((note) => note.id !== action.payload);
    },
    setTitleError(state, action) {
      state.formError.errorTitle = action.payload;
    },
    setTextError(state, action) {
      state.formError.errorText = action.payload;
    },
    setNoMatches(state, action) {
      state.noMatches = action.payload;
    },
    addTag(state, action) {
      state.tags.push(action.payload);
    },
    updateTags(state, action) {
      state.tags = action.payload;
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

export const {
  addNote,
  updateNote,
  removeNote,
  selectNote,
  setTitleError,
  setTextError,
  addTag,
  setFilteredNotes,
  setNoMatches,
  updateTags,
  removeFromFilteredNotes,
} = noteSlice.actions;

export default noteSlice.reducer;
