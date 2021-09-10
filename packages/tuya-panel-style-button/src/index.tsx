import React, { useRef } from 'react';
import { Utils } from 'tuya-panel-utils';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { TYText } from 'tuya-panel-kit';
import { ClassicIconBackground } from 'tuya-panel-style-icon-background';
import { IButtonProps, IDefaultProps } from './interface';
import { NordicDefaultProps, AcrylicDefaultProps, PaintDefaultProps } from './theme';

const { convertX: cx } = Utils.RatioUtils;

const StyleButton: React.FC<IButtonProps> = ({
  disabled,
  icon,
  iconColor,
  iconSize,
  text,
  onPress,
  onLongPress,
  children,
  milliseconds,
  style,
  padding,
  width,
  radius,
  backgroundColor,
  iconBgColor,
  iconBgSize,
  iconBgRadius,
  fontColor,
  fontWeight,
  fontSize,
  iconBgStyle,
  textStyle,
  activeOpacity,
  showIcon,
  showIconBg,
}) => {
  const timer = useRef(null);
  const prevPressTime = useRef(0);
  const _handlePressIn = () => {
    if (typeof onLongPress === 'function') {
      timer.current && clearTimeout(timer.current);
      prevPressTime.current = new Date().getTime();
      timer.current = setTimeout(() => {
        onLongPress && onLongPress();
      }, milliseconds);
    }
  };

  const _handlePressOut = () => {
    const current = new Date().getTime();
    if (current - prevPressTime.current < milliseconds) {
      timer.current && clearTimeout(timer.current);
    }
  };

  const renderIcon = () => {
    if (!showIcon) return null;
    return (
      <ClassicIconBackground
        style={iconBgStyle}
        showIcon={showIcon}
        showIconBg={showIconBg}
        icon={icon}
        iconColor={iconColor}
        iconSize={iconSize}
        iconBgSize={iconBgSize}
        iconBgColor={iconBgColor}
        iconBgRadius={iconBgRadius}
      />
    );
  };

  return (
    <TouchableOpacity
      disabled={disabled}
      style={[styles.center, { width, borderRadius: radius, backgroundColor }, style]}
      onPress={onPress}
      onPressIn={_handlePressIn}
      onPressOut={_handlePressOut}
      activeOpacity={activeOpacity ? 1 : 0.8}
    >
      {React.isValidElement(children) && children}
      <View
        style={[
          styles.center,
          {
            paddingTop: padding[0],
            paddingRight: padding[1],
            paddingBottom: padding[2],
            paddingLeft: padding[3],
          },
        ]}
      >
        {!React.isValidElement(children) && icon && renderIcon()}
        {!React.isValidElement(children) && text && (
          <TYText
            style={[{ marginTop: showIcon ? cx(8) : 0 }, textStyle]}
            weight={fontWeight}
            color={fontColor}
            size={fontSize}
          >
            {text}
          </TYText>
        )}
      </View>
    </TouchableOpacity>
  );
};

StyleButton.defaultProps = IDefaultProps;

const styles = StyleSheet.create({
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export const ClassicButton = props => <StyleButton {...props} />;
export const NordicButton = props => <StyleButton {...NordicDefaultProps} {...props} />;
export const AcrylicButton = props => <StyleButton {...AcrylicDefaultProps} {...props} />;
export const PaintButton = props => <StyleButton {...PaintDefaultProps} {...props} />;
