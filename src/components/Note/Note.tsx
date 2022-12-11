import React from 'react';
import { INote } from '../../types';
import './Note.scss';
import { removeFromFilteredNotes, removeNote, selectNote } from '../../store/noteSlice';
import { useDispatch } from 'react-redux';
import useTypedSelector from '../../hooks/useTypedSelector';
interface INoteProps {
  note: INote;
}

const Note = ({ note }: INoteProps) => {
  const dispatch = useDispatch();
  const selectedNote = useTypedSelector((state) => state.selectedNote);

  const deleteNote = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    dispatch(removeNote(note.id));
    dispatch(removeFromFilteredNotes(note.id));
    dispatch(selectNote(null));
  };

  const onClickNoteHandle = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    dispatch(selectNote(note));
  };

  const listTags = note.tags.map((tag) => (
    <li className="note__tag-item" key={tag.id}>
      {tag.label}
    </li>
  ));

  const hideSharps = (text: string) => {
    return text.split('#').join('<span>#</span>');
  };

  return (
    <div
      className={selectedNote?.id === note.id ? 'note active' : 'note'}
      onClick={onClickNoteHandle}
    >
      <button className="trash-btn" onClick={(e) => deleteNote(e)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
          />
        </svg>
      </button>

      <h4 className="note__title">{note.title}</h4>
      <p className="note__text" dangerouslySetInnerHTML={{ __html: hideSharps(note.text) }} />
      <ul className="note__tags">{listTags}</ul>
    </div>
  );
};

export default Note;
