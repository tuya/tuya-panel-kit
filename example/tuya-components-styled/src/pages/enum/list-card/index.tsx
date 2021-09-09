import React from 'react';
import { NordicListCard } from 'tuya-panel-style-list-card';
import { Utils } from 'tuya-panel-utils';
import TuyaRNSvgs from 'tuya-panel-kit/lib/components/iconfont/svg/defaultSvg';
import { ListView } from '#components';
import Strings from '#i18n';

const { height } = Utils.RatioUtils;

export default () => {
  const [value, setValue] = React.useState('world');
  return (
    <ListView
      style={{ backgroundColor: '#f8f8f8', height }}
      list={[
        {
          title: Strings.getLang('nordic'),
          content: (
            <NordicListCard
              icon={TuyaRNSvgs.power}
              value={value}
              onPress={value => setValue(value)}
              dataSource={[
                { icon: TuyaRNSvgs.power, text: 'Hello World', value: 'world' },
                { icon: TuyaRNSvgs.power, text: 'Hello Tuya', value: 'tuya' },
                { icon: TuyaRNSvgs.power, text: 'Hello China', value: 'china' },
              ]}
            />
          ),
        },
      ]}
    />
  );
};
