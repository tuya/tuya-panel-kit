import React from 'react';
import { View } from 'react-native';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import Popup from '../index';
import _ from 'lodash';
import DatePicker from '../date-picker';
import { ThemeUtils } from '../../../utils';

const { ThemeProvider } = ThemeUtils;

describe('Popup Component', () => {
  it('basic render', () => {
    const component = renderer
      .create(
        Popup.datePicker({
          title: '生日',
          cancelText: '取消',
          confirmText: '确认',
          hourText: '小时',
          minuteText: '分钟',
          mode: 'datetime',
          minDate: new Date(1918, 0, 1, 0, 0, 0),
          maxDate: new Date(2018, 11, 31, 23, 59, 59),
          defaultDate: new Date(),
          onMaskPress: ({ close }) => close(),
          onDateChange: jest.fn(),
          _onDataChange: jest.fn(),
        })
      )
      .toJSON();

    expect(component).toMatchSnapshot();
  });
});

describe('DatePicker Component', () => {
  it('basic render', () => {
    const component = renderer
      .create(
        <ThemeProvider>
          <DatePicker
            title="生日"
            cancelText="取消"
            confirmText="确认"
            hourText="小时"
            minuteText="分钟"
            mode="datetime"
            minDate={new Date(1918, 0, 1, 0, 0, 0)}
            maxDate={new Date(2018, 11, 31, 23, 59, 59)}
            defaultDate={new Date()}
          />
        </ThemeProvider>
      )
      .toJSON();

    expect(component).toMatchSnapshot();
  });

  it('basic render', () => {
    const component = renderer.create(
      <ThemeProvider>
        <DatePicker
          title="生日"
          cancelText="取消"
          confirmText="确认"
          hourText="小时"
          minuteText="分钟"
          mode="datetime"
          switchValue={true}
          minDate={new Date(1918, 0, 1, 0, 0, 0)}
          maxDate={new Date(2018, 11, 31, 23, 59, 59)}
          defaultDate={new Date()}
        />
      </ThemeProvider>
    );
    expect(component.toJSON()).toMatchSnapshot();
  });
});
