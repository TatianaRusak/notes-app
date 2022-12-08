import './NoteMaker.scss';
import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addNote } from '../../store/noteSlice';

const NoteMaker = () => {
  const titleRef = useRef<HTMLInputElement>(null);
  const textRef = useRef<HTMLTextAreaElement>(null);
  const [errorTitle, setErrorTitle] = useState(false);
  const [errorText, setErrorText] = useState(false);

  const dispatch = useDispatch();

  const saveNote = () => {
    if (titleRef.current?.value === '') {
      setErrorTitle(true);
    } else {
      setErrorTitle(false);
    }
    if (textRef.current?.value === '') {
      setErrorText(true);
    } else {
      setErrorText(false);
    }

    if (titleRef.current?.value && textRef.current?.value) {
      dispatch(
        addNote({
          title: titleRef.current?.value,
          text: textRef.current?.value,
          tags: [],
        })
      );
      titleRef.current.value = '';
      textRef.current.value = '';
    }
  };

  const cancel = () => {
    setErrorTitle(false);
    setErrorText(false);

    titleRef.current!.value = '';
    textRef.current!.value = '';
  };

  const onChangeTitleHandle = () => {
    setErrorTitle(false);
  };

  const onChangeTextHandle = () => {
    setErrorText(false);
  };

  return (
    <div className="note__maker">
      <label>
        Title
        <input
          type="text"
          ref={titleRef}
          onChange={onChangeTitleHandle}
          className="note__maker-input"
          required
          placeholder="Title"
        />
        <p className="error-message">{errorTitle && <span>Enter note&apos;s title</span>}</p>
      </label>
      <label>
        Text
        <textarea
          rows={8}
          ref={textRef}
          onChange={onChangeTextHandle}
          className="note__maker-input"
          required
          placeholder="Note's text"
        />
        <p className="error-message">{errorText && <span>Enter note&apos;s text</span>}</p>
      </label>

      <div className="note__maker-btns">
        <input type="button" value="Save" onClick={saveNote} />
        <input type="button" value="Cancel" onClick={cancel} />
      </div>
    </div>
  );
};

export default NoteMaker;
