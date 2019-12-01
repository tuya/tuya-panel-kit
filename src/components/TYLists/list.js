/* eslint-disable new-cap */
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { View, FlatList, StyleSheet, ViewPropTypes } from 'react-native';
import { defaultTheme } from '../theme';
import { CoreUtils, RatioUtils, ThemeUtils } from '../../utils';
import { StyledValueText } from './styled';
import ListItem from './list-item';
import CheckboxItem from './items/checkbox-item';
import InputItem from './items/input-item';
import SliderItem from './items/slider-item';
import SwitchItem from './items/switch-item';
import SwitchButton from '../switch-button';

const { get } = CoreUtils;
const { convertX: cx } = RatioUtils;
const { getTheme, ThemeConsumer } = ThemeUtils;

export default class TYFlatList extends Component {
  static Item = ListItem;
  static CheckboxItem = CheckboxItem;
  static InputItem = InputItem;
  static SliderItem = SliderItem;
  static SwitchItem = SwitchItem;

  static propTypes = {
    ...FlatList.propTypes,
    /* data 格式
      [{
        styles: [Object],
        title: [string],
        value: [bool, string],
        subTitle: [string],
        onPress: [func],
        Icon: [Func | Element],
        Action: [Func | Element],
        ...ListItemProps,
      }]
    */
    data: PropTypes.arrayOf(
      PropTypes.shape({
        renderItem: PropTypes.func,
        SwitchButtonProps: PropTypes.shape({
          ...SwitchButton.propTypes,
        }),
        ...ListItem.propTypes,
      })
    ).isRequired,
    separatorStyle: ViewPropTypes.style,
    flatListRef: PropTypes.func,
    useART: PropTypes.bool,
  };

  static defaultProps = {
    separatorStyle: null,
    flatListRef: null,
    useART: false,
  };

  renderItem = ({ item, ...otherData }) => {
    const { useART } = this.props;
    const { value, SwitchButtonProps, renderItem, ...listItemProps } = item;
    if (typeof renderItem === 'function') {
      return renderItem({ item, ...otherData });
    }
    if (typeof value === 'boolean') {
      return <SwitchItem value={value} useART={useART} {...listItemProps} {...SwitchButtonProps} />;
    } else if (typeof value !== 'undefined') {
      const descFontColor = get(item, 'theme.descFontColor');
      const valueStyle = [descFontColor && { color: descFontColor }, get(item, 'styles.valueText')];
      return (
        <ListItem
          useART={useART}
          {...listItemProps}
          Action={
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <StyledValueText style={valueStyle}>{value}</StyledValueText>
              {typeof listItemProps.Action === 'function'
                ? listItemProps.Action()
                : listItemProps.Action}
            </View>
          }
        />
      );
    }
    return <ListItem useART={useART} {...listItemProps} />;
  };

  render() {
    const {
      contentContainerStyle,
      separatorStyle,
      data,
      flatListRef,
      ...flatListProps
    } = this.props;
    return (
      <ThemeConsumer>
        {globalTheme => {
          const propsWithTheme = { ...this.props, theme: globalTheme };
          const contentStyle = [
            {
              backgroundColor: getTheme(
                propsWithTheme,
                'list.boardBg',
                defaultTheme.list.light.boardBg
              ),
            },
            contentContainerStyle,
          ];
          const sepStyle = [
            {
              marginLeft: cx(16),
              height: StyleSheet.hairlineWidth,
              backgroundColor: getTheme(
                propsWithTheme,
                'list.cellLine',
                defaultTheme.list.light.cellLine
              ),
            },
            separatorStyle,
          ];
          return (
            <FlatList
              contentContainerStyle={contentStyle}
              ItemSeparatorComponent={() => <View style={sepStyle} />}
              renderItem={this.renderItem}
              data={data}
              keyExtractor={item => item.key}
              {...flatListProps}
              ref={flatListRef}
            />
          );
        }}
      </ThemeConsumer>
    );
  }
}
