import React from 'react';
import { View } from 'react-native';
import { Utils } from 'tuya-panel-utils';
import { TYText } from 'tuya-panel-kit';
import { ClassicIconBackground } from 'tuya-panel-style-icon-background';
import { IDepictCardProps, IDefaultProps } from './interface';

const { parseToStyle } = Utils.ThemeUtils;
const { convertX: cx } = Utils.RatioUtils;

export const StyleDepictCard: React.FC<IDepictCardProps> = ({
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
  isUnitInBottom,
  isAlignCenter,
  marginBottom,
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
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: isAlignCenter ? 'center' : 'flex-start',
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
      <View
        style={{ alignItems: isAlignCenter ? 'center' : 'flex-start', justifyContent: 'center' }}
      >
        <TYText
          text={text}
          size={fontSize}
          color={fontColor}
          weight={fontWeight}
          style={[{ lineHeight: cx(24), marginBottom }, textStyle]}
        />
        <View style={{ flexDirection: 'row', alignItems: isUnitInBottom ? 'flex-end' : 'center' }}>
          <TYText
            text={`${value}`}
            size={valueSize}
            color={valueColor}
            weight={valueWeight}
            style={[{ lineHeight: cx(24) }, valueStyle]}
          />
          <TYText
            text={unit}
            size={unitSize}
            color={unitColor}
            weight={unitWeight}
            style={[{ lineHeight: cx(24) }, unitStyle]}
          />
        </View>
      </View>
    </View>
  );
};

StyleDepictCard.defaultProps = IDefaultProps;

export const ClassicDepictCard = (props: IDepictCardProps) => (
  <StyleDepictCard width={cx(258)} {...props} />
);
export const NordicDepictCard = (props: IDepictCardProps) => (
  <StyleDepictCard
    width={cx(152)}
    fontColor="rgba(0, 0, 0, 0.5)"
    padding={[cx(15), cx(25), cx(9), cx(20)]}
    valueColor="#000"
    valueSize={cx(20)}
    valueWeight={500}
    unitColor="#000"
    unitWeight={500}
    valueStyle={{ lineHeight: cx(32) }}
    unitStyle={{ lineHeight: cx(32) }}
    isAlignCenter={false}
    {...props}
  />
);
export const AcrylicDepictCard = (props: IDepictCardProps) => (
  <StyleDepictCard
    width={cx(152)}
    radius={cx(16)}
    backgroundColor="#fff"
    padding={[cx(15), cx(25), cx(9), cx(20)]}
    marginBottom={cx(7)}
    valueSize={cx(24)}
    valueWeight={500}
    valueStyle={{ lineHeight: cx(33) }}
    unitStyle={{ lineHeight: cx(16), paddingBottom: cx(5) }}
    fontColor="rgba(0, 0, 0, 0.5)"
    unitColor="rgba(0, 0, 0, 0.45)"
    unitSize={cx(12)}
    unitWeight={400}
    text="Runtime total"
    fontWeight={500}
    textStyle={{ lineHeight: cx(16.3) }}
    isUnitInBottom
    isAlignCenter={false}
    {...props}
  />
);

export const AcrylicDepictIconCard = (props: IDepictCardProps) => (
  <StyleDepictCard
    width={cx(192)}
    radius={cx(16)}
    backgroundColor="#fff"
    padding={[cx(19), cx(20), cx(20), cx(20)]}
    marginBottom={cx(3)}
    valueSize={cx(16)}
    valueWeight={500}
    valueColor="rgba(0, 0, 0, 0.9)"
    valueStyle={{ lineHeight: cx(22) }}
    showIcon
    unitStyle={{ lineHeight: cx(16), paddingBottom: cx(2) }}
    textStyle={{ lineHeight: cx(16) }}
    fontColor="rgba(0, 0, 0, 0.45)"
    unitColor="rgba(0, 0, 0, 0.5)"
    unitSize={cx(12)}
    unitWeight={400}
    fontWeight={400}
    isUnitInBottom
    isAlignCenter={false}
    {...props}
  />
);
