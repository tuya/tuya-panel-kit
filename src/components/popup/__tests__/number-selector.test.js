import React from 'react';
import { View } from 'react-native';
import renderer from 'react-test-renderer';
import Popup from '../index';
import _ from 'lodash';
import NumberSelector from '../number-selector';
import { ThemeUtils } from '../../../utils';

const { ThemeProvider } = ThemeUtils;

describe('Popup Component', () => {
  it('basic render', () => {
    const component = renderer
      .create(
        Popup.numberSelector({
          title: '温度调节 (℃)',
          cancelText: '取消',
          confirmText: '确认',
          min: 0,
          max: 50,
          value: 24,
          onMaskPress: ({ close }) => close(),
        })
      )
      .toJSON();

    expect(component).toMatchSnapshot();
  });
});

describe('NumberSelector Component', () => {
  it('basic render', () => {
    const component = renderer.create(
      <ThemeProvider>
        <NumberSelector
          title="温度调节"
          cancelText="取消"
          confirmText="确认"
          min={0}
          max={50}
          value={24}
        />
      </ThemeProvider>
    );

    component.update(
      <ThemeProvider>
        <NumberSelector
          title="温度调节"
          cancelText="取消"
          confirmText="确认"
          min={0}
          max={50}
          value={34}
        />
      </ThemeProvider>
    );

    expect(component).toMatchSnapshot();
  });

  it('basic render type', () => {
    const component = renderer.create(
      <ThemeProvider>
        <NumberSelector
          title="温度调节"
          cancelText="取消"
          confirmText="确认"
          min={0}
          max={50}
          value={24}
          type="slider"
        />
      </ThemeProvider>
    );

    component.update(
      <ThemeProvider>
        <NumberSelector
          title="温度调节"
          cancelText="取消"
          confirmText="确认"
          min={0}
          max={50}
          value={34}
          type="slider"
        />
      </ThemeProvider>
    );

    expect(component).toMatchSnapshot();
  });
});
