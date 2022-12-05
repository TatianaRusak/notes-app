import React from 'react';
import './Header.scss';

const Header = () => {
  const createNote = () => {
    console.log('create new note');
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header-wrapper">
          <h1>NOTES App</h1>
          <button type="button" onClick={createNote}>
            Create new note
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
