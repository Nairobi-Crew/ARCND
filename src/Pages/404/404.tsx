import React from 'react';
import './404.scss';

const Page404 = () => (
  <div className="error">
    <h1 className="error__title">
      404
    </h1>
    <p className="error__subtitle">Такой страницы не существует.</p>
    <a href="/" className="button button_type_rounded error__link">
      На главную
    </a>
  </div>
);

export default Page404;
