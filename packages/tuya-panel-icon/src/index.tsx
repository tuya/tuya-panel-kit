import React from 'react';
import IconFontSvg from './svg';
import IconFontART from './art';
import { SVGProps } from './svg/interface';
import { ARTProps } from './art/interface';

export default (props: ARTProps | SVGProps) => {
  if (props.useART) {
    const artProps: ARTProps = props;
    return <IconFontART {...artProps} />;
  }
  // @ts-ignore
  const svgProps: SVGProps = props;
  return <IconFontSvg {...svgProps} />;
};
