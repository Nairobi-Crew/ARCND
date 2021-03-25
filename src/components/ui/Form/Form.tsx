import React from 'react';
import { FormProps } from 'UI/Form/types';
import './Form.scss';
import Header from 'UI/Header/Header';

const Form: FormProps = ({ children, onSubmit, caption }) => {
  const onSubmitHandler = (evt) => {
    evt.preventDefault();
    if (onSubmit) {
      onSubmit();
    }
  };
  return (
    <div className="form__container">
      <div className="form__empty_column">
        <Header />
      </div>
      <div className="form__form_column">
        <h1 className="form__form_column caption">{caption}</h1>
        <form onSubmit={onSubmitHandler}>
          {children}
        </form>
      </div>
      <div className="form__empty_column" />
    </div>
  );
};

export default Form;
