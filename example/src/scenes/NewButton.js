import React from 'react';
import { View } from 'react-native';
import { Button } from 'tuya-panel-kit';

class ButtonScene extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      icon: '0',
    };
  }

  tapBtn = () => {
    this.setState({ icon: '6' });
  };

  render() {
    return (
      <View style={{ padding: 20 }}>
        <Button
          icon="selected"
          onPress={this.tapBtn}
          size="large"
          style={{ borderWidth: 1, borderColor: '#333' }}
          text="发射"
        />
        <Button image={require('../res/2.png')} />
        <Button icon={this.state.icon} size={50} />
        <Button text="纯文字" style={{ width: 100 }} textStyle={{ color: '#333' }} />
      </View>
    );
  }
}

export default ButtonScene;
