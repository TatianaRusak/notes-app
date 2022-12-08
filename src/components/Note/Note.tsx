import React from 'react';
import { INote } from '../../types';
import './Note.scss';

interface INoteProps {
  note: INote;
}

const Note = ({ note }: INoteProps) => (
  <div className="note">
    <h4 className="note__title">{note.title}</h4>
    <p className="note__text">{note.text}</p>
  </div>
);

export default Note;
