import React from 'react';
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
      <Tips
        show={state.topLeft}
        contentStyle={bigTips}
        tipStyle={{
          position: 'absolute',
          top: -42,
          left: 24,
          zIndex: 100,
        }}
        bgColor="#333333"
        cornerPosition="bottomLeft"
      />
      <Tips
        tipStyle={{
          position: 'absolute',
          top: 4,
          left: 143,
          zIndex: 100,
        }}
        show={state.topCenter}
        contentStyle={bigTips}
        bgColor="#333333"
        cornerPosition="bottomCenter"
      />
      <Tips
        tipStyle={{
          position: 'absolute',
          left: 261,
          zIndex: 100,
          top: 56,
        }}
        show={state.topRight}
        contentStyle={bigTips}
        bgColor="#333333"
        cornerPosition="bottomRight"
      />
      <Tips
        tipStyle={{
          position: 'absolute',
          left: 24,
          zIndex: 100,
          top: 180,
        }}
        show={state.bottomLeft}
        contentStyle={bigTips}
        bgColor="#333333"
        cornerPosition="topLeft"
      />
      <Tips
        tipStyle={{
          position: 'absolute',
          left: 143,
          zIndex: 100,
          top: 230,
        }}
        show={state.bottomCenter}
        contentStyle={bigTips}
        bgColor="#333333"
        cornerPosition="topCenter"
      />
      <Tips
        tipStyle={{
          position: 'absolute',
          left: 261,
          zIndex: 100,
          top: 280,
        }}
        show={state.bottomRight}
        contentStyle={bigTips}
        bgColor="#333333"
        cornerPosition="topRight"
      />
    </>
  );
};
