import React from 'react';
import _ from 'lodash';
import { View, StyleSheet } from 'react-native';
import { Button, Popup, Utils } from 'tuya-panel-kit';
import Strings from '../../i18n';

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
        title: `${Strings.getLang('dialog_title')}${n}`,
        value: `${n}`,
      })),
      title: Strings.getLang('motion_multiple_choice'),
      cancelText: Strings.getLang('dialog_cancel'),
      confirmText: Strings.getLang('dialog_confirm'),
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
          text={Strings.getLang('motion_popup')}
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
