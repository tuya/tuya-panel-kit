import React from 'react';
import StudioBlock from './studio';
import NordicBlock from './nordic';
import AcrylicBlock from './acrylic';

export const ClassicBlockCard = props => <StudioBlock {...props} />;
export const NordicBlockCard = props => <NordicBlock {...props} />;
export const AcrylicBlockCard = props => <AcrylicBlock {...props} />;
