import React from 'react';

type TOnChange = (gamepad: Gamepad[]) => void;

export type OwnGamePadProps = {
  onChange?: TOnChange
}

export type GamePadProps = React.FC<OwnGamePadProps>;
