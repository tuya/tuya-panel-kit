import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ViewPropTypes,
} from 'react-native';
import ListItem from './list-item';
import SwitchButton from '../switch-button';
import { RatioUtils } from '../../utils';

const {
  convertX: cx,
} = RatioUtils;

/* eslint-disable new-cap */
export default class TYFlatList extends Component {
  static Item = ListItem;
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
    data: PropTypes.arrayOf(PropTypes.shape({
      renderItem: PropTypes.func,
      SwitchButtonProps: PropTypes.shape({
        ...SwitchButton.propTypes,
      }),
      ...ListItem.propTypes,
    })).isRequired,
    separatorStyle: ViewPropTypes.style,
  };

  static defaultProps = {
    separatorStyle: null,
  }

  renderItem = ({ item, ...otherData }) => {
    const {
      value,
      onValueChange,
      SwitchButtonProps,
      renderItem,
      ...listItemProps
    } = item;
    if (typeof renderItem === 'function') {
      return renderItem({ item, ...otherData });
    }
    if (typeof value === 'boolean') {
      return (
        <ListItem
          disabled={true}
          Action={
            <SwitchButton
              value={value}
              onTintColor="#44DB5E"
              onThumbTintColor="#fff"
              onValueChange={onValueChange}
              {...SwitchButtonProps}
            />
          }
          {...listItemProps}
        />
      );
    } else if (typeof value !== 'undefined') {
      const valueStyle = [
        styles.valueText,
        item.styles && item.styles.valueText,
      ];
      return (
        <ListItem
          {...listItemProps}
          Action={(
            <View style={styles.row}>
              <Text style={valueStyle}>{value}</Text>
              {
                typeof listItemProps.Action === 'function'
                  ? listItemProps.Action()
                  : listItemProps.Action
              }
            </View>
          )}
        />
      );
    }
    return <ListItem {...listItemProps} />;
  };

  render() {
    const {
      contentContainerStyle,
      separatorStyle,
      data,
      ...flatListProps
    } = this.props;
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
    fontSize: cx(14),
    color: '#999',
    marginRight: cx(6),
  },
});
