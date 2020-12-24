import _ from 'lodash';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { View } from 'react-native';
import { Provider, connect } from 'react-redux';
import { TYSdk, Theme } from 'tuya-panel-kit';
import { devInfoChange, deviceChange, responseUpdateDp } from './redux/modules/common';
import DebugView from './components/DebugView';

const TYEvent = TYSdk.event;
const TYDevice = TYSdk.device;

const composeLayout = (store, component) => {
  const NavigatorLayoutContainer = connect(_.identity)(component);
  const ThemeContainer = connect(({ theme }) => ({ theme }))(Theme);
  const { dispatch } = store;

  TYEvent.on('deviceChanged', data => {
    dispatch(deviceChange(data));
  });

  // eslint-disable-next-line
  TYEvent.on('dpDataChange', data => {
    dispatch(responseUpdateDp(data));
  });

  TYEvent.on('appOnline', data => {
    dispatch(deviceChange({ appOnline: data.online }));
  });

  TYEvent.on('deviceOnline', data => {
    dispatch(deviceChange({ deviceOnline: data.online }));
  });

  class PanelComponent extends Component {
    static propTypes = {
      // eslint-disable-next-line
      devInfo: PropTypes.object.isRequired,
    };

    constructor(props) {
      super(props);

      if (props && props.devInfo && props.devInfo.devId) {
        TYDevice.setDeviceInfo(props.devInfo);
        TYDevice.getDeviceInfo().then(data => dispatch(devInfoChange(data)));
        // eslint-disable-next-line
      } else if (props.preload) {
        // do something
      } else {
        TYDevice.getDeviceInfo().then(data => dispatch(devInfoChange(data)));
      }
    }

    render() {
      return (
        <Provider store={store}>
          <ThemeContainer>
            <View style={{ flex: 1 }}>
              <NavigatorLayoutContainer />
              <DebugView />
            </View>
          </ThemeContainer>
        </Provider>
      );
    }
  }

  return PanelComponent;
};

export default composeLayout;
