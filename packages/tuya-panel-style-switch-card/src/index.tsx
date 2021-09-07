import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Utils } from 'tuya-panel-utils';
import { TYText, SwitchButton, IconFont } from 'tuya-panel-kit';
import { ClassicIconBackground } from 'tuya-panel-style-icon-background';
import { ISwitchCardProps, IDefaultProps } from './interface';
import {
  NordicDefaultProps,
  AcrylicDefaultProps,
  PaintDefaultProps,
  StudioItemDefaultProps,
  NordicItemDefaultProps,
  AcrylicItemDefaultProps,
  StudioArrowDefaultProps,
  NordicArrowDefaultProps,
  AcrylicArrowDefaultProps,
} from './theme';

const { parseToStyle } = Utils.ThemeUtils;
const { convertX: cx } = Utils.RatioUtils;

export const StyleSwitchCard: React.FC<ISwitchCardProps> = ({
  style,
  disabled,
  backgroundColor,
  radius,
  width,
  padding,
  text,
  fontColor,
  fontSize,
  textStyle,
  subText,
  subFontColor,
  subFontSize,
  subTextStyle,
  switchSize,
  switchIconSize,
  switchIconColor,
  switchStyle,
  showIcon,
  iconStyle,
  type,
  value,
  valueColor,
  valueSize,
  valueStyle,
  fontWeight,
  subFontWeight,
  valueFontWeight,
  unit,
  unitSize,
  unitColor,
  unitWeight,
  unitStyle,
  arrowSize,
  arrowColor,
  children,
  onPress,
  onLongPress,
  milliseconds,
  ...rest
}) => {
  let timer;

  const _handlePressIn = () => {
    if (typeof onLongPress === 'function') {
      onLongPress && onLongPress();
      timer && clearInterval(timer);
      timer = setInterval(() => {
        onLongPress && onLongPress();
      }, milliseconds);
    }
  };

  const _handlePressOut = () => {
    timer && clearInterval(timer);
  };
  const renderRightItem = () => {
    if (React.isValidElement(children)) {
      return children;
    }
    if (type === 'switch') {
      return (
        <SwitchButton
          onTintColor="#1082FE"
          {...rest}
          style={switchStyle}
          size={switchSize}
          // @ts-ignore
          iconSize={switchIconSize}
          iconColor={switchIconColor}
        />
      );
    }
    if (type === 'arrow') {
      return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {!!value && (
            <TYText
              // @ts-ignore
              text={value}
              color={valueColor}
              size={valueSize}
              weight={valueFontWeight}
              style={[{ lineHeight: cx(32), marginRight: cx(4) }, valueStyle]}
            />
          )}
          <IconFont name="arrow" size={arrowSize} color={arrowColor} />
        </View>
      );
    }
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TYText
          // @ts-ignore
          text={value}
          color={valueColor}
          size={valueSize}
          weight={valueFontWeight}
          style={[{ lineHeight: cx(32) }, valueStyle]}
        />
        {unit && (
          <TYText
            text={unit}
            size={unitSize}
            color={unitColor}
            weight={unitWeight}
            style={[{ lineHeight: cx(24) }, unitStyle]}
          />
        )}
      </View>
    );
  };

  return (
    <TouchableOpacity
      style={[
        {
          backgroundColor,
          borderRadius: radius,
          width,
          alignItems: 'center',
          justifyContent: 'space-around',
          flexDirection: 'row',
          ...parseToStyle(
            subText ? [cx(12), cx(24), cx(12), cx(20)] : [cx(24), cx(24), cx(24), cx(20)],
            'padding'
          ),
          ...parseToStyle(padding, 'padding'),
        },
        style,
      ]}
      disabled={disabled}
      onPress={onPress}
      onPressIn={_handlePressIn}
      onPressOut={_handlePressOut}
      activeOpacity={0.8}
    >
      <View style={{ flexDirection: 'row', flex: 1 }}>
        <ClassicIconBackground
          iconSize={cx(22)}
          showIcon={showIcon}
          showIconBg={false}
          iconColor="#D3D3D3"
          {...rest}
          style={iconStyle}
        />
        <View
          style={{
            marginLeft: showIcon ? cx(12) : 0,
            flex: 1,
            marginRight: cx(12),
            justifyContent: 'center',
          }}
        >
          <TYText
            text={text}
            color={fontColor}
            size={fontSize}
            weight={fontWeight}
            style={[{ lineHeight: cx(24) }, textStyle]}
          />
          {!!subText && (
            <TYText
              text={subText}
              color={subFontColor}
              size={subFontSize}
              weight={subFontWeight}
              style={[{ lineHeight: cx(24) }, subTextStyle]}
            />
          )}
        </View>
      </View>
      {renderRightItem()}
    </TouchableOpacity>
  );
};

StyleSwitchCard.defaultProps = IDefaultProps;

export const ClassicSwitchCard = props => <StyleSwitchCard type="switch" {...props} />;
export const NordicSwitchCard = props => (
  <StyleSwitchCard type="switch" {...NordicDefaultProps} {...props} />
);
export const AcrylicSwitchCard = props => (
  <StyleSwitchCard type="switch" {...AcrylicDefaultProps} {...props} />
);
export const PaintSwitchCard = props => (
  <StyleSwitchCard type="switch" {...PaintDefaultProps} {...props} />
);

export const ClassicItemCard = props => <StyleSwitchCard {...StudioItemDefaultProps} {...props} />;
export const NordicItemCard = props => <StyleSwitchCard {...NordicItemDefaultProps} {...props} />;
export const AcrylicItemCard = props => <StyleSwitchCard {...AcrylicItemDefaultProps} {...props} />;

export const ClassicArrowCard = props => (
  <StyleSwitchCard {...StudioArrowDefaultProps} {...props} />
);
export const NordicArrowCard = props => <StyleSwitchCard {...NordicArrowDefaultProps} {...props} />;
export const AcrylicArrowCard = props => (
  <StyleSwitchCard {...AcrylicArrowDefaultProps} {...props} />
);
