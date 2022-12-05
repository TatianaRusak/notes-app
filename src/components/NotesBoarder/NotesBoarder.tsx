import React from 'react';
import Note from '../Note/Note';
import './NotesBoarder.scss';

const NotesBoarder = () => {
  return (
    <div className="notesBoarder">
      <div className="container">
        <div className="notesBoarder__wrapper">
          <Note />
        </div>
      </div>
    </div>
  );
};

export default NotesBoarder;
