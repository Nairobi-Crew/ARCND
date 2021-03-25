import { IMessagesItem } from 'Pages/Forums/types';
import { FC } from 'react';

export type OwnMessageProps = {
  message: IMessagesItem
  index?: number
};

export type MessageProps = FC<OwnMessageProps>;
