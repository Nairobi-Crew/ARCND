import { FC } from 'react';

type OwnEmojiInputItemProps = {
  value: number
  name: string
  src: string
  checked: boolean
  onClick?: Function
}

type EmojiInputItemProps = FC<OwnEmojiInputItemProps>;

export default EmojiInputItemProps;
