import React from 'react';
import { TYFlatList } from 'tuya-panel-kit';
import svgs from 'tuya-panel-kit/src/components/iconfont/art/defaultSvg'; // eslint-disable-line

const iconDatas = Object.keys(svgs).map(name => ({
  key: name,
  title: name,
  iconSize: 24,
  iconColor: 'red',
  Icon: name,
  useART: true,
}));

const IconScene = () => <TYFlatList data={iconDatas} />;

export default IconScene;
