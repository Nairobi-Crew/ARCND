import React from 'react';
import './500.scss';

const Page500 = () => (
  <div className="error">
    <h1 className="error__title">
      500
    </h1>
    <p className="error__subtitle">Что-то не так с сервером.</p>
    <a href="/" className="button button_type_rounded error__link">
      На главную
    </a>
  </div>
);

export default Page500;
