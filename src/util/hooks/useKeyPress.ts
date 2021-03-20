import React from 'react';

export const useKeyPress = (targetKey: string, prevent = false) => {
  const [keyPressed, setKeyPressed] = React.useState(false);

  const downHandler = (e: KeyboardEvent) => { // при нажатии записываем в стейт
    const { key } = e;
    if (key === targetKey) {
      setKeyPressed(true);
      if (prevent) {
        e.preventDefault();
      }
    }
  };

  const upHandler = (e: KeyboardEvent) => { // отпустили клавишу
    const { key } = e;
    if (key === targetKey) {
      setKeyPressed(false);
      if (prevent) {
        e.preventDefault();
      }
    }
  };

  React.useEffect(() => { // подписываемся при первом заходе
    window.addEventListener('keydown', downHandler);
    window.addEventListener('keyup', upHandler);
    return () => { // чистим обработчик
      window.removeEventListener('keydown', downHandler);
      window.removeEventListener('keyup', upHandler);
    };
  }, []);

  return keyPressed;
};
