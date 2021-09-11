import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Slider, TYText } from 'tuya-panel-kit';
import { ClassicIconBackground } from 'tuya-panel-style-icon-background';
import { Utils } from 'tuya-panel-utils';
import { defaultProps, ISliderProps } from './interface';
import { classicLargeSliderProps, NorDicSliderCardProps, AcrylicSliderCardProps } from './theme';

export type SliderCardComponentProps = ISliderProps;

const { convertX: cx } = Utils.RatioUtils;
const SliderCard: React.FC<ISliderProps> = ({
  sliderProps,
  padding,
  style, // 最外层容器 样式  优先级最高
  titleStyle, // title容器样式 优先级最高
  titleTextStyle,
  contentStyle, // 内容容器样式 优先级最高
  // 图标属性 title左侧图标
  icon,
  iconIsImage, // icon是否为图片
  iconSize,
  iconColor,
  // 图标背景
  iconBgSize,
  iconBgColor,
  iconBgRadius,
  showIconBg,
  // title属性
  title,
  showTitle,
  titleFontColor,
  titleFontSize,
  titleFontWeight,
  // 参数属性 （title右侧 silder值）
  valueFontColor,
  valueFontSize,
  valueFontWeight,
  // 滑动条
  sliderBgColor, // 滑动条背景色
  sliderGrooveBgColor, // 滑动槽背景色
  sliderThumbColor,
  sliderThumbSize, // 滑块大小
  sliderThumbRadius,
  // 组件背景
  backgroundColor,
  radius,
  // slider组件props
  theme,
  maximumValue,
  minimumValue,
  trackStyle,
  thumbStyle,
  value,
  unit,
  handValueChange,
  handSlidingComplete,
  stepValue,
  type = 'normal',
  renderMinimumTrack,
  renderTitle,
  // 底部的提示文字
  bottomPromptTexts, // 底部的提示文字
  bottomPromptTextFontSize,
  bottomPromptTextFontColor,
  bottomPromptTextFontWeight,
  // slider两侧的图标
  bothSideIcons,
  bothSideIconSize,
  bothSideIconColor,
  canTouchTrack,
  disabled,
  renderValue,
}) => {
  const [_value, _setValue] = useState(value || 0);

  useEffect(() => {
    if (typeof value === 'number') {
      _setValue(value);
    }
  }, [value]);

  const onValueChange = value => {
    _setValue(value);
    handValueChange && handValueChange(value);
  };

  const onSlidingComplete = value => {
    _setValue(value);
    handSlidingComplete && handSlidingComplete(value);
  };

  const bottomPromptTextStyle = {
    fontSize: bottomPromptTextFontSize,
    color: bottomPromptTextFontColor,
    fontWeight: bottomPromptTextFontWeight,
  };

  const renderViewValue = () => {
    if (!renderValue) {
      return (
        <TYText
          style={{
            fontSize: valueFontSize,
            color: valueFontColor,
            fontWeight: valueFontWeight,
          }}
        >
          {_value}
          {unit}
        </TYText>
      );
    }
    const element = renderValue(_value);
    if (typeof element === 'string' || typeof element === 'number') {
      return (
        <TYText
          style={{
            fontSize: valueFontSize,
            color: valueFontColor,
            fontWeight: valueFontWeight,
          }}
        >
          {element}
          {unit}
        </TYText>
      );
    }
    if (React.isValidElement(element)) {
      return element;
    }
    return null;
  };

  return (
    <View
      style={[
        {
          paddingTop: padding[0],
          paddingRight: padding[1],
          paddingBottom: padding[2],
          paddingLeft: padding[3],
          backgroundColor,
          borderRadius: radius,
        },
        style,
      ]}
    >
      {showTitle && Boolean(title) && (
        <View style={[titleStyle, styles.titleContent]}>
          {Boolean(icon) && (
            <ClassicIconBackground
              icon={iconIsImage ? '' : icon}
              image={icon}
              iconColor={iconColor}
              iconSize={iconSize}
              iconBgColor={iconBgColor}
              iconBgRadius={iconBgRadius}
              iconBgSize={iconBgSize}
              showIconBg={showIconBg}
            />
          )}
          {renderTitle ? (
            renderTitle(_value)
          ) : (
            /* eslint-disable */
            <React.Fragment>
              <TYText
                style={[
                  {
                    fontSize: titleFontSize,
                    color: titleFontColor,
                    fontWeight: titleFontWeight,
                    marginLeft: icon ? cx(8) : 0,
                  },
                  titleTextStyle,
                ]}
              >
                {title}
              </TYText>
              <View style={styles.valueBox}>
                {/* eslint-disable */}
                {/* @ts-ignore */}
                <TYText style={{ color: valueFontColor, marginRight: cx(5) }}>·</TYText>
                {renderViewValue()}
              </View>
            </React.Fragment>
          )}
        </View>
      )}
      <View style={contentStyle}>
        <View style={styles.sliderBox}>
          {bothSideIcons && Array.isArray(bothSideIcons) && (
            <View style={{marginRight: cx(8)}}>
              <ClassicIconBackground
                icon={bothSideIcons[0].isImage ? '' : bothSideIcons[0].icon}
                image={bothSideIcons[0].icon}
                iconSize={bothSideIconSize}
                iconColor={bothSideIconColor}
                showIconBg={false}
              />
            </View>
          )}
          <Slider
            style={{flex: 1}}
            value={_value}
            theme={{
              minimumTrackTintColor: sliderBgColor,
              maximumTrackTintColor: sliderGrooveBgColor,
              ...theme,
            }}
            trackStyle={trackStyle}
            stepValue={stepValue}
            thumbStyle={{
              width: sliderThumbSize,
              height: sliderThumbSize,
              borderRadius: sliderThumbRadius,
              backgroundColor: sliderThumbColor,
              // @ts-ignore
              ...thumbStyle,
            }}
            maximumValue={maximumValue}
            minimumValue={minimumValue}
            onValueChange={onValueChange}
            onSlidingComplete={onSlidingComplete}
            type={type}
            renderMinimumTrack={renderMinimumTrack}
            // type="parcel"
            // minimumTrackTintColor="#ff6700"
            canTouchTrack={canTouchTrack}
            disabled={disabled}
            {...sliderProps}
          />
          {bothSideIcons && Array.isArray(bothSideIcons) && (
            <View style={{marginLeft: cx(8)}}>
              <ClassicIconBackground
                icon={bothSideIcons[1].isImage ? '' : bothSideIcons[1].icon}
                image={bothSideIcons[1].icon}
                iconSize={bothSideIconSize}
                iconColor={bothSideIconColor}
                showIconBg={false}
              />
            </View>
          )}
        </View>
        {bottomPromptTexts && Array.isArray(bottomPromptTexts) && (
          <View style={styles.bottomPromptTextsBox}>
            <TYText style={bottomPromptTextStyle}>{bottomPromptTexts[0]}</TYText>
            <TYText style={bottomPromptTextStyle}>{bottomPromptTexts[1]}</TYText>
          </View>
        )}
      </View>
    </View>
  );
};

// @ts-ignore
SliderCard.defaultProps = defaultProps;

const styles = StyleSheet.create({
  titleContent: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  valueBox: {
    alignItems: 'center',
    flexDirection: 'row',
    marginLeft: cx(10),
  },
  bottomPromptTextsBox: {
    marginTop: cx(9),
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  acrylicTitleContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sliderBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export const ClassicSliderCard = props => <SliderCard {...props} />;

export const ClassicLargeSliderCard: React.FC<ISliderProps> = props => (
  <SliderCard {...classicLargeSliderProps} {...props} />
);

export const NordicLargeSliderCard: React.FC<ISliderProps> = props => (
  <SliderCard {...NorDicSliderCardProps} {...props} />
);

// AcrylicSliderCardProps
export const AcrylicSliderCard: React.FC<ISliderProps> = props => {
  const {
    titleFontSize,
    titleFontColor,
    titleFontWeight,
    icon,
    titleTextStyle,
    title,
    valueFontSize,
    valueFontColor,
    valueFontWeight,
    unit,
    renderValue,
  } = props;

  const renderViewValue = (value) => {
    if (!renderValue) {
      return (
        <TYText
          style={{
            fontSize: valueFontSize,
            color: valueFontColor,
            fontWeight: valueFontWeight,
          }}
        >
          {value}
          {unit}
        </TYText>
      );
    }
    const element = renderValue(value);
    if (typeof element === 'string' || typeof element === 'number') {
      return (
        <TYText
          style={{
            fontSize: valueFontSize,
            color: valueFontColor,
            fontWeight: valueFontWeight,
          }}
        >
          {element}
          {unit}
        </TYText>
      );
    }
    if (React.isValidElement(element)) {
      return element;
    }
    return null;
  };

  const renderTitle = _value => {
    return (
      <View style={styles.acrylicTitleContent}>
        <TYText
          style={[
            {
              fontSize: titleFontSize,
              color: titleFontColor,
              fontWeight: titleFontWeight,
              marginLeft: icon ? cx(8) : 0,
            },
            titleTextStyle,
          ]}
        >
          {title}
        </TYText>
        {renderViewValue(_value)}
      </View>
    );
  };
  return <SliderCard {...AcrylicSliderCardProps} {...props} renderTitle={renderTitle} />;
};

AcrylicSliderCard.defaultProps = AcrylicSliderCardProps;
