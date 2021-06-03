import React, {
  FormEventHandler, useEffect, useRef, useState,
} from 'react';
import { FormProps } from 'UI/Form/types';
import './Form.scss';
import Header from 'UI/Header/Header';
import { setNativeInputValue } from 'Util/setNativeInputValue';

const Form: FormProps = ({
  children,
  onSubmit,
  caption,
  visible,
  name = '',
  header = true,
  maxHeight = true,
}) => {
  const [formVisible, setFormVisible] = useState(visible === undefined || visible ? '' : 'hidden');
  const onSubmitHandler: FormEventHandler<HTMLFormElement> = (event) => {
    ((event as unknown) as Event).preventDefault();
    if (onSubmit) {
      onSubmit();
    }
  };
  const formRef = useRef<HTMLFormElement | null>(null);

  useEffect(() => {
    if (visible === undefined || visible) {
      setFormVisible('');
    } else {
      setFormVisible('hidden');
    }
    if (window) {
      const inputs:[HTMLInputElement] = JSON.parse(localStorage.getItem(`form_${name}`) as string) || [];
      const elems = formRef?.current?.elements || [];
      for (let i = 0; i < elems.length; i++) {
        if (elems[i].tagName === 'INPUT') {
          const elem = elems[i] as HTMLInputElement;
          if (elem.type !== 'file') {
            const value = inputs?.find((input) => input.name === elem.name)?.value ?? '';
            setNativeInputValue(elem, value);
          }
        }
      }
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
        <form
          ref={formRef}
          onSubmit={onSubmitHandler}
          onInput={({ currentTarget }) => {
            if (!name) return;
            const { elements } = currentTarget;
            const inputs = [];
            for (let i = 0; i < elements.length; i++) {
              if (elements[i].tagName === 'INPUT') {
                const elem = elements[i] as HTMLInputElement;
                (elem.type !== 'password' && !elem.name.includes('password')) && inputs.push({
                  value: elem.value,
                  name: elem.name,
                });
              }
            }
            localStorage.setItem(`form_${name}`, JSON.stringify(
              inputs,
            ));
          }}
        >
          {children}
        </form>
      </div>
      <div className="form__empty_column" />
    </div>
  );
};

export default Form;
