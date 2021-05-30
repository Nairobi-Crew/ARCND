import React from 'react';
import EmojiProps from 'UI/Emoji/types';
import { EMOJI_SIZE } from 'Config/config';
import './Emoji.scss';

const Emoji: EmojiProps = ({ id }) => (
  <>
    {
      id > 9 || id < 0
        ? null
        : (
          <img className="emoji" src={`/emoji/0${id}.png`} alt={`emoji${id}`} width={`${EMOJI_SIZE}px`} height={`${EMOJI_SIZE}px`} />
        )
    }
  </>
);

export default Emoji;
