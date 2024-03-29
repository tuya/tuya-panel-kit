import React, { useState } from 'react';
import { View } from 'react-native';
import TuyaRNSvgs from 'tuya-panel-kit/lib/components/iconfont/svg/defaultSvg';
import { ClassicEnumCard } from 'tuya-panel-classic-kit';
import { NordicEnumCard } from 'tuya-panel-nordic-kit';
import { AcrylicEnumCard } from 'tuya-panel-acrylic-kit';
import { ListView } from '#components';
import Strings from '#i18n';

const IMAGE =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAAEXRFWHRTb2Z0d2FyZQBwbmdjcnVzaEB1SfMAAABQSURBVGje7dSxCQBACARB+2/ab8BEeQNhFi6WSYzYLYudDQYGBgYGBgYGBgYGBgYGBgZmcvDqYGBgmhivGQYGBgYGBgYGBgYGBgYGBgbmQw+P/eMrC5UTVAAAAABJRU5ErkJggg==';
const list = [
  {
    label: 'status1',
    icon: TuyaRNSvgs.power,
    key: '0',
    disabled: true,
  },
  {
    label: 'status2',
    icon: TuyaRNSvgs.power,
    key: '1',
  },
  {
    label: 'status3',
    icon: TuyaRNSvgs.power,
    key: '2',
  },
  {
    label: 'status4',
    icon: TuyaRNSvgs.power,
    key: '3',
  },
  {
    label: 'status5',
    icon: TuyaRNSvgs.power,
    key: '4',
  },
  {
    label: 'status6',
    icon: TuyaRNSvgs.power,
    key: '5',
  },
];

const list1 = list.map(item => {
  return {
    ...item,
    isImage: true,
    icon: IMAGE,
  };
});

export default () => {
  const [activeKey1, setActiveKey1] = useState('5');
  const onActiveKeyChange = key => {
    setActiveKey1(key);
  };

  return (
    <ListView
      style={{ backgroundColor: '#f9f9f9', height: 'auto' }}
      list={[
        {
          title: Strings.getLang('studio'),
          content: (
            <View>
              <ClassicEnumCard
                width={290}
                title="Title"
                data={list}
                // data={[]}
                activeKey={activeKey1}
                onActiveKeyChange={onActiveKeyChange}
              />
              <ClassicEnumCard
                padding={[20, 20, 20, 20]}
                style={{ marginTop: 20 }}
                title="Title"
                showTitle={false}
                data={list.slice(0, 4)}
                defaultActiveKey="1"
                showIconBg={false}
                activeIconColor="#ff6700"
                activeTextColor="#ff6700"
              />
              <ClassicEnumCard
                pageCount={3}
                style={{ marginTop: 20 }}
                data={list}
                defaultActiveKey="1"
                showIconBg={false}
                activeIconColor="#ff6700"
                activeTextColor="#ff6700"
              />
            </View>
          ),
        },
        {
          title: Strings.getLang('nordic'),
          content: (
            <View>
              <NordicEnumCard disabled title="Title" data={list} activeKey="0" />
              <NordicEnumCard
                disabled
                style={{ marginTop: 20 }}
                title="Title"
                showTitle={false}
                data={list1.slice(0, 4)}
                defaultActiveKey="1"
              />
            </View>
          ),
        },
        {
          title: Strings.getLang('acrylic'),
          content: (
            <View>
              <AcrylicEnumCard title="Title" data={list} activeKey="0" />
              <AcrylicEnumCard
                style={{ marginTop: 20 }}
                title="Title"
                showTitle={false}
                data={list1.slice(0, 4)}
                defaultActiveKey="1"
              />
            </View>
          ),
        },
      ]}
    />
  );
};
