import React from 'react';
import StudioIconBlock from './studio';
import NordicIconBlock from './nordic';
import AcrylicIconBlock from './acrylic';
import { IStudioIconCardProps, INordicIconCardProps } from './interface';

export const ClassicIconBlockCard = (props: IStudioIconCardProps) => <StudioIconBlock {...props} />;
export const NordicIconBlockCard = (props: INordicIconCardProps) => <NordicIconBlock {...props} />;
export const AcrylicIconBlockCard = (props: IStudioIconCardProps) => (
  <AcrylicIconBlock {...props} />
);
