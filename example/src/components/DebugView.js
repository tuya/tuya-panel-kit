/* eslint-disable react/no-array-index-key */
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import styled from 'styled-components/native';
import { Modal, Button, TYText } from 'tuya-panel-kit';
import { deviceChange } from '../redux/modules/common';
import { toggleTheme } from '../redux/modules/theme';
import { store } from '../main';
import Strings from '../i18n';


const StyledButton = styled(Button).attrs({
  wrapperStyle: props => ({
    position: 'absolute',
    bottom: props.bottom || 16,
    right: 16,
    padding: 6,
    borderRadius: 4,
    backgroundColor: props.theme.global.brand,
  }),
})``;

class DebugView extends Component {
  static propTypes = {
    devInfo: PropTypes.object.isRequired,
  };

  state = {
    visible: false,
  };

  getDatas() {
    const { devInfo } = this.props;
    const isWIFI = devInfo.capability === 1;
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
        onPress: () => store.dispatch(deviceChange({ deviceOnline: !devInfo.deviceOnline })),
      },
      {
        text: Strings.getLang('switch_network_status'),
        onPress: () => store.dispatch(deviceChange({ appOnline: !devInfo.appOnline })),
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
        scrollEnabled={true}
        style={{ height: 500, backgroundColor: '#fff' }}
        contentContainerStyle={{ alignItems: 'center', justifyContent: 'center' }}
      >
        <TouchableOpacity activeOpacity={1}>
          <TYText style={{ color: '#000' }}>{`${JSON.stringify(global.$I18N, null, 4)}`}</TYText>
        </TouchableOpacity>
      </ScrollView>
    );
  };

  render() {
    const toolbars = this.state.visible ? this.getDatas() : [];
    return (
      <View style={{ position: 'absolute', bottom: 16, right: 0 }}>
        <StyledButton
          activeOpacity={0.8}
          textStyle={{ fontSize: 16, color: '#fff' }}
          text={this.state.visible ? Strings.getLang('hide_toolbox') : Strings.getLang('show_toolbox')}
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

export default connect(({ devInfo }) => ({ devInfo }))(DebugView);
