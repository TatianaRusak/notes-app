import React from 'react';
import './Footer.scss';
import img from './github-logo.png';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__wrapper">
          <p>2022</p>
          <a href="https://github.com/TatianaRusak/notes-app" className="github-link">
            <img className="github-link-img" src={img} alt="github-logo" />
          </a>
          <p>Tatiana Rusak</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
