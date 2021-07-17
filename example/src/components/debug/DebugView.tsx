/* eslint-disable react/require-default-props */
/* eslint-disable no-var */
/* eslint-disable react-native/no-raw-text */
/* eslint-disable vars-on-top */
/* eslint-disable react/state-in-constructor */
/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { Button, ButtonProps, DevInfo, Modal, TYText, useTheme } from 'tuya-panel-kit';

import { Strings } from '../../i18n';
import { actions, store } from '../../models';

const { deviceChange } = actions.common;
const { toggleTheme } = actions.theme;

const StyledButton = (props: ButtonProps & { bottom?: number; theme?: any }) => {
  const theme = useTheme() as any;
  return (
    <Button
      {...props}
      style={{
        position: 'absolute',
        bottom: props?.bottom || 16,
        right: 16,
        padding: 6,
        borderRadius: 4,
        backgroundColor: theme?.global?.brand,
      }}
    />
  );
};

declare global {
  var $I18N: any;
}

class DebugView extends Component<{ devInfo?: DevInfo; theme?: any }, { visible: boolean }> {
  state = {
    visible: false,
  };

  getDatas() {
    const { devInfo } = this.props;
    const isWIFI = devInfo!.capability === 1;
    return [
      {
        text: Strings.getLang('test_I18N'),
        onPress: this._handleTestI18N,
      },
      {
        text: Strings.getLang('switch_theme'),
        onPress: () => store.dispatch(toggleTheme()),
      },
      {
        text: Strings.getLang('switch_device_status'),
        onPress: () => store.dispatch(deviceChange({ deviceOnline: !devInfo!.deviceOnline })),
      },
      {
        text: Strings.getLang('switch_network_status'),
        onPress: () => store.dispatch(deviceChange({ appOnline: !devInfo!.appOnline })),
      },
      {
        text: isWIFI ? Strings.getLang('switch_bluetooth') : Strings.getLang('switch_wifi'),
        onPress: () => store.dispatch(deviceChange({ capability: isWIFI ? 1024 : 1 })),
      },
    ];
  }

  _handleTestI18N = () => {
    Modal.render(
      <ScrollView
        scrollEnabled
        style={{ height: 500, backgroundColor: '#fff' }}
        contentContainerStyle={{ alignItems: 'center', justifyContent: 'center' }}
      >
        <TouchableOpacity activeOpacity={1}>
          <TYText style={{ color: '#000' }}>{`${JSON.stringify(global.$I18N, null, 4)}`}</TYText>
        </TouchableOpacity>
      </ScrollView>,
      {}
    );
  };

  render() {
    const toolbars = this.state.visible ? this.getDatas() : [];
    return (
      <View
        style={{
          position: 'absolute',
          bottom: 16,
          right: 0,
        }}
      >
        <StyledButton
          activeOpacity={0.8}
          textStyle={{ fontSize: 16, color: '#fff' }}
          text={
            this.state.visible ? Strings.getLang('hide_toolbox') : Strings.getLang('show_toolbox')
          }
          onPress={() => this.setState(prevState => ({ visible: !prevState.visible }))}
        />
        {toolbars.map((data, idx) => (
          <StyledButton
            key={idx}
            activeOpacity={0.8}
            bottom={64 + 48 * idx}
            textStyle={{ fontSize: 16, color: '#fff' }}
            {...data}
          />
        ))}
      </View>
    );
  }
}

export default connect(_ => _)(DebugView);
