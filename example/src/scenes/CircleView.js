import React from 'react';
import { View } from 'react-native';
import { CircleView } from 'tuya-panel-kit';
import ControlNumber from '../components/ControlNumber';

class CircleScene extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      radius: 50
    };
  }
  _handleNumberChange = key => value => {
    this.setState({ [key]: Math.round(value) });
  }
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <CircleView radius={this.state.radius} color="red">
          <View />
        </CircleView>
        <ControlNumber
          style={{ position: 'absolute', bottom: 20 }}
          min={50}
          max={150}
          value={this.state.radius}
          title="radius"
          onChange={this._handleNumberChange('radius')}
          onComplete={this._handleNumberChange('radius')}
        />
      </View>
    );
  }
}

export default CircleScene;
