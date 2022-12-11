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
} from '../../store/noteSlice';
import { nanoid } from 'nanoid';
import useTypedSelector from '../../hooks/useTypedSelector';
import CreatableReactSelect from 'react-select/creatable';
import { ITag } from '../../types';
import { HighlightWithinTextarea } from 'react-highlight-within-textarea';

const NoteMaker = () => {
  const selectedNote = useTypedSelector((state) => state.selectedNote);
  const formError = useTypedSelector((state) => state.formError);
  const allTags = useTypedSelector((state) => state.tags);

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
    const regTag = /#\w+/g;
    const matchesText = (textValue.match(regTag) || []).map((match) => match.substring(1));
    const manualTagsIds = [...matchesText];
    return manualTagsIds;
  };

  const createNewTagIds = () => {
    const existingTagsIds = selectedTags.map((tag) => tag.id);
    const manualTagsIds = collectManualTagsIds();
    const allTagsIds = Array.from(new Set([...existingTagsIds, ...manualTagsIds]));

    return allTagsIds;
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

    if (selectedNote) {
      const allTagsIds = createNewTagIds();
      const newArrOfTags = createTagsFromIds(allTagsIds);

      dispatch(
        updateNote({
          id: selectedNote.id,
          title: titleValue,
          text: textValue,
          tags: newArrOfTags,
          tagsIds: allTagsIds,
        })
      );
      dispatch(selectNote(null));
      setSelectedTags([]);
    }

    if (!selectedNote && titleValue && textValue) {
      const allTagsIds = createNewTagIds();
      const newArrOfTags = createTagsFromIds(allTagsIds);

      dispatch(
        addNote({
          id: nanoid(),
          title: titleValue,
          text: textValue,
          tags: newArrOfTags,
          tagsIds: allTagsIds,
        })
      );
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
          highlight={createNewTagIds().map((tagId) => `#${tagId}`)}
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
          options={allTags.map((tag) => {
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
