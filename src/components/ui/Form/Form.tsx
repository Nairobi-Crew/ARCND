import React from 'react';
import { FormProps } from 'UI/Form/types';
import './Form.scss';

const Form: FormProps = ({ children, onSubmit, caption }) => {
  const onSubmitHandler = () => {
    if (onSubmit) {
      onSubmit();
    }
  };
  return (
    <div className="form__container">
      <div className="form__empty_column" />
      <div className="form__form_column">
        <h1>{caption}</h1>
        <form onSubmit={onSubmitHandler}>
          {children}
        </form>
      </div>
      <div className="form__empty_column" />
    </div>
  );
};

export default Form;
