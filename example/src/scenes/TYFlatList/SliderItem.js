import React, { Component } from 'react';
import { TYFlatList } from 'tuya-panel-kit';

export default class TYFlatListSliderItemScene extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value1: 0,
      value2: 100,
    };
  }

  get data() {
    return [
      {
        key: 0,
        actionType: 'iconfont',
        Icon: 'volume-sharp-off',
        Action: 'volume-sharp-max',
        value: this.state.value1,
        minimumValue: 0,
        maximumValue: 100,
        onSlidingComplete: value1 => this.setState({ value1 }),
      },
      {
        key: 1,
        iconType: 'text',
        Icon: `value1: ${Math.round(this.state.value1)}`,
        Action: `value2: ${Math.round(this.state.value2)}`,
        value: this.state.value2,
        minimumValue: 0,
        maximumValue: 100,
        onSlidingComplete: value2 => this.setState({ value2 }),
      },
    ];
  }

  renderItem = ({ item }) => {
    return <TYFlatList.SliderItem {...item} />;
  };

  render() {
    return (
      <TYFlatList
        style={{ alignSelf: 'stretch' }}
        scrollEnabled={false}
        contentContainerStyle={{ paddingTop: 16 }}
        data={this.data}
        renderItem={this.renderItem}
      />
    );
  }
}
