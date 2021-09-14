import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { TYText, TabBar } from 'tuya-panel-kit';
import { ClassicIconBackground } from 'tuya-panel-style-icon-background';
import { Utils } from 'tuya-panel-utils';
import { IEnumTabsButtonCardProps, defaultProps, EnumItem } from './interface';

const { convertX: cx } = Utils.RatioUtils;

function findValueByKey(key: string | undefined, data: Array<EnumItem>): string {
  if (!data || !key) return '';
  let value = '';
  data.forEach(item => {
    if (item.key === key) {
      value = item.label;
    }
  });
  return value;
}

const EnumTabsButtonCard: React.FC<IEnumTabsButtonCardProps> = ({
  data,
  padding = [],
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
  // 组件背景
  backgroundColor,
  radius,
  // 滑动槽
  grooveBgColor,
  grooveHeight = 0,
  // 滑块
  thumbBgColor,
  thumbHeight = 0,
  // 当前选中的文字样式
  activeTextColor,
  activeTextFontSize,
  circleStyle,
  activeKey,
  defaultActiveKey,
  unit,
  onChange,
}) => {
  const [_activeKey, _setActiveKey] = useState(
    activeKey || defaultActiveKey || (data ? data[0].key : '')
  );
  const [_value, _setValue] = useState(findValueByKey(_activeKey, data));
  useEffect(() => {
    if (activeKey !== undefined) {
      _setActiveKey(activeKey);
      _setValue(findValueByKey(activeKey, data));
    }
  }, [activeKey, data]);

  const tabRadiosCircle = data.map(item => ({
    key: item.key,
    title: item.label,
    activeTextStyle: { color: activeTextColor, fontSize: activeTextFontSize },
    circleStyle: {
      ...circleStyle,
      backgroundColor: thumbBgColor,
      /* eslint-disable */
      // @ts-ignore
      opacity: item.disabled ? 0.1 : circleStyle.opacity ? circleStyle.opacity : 1,
      /* eslint-enable */
    },
    onItemPress: () => handClickItem(item),
  }));

  const handClickItem = (item: EnumItem) => {
    if (item.disabled) return;
    if (activeKey === undefined) {
      _setActiveKey(item.key);
      _setValue(item.label);
    }
    onChange && onChange(item.key, item);
  };

  const offset = Math.floor((grooveHeight - thumbHeight) / 2);
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
      {showTitle && (
        <View style={[styles.titleContent, titleStyle]}>
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
            <TYText
              style={{
                color: valueFontColor,
                marginRight: cx(5),
                fontSize: valueFontSize,
                fontWeight: valueFontWeight,
              }}
            >
              ·
            </TYText>
            <TYText
              style={{
                color: valueFontColor,
                marginRight: cx(5),
                fontSize: valueFontSize,
                fontWeight: valueFontWeight,
              }}
            >
              {_value}{unit}
            </TYText>
          </View>
        </View>
      )}
      <View style={contentStyle}>
        <TabBar
          type="radioCircle"
          tabs={tabRadiosCircle}
          activeColor={thumbBgColor}
          tabStyle={{ width: cx(3), height: cx(3), overflow: 'hidden' }}
          gutter={cx(offset)}
          style={{ backgroundColor: grooveBgColor }}
          activeKey={_activeKey}
        />
      </View>
    </View>
  );
};

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
});

/* eslint-disable */
// @ts-ignore
EnumTabsButtonCard.defaultProps = defaultProps;

export default EnumTabsButtonCard;

export const ClassicEnumTabsButtonCard: React.FC<IEnumTabsButtonCardProps> = props => <EnumTabsButtonCard {...props} />;
