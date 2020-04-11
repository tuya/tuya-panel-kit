import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import { RatioUtils, ThemeUtils } from '../../utils';
import Button from '../button';
import TYText from '../TYText';
import Slider from '../slider';
import IconFont from '../iconfont';
import TimerPicker from '../timer-picker';
import TYFlatList from '../TYLists/list';
import DatePicker from '../date-picker';
import SwitchButton from '../switch-button';
import { defaultTheme } from '../theme';
import { popup } from '../theme/theme-get';

const DEFAULT_LIST_THEME = defaultTheme.popup.basic;
const DEFAULT_PICKER_THEME = defaultTheme.picker.light;

export const backIcon =
  'M770.673778 21.959111a56.888889 56.888889 0 0 1 0 80.440889l-402.204445 402.318222 402.204445 402.204445a56.888889 56.888889 0 0 1-80.440889 80.497777L247.751111 544.938667a56.888889 56.888889 0 0 1 0-80.497778L690.232889 21.959111a56.888889 56.888889 0 0 1 80.440889 0z';

const { convertX: cx, isIphoneX } = RatioUtils;
const { getTheme, ThemeConsumer } = ThemeUtils;
const {
  cellHeight,
  cellBg,
  cellFontSize,
  cellFontColor,
  titleRadius,
  titleHeight,
  titleBg,
  footerRadius,
  bottomBg,
  lineColor,
  titleFontSize,
  titleFontColor,
  cancelFontSize,
  cancelFontColor,
  confirmFontSize,
  confirmFontColor,
  subTitleFontColor,
  backIconColor,
} = popup;

/**
 * Common Popup
 */
export const Row = styled(View)`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: ${cellHeight}px;
  background-color: ${cellBg};
`;

export const StyledContainer = styled(View)`
  /* bottom: -100%; */
  border-top-left-radius: ${titleRadius};
  border-top-right-radius: ${titleRadius};
  border-bottom-left-radius: ${footerRadius};
  border-bottom-right-radius: ${footerRadius};
  background-color: ${bottomBg};
`;

export const StyledTitle = styled(Row)`
  justify-content: space-around;
  height: ${titleHeight}px;
  background-color: ${titleBg};
  border-top-left-radius: ${titleRadius};
  border-top-right-radius: ${titleRadius};
  border-bottom-color: ${lineColor};
  border-bottom-width: ${StyleSheet.hairlineWidth};
`;

export const StyledTitleText = styled(TYText)`
  font-size: ${titleFontSize};
  color: ${titleFontColor};
`;

export const StyledSwitch = styled(SwitchButton).attrs({
  tintColor: props => getTheme(props, 'popup.tintColor', '#e5e5e5'),
})`
  position: absolute;
  right: ${cx(16)}px;
`;

export const StyledFooter = styled(Row)`
  padding-bottom: ${isIphoneX ? 20 : 0};
  margin-top: ${cx(6)}px;
  border-bottom-left-radius: ${footerRadius};
  border-bottom-right-radius: ${footerRadius};
  height: ${props => {
    const height = cellHeight(props);
    return isIphoneX ? height + 20 : height;
  }}px;
`;

export const StyledButton = styled(TouchableOpacity).attrs({
  activeOpacity: 0.8,
})`
  flex: 1;
  margin: 12px 0;
  align-self: stretch;
  align-items: center;
  justify-content: center;
  border-right-width: ${props => (props.bordered ? StyleSheet.hairlineWidth : 0)};
  border-right-color: ${lineColor};
`;

export const StyledCancelText = styled(TYText)`
  font-size: ${cancelFontSize};
  color: ${cancelFontColor};
`;

export const StyledConfirmText = styled(TYText)`
  font-weight: bold;
  font-size: ${confirmFontSize};
  color: ${confirmFontColor};
`;

export const StyledSubTitleText = styled(TYText)`
  font-size: ${props => {
    const size = getTheme(props, 'popup.titleFontSize', DEFAULT_LIST_THEME.titleFontSize);
    return (size * 6) / 7;
  }};
  color: ${subTitleFontColor};
  margin-top: ${cx(5)}px;
`;

export const StyledBackView = styled(View)`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: 12px;
`;

export const StyledTouchView = styled(TouchableOpacity).attrs({
  touchableOpacity: 0.8,
})`
  width: ${cx(19)}px;
  height: ${cx(18)}px;
  align-items: center;
  justify-content: center;
`;

export const StyledBackText = styled(TYText).attrs({
  color: backIconColor,
  size: titleFontSize,
})``;

export const StyledBackIcon = props => {
  /* eslint-disable react/prop-types */
  const { color, ...rest } = props;
  return (
    <ThemeConsumer>
      {theme => {
        const propsWithTheme = { ...props, theme };
        return (
          <IconFont
            size={cx(18)}
            color={
              color ||
              getTheme(propsWithTheme, 'popup.backIconColor', DEFAULT_LIST_THEME.backIconColor)
            }
            {...rest}
          />
        );
      }}
    </ThemeConsumer>
  );
};

/**
 * Popup.picker
 */
export const StyledPickerContainer = styled(View)`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: ${cellBg};
  opacity: ${props => (props.disabled ? 0.6 : 1)};
`;

export const StyledPickerUnit = styled(View)`
  position: absolute;
  top: 0;
  align-items: center;
  justify-content: center;
`;

export const StyledPickerUnitText = styled(TYText)`
  font-size: ${cellFontSize};
  color: ${props => props.pickerUnitColor || cellFontColor};
`;

/**
 * Popup.countdown
 */
export const StyledCountdownContainer = styled(View)`
  flex-direction: row;
  align-items: center;
  padding: 1px 0;
  background-color: ${cellBg};
`;

export const StyledOverview = styled(View)`
  flex-direction: row;
  align-items: center;
  overflow: hidden;
`;

/**
 * Popup.timerPicker
 */
export const StyledTimerPickerContainer = styled(View)`
  height: 300px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 0 24px;
`;

export const StyledTimerPickerRow = styled(View)`
  flex: 1;
  flex-direction: row;
`;

export const StyledSymbolText = styled(TYText)`
  padding: 0 18px;
  font-size: ${props => getTheme(props, 'picker.unitFontSize', DEFAULT_PICKER_THEME.unitFontSize)};
  color: ${props => getTheme(props, 'picker.unitFontColor', DEFAULT_PICKER_THEME.unitFontColor)};
`;

export const StyledTimerPicker = props => {
  return (
    <ThemeConsumer>
      {globalTheme => {
        const timerPickerTheme = { ...props, theme: globalTheme };
        const fontColor = getTheme(timerPickerTheme, 'popup.cellFontColor');
        let timerStyle;
        /* eslint-disable react/prop-types */
        if (props.style && props.style.backgroundColor) {
          timerStyle = props.style;
        } else if (props.style) {
          timerStyle = {
            ...props.style,
            backgroundColor: getTheme(timerPickerTheme, 'popup.cellBg'),
          };
        } else {
          timerStyle = { backgroundColor: getTheme(timerPickerTheme, 'popup.cellBg') };
        }
        return <TimerPicker {...props} pickerFontColor={fontColor} style={timerStyle} />;
      }}
    </ThemeConsumer>
  );
};

/**
 * Popup.numberSelector
 */
export const StyledSliderContent = styled(View)`
  padding: 32px 0px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: ${cellBg};
`;

export const StyledSliderContainer = styled(View)`
  height: 56px;
  margin-top: 16px;
  flex-direction: ${props => props.flexDirection || 'row'};
  align-items: center;
  justify-content: center;
`;

export const StyledSlider = styled(Slider).attrs({
  minimumTrackTintColor: '#0B7CFF',
  maximumTrackTintColor: props => getTheme(props, 'popup.numberSelector.maximumTrackTintColor'),
})`
  width: ${cx(220)}px;
  margin: 0 12px;
`;

export const StyledSliderBtn = styled(Button).attrs({
  iconSize: 26,
  iconColor: props => getTheme(props, 'popup.numberSelector.cellPlusColor'),
})`
  opacity: ${props => (props.disabled ? 0.6 : 1)};
`;

export const StyledDisplayText = styled(TYText).attrs({
  numberOfLines: 1,
})`
  width: ${cx(200)}; /* 避免显示过长文案 */
  text-align: center;
  font-weight: 500;
  font-size: 56px;
  color: ${cellFontColor};
  background-color: transparent;
`;

/**
 *  DatePicker
 */

export const StyledDatePicker = props => {
  return (
    <ThemeConsumer>
      {globalTheme => {
        const datePickerTheme = { ...props, theme: globalTheme };
        const fontColor = getTheme(datePickerTheme, 'popup.cellFontColor');
        let dateStyle;
        /* eslint-disable react/prop-types */
        if (props.style && props.style.backgroundColor) {
          dateStyle = props.style;
        } else if (props.style) {
          dateStyle = {
            ...props.style,
            backgroundColor: getTheme(datePickerTheme, 'popup.cellBg'),
          };
        } else {
          dateStyle = { backgroundColor: getTheme(datePickerTheme, 'popup.cellBg') };
        }
        return <DatePicker {...props} pickerFontColor={fontColor} style={dateStyle} />;
      }}
    </ThemeConsumer>
  );
};

/**
 * Popup.List
 */

export const StyledFlatList = props => {
  return (
    <ThemeConsumer>
      {globalTheme => {
        const listTheme = { ...props, theme: globalTheme };
        return (
          <TYFlatList
            separatorStyle={{
              backgroundColor: getTheme(listTheme, 'popup.lineColor'),
              marginLeft: 0,
            }}
            {...props}
          />
        );
      }}
    </ThemeConsumer>
  );
};

export const StyledIconFont = props => {
  const { color, ...rest } = props;
  return (
    <ThemeConsumer>
      {theme => {
        const propsWithTheme = { ...props, theme };
        return (
          <IconFont
            size={cx(28)}
            color={
              color ||
              getTheme(propsWithTheme, 'popup.checkboxColor', DEFAULT_LIST_THEME.checkboxColor)
            }
            {...rest}
          />
        );
      }}
    </ThemeConsumer>
  );
};
