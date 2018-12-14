import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { RotationView, TYText } from 'tuya-panel-kit';

class RotationScene extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      active: true,
    };
  }
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <RotationView active={this.state.active}>
          <View style={styles.wrapperStyle}>
            <TYText style={{ textAlign: 'center' }}>Rotation!!!</TYText>
          </View>
        </RotationView>
        <TouchableOpacity
          style={styles.btnStyle}
          onPress={() => this.setState({ active: !this.state.active })}
        >
          <TYText style={styles.textStyle}>
            { !this.state.active ? 'Start' : 'Stop' }
          </TYText>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapperStyle: {
    width: 100,
    height: 100,
    backgroundColor: 'red',
    justifyContent: 'center'
  },
  btnStyle: {
    position: 'absolute',
    bottom: 20,
    borderRadius: 40,
    width: 80,
    height: 80,
    backgroundColor: '#fff',
    borderColor: '#d0d0d0',
    borderWidth: StyleSheet.hairlineWidth,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textStyle: {
    color: '#333'
  }
});

export default RotationScene;
