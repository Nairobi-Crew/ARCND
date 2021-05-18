import React from 'react';
import EmojiInputItemProps from 'UI/EmojiInput/EmojiInputItem/types';
import { EMOJI_INPUT_SIZE } from 'Config/config';

const EmojiInputItem: EmojiInputItemProps = ({
  value, name, src, checked, onClick,
}) => {
  const onClickHandler = () => {
    if (onClick) {
      onClick(value);
    }
  };

  return (
    // eslint-disable-next-line jsx-a11y/label-has-associated-control
    <label>
      <input type="radio" name={name} value={value} checked={checked} onChange={onClickHandler} />
      <img src={src} alt={`emoji ${value}`} width={`${EMOJI_INPUT_SIZE}px`} height={`${EMOJI_INPUT_SIZE}px`} />

    </label>
  );
};

export default EmojiInputItem;
