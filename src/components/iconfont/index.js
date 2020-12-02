import React from 'react';
import IconFontSvg from './svg';
import IconFontART from './art';

export default ({ useART, ...rest }) => {
  const IconFont = useART ? IconFontART : IconFontSvg;
  return <IconFont {...rest} />;
};
