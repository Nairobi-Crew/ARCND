import React from 'react';

export type OwnAuthOnlyProps = {
  redirectTo?: string
}

export type AuthOnlyProps = React.FC<OwnAuthOnlyProps>;
