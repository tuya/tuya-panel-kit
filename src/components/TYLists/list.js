/* eslint-disable new-cap */
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet, ViewPropTypes } from 'react-native';
import ListItem from './list-item';
import CheckboxItem from './items/checkbox-item';
import InputItem from './items/input-item';
import SliderItem from './items/slider-item';
import SwitchItem from './items/switch-item';
import SwitchButton from '../switch-button';

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
  };

  static defaultProps = {
    separatorStyle: null,
  };

  renderItem = ({ item, ...otherData }) => {
    const { value, SwitchButtonProps, renderItem, ...listItemProps } = item;
    if (typeof renderItem === 'function') {
      return renderItem({ item, ...otherData });
    }
    if (typeof value === 'boolean') {
      return <SwitchItem value={value} {...listItemProps} {...SwitchButtonProps} />;
    } else if (typeof value !== 'undefined') {
      const valueStyle = [styles.valueText, item.styles && item.styles.valueText];
      return (
        <ListItem
          {...listItemProps}
          Action={
            <View style={styles.row}>
              <Text style={valueStyle}>{value}</Text>
              {typeof listItemProps.Action === 'function'
                ? listItemProps.Action()
                : listItemProps.Action}
            </View>
          }
        />
      );
    }
    return <ListItem {...listItemProps} />;
  };

  render() {
    const { contentContainerStyle, separatorStyle, data, ...flatListProps } = this.props;
    return (
      <FlatList
        contentContainerStyle={[styles.container, contentContainerStyle]}
        ItemSeparatorComponent={() => <View style={[styles.separator, separatorStyle]} />}
        renderItem={this.renderItem}
        data={data}
        keyExtractor={item => item.key}
        {...flatListProps}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f8f8f8',
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#eee',
  },

  valueText: {
    fontSize: 14,
    color: '#999',
    marginRight: 6,
  },
});
