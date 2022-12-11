import React, { useEffect, useState } from 'react';
import './NotesBoard.scss';
import Note from '../Note/Note';
import useTypedSelector from '../../hooks/useTypedSelector';
import { INote } from '../../types';
import { useDispatch } from 'react-redux';
import { selectNote } from '../../store/noteSlice';

type NotesBoard = {
  notes: INote[];
};

const NotesBoard = () => {
  const filteredNotes = useTypedSelector((state) => state.filteredNotes);
  const selectedNote = useTypedSelector((state) => state.selectedNote);
  const noMatches = useTypedSelector((state) => state.noMatches);
  const notes = useTypedSelector((state) => state.notes);
  const [notesToBeView, setNotesToBeView] = useState<INote[]>([]);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!filteredNotes.length) {
      setNotesToBeView(notes);
    } else {
      setNotesToBeView(filteredNotes);
    }
  }, [filteredNotes, notes, selectedNote]);

  const onClickHandler = () => {
    dispatch(selectNote(null));
  };

  return (
    <div className="notesBoarder">
      {!notes.length && (
        <p style={{ fontWeight: '800', textAlign: 'center', width: '100%', marginTop: '20px' }}>
          Create your first note.
        </p>
      )}

      {notes.length && noMatches ? (
        <p style={{ fontWeight: '800', textAlign: 'center', width: '100%', marginTop: '20px' }}>
          There are no matches!
        </p>
      ) : (
        <div className="container">
          <ul className="notesBoarder__wrapper" onClick={onClickHandler}>
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
