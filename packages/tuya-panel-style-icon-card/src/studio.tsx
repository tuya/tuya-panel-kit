import React from 'react';
import { View } from 'react-native';
import { Utils } from 'tuya-panel-utils';
import { TYText } from 'tuya-panel-kit';
import { ClassicIconBackground } from 'tuya-panel-style-icon-background';
import { IStudioIconCardProps, IStudioDefaultProps } from './interface';

const { parseToStyle } = Utils.ThemeUtils;
const { convertX: cx } = Utils.RatioUtils;

const StudioIconBlock: React.FC<IStudioIconCardProps> = ({
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
      <View
        style={{
          backgroundColor: 'transparent',
          alignItems: 'center',
          flexDirection: 'row',
          marginBottom: cx(23),
        }}
      >
        <ClassicIconBackground iconSize={cx(36)} showIcon {...rest} style={iconStyle} />
        <TYText
          text={text}
          weight={fontWeight}
          color={fontColor}
          size={fontSize}
          style={[{ lineHeight: cx(24), marginLeft: cx(12) }, textStyle]}
        />
      </View>
      <View style={{ flexDirection: 'row' }}>
        <TYText
          text={`${value}`}
          weight={valueWeight}
          color={valueColor}
          size={valueSize}
          style={[{ lineHeight: cx(26) }, valueStyle]}
        />
        {!!unit && (
          <TYText
            text={unit}
            weight={unitWeight}
            color={unitColor}
            size={unitSize}
            style={[{ lineHeight: cx(26) }, unitStyle]}
          />
        )}
      </View>
    </View>
  );
};

StudioIconBlock.defaultProps = IStudioDefaultProps;

export default StudioIconBlock;
