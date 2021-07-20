import React from 'react';
import { View } from 'react-native';
import renderer from 'react-test-renderer';
import Popup from '../index';
import TYText from '../../TYText';

describe(' Popup Toast', () => {
  it('basic render', () => {
    const dropDownList = [
      {
        key: '1',
        title: 'airModeTitle',
        value: 'air',
      },
      {
        key: '2',
        title: 'socketModeTitle',
        value: 'socketHome',
      },
      {
        key: '3',
        title: 'diyModeTitle',
        value: 'customList',
      },
      {
        key: '4',
        title: 'settingTitle',
        value: 'setting',
      },
    ];
    const component = renderer.create(
      Popup.dropdown({
        data: dropDownList,
        onSelect: jest.fn(),
        // cornerSize: 'normal',
        // cornerDirection: 'right',
        // customCornerSize: 5,
        // cornerDirectionValue: 20,
        // corner: true,
        listStyle: { backgroundColor: '#ccc' },
        cornerColor: '#ccc',
      })
    );
    expect(component).toMatchSnapshot();
  });
});
