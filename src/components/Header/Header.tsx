import React, { useEffect, useState } from 'react';
import './Header.scss';
import useTypedSelector from '../../hooks/useTypedSelector';
import { INote, ITag } from '../../types';
import { setFilteredNotes, setNoMatches } from '../../store/noteSlice';
import ReactSelect, { MultiValue } from 'react-select';
import { useDispatch } from 'react-redux';

let selectedTagsIds: string[] = [];

const Header = () => {
  const allTags = useTypedSelector((state) => state.tags);
  const [selectedTags, setSelectedTags] = useState<ITag[]>([]);
  const allNotes = useTypedSelector((state) => state.notes) as INote[];
  const filteredNotes = useTypedSelector((state) => state.filteredNotes) as INote[];

  const dispatch = useDispatch();

  useEffect(() => {
    if (selectedTags.length && !filteredNotes.length) {
      dispatch(setNoMatches(true));
    } else {
      dispatch(setNoMatches(false));
    }
  }, [dispatch, selectedTags, filteredNotes]);

  const onClickHandle = (
    tags: MultiValue<{
      label: string;
      value: string;
    }>
  ) => {
    selectedTagsIds = tags.map((tag) => tag.label);
    if (selectedTagsIds.length) {
      dispatch(
        setFilteredNotes(
          allNotes.filter((note) => {
            return (
              selectedTagsIds.length === 0 ||
              selectedTagsIds.every((tagId) => {
                return note.tagsIds.includes(tagId);
              })
            );
          })
        )
      );
    } else {
      dispatch(setFilteredNotes([]));
    }
    setSelectedTags(
      tags.map((tag) => {
        return { label: tag.label, id: tag.value };
      })
    );
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <h1>NOTES App</h1>
          <ReactSelect
            value={selectedTags.map((tag) => {
              return { label: tag.label, value: tag.id };
            })}
            onChange={(tags) => onClickHandle(tags)}
            options={allTags.map((tag) => {
              return { label: tag.label, value: tag.id };
            })}
            className="header__tags-select"
            isMulti
            placeholder={'Filter your notes by tags'}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
