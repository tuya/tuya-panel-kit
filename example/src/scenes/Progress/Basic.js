/* eslint-disable react/prefer-stateless-function */

import React from 'react';
import { View } from 'react-native';
import { Progress } from 'tuya-panel-kit';

class ProgressScene extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      value: 50,
    };
  }
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Progress scaleHeight={2} />
        <Progress
          style={{ marginTop: 30, width: 240, height: 240 }}
          foreColor={{
            '0%': '#1381FB',
            '100%': '#00C36C',
          }}
          needMaxCircle={true}
          startColor="#1381FB"
          thumbRadius={4}
          value={this.state.value}
          startDegree={135}
          andDegree={270}
          stepValue={10}
          thumbRadius={13}
          onValueChange={v => {
            console.log(v);
            this.setState({ value: v });
          }}
        />
        <Progress
          style={{ marginTop: 30 }}
          startDegree={270}
          andDegree={360}
          min={0}
          max={100}
          value={25}
          thumbRadius={3}
          needMaxCircle={true}
          needMinCircle={true}
          foreColor="#135381"
          stepValue={5}
        />
      </View>
    );
  }
}

export default ProgressScene;
