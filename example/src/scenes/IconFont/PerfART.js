import React, { Component } from 'react';
import { TYFlatList } from 'tuya-panel-kit';
import svgs from 'tuya-panel-kit/src/components/iconfont/art/defaultSvg'; // eslint-disable-line

const iconDatas = new Array(999).fill('0').map((name, idx) => ({
  key: idx,
  title: name,
  iconSize: 24,
  iconColor: 'red',
  Icon: name,
  useART: true,
}));

class IconScene extends Component {
  constructor(props) {
    super(props);
    console.time && console.time('render art svg');
  }

  componentDidMount() {
    console.timeEnd && console.timeEnd('render art svg');
  }

  render() {
    return <TYFlatList data={iconDatas} />;
  }
}

export default IconScene;
