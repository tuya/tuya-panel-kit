import React from 'react';
import { View } from 'react-native';
import renderer from 'react-test-renderer';
import Popup from '../index';
import _ from 'lodash';
import TimerPicker from '../timer-picker';
import { ThemeUtils } from '../../../utils';

const { ThemeProvider } = ThemeUtils;

describe('TimerPicker Function', () => {
  it('basic render', () => {
    const component = renderer.create(
      Popup.timerPicker({
        title: '时间段选择',
        cancelText: '取消',
        confirmText: '确认',
        is2Hours: true,
        startTime: 0,
        endTime: 120,
      })
    );

    expect(component).toMatchSnapshot();
  });
});

describe('TimerPicker Component', () => {
  it('basic render', () => {
    const component = renderer.create(
      <ThemeProvider>
        <TimerPicker
          title="时间段选择"
          cancelText="取消"
          confirmText="确认"
          is2Hours={true}
          startTime={0}
          endTime={120}
        />
      </ThemeProvider>
    );

    expect(component).toMatchSnapshot();
  });
});
