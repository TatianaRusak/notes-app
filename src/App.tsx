import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import './App.css';
import Header from './components/Header/Header';
import NoteMaker from './components/NoteMaker/NoteMaker';
import NotesBoarder from './components/NotesBoarder/NotesBoard';
import { fetchNotes } from './store/noteSlice';
import { AppDispatch } from './store/store';

function App() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchNotes());
  }, [dispatch]);

  return (
    <div className="App">
      <Header />

      <main className="main">
        <NoteMaker />
        <NotesBoarder />
      </main>
    </div>
  );
}

export default App;
