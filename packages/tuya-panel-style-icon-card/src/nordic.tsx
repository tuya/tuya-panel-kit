import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Utils } from 'tuya-panel-utils';
import { TYText, IconFont } from 'tuya-panel-kit';
import { ClassicIconBackground } from 'tuya-panel-style-icon-background';
import { INordicIconCardProps, INordicDefaultProps } from './interface';

const { parseToStyle } = Utils.ThemeUtils;
const { convertX: cx } = Utils.RatioUtils;

const NordicIconBlock: React.FC<INordicIconCardProps> = ({
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
  arrowSize,
  arrowColor,
  hasArrow,
  showIcon,
  onPress,
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
        iconSize={cx(21)}
        iconBgSize={cx(48)}
        iconBgRadius={cx(12)}
        iconBgColor="#1082FE"
        {...rest}
        showIcon={showIcon}
        style={iconStyle}
      />
      <TYText
        text={text}
        weight={fontWeight}
        color={fontColor}
        size={fontSize}
        style={[
          {
            lineHeight: cx(22),
            marginBottom: showIcon ? cx(4) : cx(75),
            marginTop: showIcon ? cx(29) : 0,
          },
          textStyle,
        ]}
      />
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
          backgroundColor: 'transparent',
        }}
        disabled={!hasArrow}
        onPress={onPress}
        activeOpacity={0.8}
      >
        <View style={{ flex: 1 }}>
          <TYText
            text={`${value}`}
            weight={valueWeight}
            color={valueColor}
            size={valueSize}
            style={[{ lineHeight: cx(39) }, valueStyle]}
          />
          {!!unit && (
            <TYText
              text={unit}
              weight={unitWeight}
              color={unitColor}
              size={unitSize}
              style={[{ lineHeight: cx(39) }, unitStyle]}
            />
          )}
        </View>
        {hasArrow && <IconFont name="arrow" size={arrowSize} color={arrowColor} />}
      </TouchableOpacity>
    </View>
  );
};

NordicIconBlock.defaultProps = INordicDefaultProps;

export default NordicIconBlock;
