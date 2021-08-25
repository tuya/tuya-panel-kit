import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { Utils } from 'tuya-panel-utils';
import { Carousel } from 'tuya-panel-kit';
import { ClassicIconBackground } from 'tuya-panel-style-icon-background';
import { NordicDefaultProps, AcrylicDefaultProps } from './theme';
import { defaultProps, IEnumCardProps } from './interface';

function computedCurrentPageIndex(activeKey, list, maxCount): number {
  if (list.length <= maxCount) return 0;
  let index = 0;
  for (let i = 0; i < list.length; i++) {
    const data = list[i];
    if (data.key === activeKey) {
      index = Math.floor(i / MAX_PAGE_COUNT);
      return index;
    }
  }
  return index;
}

const MAX_PAGE_COUNT = 4;
const { convertX: cx } = Utils.RatioUtils;
const EnumCard: React.FC<IEnumCardProps> = ({
  list = [],
  width,
  style, // content容器 样式  优先级最高
  textStyle, // 枚举项里面文字样式 优先级最高
  titleStyle, // 标题的样式 优先级最高
  padding,
  // icon属性
  iconColor,
  activeIconColor,
  iconSize,
  // icon bg属性
  iconBgColor,
  activeIconBgColor,
  iconBgSize,
  iconBgRadius,
  showIconBg,
  // 每项文字属性
  showText,
  textColor,
  activeTextColor,
  textFontSize,
  textFontWeight = 'normal',
  // title属性
  title,
  showTitle,
  titleFontSize,
  titleColor,
  titleFontWeight = 'normal',
  // 背景属性
  backgroundColor,
  radius,
  // 轮播原点属性
  dotSize,
  dotColor,
  activeDotColor,
  // 选中的key 传了就是受控组件
  activeKey,
  defaultActiveKey,
  contentStyle,
  carouselPageContent,
  titleContentStyle = {},
  onActiveKeyChange,
  disabled = false,
}) => {
  const [_activeKey, _setActiveKey] = useState(activeKey || defaultActiveKey || '');
  const [pageIndex, setPageIndex] = useState(
    computedCurrentPageIndex(_activeKey, list, MAX_PAGE_COUNT)
  );
  useEffect(() => {
    if (activeKey !== undefined) {
      _setActiveKey(activeKey);
    }
  }, [activeKey]);

  useEffect(() => {
    const index = computedCurrentPageIndex(_activeKey, list, MAX_PAGE_COUNT);
    setPageIndex(index);
  }, [list.length, _activeKey]);

  const renderPageCard = () => {
    const pageCount = Math.ceil(list.length / MAX_PAGE_COUNT);
    const ret = [];
    const isCarousel = list.length > MAX_PAGE_COUNT;

    for (let i = 0; i < pageCount; i++) {
      const startIndex = i * MAX_PAGE_COUNT;
      let endIndex = startIndex + MAX_PAGE_COUNT - 1;
      endIndex = endIndex >= list.length ? list.length - 1 : endIndex;
      const contentView = (
        <View
          style={[isCarousel ? carouselPageContent : {}, styles.pageBox, carouselPageContent]}
          key={i}
        >
          {renderItem(startIndex, endIndex)}
        </View>
      );
      ret.push(contentView);
    }

    return ret;
  };

  const handClick = (key: string) => {
    if (activeKey === undefined) {
      _setActiveKey(key);
    }
    onActiveKeyChange && onActiveKeyChange(key);
  };

  // 用于android下 计算轮播图的高度
  const computedCarouselHeight = () => {
    const iconContentSize = showIconBg ? iconBgSize : iconSize;
    /* eslint-disable */
    // @ts-ignored
    let textMargin = textStyle.marginTop;
    textMargin = typeof textMargin === 'number' ? textMargin : cx(8);
    textMargin = showText ? textMargin : 0;
    // @ts-ignored
    let textSize = textStyle.fontSize;
    /* eslint-enable */
    textSize = typeof textSize === 'number' ? textSize : textFontSize;
    textSize = showText ? textSize : 0;
    // 20 是固定的轮播图区域底部的间距
    return iconContentSize + textMargin + textSize + cx(20);
  };

  const renderItem = (startIndex, endIndex) => {
    const ret = [];
    for (let i = startIndex; i <= endIndex; i++) {
      const data = list[i];
      const realIconColor = data.key === _activeKey ? activeIconColor : iconColor;
      const realIconBgColor = data.key === _activeKey ? activeIconBgColor : iconBgColor;
      const realTextColor = data.key === _activeKey ? activeTextColor : textColor;
      const item = (
        <TouchableOpacity
          style={[(disabled || data.disabled) && { opacity: 0.5 }, styles.itemBox]}
          key={i}
          activeOpacity={0.8}
          onPress={() => handClick(data.key)}
          disabled={disabled || data.disabled}
        >
          <ClassicIconBackground
            icon={data.isImage ? '' : data.icon}
            image={data.icon}
            iconSize={iconSize}
            iconBgSize={iconBgSize}
            iconColor={realIconColor}
            iconBgColor={realIconBgColor}
            iconBgRadius={iconBgRadius}
            showIconBg={showIconBg}
          />
          {data.label && showText && (
            <Text
              style={[
                { color: realTextColor, fontSize: textFontSize, fontWeight: textFontWeight },
                styles.itemText,
                textStyle,
              ]}
            >
              {data.label}
            </Text>
          )}
        </TouchableOpacity>
      );
      ret.push(item);
    }
    return ret;
  };

  const renderDot = () => {
    const pageCount = Math.ceil(list.length / MAX_PAGE_COUNT);
    const contentWidth = pageCount * dotSize + (pageCount - 1) * cx(8);
    const dotList = [];
    for (let i = 0; i < pageCount; i++) {
      const dot = (
        <View
          style={{
            width: dotSize,
            height: dotSize,
            backgroundColor: i === pageIndex ? activeDotColor : dotColor,
            borderRadius: dotSize,
          }}
          key={i}
        />
      );
      dotList.push(dot);
    }
    return <View style={[{ width: contentWidth }, styles.dotWarp]}>{dotList}</View>;
  };

  const onCarouselChange = index => {
    setPageIndex(index);
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
          width,
          overflow: 'hidden',
        },
        style,
      ]}
    >
      {showTitle && Boolean(title) && (
        <View style={titleContentStyle}>
          <Text
            style={[
              { fontSize: titleFontSize, color: titleColor, fontWeight: titleFontWeight },
              titleStyle,
            ]}
          >
            {title}
          </Text>
        </View>
      )}
      <View style={[styles.contentBox, contentStyle]}>
        {list.length > MAX_PAGE_COUNT ? (
          <Carousel
            style={{
              height: Platform.OS === 'android' ? computedCarouselHeight() : 'auto',
            }}
            selectedIndex={pageIndex}
            hasDots={false}
            // dotActiveStyle={{ backgroundColor: activeDotColor }}
            carouselChange={onCarouselChange}
          >
            {renderPageCard()}
          </Carousel>
        ) : (
          <View style={[styles.pageBox, { justifyContent: 'space-between' }]}>
            {renderItem(0, list.length - 1)}
          </View>
        )}
        {list.length > MAX_PAGE_COUNT && <View style={styles.center}>{renderDot()}</View>}
      </View>
    </View>
  );
};

EnumCard.defaultProps = defaultProps;

const styles = StyleSheet.create({
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentBox: {
    flex: 1,
  },
  dotWarp: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemBox: {
    alignItems: 'center',
    display: 'flex',
    flex: 1 / MAX_PAGE_COUNT,
  },
  itemText: {
    marginTop: cx(8),
  },
  pageBox: {
    display: 'flex',
    flexDirection: 'row',
  },
});

export const ClassicEnumCard = props => <EnumCard {...props} />;

export const NordicEnumCard = props => <EnumCard {...props} {...NordicDefaultProps} />;

export const AcrylicEnumCard = props => <EnumCard {...props} {...AcrylicDefaultProps} />;
