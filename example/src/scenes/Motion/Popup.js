import React from 'react';
import _ from 'lodash';
import { View, StyleSheet } from 'react-native';
import { Button, Popup, Utils } from 'tuya-panel-kit';

const { winWidth } = Utils.RatioUtils;

class MotionPopupScene extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      listValues: ['1'],
    };
  }

  _openPopup = () => {
    Popup.list({
      motionType: 'PullUp',
      type: 'switch',
      dataSource: _.times(7, n => ({
        key: `${n}`,
        title: `标题${n}`,
        value: `${n}`,
      })),
      title: '多选',
      cancelText: '取消',
      confirmText: '确认',
      value: this.state.listValues,
      onMaskPress: ({ close }) => {
        close();
      },
      onMaskPress: ({ close }) => {
        close();
      },
      onConfirm: (value, { close }) => {
        console.log('switch value :', value);
        this.setState({ listValues: value });
        close();
      },
    });
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Button
          style={styles.button}
          text="Motion.PullUp 应用于 Popup"
          textStyle={styles.text}
          onPress={this._openPopup}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    marginTop: 12,
    width: winWidth,
    height: 44,
    backgroundColor: '#666',
  },

  text: {
    color: '#fff',
  },
});

export default MotionPopupScene;
