import React from 'react';
import { View } from 'react-native';
import { Utils } from 'tuya-panel-utils';
import { TYText, SwitchButton } from 'tuya-panel-kit';
import { ClassicIconBackground } from 'tuya-panel-style-icon-background';
import { IStudioCardProps, IAcrylicDefaultProps } from './interface';

const { parseToStyle } = Utils.ThemeUtils;
const { convertX: cx } = Utils.RatioUtils;

const AcrylicBlock: React.FC<IStudioCardProps> = ({
  style,
  backgroundColor,
  radius,
  width,
  padding,
  text,
  fontColor,
  fontSize,
  textStyle,
  switchSize,
  switchIconSize,
  switchIconColor,
  switchStyle,
  showIcon,
  fontWeight,
  iconStyle,
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
      <ClassicIconBackground
        iconSize={cx(40)}
        showIcon={showIcon}
        showIconBg={false}
        iconColor="#D3D3D3"
        {...rest}
        style={iconStyle}
      />
      <SwitchButton
        onTintColor="#FE7862"
        {...rest}
        style={[{ marginTop: cx(28), marginBottom: cx(10) }, switchStyle]}
        size={switchSize}
        // @ts-ignore
        iconSize={switchIconSize}
        iconColor={switchIconColor}
      />
      <TYText
        text={text}
        color={fontColor}
        size={fontSize}
        weight={fontWeight}
        style={[{ lineHeight: cx(19) }, textStyle]}
      />
    </View>
  );
};

AcrylicBlock.defaultProps = IAcrylicDefaultProps;

export default AcrylicBlock;
