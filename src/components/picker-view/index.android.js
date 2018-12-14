/* eslint-disable */
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  StyleSheet,
  ViewPropTypes,
  ColorPropType,
} from 'react-native';
import Picker from './picker';

const height = 216;

class Item extends Component {
  static propTypes = {
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.bool,
    ]), // only support num or string for now
    label: PropTypes.string,
  };

  render() {
    return null;
  }
}

export default class PickerView extends Component {
  static propTypes = {
    ...ViewPropTypes,
    itemTextColor: ColorPropType,
    selectedItemTextColor: ColorPropType,
    dividerColor: ColorPropType,
    visibleItemCount: PropTypes.number,
    onValueChange: PropTypes.func,
    selectedValue: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.bool,
    ]),
    children: PropTypes.node.isRequired,
    loop: PropTypes.bool,
  };

  static defaultProps = {
    loop: false,
    itemTextColor: '#cccccc',
    selectedItemTextColor: 'black',
    dividerColor: '#cccccc',
    visibleItemCount: 8,
    itemAlign: 'center',
    textSize: 20,
  };

  constructor(props) {
    super(props);

    this.stateFromProps = this._stateFromProps.bind(this);
    this._onChange = this._onChange.bind(this);

    this.state = this.stateFromProps(props);
  }

  componentWillReceiveProps(nextProps) {
    this.setState(this.stateFromProps(nextProps));
  }

  _stateFromProps(props) {
    let selectedIndex = 0;
    const items = [];
    React.Children.toArray(props.children).forEach((child, index) => {
      if (child.props.value === props.selectedValue) {
        selectedIndex = index;
      }
      items.push({
        value: child.props.value,
        label: child.props.label,
      });
    });
    return { selectedIndex, items };
  }

  _onChange(event) {
    const { newIndex } = event.nativeEvent;
    if (this.props.onValueChange) {
      this.props.onValueChange(this.state.items[newIndex].value, newIndex);
    }

    if (this._picker && this.state.selectedIndex !== newIndex) {
      this._picker.setNativeProps({
        selectedIndex: this.state.selectedIndex
      });
    }
  }

  render() {
    const style = StyleSheet.flatten(this.props.style);
    const { loop } = this.props;

    return (
      <Picker
        style={[{
          height,
        }, style]}
        items={this.state.items}
        itemTextColor={this.props.itemTextColor}
        selectedItemTextColor={this.props.selectedItemTextColor}
        dividerColor={this.props.dividerColor}
        visibleItemCount={this.props.visibleItemCount}
        itemAlign={this.props.itemAlign}
        selectedValue={this.state.selectedIndex}
        textSize={this.props.textSize}
        loop={loop}
        onValueChange={this._onChange}
      />
    );
  }
}

PickerView.Item = Item;
PickerView.height = height;
