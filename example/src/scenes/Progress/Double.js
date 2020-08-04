/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import { View } from 'react-native';
import { Progress } from 'tuya-panel-kit';

class ProgressScene extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      minValue: 0,
      maxValue: 50,
    };
  }
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Progress.Double
          startDegree={135}
          andDegree={270}
          minValue={this.state.minValue}
          maxValue={this.state.maxValue}
          minThumbFill="#FF4800"
          thumbStroke="#fff"
          stepValue={10}
          thumbRadius={13}
          onValueChange={({ minValue, maxValue }) => {
            console.log(minValue, maxValue);
            this.setState({
              minValue,
              maxValue,
            });
          }}
        />
        <Progress.Double startDegree={170} />
        <Progress.Double startDegree={270} minThumbFill="#FF4800" thumbFill="#FF4800" />
        <Progress.Double startDegree={270} foreColor={{ '0%': '#1356A1', '100%': '#E71D2B' }} />
      </View>
    );
  }
}

export default ProgressScene;
