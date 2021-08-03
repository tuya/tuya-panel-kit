import React from 'react';
import { GlobalToast } from 'tuya-panel-kit';

import { BlockList, Icons } from '#components';
import Strings from '#i18n';

export default () => {
  return (
    <BlockList
      list={[
        {
          name: Strings.getLang('text_basic'),
          onPress: () =>
            GlobalToast.show({
              text: Strings.getLang('globaltoast_max'),
              showIcon: false,
              contentStyle: {},
            }),
          component: <>{Icons.right}</>,
        },
        {
          name: Strings.getLang('globaltoast_load'),
          onPress: () =>
            GlobalToast.show({
              text: Strings.getLang('globaltoast_set'),
            }),
          component: <>{Icons.right}</>,
        },
      ]}
    />
  );
};
