import React, { useEffect, useState } from 'react';
import { FormProps } from 'UI/Form/types';
import './Form.scss';
import Header from 'UI/Header/Header';

const Form: FormProps = ({
  children,
  onSubmit,
  caption,
  visible,
  header = true,
  maxHeight = true,
}) => {
  const [formVisible, setFormVisible] = useState(visible === undefined || visible === true ? '' : 'hidden');
  const onSubmitHandler = (evt) => {
    evt.preventDefault();
    if (onSubmit) {
      onSubmit();
    }
  };

  useEffect(() => {
    if (visible === undefined || visible === true) {
      setFormVisible('');
    } else {
      setFormVisible('hidden');
    }
  }, [visible]);

  const classes = ['form__container', formVisible];
  const classes_empty_column = ['form__empty_column'];
  if (maxHeight) {
    classes.push('form__container_max_height');
    classes_empty_column.push('form__empty_column_max_height');
  }

  return (
    <div className={classes.join(' ')}>
      <div className={classes_empty_column.join(' ')}>
        { header ? <Header /> : null }
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
