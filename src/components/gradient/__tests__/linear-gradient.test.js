import { Text } from 'react-native';
import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import LinearGradient from '../linear-gradient';

const linearGradientBackground = {
  '3%': '#FF7E38',
  '90%': '#FF624C',
};

describe('LinearGradient Component', () => {
  it('componentWillReceiveProps(nextProps)', () => {
    const wrapper = shallow(<LinearGradient {...linearGradientBackground} />);
    wrapper.setProps({
      stops: {
        '50%': 'rgb(255, 255, 255)',
        '100%': 'rgb(0, 0, 0)',
      },
    });
  });
  it('basic render', () => {
    const component = renderer.create(<LinearGradient {...linearGradientBackground} />);

    expect(component.root.props).toEqual({
      '3%': '#FF7E38',
      '90%': '#FF624C',
      children: null,
      gradientId: 'linear-gradient',
      stops: { '0%': 'rgb(255, 255, 255)', '100%': 'rgb(0, 0, 0)' },
      style: null,
      x1: '0%',
      x2: '0%',
      y1: '0%',
      y2: '100%',
    });
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('LinearGradient setSource', () => {
    const component = renderer.create(<LinearGradient {...linearGradientBackground} />);

    component.root.instance.setSource({
      '2%': '#FF7E38',
      '90%': '#FF624C',
    });
    expect(component.root.instance.state).toEqual({
      stops: {
        '2%': '#FF7E38',
        '90%': '#FF624C',
      },
      x1: '0%',
      x2: '0%',
      y1: '0%',
      y2: '100%',
    });
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('LinearGradient render children', () => {
    const component = renderer.create(
      <LinearGradient {...linearGradientBackground}>
        <Text>111111111111111</Text>
      </LinearGradient>
    );

    expect(component.root.instance.props.children.props.children).toEqual('111111111111111');
    expect(component.toJSON()).toMatchSnapshot();
  });
});
