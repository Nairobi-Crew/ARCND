import { FC } from 'react';

type OwnEmojiProps = {
  onChange?: Function
  current?: number
};

type EmojiProps = FC<OwnEmojiProps>;

export default EmojiProps;
