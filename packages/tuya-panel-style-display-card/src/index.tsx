import React from 'react';
import { View } from 'react-native';
import { Utils } from 'tuya-panel-utils';
import { TYText } from 'tuya-panel-kit';
import { ClassicIconBackground } from 'tuya-panel-style-icon-background';
import { IDisplayCardProps, IDefaultProps } from './interface';

const { parseToStyle } = Utils.ThemeUtils;
const { convertX: cx } = Utils.RatioUtils;

export const StyleDisplayCard: React.FC<IDisplayCardProps> = ({
  style,
  textStyle,
  backgroundColor,
  radius,
  width,
  padding,
  text,
  fontSize,
  fontColor,
  fontWeight,
  unit,
  unitSize,
  unitColor,
  unitWeight,
  unitStyle,
  value,
  valueSize,
  valueColor,
  valueWeight,
  valueStyle,
  isUnitInTop,
  isAlignCenter,
  showIcon,
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
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
          ...parseToStyle(padding, 'padding'),
        },
        style,
      ]}
    >
      <ClassicIconBackground
        showIcon={showIcon}
        iconSize={cx(32)}
        {...rest}
        style={[{ marginRight: cx(12) }, iconStyle]}
      />
      <View style={{ alignItems: isAlignCenter ? 'center' : 'flex-start' }}>
        <View style={{ flexDirection: 'row', alignItems: isUnitInTop ? 'flex-start' : 'flex-end' }}>
          <TYText
            text={`${value}`}
            size={valueSize}
            color={valueColor}
            weight={valueWeight}
            style={[{ lineHeight: cx(90) }, valueStyle]}
          />
          {!!unit && (
            <TYText
              text={unit}
              size={unitSize}
              color={unitColor}
              weight={unitWeight}
              style={[{ lineHeight: cx(24), marginLeft: cx(5), marginTop: cx(12) }, unitStyle]}
            />
          )}
        </View>
        <TYText
          text={text}
          size={fontSize}
          color={fontColor}
          weight={fontWeight}
          style={[{ lineHeight: cx(20), marginTop: cx(4) }, textStyle]}
        />
      </View>
    </View>
  );
};

StyleDisplayCard.defaultProps = IDefaultProps;

export const ClassicDisplayCard = props => <StyleDisplayCard {...props} />;
export const NordicDisplayCard = props => (
  <StyleDisplayCard
    showIcon
    iconSize={cx(22)}
    width={cx(183)}
    radius={cx(12)}
    padding={[cx(20), cx(8), cx(20), cx(20)]}
    iconStyle={{ marginRight: cx(20) }}
    valueSize={cx(24)}
    valueStyle={{ lineHeight: cx(34) }}
    valueColor="rgba(0, 0, 0, 0.9)"
    fontSize={cx(12)}
    fontColor="rgba(0, 0, 0, 0.5)"
    textStyle={{ lineHeight: cx(17), marginTop: 0 }}
    unit=""
    backgroundColor="#fff"
    {...props}
  />
);
export const AcrylicDisplayCard = props => (
  <StyleDisplayCard
    valueSize={cx(64)}
    valueWeight={600}
    valueStyle={{ lineHeight: cx(87.5) }}
    unitStyle={{ lineHeight: cx(25), paddingBottom: cx(14) }}
    unitColor="rgba(0, 0, 0, 0.5)"
    unitSize={cx(18)}
    unitWeight="normal"
    fontWeight={500}
    isUnitInTop={false}
    {...props}
  />
);
