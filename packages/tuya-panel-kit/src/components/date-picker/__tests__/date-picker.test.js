import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import DatePicker from '../index';
import { ThemeUtils } from '../../../utils';
import Picker from '../../picker-view';

const { ThemeProvider } = ThemeUtils;

describe('DatePicker Component', () => {
  it('basic render', () => {
    const component = renderer
      .create(
        <ThemeProvider>
          <DatePicker />
        </ThemeProvider>
      )
      .toJSON();
    expect(component).toMatchSnapshot();
  });

  it('should render picker which locale is cn', () => {
    const component = renderer.create(
      <ThemeProvider>
        <DatePicker defaultDate={new Date(2018, 11, 12, 23, 59, 59)} locale="cn" />
      </ThemeProvider>
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('should render picker which locale is defaultValue', () => {
    const component = renderer.create(
      <ThemeProvider>
        <DatePicker defaultDate={new Date(2018, 11, 12, 23, 59, 59)} locale={0} />
      </ThemeProvider>
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('should render picker which locale is object', () => {
    const component = renderer.create(
      <ThemeProvider>
        <DatePicker
          defaultDate={new Date(2018, 11, 12, 23, 59, 59)}
          locale={{
            year: 'year',
            month: 'month',
            day: 'day',
            hour: 'hour',
            minute: 'minute',
            am: 'am',
            pm: 'pm',
          }}
        />
      </ThemeProvider>
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('should render picker which mode is datetime', () => {
    const component = renderer.create(
      <ThemeProvider>
        <DatePicker defaultDate={new Date(2018, 11, 12, 23, 59, 59)} mode="datetime" />
      </ThemeProvider>
    );
    expect(component.toJSON()).toMatchSnapshot();
  });
  it('should render picker which mode is year', () => {
    const component = renderer.create(
      <ThemeProvider>
        <DatePicker defaultDate={new Date(2018, 11, 12, 23, 59, 59)} mode="year" />
      </ThemeProvider>
    );
    expect(component.toJSON()).toMatchSnapshot();
  });
  it('should render picker which mode is month', () => {
    const component = renderer.create(
      <ThemeProvider>
        <DatePicker defaultDate={new Date(2018, 11, 12, 23, 59, 59)} mode="month" />
      </ThemeProvider>
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('should render picker which mode is else', () => {
    const component = renderer.create(
      <ThemeProvider>
        <DatePicker defaultDate={new Date(2018, 11, 12, 23, 59, 59)} mode="haah" />
      </ThemeProvider>
    );
    expect(component.toJSON()).toMatchSnapshot();
  });
  it('should render picker which use12Hours', () => {
    const component = renderer.create(
      <ThemeProvider>
        <DatePicker
          defaultDate={new Date(2020, 10, 12, 23, 59, 59)}
          mode="time"
          use12Hours={true}
          maxDate={new Date(2020, 11, 12, 0, 59, 59)}
        />
      </ThemeProvider>
    );
    expect(component.toJSON()).toMatchSnapshot();
  });
  it('should render picker which ampmFirst', () => {
    const component = renderer.create(
      <ThemeProvider>
        <DatePicker
          defaultDate={new Date(2018, 11, 12, 23, 59, 59)}
          mode="time"
          isAmpmFirst={true}
          use12Hours={true}
        />
      </ThemeProvider>
    );
    expect(component.toJSON()).toMatchSnapshot();
  });
  it('should picker which mode is date value change', () => {
    const component = renderer.create(
      <ThemeProvider>
        <DatePicker defaultDate={new Date(2018, 11, 12, 23, 59, 59)} mode="date" />
      </ThemeProvider>
    );
    expect(component).toMatchSnapshot();
    component.update(
      <ThemeProvider>
        <DatePicker defaultDate={new Date(2020, 11, 12, 23, 59, 59)} mode="date" />
      </ThemeProvider>
    );
    expect(component).toMatchSnapshot();
  });

  it('should picker which mode is maxDate', () => {
    const component = renderer.create(
      <ThemeProvider>
        <DatePicker defaultDate={new Date(2030, 11, 12, 23, 59, 59)} mode="date" />
      </ThemeProvider>
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('should picker mode is date', () => {
    const component1 = renderer.create(
      <ThemeProvider>
        <DatePicker defaultDate={new Date(1972, 11, 12, 23, 59, 59)} mode="date" />
      </ThemeProvider>
    );
    expect(component1.toJSON()).toMatchSnapshot();

    const component2 = renderer.create(
      <ThemeProvider>
        <DatePicker defaultDate={new Date(2033, 11, 12, 23, 59, 59)} mode="date" />
      </ThemeProvider>
    );
    expect(component2.toJSON()).toMatchSnapshot();
  });

  it('should picker mode is time', () => {
    const component1 = renderer.create(
      <ThemeProvider>
        <DatePicker
          defaultDate={new Date(1972, 11, 12, 20, 59, 59)}
          mode="time"
          minDate={new Date(1972, 11, 12, 23, 59, 59)}
        />
      </ThemeProvider>
    );
    expect(component1.toJSON()).toMatchSnapshot();

    const component2 = renderer.create(
      <ThemeProvider>
        <DatePicker defaultDate={new Date(2033, 11, 12, 23, 59, 59)} mode="time" />
      </ThemeProvider>
    );
    expect(component2.toJSON()).toMatchSnapshot();
  });

  it('should picker mode is datetime', () => {
    const component1 = renderer.create(
      <ThemeProvider>
        <DatePicker
          defaultDate={new Date(1972, 11, 12, 20, 59, 59)}
          mode="datetime"
          minDate={new Date(1972, 11, 12, 23, 59, 59)}
        />
      </ThemeProvider>
    );
    expect(component1.toJSON()).toMatchSnapshot();

    const component2 = renderer.create(
      <ThemeProvider>
        <DatePicker defaultDate={new Date(2033, 11, 12, 23, 59, 59)} mode="datetime" />
      </ThemeProvider>
    );
    expect(component2.toJSON()).toMatchSnapshot();
  });
});

const setup = (props = {}) => {
  return shallow(<DatePicker {...props} />);
};

describe('DataPicker', () => {
  it('render with dateSortKeys props', () => {
    setup({ dateSortKeys: ['year', 'month', 'day'] });
  });
  it('componentWillReceiveProps(nextProps)', () => {
    const wrapper = setup();
    wrapper.setProps({ date: new Date('2020-10-19') });
  });
  it('onValueChange with date props', () => {
    const wrapper = setup({ date: new Date('2020-10-19') });
    const target = wrapper.find(Picker);
    wrapper.setProps({ onDateChange: jest.fn(), onValueChange: jest.fn(), data: new Date() });
    target.at(0).simulate('valueChange', new Date('2020-10-20'));
  });
  // it('onValueChange without date props', () => {
  //   const wrapper = setup();
  //   const target = wrapper.find(Picker);
  //   target.at(0).simulate('valueChange', new Date('2020-10-20'));
  // });
  it('onValueChange getNewDate', () => {
    let wrapper = setup();
    wrapper.instance().getNewDate(new Date('2020-10-20').toTimeString(), 1, 'month');
    wrapper.instance().getNewDate(new Date('2020-10-20').toTimeString(), 1, 'day');
    wrapper.instance().getNewDate(new Date('2020-10-20').toTimeString(), 1, 'hour');
    wrapper.instance().getNewDate(new Date('2020-10-20').toTimeString(), 1, 'minute');
    wrapper.instance().getNewDate(0, 1, 'ampm');
    wrapper.instance().getNewDate(new Date('2020-10-20').toTimeString(), 1, 'tuya');
    wrapper = setup({ mode: 'time', use12Hours: true });
    wrapper.instance().getNewDate(new Date('2020-10-20').toTimeString(), 1, 'hour');
    wrapper.instance().getNewDate(new Date('2020-10-20').toTimeString(), 1, 'minute');
    wrapper.instance().getNewDate(new Date('2020-10-20').toTimeString(), 1, 'ampm');
    wrapper.instance().getNewDate(new Date('2020-10-20').toTimeString(), 1, 'tuya');
  });
});
