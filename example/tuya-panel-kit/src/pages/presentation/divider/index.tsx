import React from 'react';
import { Divider, Utils } from 'tuya-panel-kit';

import { View } from 'react-native';
import { ListView } from '#components';
import Strings from '#i18n';

const { convertX: cx } = Utils.RatioUtils;

export default () => {
  return (
    <ListView
      contentPadding={false}
      style={{ backgroundColor: '#F5F5F6' }}
      dot={false}
      list={[
        {
          title: Strings.getLang('divider_basic'),
          content: (
            <View
              style={{
                backgroundColor: 'white',
                height: cx(48),
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <Divider style={{ alignSelf: 'center' }} color="#E5E5E5" width={300} />
            </View>
          ),
        },
        // {
        //   title: Strings.getLang('divider_block'),
        //   content: <Divider color="#333" width={300} height={30} />,
        // },
      ]}
    />
  );
};
