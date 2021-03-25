import React, { memo } from 'react';
import './Header.scss';

const Header = () => (
  <header className="header">
    <a href="/" className="header__title">
      <h1>ARCND</h1>
    </a>
  </header>
);

export default memo(Header);
