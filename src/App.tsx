import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import NoteMaker from './components/NoteMaker/NoteMaker';
import NotesBoarder from './components/NotesBoarder/NotesBoard';

function App() {
  // useEffect(() => {
  //   dispatch(fetchNotes());
  // }, [dispatch]);

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
