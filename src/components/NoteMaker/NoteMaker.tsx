import './NoteMaker.scss';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  addNote,
  updateNote,
  setTitleError,
  setTextError,
  selectNote,
  addTag,
  updateTags,
} from '../../store/noteSlice';
import { nanoid } from 'nanoid';
import useTypedSelector from '../../hooks/useTypedSelector';
import CreatableReactSelect from 'react-select/creatable';
import { ITag } from '../../types';
import { HighlightWithinTextarea } from 'react-highlight-within-textarea';

const NoteMaker = () => {
  const selectedNote = useTypedSelector((state) => state.selectedNote);
  const formError = useTypedSelector((state) => state.formError);
  const allTagsInStore = useTypedSelector((state) => state.tags);

  const [titleValue, setTitleValue] = useState(selectedNote?.title || '');
  const [textValue, setTextValue] = useState(selectedNote?.text || '');
  const [selectedTags, setSelectedTags] = useState<ITag[]>([]);

  const dispatch = useDispatch();

  useEffect(() => {
    setTitleValue(selectedNote?.title || '');
    setTextValue(selectedNote?.text || '');
    setSelectedTags(selectedNote?.tags || []);
  }, [selectedNote]);

  const collectManualTagsIds = () => {
    const regTag = /#[а-яА-ЯёЁa-zA-Z0-9]+/g;
    const matchesText = (textValue.match(regTag) || []).map((match) => match.substring(1));
    const manualTagsIds = [...matchesText];
    return manualTagsIds;
  };

  const createNewNoteTagIds = () => {
    const existingNoteTagsIds = selectedTags.map((tag) => tag.id);
    const manualNoteTagsIds = collectManualTagsIds();
    const allNoteTagsIds = Array.from(new Set([...existingNoteTagsIds, ...manualNoteTagsIds]));

    return allNoteTagsIds;
  };

  const createTagsFromIds = (tagIds: string[]) => {
    const tags = tagIds.map((tagId) => {
      return {
        id: tagId,
        label: tagId,
      };
    });

    return tags;
  };

  // const updateTagsForStore = (newTags) => {
  //   const allTags = [...allTagsInStore, ...]
  // }

  const saveNote = () => {
    if (titleValue === '') {
      dispatch(setTitleError(true));
    } else {
      dispatch(setTitleError(false));
    }
    if (textValue === '') {
      dispatch(setTextError(true));
    } else {
      dispatch(setTextError(false));
    }

    /*  -- update old note  */
    if (selectedNote) {
      const noteTagsIds = createNewNoteTagIds();
      const newArrOfNoteTags = createTagsFromIds(noteTagsIds);

      const oldTagsIdsInStore = allTagsInStore.map((tag) => tag.id);
      const mewStoreTagsIds = Array.from(new Set([...noteTagsIds, ...oldTagsIdsInStore]));
      const newStoreTags = createTagsFromIds(mewStoreTagsIds);

      dispatch(
        updateNote({
          id: selectedNote.id,
          title: titleValue,
          text: textValue,
          tags: newArrOfNoteTags,
          tagsIds: noteTagsIds,
        })
      );
      dispatch(selectNote(null));
      setSelectedTags([]);

      dispatch(updateTags(newStoreTags));
    }

    /*  -- create new note  */
    if (!selectedNote && titleValue && textValue) {
      const noteTagsIds = createNewNoteTagIds();
      const newArrOfNoteTags = createTagsFromIds(noteTagsIds);

      const oldTagsIdsInStore = allTagsInStore.map((tag) => tag.id);
      const mewStoreTagsIds = Array.from(new Set([...noteTagsIds, ...oldTagsIdsInStore]));
      const newStoreTags = createTagsFromIds(mewStoreTagsIds);

      dispatch(
        addNote({
          id: nanoid(),
          title: titleValue,
          text: textValue,
          tags: newArrOfNoteTags,
          tagsIds: noteTagsIds,
        })
      );

      dispatch(updateTags(newStoreTags));

      setTitleValue('');
      setTextValue('');
      setSelectedTags([]);
    }
  };

  const cancel = () => {
    dispatch(setTitleError(false));
    dispatch(setTextError(false));
    dispatch(selectNote(null));

    setTitleValue('');
    setTextValue('');
    setSelectedTags([]);
  };

  const onChangeTitleHandle = (e: React.FormEvent<HTMLInputElement>) => {
    setTitleValue(e.currentTarget.value);
    dispatch(setTitleError(false));
  };

  const onChangeTextHandle = (value: string) => {
    setTextValue(value);
    dispatch(setTextError(false));
  };

  const onCreateOption = (label: string) => {
    const newTag = { id: label, label };
    dispatch(addTag(newTag));
    setSelectedTags((prev) => [...prev, newTag]);
  };

  return (
    <div className="note__maker">
      <label htmlFor="note-title">Title</label>
      <input
        id="note-title"
        type="text"
        value={titleValue}
        onChange={(e) => onChangeTitleHandle(e)}
        className="note__maker-input"
        required
        placeholder="Title"
      />
      <p className="error-message">
        {formError.errorTitle && <span>Enter note&apos;s title</span>}
      </p>

      <label htmlFor="note-text">Text</label>
      <div className="note__maker-input textarea" id="note-text">
        <HighlightWithinTextarea
          highlight={createNewNoteTagIds().map((tagId) => `#${tagId}`)}
          value={textValue}
          onChange={(value) => onChangeTextHandle(value)}
          placeholder="Note's text"
        />
      </div>
      <p className="error-message">{formError.errorText && <span>Enter note&apos;s text</span>}</p>

      <div>
        <CreatableReactSelect
          value={selectedTags.map((tag) => {
            return { label: tag.label, value: tag.id };
          })}
          onChange={(tags) => {
            setSelectedTags(
              tags.map((tag) => {
                return { label: tag.label, id: tag.value };
              })
            );
          }}
          onCreateOption={onCreateOption}
          options={allTagsInStore.map((tag) => {
            return { label: tag.label, value: tag.id };
          })}
          isMulti
          placeholder={'Add tags'}
        />
      </div>

      <div className="note__maker-btns">
        <input type="button" value="Save" onClick={saveNote} />
        <input type="button" value="Cancel" onClick={cancel} />
      </div>
    </div>
  );
};

export default NoteMaker;
