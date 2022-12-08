import { INote } from '../types';

export const getNotesFromLS = () => {
  const notes = localStorage.getItem('notes');

  if (notes) {
    return JSON.parse(notes);
  }
  return [];
};

export const setNotesToLS = (notes: INote[]) => {
  localStorage.setItem('notes', JSON.stringify(notes));
};
