import React from 'react';
import UnitTextSvg from './unit-text-svg';
import UnitTextART from './unit-text-art';

export default ({ useART, ...rest }) => {
  const UnitText = useART ? UnitTextART : UnitTextSvg;
  return <UnitText {...rest} />;
};
