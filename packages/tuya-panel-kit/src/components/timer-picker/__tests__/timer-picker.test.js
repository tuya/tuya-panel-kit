import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import TimerPicker from '../index';
import { ThemeUtils } from '../../../utils';
import Picker from '../../picker-view';

const { ThemeProvider } = ThemeUtils;

function setup(props) {
  return shallow(
    <TimerPicker
      style={{ marginTop: 10 }}
      startTime={0}
      endTime={1220}
      prefixPosition="left"
      onTimerChange={jest.fn()}
      {...props}
    />
  );
}

describe('TimerPicker Component', () => {
  it('render width prefixPosition === left', () => {
    const component = renderer.create(
      <ThemeProvider>
        <TimerPicker
          style={{ marginTop: 10 }}
          startTime={0}
          endTime={1220}
          prefixPosition="left"
          onTimerChange={jest.fn()}
        />
      </ThemeProvider>
    );
    expect(component).toMatchSnapshot();
    component.update(
      <ThemeProvider>
        <TimerPicker
          style={{ marginTop: 10 }}
          startTime={1220}
          endTime={60}
          prefixPosition="left"
          onTimerChange={jest.fn()}
        />
      </ThemeProvider>
    );
    expect(component).toMatchSnapshot();
  });

  it('render width prefixPosition === array', () => {
    const component = renderer
      .create(
        <ThemeProvider>
          <TimerPicker
            style={{ marginTop: 10 }}
            startTime={0}
            endTime={1440}
            prefixPosition={['left', 'right']}
            onTimerChange={jest.fn()}
          />
        </ThemeProvider>
      )
      .toJSON();
    expect(component).toMatchSnapshot();
  });

  it('render width singlePicker ', () => {
    const component = renderer
      .create(
        <ThemeProvider>
          <TimerPicker
            style={{ marginTop: 10 }}
            startTime={0}
            endTime={1440}
            prefixPosition="right"
            onTimerChange={jest.fn()}
            singlePicker={true}
            symbol="tuya"
          />
        </ThemeProvider>
      )
      .toJSON();
    expect(component).toMatchSnapshot();
  });

  it('render with is12Hours(false)', () => {
    setup({ is12Hours: false });
  });
  it('trigger Picker onStartPrefixChange', () => {
    const wrapper = setup();
    const startPrefixChange = wrapper.find(Picker).at(0);
    wrapper.setState({ startHour: 12 }, () => {
      startPrefixChange.simulate('valueChange', 'AM');
    });
    startPrefixChange.simulate('valueChange', 'PM');
  });
  it('trigger Picker onStartHourChange', () => {
    const wrapper = setup();
    const startPrefixChange = wrapper.find(Picker).at(1);
    startPrefixChange.simulate('valueChange');
  });
  it('trigger Picker onStartMinChange', () => {
    const wrapper = setup();
    const startPrefixChange = wrapper.find(Picker).at(2);
    startPrefixChange.simulate('valueChange');
  });
  it('trigger Picker onEndPrefixChange', () => {
    const wrapper = setup();
    const startPrefixChange = wrapper.find(Picker).at(3);
    startPrefixChange.simulate('valueChange', 'AM');
    wrapper.setState({ endHour: 10 }, () => {
      startPrefixChange.simulate('valueChange', 'PM');
    });
  });
  it('trigger Picker onEndHourChange', () => {
    const wrapper = setup();
    const startPrefixChange = wrapper.find(Picker).at(4);
    startPrefixChange.simulate('valueChange');
  });
  it('trigger Picker onEndMinChange', () => {
    const wrapper = setup();
    const startPrefixChange = wrapper.find(Picker).at(5);
    startPrefixChange.simulate('valueChange');
  });
});
