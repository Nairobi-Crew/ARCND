import { IMessagesItem } from 'Pages/Forums/types';
import { FC } from 'react';

export type OwnMessageProps = {
  message: IMessagesItem
};

export type MessageProps = FC<OwnMessageProps>;
