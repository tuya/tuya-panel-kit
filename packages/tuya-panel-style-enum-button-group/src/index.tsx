import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Carousel } from 'tuya-panel-kit';
import { ClassicIconBackground, Background } from 'tuya-panel-style-icon-background';
import { Utils } from 'tuya-panel-utils';
import { splitArr } from './utils';
import { defaultProps, IEnumButtonGroupProps, DataItem } from './interface';

const { convertX: cx } = Utils.RatioUtils;

export { DataItem };
const verticalSpacing = 30;
const proportion = 1.53;

type DataSource = Array<Array<Array<DataItem>>>;

const EnumButtonGroup: React.FC<IEnumButtonGroupProps> = ({
  padding,
  // 按钮图标样式
  iconColor,
  activeIconColor,
  iconSize,
  // 按钮背景样式
  iconBgSize = 0,
  iconBgColor,
  activeIconBgColor,
  iconBgRadius,
  // 按钮文字样式
  textFontSize,
  textFontColor,
  textFontWeight,
  activeTextFontColor,
  activeTextFontWeight,
  // 翻页原点样式
  dotSize,
  dotBgColor,
  activeDotBgColor,
  rowMaxCount = 4, // 一行最多多少个
  pageMaxCount = 8, // 一页最多多少个
  // 背景
  backgroundColor,
  radius,
  width,
  data,
  style,
  disable,
  activeKeys,
  defaultActiveKeys,
  type = 'radio',
  handActiveKeyChange,
}) => {
  const [dataSource, setDataSource] = useState([]);
  const [_activeKeys, _setActiveKeys] = useState(defaultActiveKeys || []);
  const [carouselIndex, setCarouselIndex] = useState(0);

  useEffect(() => {
    if (activeKeys) {
      if (type === 'radio' && activeKeys.length > 1) {
        _setActiveKeys([activeKeys[0]]);
      } else {
        _setActiveKeys(activeKeys);
      }
    }
  }, [activeKeys]);

  useEffect(() => {
    if (!data) {
      setDataSource([]);
    } else {
      const computedDataSource = splitArr(data, rowMaxCount, pageMaxCount);
      // eslint-disable-next-line
      // @ts-ignore
      setDataSource(computedDataSource);
    }
  }, [data]);

  useEffect(() => {
    let has = false;
    dataSource.forEach((pageData, idx) => {
      pageData.forEach(rowData => {
        rowData.forEach(item => {
          if (!item) return;
          if (_activeKeys.indexOf(item.key) > -1) {
            has = true;
            setCarouselIndex(idx);
          }
        });
      });
    });
    !has && setCarouselIndex(0);
  }, [dataSource.length]);

  const buttonWidth = iconBgSize;
  const buttonHeight = iconBgSize * proportion;
  const computedCarouselHeight = () => {
    if (dataSource.length <= 1) return 0;
    // eslint-disable-next-line
    // @ts-ignore
    const row = dataSource[0].length;
    return row * buttonHeight + (row - 1) * verticalSpacing;
  };

  const renderPage = (pageData: Array<Array<DataItem>>, idx: number) => {
    return (
      <View key={`page-${idx}`}>
        {pageData.map((rowItem, idx) => (
          <View
            style={[styles.rowBox, { marginTop: idx > 0 ? verticalSpacing : 0 }]}
            // eslint-disable-next-line
            key={`row-${idx}`}
          >
            {rowItem.map((item, idx) => renderItem(item, idx))}
          </View>
        ))}
      </View>
    );
  };

  const handPress = (key: string, data: DataItem) => {
    let newActiveKeys;
    if (type === 'radio') {
      newActiveKeys = [key];
    } else {
      newActiveKeys = _activeKeys.slice(0);
      if (newActiveKeys.indexOf(key) > -1) {
        newActiveKeys = newActiveKeys.filter(itemKey => itemKey !== key);
      } else {
        newActiveKeys.push(key);
      }
    }

    if (!activeKeys) {
      _setActiveKeys(newActiveKeys);
    }
    handActiveKeyChange && handActiveKeyChange(key, newActiveKeys, data);
  };

  const renderItem = (data: DataItem, idx: number) => {
    if (!data)
      return <View key={`place-${idx}`} style={{ width: buttonWidth, height: buttonHeight }} />;

    const keyHasInActive = _activeKeys.indexOf(data.key) > -1;
    const realIconColor = keyHasInActive ? activeIconColor : iconColor;
    const realIconBgColor = keyHasInActive ? activeIconBgColor : iconBgColor;
    const realTextColor = keyHasInActive ? activeTextFontColor : textFontColor;
    const realTextWeight = keyHasInActive ? activeTextFontWeight : textFontWeight;
    const icon = keyHasInActive ? data.activeIcon : data.icon;

    return (
      <TouchableOpacity
        key={data.key}
        style={[
          styles.itemBox,
          {
            width: buttonWidth,
            height: buttonHeight,
            borderRadius: iconBgRadius,
            overflow: 'hidden',
          },
          (disable || data.disable) && { opacity: 0.3 },
        ]}
        activeOpacity={0.8}
        disabled={disable || data.disable}
        onPress={() => handPress(data.key, data)}
      >
        <Background
          contentStyle={styles.itemBox}
          width={buttonWidth}
          height={buttonHeight}
          background={realIconBgColor}
        >
          <ClassicIconBackground
            icon={data.iconIsImage ? '' : icon}
            image={icon}
            iconSize={iconSize}
            iconColor={realIconColor}
            showIconBg={false}
          />
          <View style={{ marginTop: 8 }}>
            <Text
              style={{
                color: realTextColor,
                fontSize: textFontSize,
                fontWeight: realTextWeight,
              }}
            >
              {data.label}
            </Text>
          </View>
        </Background>
      </TouchableOpacity>
    );
  };

  const renderCarouselDot = () => {
    const contentWidth = dataSource.length * dotSize + (dataSource.length - 1) * 8;
    return (
      <View style={[{ width: contentWidth }, styles.dotWarp]}>
        {new Array(dataSource.length).fill(0).map((_, idx) => (
          <View
            // eslint-disable-next-line
            key={`dot-${idx}`}
            style={{
              width: dotSize,
              height: dotSize,
              borderRadius: dotSize,
              backgroundColor: carouselIndex === idx ? activeDotBgColor : dotBgColor,
            }}
          />
        ))}
      </View>
    );
  };

  const onCarouselChange = (index: number) => {
    setCarouselIndex(index);
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
        },
        style,
      ]}
    >
      {dataSource.length === 1 && renderPage(dataSource[0], 0)}
      {dataSource.length > 1 && (
        <Carousel
          selectedIndex={carouselIndex}
          carouselChange={onCarouselChange}
          hasDots={false}
          style={{ height: computedCarouselHeight() }}
        >
          {dataSource.map((pageData, idx) => renderPage(pageData, idx))}
        </Carousel>
      )}
      {dataSource.length > 1 && <View style={styles.dotBox}>{renderCarouselDot()}</View>}
    </View>
  );
};

const styles = StyleSheet.create({
  dotBox: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: cx(12),
  },
  dotWarp: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemBox: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowBox: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

EnumButtonGroup.defaultProps = defaultProps;

export const AcrylicEnumButtonGroup: React.FC<IEnumButtonGroupProps> = props => (
  <EnumButtonGroup {...props} />
);
