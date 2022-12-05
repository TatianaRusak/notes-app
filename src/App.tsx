import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import ModalForm from './components/ModalForm/ModalForm';
import NotesBoarder from './components/NotesBoarder/NotesBoarder';

function App() {
  const saveNote = () => {
    console.log('save note');
  };

  return (
    <div className="App">
      <Header />

      <main className="main">
        <NotesBoarder />
        <ModalForm modalSubmit={saveNote} />
      </main>
    </div>
  );
}

export default App;
