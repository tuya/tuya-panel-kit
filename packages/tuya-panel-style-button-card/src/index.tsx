import React, { useState, useEffect } from 'react';
import { Utils } from 'tuya-panel-utils';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ClassicIconBackground } from 'tuya-panel-style-icon-background';
import { defaultProps, IButtonCardProps, RangeItem } from './interface';
import { NordicDefaultProps } from './theme';

const { convertX: cx } = Utils.RatioUtils;

const ButtonCard: React.FC<IButtonCardProps> = ({
  style, // content容器 样式  优先级最高
  textStyle, // 枚举项里面小文字样式 优先级最高
  titleContentStyle, // 标题容器的样式
  titleStyle, // 标题的样式 优先级最高
  buttonStyle, // 按钮的样式 优先级最高
  padding,
  // title属性
  title,
  showTitle,
  titleFontSize,
  titleFontColor,
  titleFontWeight,
  // icon属性
  icon,
  iconSize,
  iconColor,
  // icon 背景属性
  iconBgSize,
  iconBgColor,
  iconBgRadius,
  showIconBg,
  // 按钮样式相关
  buttonHeight,
  buttonBgColor,
  buttonBgRadius,
  buttonFontSize,
  buttonFontColor,
  buttonFontWeight,
  buttonOffset,
  // 按钮选中样式
  activeButtonBgColor,
  activeButtonFontSize,
  activeButtonFontColor,
  activeButtonFontWeight,
  // 背景
  backgroundColor,
  radius,
  disabled = false,
  rowCount,
  list,
  activeKeys,
  defaultActiveKeys,
  activeKeyChange,
  renderButtonItem,
  type,
}) => {
  const [rangeData, setRangeData] = useState([]);
  const [_activeKeys, _setActiveKeys] = useState(activeKeys || defaultActiveKeys || []);

  useEffect(() => {
    if (!list) return;
    const newRangeData = [];
    const rows = Math.ceil(list.length / rowCount);
    for (let i = 0; i < rows; i++) {
      const rowData = [];
      for (let j = 0; j < rowCount; j++) {
        const index = i * rowCount + j;
        if (index >= list.length) {
          rowData.push('placeholder');
        } else {
          rowData.push(list[index]);
        }
      }
      newRangeData.push(rowData);
    }
    setRangeData(newRangeData);
  }, [list, rowCount]);

  useEffect(() => {
    if (activeKeys) {
      _setActiveKeys(activeKeys);
    }
  }, [activeKeys]);

  const handButtonClick = (key, data) => {
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
    activeKeyChange && activeKeyChange(key, newActiveKeys, data);
  };

  const renderItem = (itemData: RangeItem, idx) => {
    /* eslint-disable */
    // @ts-ignore
    if (itemData === 'placeholder') {
      return (
        <View
          key={idx}
          style={[{ marginRight: idx + 1 === rowCount ? 0 : buttonOffset }, styles.buttonItem]}
        />
      );
    }
    /* eslint-enable */

    const itemDisabled = itemData.disabled;
    const hasSelected = _activeKeys.indexOf(itemData.key) > -1;
    const realButtonBgColor = hasSelected ? activeButtonBgColor : buttonBgColor;
    const realTextFontColor = hasSelected ? activeButtonFontColor : buttonFontColor;
    const realTextFontSize = hasSelected ? activeButtonFontSize : buttonFontSize;
    const realTextFontWeight = hasSelected ? activeButtonFontWeight : buttonFontWeight;

    return (
      <TouchableOpacity
        key={idx}
        disabled={disabled || itemDisabled}
        style={[
          (disabled || itemDisabled) && { opacity: 0.5 },
          {
            marginRight: idx + 1 === rowCount ? 0 : buttonOffset,
            height: renderButtonItem ? 'auto' : buttonHeight,
            // borderRadius: buttonBgRadius,
            overflow: 'hidden',
            flex: 1,
          },
        ]}
        activeOpacity={0.8}
        onPress={() => handButtonClick(itemData.key, itemData)}
      >
        {renderButtonItem ? (
          renderButtonItem(itemData)
        ) : (
          <View
            style={[
              { backgroundColor: realButtonBgColor, borderRadius: buttonBgRadius },
              buttonStyle,
              styles.buttonItem,
            ]}
          >
            <Text
              style={[
                {
                  color: realTextFontColor,
                  fontSize: realTextFontSize,
                  fontWeight: realTextFontWeight,
                },
                textStyle,
              ]}
            >
              {itemData.label}
            </Text>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View
      style={[
        {
          paddingTop: padding[0],
          paddingRight: padding[1],
          paddingBottom: padding[2],
          paddingLeft: padding[3],
          borderRadius: radius,
          backgroundColor,
        },
        style,
      ]}
    >
      {showTitle && title && (
        <View style={[styles.titleBox, titleContentStyle]}>
          <ClassicIconBackground
            icon={icon}
            iconColor={iconColor}
            iconBgColor={iconBgColor}
            iconSize={iconSize}
            iconBgSize={iconBgSize}
            iconBgRadius={iconBgRadius}
            showIconBg={showIconBg}
          />
          <Text
            style={[
              styles.titletextStyle,
              {
                color: titleFontColor,
                fontSize: titleFontSize,
                fontWeight: titleFontWeight,
              },
              titleStyle,
            ]}
          >
            {title}
          </Text>
        </View>
      )}
      <View style={styles.contentBox}>
        {rangeData.map((rowData, rowIdx) => (
          /* eslint-disable */
          <View
            style={[{ marginTop: rowIdx === 0 ? 0 : 14 }, styles.rowItem]}
            key={`row-${rowIdx}`}
          >
            {rowData.map((item, idx) => renderItem(item, idx))}
          </View>
        ))}
      </View>
    </View>
  );
};

// @ts-ignore
ButtonCard.defaultProps = defaultProps;

const styles = StyleSheet.create({
  contentBox: {
    flex: 1,
  },
  titleBox: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: cx(20),
  },
  titletextStyle: {
    marginLeft: cx(12),
  },
  rowItem: {
    flex: 1,
    flexDirection: 'row',
  },
  buttonItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

// export default ButtonCard;
export const ClassicButtonCard: React.FC<IButtonCardProps> = props => <ButtonCard {...props} />;
export const NordicButtonCard: React.FC<IButtonCardProps> = props => <ButtonCard {...props} {...NordicDefaultProps} />;
