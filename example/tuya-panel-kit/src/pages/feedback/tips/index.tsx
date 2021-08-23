import React from 'react';
import { View } from 'react-native';
import { Tips } from 'tuya-panel-kit';

import { BlockList, Icons } from '#components';
import Strings from '#i18n';
import { useSetParticalState } from '../../../hooks/useSetParticalState';

export default () => {
  const [state, setState] = useSetParticalState({
    topLeft: false,
    topCenter: false,
    topRight: false,
    bottomLeft: false,
    bottomCenter: false,
    bottomRight: false,
  });
  const bigTips = {
    width: 110,
    height: 64,
    borderRadius: 16,
  };

  return (
    <>
      <BlockList
        list={[
          {
            name: Strings.getLang('tips_top_left'),
            onPress: () => setState({ topLeft: !state.topLeft }),
            component: <>{Icons.right}</>,
          },
          {
            name: Strings.getLang('tips_top_mid'),
            onPress: () => setState({ topCenter: !state.topCenter }),
            component: <>{Icons.right}</>,
          },
          {
            name: Strings.getLang('tips_top_right'),
            onPress: () => setState({ topRight: !state.topRight }),
            component: <>{Icons.right}</>,
          },
          {
            name: Strings.getLang('tips_bottom_left'),
            onPress: () => setState({ bottomLeft: !state.bottomLeft }),
            component: <>{Icons.right}</>,
          },
          {
            name: Strings.getLang('tips_bottom_mid'),
            onPress: () => setState({ bottomCenter: !state.bottomCenter }),
            component: <>{Icons.right}</>,
          },
          {
            name: Strings.getLang('tips_bottom_right'),
            onPress: () => setState({ bottomRight: !state.bottomRight }),
            component: <>{Icons.right}</>,
          },
        ]}
      />
      <View
        style={{
          position: 'absolute',
          bottom: '30%',
          left: '50%',
        }}
      >
        <Tips show={state.topLeft} contentStyle={bigTips} bgColor="#00f" cornerPosition="topLeft" />
        <Tips
          show={state.topCenter}
          contentStyle={bigTips}
          bgColor="#00f"
          cornerPosition="topCenter"
        />
        <Tips
          show={state.topRight}
          contentStyle={bigTips}
          bgColor="#00f"
          cornerPosition="topRight"
        />
        <Tips
          show={state.bottomLeft}
          contentStyle={bigTips}
          bgColor="#00f"
          cornerPosition="bottomLeft"
        />
        <Tips
          show={state.bottomCenter}
          contentStyle={bigTips}
          bgColor="#00f"
          cornerPosition="bottomCenter"
        />
        <Tips
          show={state.bottomRight}
          contentStyle={bigTips}
          bgColor="#00f"
          cornerPosition="bottomRight"
        />
      </View>
    </>
  );
};
