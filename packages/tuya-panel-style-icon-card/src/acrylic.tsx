import React from 'react';
import { View } from 'react-native';
import { Utils } from 'tuya-panel-utils';
import { TYText } from 'tuya-panel-kit';
import { ClassicIconBackground } from 'tuya-panel-style-icon-background';
import { IStudioIconCardProps, IAcrylicDefaultProps } from './interface';

const { parseToStyle } = Utils.ThemeUtils;
const { convertX: cx } = Utils.RatioUtils;

const AcrylicIconBlock: React.FC<IStudioIconCardProps> = ({
  style,
  backgroundColor,
  radius,
  width,
  padding,
  text,
  fontColor,
  fontSize,
  textStyle,
  fontWeight,
  iconStyle,
  value,
  unit,
  valueWeight,
  valueColor,
  valueSize,
  valueStyle,
  unitWeight,
  unitColor,
  unitSize,
  unitStyle,
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
      <ClassicIconBackground iconSize={cx(40)} showIcon {...rest} style={iconStyle} />
      <View
        style={{
          flexDirection: 'row',
          marginBottom: cx(3),
          marginTop: cx(20),
          alignItems: 'baseline',
        }}
      >
        <TYText
          text={value}
          weight={valueWeight}
          color={valueColor}
          size={valueSize}
          style={[{ lineHeight: cx(44) }, valueStyle]}
        />
        <TYText
          text={unit}
          weight={unitWeight}
          color={unitColor}
          size={unitSize}
          style={[{ lineHeight: cx(22) }, unitStyle]}
        />
      </View>
      <TYText
        text={text}
        weight={fontWeight}
        color={fontColor}
        size={fontSize}
        style={[{ lineHeight: cx(19) }, textStyle]}
      />
    </View>
  );
};

AcrylicIconBlock.defaultProps = IAcrylicDefaultProps;

export default AcrylicIconBlock;
