import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { Toast, TYText } from 'tuya-panel-kit';

class ToastScene extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
  }
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <Toast
          show={this.state.show}
          text="I'm Iron Man!!!"
          onFinish={() => this.setState({ show: false })}
        />
        <TouchableOpacity style={styles.wrapperStyle} onPress={() => this.setState({ show: true })}>
          <TYText style={{ textAlign: 'center' }}>Click Me!</TYText>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapperStyle: {
    height: 44,
    backgroundColor: 'red',
    justifyContent: 'center',
  },
});

export default ToastScene;
