import React, { Component } from 'react';
import { TYFlatList } from 'tuya-panel-kit';
import svgs from 'tuya-panel-kit/src/components/iconfont/svg/defaultSvg'; // eslint-disable-line

const iconDatas = new Array(999).fill('0').map((name, idx) => ({
  key: idx,
  title: name,
  iconSize: 24,
  iconColor: 'red',
  Icon: name,
}));

class IconScene extends Component {
  constructor(props) {
    super(props);
    console.time && console.time('render react native svg');
  }

  componentDidMount() {
    console.timeEnd && console.timeEnd('render react native svg');
  }

  render() {
    return <TYFlatList data={iconDatas} />;
  }
}

export default IconScene;
