import React from 'react';
import { Notification } from 'tuya-panel-kit';

import { BlockList, Svg } from '#components';
import Strings from '#i18n';

export default () => {
  return (
    <BlockList
      list={[
        {
          name: Strings.getLang('notification_label'),
          onPress: () =>
            Notification.show({
              message: '警告提示框',
              onClose: () => {
                Notification.hide();
              },
              theme: {
                successIcon: 'red',
                errorIcon: 'yellow',
                warningIcon: 'black',
              },
            }),
          component: <>{Svg.right}</>,
        },
      ]}
    />
  );
};
