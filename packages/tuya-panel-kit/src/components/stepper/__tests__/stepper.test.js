import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import Stepper from '../index';
import { TouchableOpacityView, StyledInput } from '../styled';

describe('Stepper Component', () => {
  const onValueChange = jest.fn();
  it('basic render', () => {
    const component = renderer.create(<Stepper disabled={true} value={0} />).toJSON;
    expect(component).toMatchSnapshot();
  });

  it('onValueChange render', () => {
    const component = renderer.create(
      <Stepper
        value={34}
        stepValue={0.1}
        min={0}
        max={99}
        onValueChange={onValueChange}
        inputStyle={{ width: 40 }}
        ellipseIconColor="#f0f"
        buttonStyle={{ width: 36, height: 34, borderRadius: 17 }}
      />
    ).toJSON;
    expect(component).toMatchSnapshot();
  });

  it('buttonType render', () => {
    const component = renderer.create(
      <Stepper
        buttonType="triangle"
        value={0}
        stepValue={5}
        min={0}
        max={99}
        onValueChange={onValueChange}
        inputStyle={{ width: 40 }}
      />
    ).toJSON;
    expect(component).toMatchSnapshot();
  });

  it('editable render', () => {
    const component = renderer.create(
      <Stepper buttonType="triangle" editable={false} value={99} triangleIconColor="#0ff" />
    ).toJSON;
    expect(component).toMatchSnapshot();
  });

  it('editable update', () => {
    const component = renderer.create(
      <Stepper buttonType="triangle" editable={false} value={99} triangleIconColor="#0ff" />
    );
    expect(component).toMatchSnapshot();

    component.update(
      <Stepper buttonType="triangle" editable={false} value={45} triangleIconColor="#0ff" />
    );

    expect(component).toMatchSnapshot();
  });
});

describe('Stepper', () => {
  it('basic render with onPressOut', () => {
    jest.useFakeTimers();
    const wrapper = shallow(<Stepper disabled={false} value={10} />);
    const touchable = wrapper.find(TouchableOpacityView).first();
    jest.runAllTimers();
    touchable.simulate('pressIn', true);
    touchable.simulate('pressOut');
    wrapper.unmount();
    expect(wrapper).toMatchSnapshot();
  });

  jest.useFakeTimers();
  it('basic render with onPressIn', () => {
    const wrapper = shallow(<Stepper disabled={false} value={120} />);
    const touchable = wrapper.find(TouchableOpacityView).last();
    touchable.simulate('pressIn', false);
    jest.advanceTimersByTime(250);
    touchable.simulate('pressOut');
    wrapper.unmount();
    expect(wrapper).toMatchSnapshot();
  });

  it('basic render with TextInput 1', () => {
    const onValueChange = jest.fn();
    const wrapper = shallow(<Stepper disabled={false} value={120} onValueChange={onValueChange} />);
    const touchable = wrapper.find(StyledInput);
    touchable.simulate('changeText', 't');
    wrapper.setState({ value: '12' }, () => {
      touchable.simulate('endEditing');
    });
    expect(wrapper).toMatchSnapshot();
  });

  it('basic render with TextInput 2', () => {
    const onValueChange = jest.fn();
    const wrapper = shallow(<Stepper disabled={false} value={120} onValueChange={onValueChange} />);
    const touchable = wrapper.find(StyledInput);
    touchable.simulate('changeText', 't');
    wrapper.setState({ value: '' }, () => {
      touchable.simulate('endEditing');
    });
    expect(wrapper).toMatchSnapshot();
  });

  it('basic render with TextInput 3', () => {
    const wrapper = shallow(<Stepper disabled={false} value={120} />);
    const touchable = wrapper.find(StyledInput);
    touchable.simulate('changeText', '.');
    expect(wrapper).toMatchSnapshot();
  });

  it('basic render with TextInput 4', () => {
    const wrapper = shallow(<Stepper disabled={false} value={12} />);
    const touchable = wrapper.find(StyledInput);
    touchable.simulate('changeText', '150');
    expect(wrapper).toMatchSnapshot();
  });

  it('basic render with TextInput 5', () => {
    const wrapper = shallow(<Stepper disabled={false} value={12} />);
    const touchable = wrapper.find(StyledInput);
    touchable.simulate('changeText', '100.9');
    expect(wrapper).toMatchSnapshot();
  });

  it('basic render with TextInput 6', () => {
    const wrapper = shallow(<Stepper disabled={false} value={12} />);
    const touchable = wrapper.find(StyledInput);
    touchable.simulate('changeText', '10.9');
    expect(wrapper).toMatchSnapshot();
  });
});
