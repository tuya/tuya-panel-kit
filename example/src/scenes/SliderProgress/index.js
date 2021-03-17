import React, { PureComponent } from 'react';
import { View } from 'react-native';
import { TYText, SliderProgress } from 'tuya-panel-kit';

class SliderProgressScene extends PureComponent {
  constructor(props) {
    super(props);
    /* eslint-disable react/no-unused-state */
    this.state = {
      value: 6,
      values: [20, 90],
    };
  }
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <TYText>{`${this.state.value}%`}</TYText>
        <SliderProgress
          // min={20}
          // max={100}
          value={this.state.value}
          disabled={false}
          thumbWidth={4}
          style={{ width: 300, height: 33 }}
          onValueChange={v => {
            /* eslint-disable react/no-unused-state */
            this.setState({
              value: v,
            });
          }}
        />

        <TYText>{`${this.state.values[0]}%-${this.state.values[1]}%`}</TYText>
        <SliderProgress
          value={this.state.values}
          disabled={false}
          ifAllowClick={false}
          style={{ width: 300, height: 33 }}
          onValueChange={({ minValue, maxValue }) => {
            this.setState({
              values: [minValue, maxValue],
            });
          }}
        />
      </View>
    );
  }
}

export default SliderProgressScene;
