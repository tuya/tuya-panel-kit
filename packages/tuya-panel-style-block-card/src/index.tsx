import React from 'react';
import StudioBlock from './studio';
import NordicBlock from './nordic';
import AcrylicBlock from './acrylic';
import { IStudioCardProps, INordicCardProps } from './interface';

export const ClassicBlockCard = (props: IStudioCardProps) => <StudioBlock {...props} />;
export const NordicBlockCard = (props: INordicCardProps) => <NordicBlock {...props} />;
export const AcrylicBlockCard = (props: IStudioCardProps) => <AcrylicBlock {...props} />;
