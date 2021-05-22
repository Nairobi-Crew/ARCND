import React from 'react';
import EmojiProps from 'UI/EmojiInput/types';
import EmojiInputItem from 'UI/EmojiInput/EmojiInputItem';
import './EmojiInput.scss';

const EmojiInput: EmojiProps = ({ onChange, current }) => {
  const emojiArray = (n: number): string[] => {
    const res: string[] = [];
    for (let i = 0; i <= n; i += 1) {
      res.push(`/emoji/0${i}.png`);
    }
    return res;
  };

  const onChangeHandler = (id: number) => {
    if (onChange) {
      onChange(id);
    }
  };

  return (
    <div className="emoji_input">
      {
        emojiArray(9).map((item, index) => (
          <EmojiInputItem
            value={index}
            name="_emoji_"
            src={item}
            checked={index === current}
            key={item}
            onClick={() => onChangeHandler(index)}
          />
        ))
      }
    </div>
  );
};

export default EmojiInput;
