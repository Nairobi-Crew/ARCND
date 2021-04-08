import React from 'react';
import { Link } from 'react-router-dom';
import './Header.scss';

const Header = () => (
  <header className="header">
    <Link to="/" className="header__title">
      <h1>ARCND</h1>
    </Link>
  </header>
);

export default Header;
