import React from 'react';
import { View } from 'react-native';
import renderer from 'react-test-renderer';
import Popup from '../index';
import TYText from '../../TYText';

describe(' Popup Toast', () => {
  it('basic render', () => {
    const component = renderer.create(
      Popup.tips({
        show: true,
        bgColor: '#f0f',
        cornerPosition: 'bottomLeft',
        contentStyle: { borderRadius: 8 },
        modalChildStyle: { position: 'absolute', top: 60 },
        children: <TYText text="我是气泡,点击遮罩空白处退出哦" style={{ fontSize: 20 }} />,
      })
    );
    expect(component).toMatchSnapshot();
  });
});
