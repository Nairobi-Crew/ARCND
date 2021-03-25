import { IMessagesItem } from 'Pages/Forums/types';
import { FC } from 'react';

export type OwnThreadProps = {
  messages?: IMessagesItem[]
};

export type ThreadProps = FC<OwnThreadProps>;
