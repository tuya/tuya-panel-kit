import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import DatePicker from '../index';

const FIX_DATE = new Date(2018, 11, 18, 11, 10, 56);
describe('DatePicker Component', () => {
  it('basic render', () => {
    const component = renderer.create(<DatePicker />).toJSON();
    expect(component).toMatchSnapshot();
  });
  it('controlled Component', () => {
    const component = renderer.create(<DatePicker date={FIX_DATE} />);
    const { instance } = component.root;
    component.update(<DatePicker date={new Date('2018/12/20')} />);
    expect(instance.state.date).toEqual(new Date('2018/12/20'));
    component.update(<DatePicker defaultDate={new Date('2018/12/30')} />);
    expect(instance.state.date).toEqual(new Date('2018/12/20'));
  });
  it('should render picker which locale is cn', () => {
    const component = renderer.create(
      <DatePicker
        defaultDate={FIX_DATE}
        locale="cn"
      />
    );
    expect(component.toJSON()).toMatchSnapshot();
  });
  it('should render picker which mode is datetime', () => {
    const component = renderer.create(
      <DatePicker
        defaultDate={FIX_DATE}
        mode="datetime"
      />
    );
    expect(component.toJSON()).toMatchSnapshot();
  });
  it('should render picker which mode is year', () => {
    const component = renderer.create(
      <DatePicker
        defaultDate={FIX_DATE}
        mode="year"
      />
    );
    expect(component.toJSON()).toMatchSnapshot();
  });
  it('should render picker which mode is month', () => {
    const component = renderer.create(
      <DatePicker
        defaultDate={FIX_DATE}
        mode="month"
      />
    );
    expect(component.toJSON()).toMatchSnapshot();
  });
  it('should render picker which use12Hours', () => {
    const component = renderer.create(
      <DatePicker
        defaultDate={new Date(2018, 11, 12, 23, 59, 59)}
        mode="time"
        use12Hours={true}
        maxDate={new Date(2018, 11, 12, 0, 59, 59)}
      />
    );
    expect(component.toJSON()).toMatchSnapshot();
  });
  it('should render picker which ampmFirst', () => {
    const component = renderer.create(
      <DatePicker
        defaultDate={new Date(2018, 11, 12, 23, 59, 59)}
        mode="time"
        isAmpmFirst={true}
        use12Hours={true}
      />
    );
    expect(component.toJSON()).toMatchSnapshot();
  });
  it('should picker which mode is date value change', () => {
    const component = renderer.create(
      <DatePicker
        defaultDate={new Date(2018, 11, 12, 23, 59, 59)}
        mode="date"
      />
    );
    const { instance } = component.root;
    instance.onValueChange(2019, 0, 'year');
    expect(instance.state.date).toEqual(new Date(2019, 11, 12, 23, 59, 59));
    instance.onValueChange(11, 1, 'month');
    expect(instance.state.date).toEqual(new Date(2019, 10, 12, 23, 59, 59));
    instance.onValueChange(30, 2, 'day');
    expect(instance.state.date).toEqual(new Date(2019, 10, 30, 23, 59, 59));
    instance.onValueChange(8, 3, 'hour');
    expect(instance.state.date).toEqual(new Date(2019, 10, 30, 8, 59, 59));
    instance.onValueChange(24, 4, 'minute');
    expect(instance.state.date).toEqual(new Date(2019, 10, 30, 8, 24, 59));
  });
  it('should picker which mode is time value change', () => {
    const component = renderer.create(
      <DatePicker
        defaultDate={new Date(2018, 11, 12, 23, 59, 59)}
        mode="time"
        use12Hours={true}
      />
    );
    const { instance } = component.root;
    instance.onValueChange(8, 0, 'hour');
    expect(instance.state.date).toEqual(new Date(2018, 11, 12, 20, 59, 59));
    instance.onValueChange(24, 1, 'minute');
    expect(instance.state.date).toEqual(new Date(2018, 11, 12, 20, 24, 59));
    instance.onValueChange(0, 2, 'ampm');
    expect(instance.state.date).toEqual(new Date(2018, 11, 12, 8, 24, 59));
    instance.onValueChange(1, 2, 'ampm');
    expect(instance.state.date).toEqual(new Date(2018, 11, 12, 20, 24, 59));
  });
});
