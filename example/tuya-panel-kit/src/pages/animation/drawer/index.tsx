import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Utils } from 'tuya-panel-kit';
import Drawer from 'tuya-panel-animation-drawer';
import { BlockList, Icons } from '#components';
import Strings from '#i18n';

const { winWidth, winHeight } = Utils.RatioUtils;

export default () => {
  const [state, setState] = React.useState({
    visible: false,
    placement: 'left' as 'left' | 'right' | 'top' | 'bottom',
  });

  return (
    <>
      <BlockList
        list={[
          {
            name: Strings.getLang('drawer_top'),
            onPress: () => setState({ visible: true, placement: 'top' }),
            component: <>{Icons.right}</>,
          },
          {
            name: Strings.getLang('drawer_right'),
            onPress: () => setState({ visible: true, placement: 'right' }),
            component: <>{Icons.right}</>,
          },
          {
            name: Strings.getLang('drawer_left'),
            onPress: () => setState({ visible: true, placement: 'left' }),
            component: <>{Icons.right}</>,
          },
          {
            name: Strings.getLang('drawer_bottom'),
            onPress: () => setState({ visible: true, placement: 'bottom' }),
            component: <>{Icons.right}</>,
          },
        ]}
      />
      <Drawer
        width={['left', 'right'].includes(state.placement) ? winWidth / 2 : winWidth}
        height={['left', 'right'].includes(state.placement) ? winHeight : winHeight / 2}
        hasMask={!['left', 'right'].includes(state.placement)}
        placement={state.placement}
        visible={state.visible}
        onMaskPress={() => {
          setState({ visible: false, placement: state.placement });
        }}
        onStateChange={state => {
          console.log(state);
        }}
      >
        <View
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: 'red',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text style={{ fontSize: 24 }}>
            {['left', 'right'].includes(state.placement)
              ? Strings.getLang('drawer_withoutMask')
              : Strings.getLang('drawer_withMask')}
          </Text>
          {['left', 'right'].includes(state.placement) && (
            <TouchableOpacity
              style={{
                backgroundColor: '#fff',
                width: 88,
                height: 32,
                marginTop: 20,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 12,
                zIndex: 10,
              }}
              onPress={() => {
                setState({ visible: false, placement: state.placement });
              }}
            >
              <Text> Click Me</Text>
            </TouchableOpacity>
          )}
        </View>
      </Drawer>
    </>
  );
};
