import React from 'react';
import './NotesBoard.scss';
import Note from '../Note/Note';
import useTypedSelector from '../../hooks/useTypedSelector';

const NotesBoarder = () => {
  const notes = useTypedSelector((state) => state.notes);

  return (
    <div className="notesBoarder">
      <div className="container">
        <ul className="notesBoarder__wrapper">
          {notes.map((note) => {
            return (
              <li key={note.id}>
                <Note note={note} />
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default NotesBoarder;
