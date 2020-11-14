/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import { View } from 'react-native';
import { Progress } from 'tuya-panel-kit';

class ProgressGradientScene extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      value: 50,
    };
  }
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Progress.Space />
        <Progress.Space
          foreColor="blue"
          stepValue={5}
          value={this.state.value}
          onValueChange={v => {
            console.log(v);
            this.setState({ value: v });
          }}
        />
        <Progress.Space
          style={{ marginTop: 30 }}
          foreColor={{ '0%': '#1356A1', '100%': '#E71D2B' }}
        />
      </View>
    );
  }
}

export default ProgressGradientScene;
