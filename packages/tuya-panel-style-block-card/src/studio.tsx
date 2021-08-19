import React from 'react';
import { View } from 'react-native';
import { Utils } from 'tuya-panel-utils';
import { TYText, SwitchButton } from 'tuya-panel-kit';
import { ClassicIconBackground } from 'tuya-panel-style-icon-background';
import { IStudioCardProps, IStudioDefaultProps } from './interface';

const { parseToStyle } = Utils.ThemeUtils;
const { convertX: cx } = Utils.RatioUtils;

const StudioBlock: React.FC<IStudioCardProps> = ({
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
      <View
        style={{
          backgroundColor: 'transparent',
          justifyContent: 'space-around',
          flexDirection: 'row',
          flex: 1,
          marginBottom: cx(35),
        }}
      >
        <ClassicIconBackground
          iconSize={cx(22)}
          showIcon={showIcon}
          showIconBg={false}
          iconColor="#D3D3D3"
          {...rest}
          style={iconStyle}
        />
        <View style={{ flex: 1 }} />
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
      <TYText
        text={text}
        weight={fontWeight}
        color={fontColor}
        size={fontSize}
        style={[{ lineHeight: cx(24) }, textStyle]}
      />
    </View>
  );
};

StudioBlock.defaultProps = IStudioDefaultProps;

export default StudioBlock;
