import React, { useEffect, useState } from 'react';
import './NotesBoard.scss';
import Note from '../Note/Note';
import useTypedSelector from '../../hooks/useTypedSelector';
import { INote } from '../../types';

type NotesBoard = {
  notes: INote[];
};

const NotesBoard = () => {
  const filteredNotes = useTypedSelector((state) => state.filteredNotes);
  const selectedNote = useTypedSelector((state) => state.selectedNote);
  const noMatches = useTypedSelector((state) => state.noMatches);
  const notes = useTypedSelector((state) => state.notes);
  const [notesToBeView, setNotesToBeView] = useState<INote[]>([]);

  useEffect(() => {
    if (!filteredNotes.length) {
      setNotesToBeView(notes);
    } else {
      setNotesToBeView(filteredNotes);
    }
  }, [filteredNotes, notes, selectedNote]);

  return (
    <div className="notesBoarder">
      {noMatches ? (
        <p style={{ fontWeight: '800', textAlign: 'center', width: '100%', marginTop: '20px' }}>
          There are no matches!
        </p>
      ) : (
        <div className="container">
          <ul className="notesBoarder__wrapper">
            {notesToBeView?.map((note) => {
              return (
                <li key={note.id}>
                  <Note note={note} />
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default NotesBoard;
