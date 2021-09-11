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
    label: '状态1',
    icon: TuyaRNSvgs.power,
    key: '0',
    disabled: true,
  },
  {
    label: '状态2状态2状态2',
    icon: TuyaRNSvgs.power,
    key: '1',
  },
  {
    label: '状态3',
    icon: TuyaRNSvgs.power,
    key: '2',
  },
  {
    label: '状态4',
    icon: TuyaRNSvgs.power,
    key: '3',
  },
  {
    label: '状态5',
    icon: TuyaRNSvgs.power,
    key: '4',
  },
  {
    label: '状态6',
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
      style={{ backgroundColor: '#f9f9f9', minHeight: 200 }}
      list={[
        {
          title: Strings.getLang('studio'),
          content: (
            <View>
              <ClassicEnumCard
                title="工作模式"
                list={list}
                activeKey={activeKey1}
                onActiveKeyChange={onActiveKeyChange}
              />
              <ClassicEnumCard
                style={{ marginTop: 20 }}
                title="工作模式"
                showTitle={false}
                list={list.slice(0, 4)}
                defaultActiveKey="1"
                showIconBg={false}
                activeIconColor="#ff6700"
                activeTextColor="#ff6700"
              />
              <ClassicEnumCard
                style={{ marginTop: 20 }}
                list={list}
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
              <NordicEnumCard disabled title="工作模式" list={list} activeKey="0" />
              <NordicEnumCard
                disabled
                style={{ marginTop: 20 }}
                title="传入图片"
                showTitle={false}
                list={list1.slice(0, 4)}
                defaultActiveKey="1"
              />
            </View>
          ),
        },
        {
          title: Strings.getLang('acrylic'),
          content: (
            <View>
              <AcrylicEnumCard title="工作模式" list={list} activeKey="0" />
              <AcrylicEnumCard
                style={{ marginTop: 20 }}
                title="传入图片"
                showTitle={false}
                list={list1.slice(0, 4)}
                defaultActiveKey="1"
              />
            </View>
          ),
        },
      ]}
    />
  );
};
