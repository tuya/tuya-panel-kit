/* eslint-disable */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { requireNativeComponent, ViewPropTypes } from 'react-native';

const WheelPickerView = requireNativeComponent('TYRCTWheelViewManager', WheelPicker);

class WheelPicker extends Component {
  constructor(props) {
    super(props);
    this.onItemSelected = this.onItemSelected.bind(this);
  }

  onItemSelected(event) {
    if (!this.props.onValueChange) {
      return;
    }
    this.props.onValueChange(event);
  }

  render() {
    return (
      <WheelPickerView
        accessibilityLabel={this.props.accessibilityLabel || 'PickerView'}
        style={this.props.style}
        items={this.props.items}
        itemTextColor={this.props.itemTextColor}
        selectedItemTextColor={this.props.selectedItemTextColor}
        dividerColor={this.props.dividerColor}
        visibleItemCount={this.props.visibleItemCount}
        itemAlign={this.props.itemAlign}
        selectedIndex={this.props.selectedValue}
        textSize={this.props.textSize}
        loop={this.props.loop}
        onChange={this.onItemSelected}
      />
    );
  }
}

WheelPicker.propTypes = {
  ...ViewPropTypes,
  items: PropTypes.array,
  itemTextColor: PropTypes.string,
  selectedItemTextColor: PropTypes.string,
  dividerColor: PropTypes.string,
  visibleItemCount: PropTypes.number,
  itemAlign: PropTypes.string,
  selectedIndex: PropTypes.number,
  textSize: PropTypes.number,
  loop: PropTypes.bool,
  onChange: PropTypes.func,
};

export default WheelPicker;
