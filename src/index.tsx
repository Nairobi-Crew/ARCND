import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(
  <>
    <header className='header'>
      <a href='/' className='header__title'>
        <h1>ARCND</h1>
      </a>
    </header>
    <App />
  </>,
  document?.getElementById('root'),
);
