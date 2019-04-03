import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { View, Text, SectionList, StyleSheet, ViewPropTypes } from 'react-native';
import ListItem from './list-item';
import CheckboxItem from './items/checkbox-item';
import InputItem from './items/input-item';
import SliderItem from './items/slider-item';
import SwitchItem from './items/switch-item';
import { RatioUtils } from '../../utils';

const { convertX: cx, convertY: cy } = RatioUtils;

/* eslint-disable new-cap */
export default class TYSectionLists extends Component {
  static Item = ListItem;
  static CheckboxItem = CheckboxItem;
  static InputItem = InputItem;
  static SliderItem = SliderItem;
  static SwitchItem = SwitchItem;

  static propTypes = {
    ...SectionList.propTypes,
    /* sections 格式
      [{
        title,
        data: [{
          styles: [Object],
          title: [string],
          value: [bool, string],
          subTitle: [string],
          onPress: [func],
          Icon: [Func | Element],
          Action: [Func | Element],
          ...ListItemProps,
        }],
      }, {
        title,
        data,
      }]
    */
    sections: PropTypes.array.isRequired,
    headerStyle: Text.propTypes.style,
    separatorStyle: ViewPropTypes.style,
  };

  static defaultProps = {
    headerStyle: null,
    separatorStyle: null,
  };

  renderSectionHeader = ({ section: { title } }) => {
    const { headerStyle } = this.props;
    if (title) {
      return <Text style={[styles.sectionHeader, headerStyle]}>{title}</Text>;
    }
    return null;
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
    const { contentContainerStyle, separatorStyle, sections, ...sectionListProps } = this.props;
    return (
      <SectionList
        contentContainerStyle={[styles.container, contentContainerStyle]}
        ItemSeparatorComponent={() => <View style={[styles.separator, separatorStyle]} />}
        renderSectionHeader={this.renderSectionHeader}
        renderSectionFooter={() => <View style={styles.sectionFooter} />}
        renderItem={this.renderItem}
        sections={sections}
        keyExtractor={item => item.key}
        stickySectionHeadersEnabled={false}
        {...sectionListProps}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f8f8f8',
  },

  sectionHeader: {
    marginLeft: cx(12),
    marginBottom: cy(6),
    fontSize: Math.max(12, cx(12)),
    color: '#c8c8c8',
    backgroundColor: 'transparent',
  },

  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#eee',
  },

  sectionFooter: {
    marginTop: cy(16),
  },

  valueText: {
    fontSize: cx(14),
    color: '#999',
    marginRight: cx(6),
  },
});
