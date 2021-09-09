import React from 'react';
import { IconFont, TYListItem } from 'tuya-panel-kit';

import { Icons, ListView } from '#components';
import Strings from '#i18n';

export default () => {
  return (
    <ListView
      style={{ backgroundColor: '#F5F5F6' }}
      contentPadding={false}
      dot={false}
      list={[
        {
          title: Strings.getLang('tylistitem_basic'),
          content: (
            <TYListItem
              theme={{
                fontColor: '#333333',
                subFontColor: '#999',
                descFontColor: 'red',
                cellBg: 'white',
              }}
              title={Strings.getLang('text_title')}
              subTitle={Strings.getLang('text_subTitle')}
              Action={<IconFont color="rgba(0, 0, 0, 0.2)" name="arrow" />}
              onPress={() => console.log(111)}
            />
          ),
        },
        {
          title: `${Strings.getLang('tylistitem_basic')} - ${Strings.getLang('tylistitem_long')}`,
          content: (
            <TYListItem
              theme={{
                fontColor: '#333333',
                subFontColor: '#999',
                descFontColor: 'red',
                cellBg: 'white',
              }}
              title={Strings.getLang('tylistitem_long_title')}
              subTitle={Strings.getLang('text_subTitle')}
              arrow={true}
              arrowColor="#fff"
              onPress={() => console.log(111)}
              Action={<IconFont color="rgba(0, 0, 0, 0.2)" name="arrow" />}
            />
          ),
        },
        {
          title: `${Strings.getLang('tylistitem_basic')} - ${Strings.getLang('tylistitem_ada')}`,
          content: (
            <TYListItem
              theme={{
                fontColor: '#333333',
                subFontColor: '#999',
                descFontColor: 'red',
                cellBg: 'white',
              }}
              arrow={true}
              arrowColor="#f00"
              title={Strings.getLang('text_title')}
              subTitle={Strings.getLang('text_subTitle')}
              Icon={Icons.flower}
              onPress={() => console.log(111)}
              Action={<IconFont color="rgba(0, 0, 0, 0.2)" name="arrow" />}
            />
          ),
        },
      ]}
    />
  );
};
