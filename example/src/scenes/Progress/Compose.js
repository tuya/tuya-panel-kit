/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import { View } from 'react-native';
import { Progress } from 'tuya-panel-kit';

class ProgressScene extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      value1: 50,
      value2: 20,
    };
  }
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Progress.Compose foreColor="red" />
        <Progress.Compose
          style={{ marginTop: 30 }}
          foreColor="blue"
          value1={this.state.value1}
          value2={this.state.value2}
          stepValue={5}
          onValueChange={({ value1, value2 }) => {
            console.log(value1, value2);
            this.setState({
              value1,
              value2,
            });
          }}
        />
      </View>
    );
  }
}

export default ProgressScene;
