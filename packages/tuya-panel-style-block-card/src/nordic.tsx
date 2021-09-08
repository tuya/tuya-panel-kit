import React from 'react';
import { View } from 'react-native';
import { Utils } from 'tuya-panel-utils';
import { TYText, SwitchButton } from 'tuya-panel-kit';
import { INordicCardProps, INordicDefaultProps } from './interface';

const { parseToStyle } = Utils.ThemeUtils;
const { convertX: cx } = Utils.RatioUtils;

const NordicBlock: React.FC<INordicCardProps> = ({
  style,
  backgroundColor,
  radius,
  padding,
  text,
  width,
  fontColor,
  fontSize,
  fontWeight,
  textStyle,
  switchSize,
  switchIconSize,
  switchIconColor,
  switchStyle,
  ...rest
}) => {
  return (
    <View
      style={[
        {
          backgroundColor,
          borderRadius: radius,
          width,
          ...parseToStyle(padding, 'padding'),
        },
        style,
      ]}
    >
      <TYText
        text={text}
        color={fontColor}
        size={fontSize}
        weight={fontWeight}
        style={[{ lineHeight: cx(24), marginBottom: cx(86) }, textStyle]}
      />
      <SwitchButton
        onTintColor="#1082FE"
        {...rest}
        style={switchStyle}
        size={switchSize}
        // @ts-ignore
        iconSize={switchIconSize}
        iconColor={switchIconColor}
      />
    </View>
  );
};

NordicBlock.defaultProps = INordicDefaultProps;

export default NordicBlock;
