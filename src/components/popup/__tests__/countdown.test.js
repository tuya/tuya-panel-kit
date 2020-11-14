/**
 * @jest-environment jsdom
 */
import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import Popup from '../index';
import Countdown from '../countdown';
import { ThemeUtils } from '../../../utils';

const { ThemeProvider } = ThemeUtils;

describe('Popup Component', () => {
  const origConsole = console.error;
  beforeEach(() => {
    console.error = () => {};
  });
  afterEach(() => {
    console.error = origConsole;
  });
  it('render with mount', () => {
    const wrapper = mount(
      <ThemeProvider>
        <Countdown
          value={60}
          title="倒计时"
          cancelText="取消"
          confirmText="确认"
          hourText="小时"
          minuteText="分钟"
          switchValue={false}
        />
      </ThemeProvider>
    );
    const target = wrapper.findWhere(
      c =>
        !!c.prop('onValueChange') &&
        c.prop('accessibilityLabel') === 'Popup_CountdownPicker_Minutes'
    );
    target.at(0).props().onValueChange('tuya');
    const target1 = wrapper.findWhere(
      c =>
        !!c.prop('onValueChange') && c.prop('accessibilityLabel') === 'Popup_CountdownPicker_Hours'
    );
    target1.at(1).props().onValueChange('tuya');
  });
  it('basic render', () => {
    const component = renderer
      .create(
        Popup.countdown({
          value: 160,
          title: '倒计时',
          cancelText: '取消',
          confirmText: '确认',
          hourText: '小时',
          minuteText: '分钟',
          onMaskPress: ({ close }) => close(),
        })
      )
      .toJSON();

    expect(component).toMatchSnapshot();
  });
});

describe('countdown Component', () => {
  it('basic render', () => {
    const component = renderer.create(
      <ThemeProvider>
        <Countdown
          value={60}
          title="倒计时"
          cancelText="取消"
          confirmText="确认"
          hourText="小时"
          minuteText="分钟"
          switchValue={false}
        />
      </ThemeProvider>
    );
    expect(component).toMatchSnapshot();
    component.update(
      <ThemeProvider>
        <Countdown
          value={160}
          title="倒计时"
          cancelText="取消"
          confirmText="确认"
          hourText="小时"
          minuteText="分钟"
          switchValue={true}
        />
      </ThemeProvider>
    );
    expect(component).toMatchSnapshot();
  });

  it('basic update', () => {
    const component = renderer.create(
      <ThemeProvider>
        <Countdown
          value={60}
          title="倒计时"
          cancelText="取消"
          confirmText="确认"
          hourText="小时"
          minuteText="分钟"
          switchValue={true}
        />
      </ThemeProvider>
    );
    expect(component.toJSON()).toMatchSnapshot();
    component.update(
      <ThemeProvider>
        <Countdown
          value={160}
          title="倒计时"
          cancelText="取消"
          confirmText="确认"
          hourText="小时"
          minuteText="分钟"
          switchValue={false}
        />
      </ThemeProvider>
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('render width onlyone', () => {
    const component = renderer.create(
      <ThemeProvider>
        <Countdown
          value={60}
          title="倒计时"
          cancelText="取消"
          confirmText="确认"
          hourText="小时"
          minuteText="分钟"
          onlyone={true}
        />
      </ThemeProvider>
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('render width hour', () => {
    const component = renderer.create(
      <ThemeProvider>
        <Countdown
          value={60}
          max={59}
          min={10}
          title="倒计时"
          cancelText="取消"
          confirmText="确认"
          hourText="小时"
          minuteText="分钟"
          onlyone={false}
        />
      </ThemeProvider>
    );
    const component1 = renderer.create(
      <ThemeProvider>
        <Countdown
          value={90}
          max={99}
          min={10}
          title="倒计时"
          cancelText="取消"
          confirmText="确认"
          hourText="小时"
          minuteText="分钟"
          onlyone={false}
        />
      </ThemeProvider>
    );

    const component2 = renderer.create(
      <ThemeProvider>
        <Countdown
          value={20}
          max={89}
          min={10}
          title="倒计时"
          cancelText="取消"
          confirmText="确认"
          hourText="小时"
          minuteText="分钟"
          onlyone={false}
        />
      </ThemeProvider>
    );
    expect(component.toJSON()).toMatchSnapshot();
    expect(component1.toJSON()).toMatchSnapshot();
    expect(component2.toJSON()).toMatchSnapshot();
  });
});
