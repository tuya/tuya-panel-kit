import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Platform,
  UIManager,
  findNodeHandle,
} from 'react-native';
import { Utils } from 'tuya-panel-utils';
import { Carousel, TYText } from 'tuya-panel-kit';
import { ClassicIconBackground } from 'tuya-panel-style-icon-background';
import { NordicDefaultProps, AcrylicDefaultProps } from './theme';
import { defaultProps, IEnumCardProps } from './interface';

function computedCurrentPageIndex(activeKey, list, maxCount): number {
  if (!list || list.length <= maxCount) return 0;
  let index = 0;
  for (let i = 0; i < list.length; i++) {
    const data = list[i];
    if (data.key === activeKey) {
      index = Math.floor(i / maxCount);
      return index;
    }
  }
  return index;
}

function getDataSource(data = [], pageCount) {
  const ret = [];
  let currentIndex = 0;
  while (currentIndex < data.length) {
    let pageData = data.slice(currentIndex, currentIndex + pageCount);
    if (pageData.length < pageCount) {
      pageData = pageData.concat(new Array(pageCount - pageData.length).fill(null));
    }
    ret.push(pageData);
    currentIndex += pageCount;
  }
  return ret;
}

const { convertX: cx } = Utils.RatioUtils;
const EnumCard: React.FC<IEnumCardProps> = ({
  data,
  pageCount,
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
  dotWrapperStyle,
  titleContentStyle = {},
  onActiveKeyChange,
  disabled = false,
}) => {
  const [_dataSource, _setDataSource] = useState([]);
  const [_activeKey, _setActiveKey] = useState(activeKey || defaultActiveKey || '');
  const [pageIndex, setPageIndex] = useState(computedCurrentPageIndex(_activeKey, data, pageCount));
  const [carouselHeight, setCarouselHeight] = useState(0);
  const carouselContentRef = useRef();

  useEffect(() => {
    const ret = getDataSource(data, pageCount);
    _setDataSource(ret);
  }, [data, pageCount]);

  useEffect(() => {
    if (activeKey !== undefined) {
      _setActiveKey(activeKey);
    }
  }, [activeKey]);

  useEffect(() => {
    const index = computedCurrentPageIndex(_activeKey, data, pageCount);
    setPageIndex(index);
  }, [data.length, _activeKey]);

  useEffect(() => {
    const node = findNodeHandle(carouselContentRef.current);
    if (!node || Platform.OS !== 'android') return;
    UIManager.measure(node, (x, y, width, height) => {
      setCarouselHeight(height);
    });
  }, [_dataSource]);

  const handClick = (key: string) => {
    if (activeKey === undefined) {
      _setActiveKey(key);
    }
    onActiveKeyChange && onActiveKeyChange(key);
  };

  const renderItem = (dataItem, idx) => {
    if (!dataItem) return <View style={{ flex: 1, alignItems: 'center' }} key={idx} />;
    const realIconColor = dataItem.key === _activeKey ? activeIconColor : iconColor;
    const realIconBgColor = dataItem.key === _activeKey ? activeIconBgColor : iconBgColor;
    const realTextColor = dataItem.key === _activeKey ? activeTextColor : textColor;
    return (
      <View style={{ flex: 1, alignItems: 'center' }} key={idx}>
        <TouchableOpacity
          style={[(disabled || dataItem.disabled) && { opacity: 0.5 }, styles.itemBox]}
          activeOpacity={0.8}
          onPress={() => handClick(dataItem.key)}
          disabled={disabled || dataItem.disabled}
        >
          <ClassicIconBackground
            icon={dataItem.isImage ? '' : dataItem.icon}
            image={dataItem.icon}
            iconSize={iconSize}
            iconBgSize={iconBgSize}
            iconColor={realIconColor}
            iconBgColor={realIconBgColor}
            iconBgRadius={iconBgRadius}
            showIconBg={showIconBg}
          />
          {dataItem.label && showText && (
            <TYText
              style={[
                { color: realTextColor, fontSize: textFontSize, fontWeight: textFontWeight },
                styles.itemText,
                textStyle,
              ]}
            >
              {dataItem.label}
            </TYText>
          )}
        </TouchableOpacity>
      </View>
    );
  };

  const renderDot = () => {
    const pageCount = _dataSource.length;
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
          <TYText
            style={[
              { fontSize: titleFontSize, color: titleColor, fontWeight: titleFontWeight },
              titleStyle,
            ]}
          >
            {title}
          </TYText>
        </View>
      )}
      <View style={contentStyle}>
        {_dataSource.length > 1 && (carouselHeight !== 0 || Platform.OS !== 'android') ? (
          <Carousel
            style={{
              height: Platform.OS === 'android' ? carouselHeight : 'auto',
            }}
            selectedIndex={pageIndex}
            hasDots={false}
            carouselChange={onCarouselChange}
          >
            {_dataSource.map((pageItem, pageIdx) => (
              /* eslint-disable */
              <View style={styles.pageBox} key={pageIdx}>
                {pageItem.map((item, idx) => renderItem(item, idx))}
              </View>
              /* eslint-enable */
            ))}
          </Carousel>
        ) : (
          // Android下会先渲染这里，以获得实际内容区域的高度
          <View
            ref={carouselContentRef}
            style={[styles.pageBox, { justifyContent: 'space-between' }]}
          >
            {pageIndex === 0
              ? _dataSource[0] && _dataSource[0].map((item, idx) => renderItem(item, idx))
              : _dataSource[pageIndex] &&
                _dataSource[pageIndex].map((item, idx) => renderItem(item, idx))}
          </View>
        )}
        {_dataSource.length > 1 && (
          <View style={[styles.center, dotWrapperStyle]}>{renderDot()}</View>
        )}
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
  dotWarp: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemBox: {
    alignItems: 'center',
  },
  itemText: {
    marginTop: cx(8),
  },
  pageBox: {
    flexDirection: 'row',
    opacity: 1,
  },
});

export const ClassicEnumCard = (props: IEnumCardProps) => <EnumCard {...props} />;

export const NordicEnumCard = (props: IEnumCardProps) => (
  <EnumCard {...NordicDefaultProps} {...props} />
);

export const AcrylicEnumCard = (props: IEnumCardProps) => (
  <EnumCard {...AcrylicDefaultProps} {...props} />
);
