import './NoteMaker.scss';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  addNote,
  updateNote,
  setTitleError,
  setTextError,
  selectNote,
} from '../../store/noteSlice';
import { nanoid } from 'nanoid';
import useTypedSelector from '../../hooks/useTypedSelector';
import CreatableReactSelect from 'react-select/creatable';
import { ITag } from '../../types';

const NoteMaker = () => {
  const selectedNote = useTypedSelector((state) => state.selectedNote);
  const formError = useTypedSelector((state) => state.formError);

  const [titleValue, setTitleValue] = useState(selectedNote?.title || '');
  const [textValue, setTextValue] = useState(selectedNote?.text || '');
  const [selectedTags, setSelectedTags] = useState<ITag[]>([]);

  const dispatch = useDispatch();

  useEffect(() => {
    setTitleValue(selectedNote?.title || '');
    setTextValue(selectedNote?.text || '');
  }, [selectedNote]);

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
      dispatch(
        updateNote({
          id: selectedNote.id,
          title: titleValue,
          text: textValue,
          tags: selectedTags,
        })
      );
      dispatch(selectNote(null));
    }

    if (!selectedNote && titleValue && textValue) {
      dispatch(
        addNote({
          id: nanoid(),
          title: titleValue,
          text: textValue,
          tags: selectedTags,
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

    setTitleValue('');
    setTextValue('');
    setSelectedTags([]);
  };

  const onChangeTitleHandle = (e: React.FormEvent<HTMLInputElement>) => {
    setTitleValue(e.currentTarget.value);
    dispatch(setTitleError(false));
  };

  const onChangeTextHandle = (e: React.FormEvent<HTMLTextAreaElement>) => {
    setTextValue(e.currentTarget.value);
    dispatch(setTextError(false));
  };

  return (
    <div className="note__maker">
      <label>
        Title
        <input
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
      </label>
      <label>
        Text
        <textarea
          rows={8}
          value={textValue}
          onChange={(e) => onChangeTextHandle(e)}
          className="note__maker-input"
          required
          placeholder="Note's text"
        />
        <p className="error-message">
          {formError.errorText && <span>Enter note&apos;s text</span>}
        </p>
      </label>

      <div className="tags-select">
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
          isMulti
          placeholder={'Create tags'}
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
