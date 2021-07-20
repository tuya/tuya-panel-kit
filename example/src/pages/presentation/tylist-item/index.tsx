import React from 'react';
import { IconFont, TYListItem } from 'tuya-panel-kit';

import { ListView } from '#components';
import Strings from '#i18n';

export default () => {
  return (
    <ListView
      list={[
        {
          title: Strings.getLang('tylistitem_basic'),
          content: (
            <TYListItem
              theme={{
                fontColor: '#fff',
                subFontColor: '#999',
                descFontColor: 'red',
                cellBg: '#222',
              }}
              title={Strings.getLang('text_title')}
              subTitle={Strings.getLang('text_subTitle')}
              Action="Action"
              onPress={() => console.log(111)}
            />
          ),
        },
        {
          title: Strings.getLang('tylistitem_long'),
          content: (
            <TYListItem
              theme={{
                fontColor: '#fff',
                subFontColor: '#999',
                descFontColor: 'red',
                cellBg: '#222',
              }}
              style={{ backgroundColor: '#666' }}
              title={Strings.getLang('tylistitem_long_title')}
              subTitle={Strings.getLang('text_subTitle')}
              arrow={true}
              arrowColor="#fff"
              onPress={() => console.log(111)}
            />
          ),
        },
        {
          title: Strings.getLang('tylistitem_ada'),
          content: (
            <TYListItem
              theme={{
                fontColor: '#346734',
                subFontColor: '#999',
                descFontColor: 'red',
                cellBg: '#222',
                cellRadius: 8,
              }}
              style={{ backgroundColor: '#452389' }}
              title={Strings.getLang('tylistitem_ada_title')}
              arrow={true}
              arrowColor="#f00"
              Icon={<IconFont name="power" color="#00f" size={36} />}
              onPress={() => console.log(111)}
            />
          ),
        },
      ]}
    />
  );
};
