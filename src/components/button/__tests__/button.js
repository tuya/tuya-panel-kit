import React from 'react';
import 'react-native';
import renderer from 'react-test-renderer';
import Button from '../index';

const background = require('./res/button.png');
const linearGradientBackground = {
  '3%': '#FF7E38',
  '90%': '#FF624C',
};

describe('Button Component', () => {
  it('basic render', () => {
    const component = renderer.create(<Button />).toJSON();
    expect(component).toMatchSnapshot();
  });


  it('should have onPress event', () => {
    const onPress = jest.fn();
    const component = renderer.create(
      <Button
        onPress={onPress}
        style={{ backgroundColor: 'yellow' }}
      />
    ).toJSON();
    expect(component).toMatchSnapshot();
  });


  it('should render with style', () => {
    const component = renderer.create(
      <Button
        style={{
          backgroundColor: 'yellow',
          width: 300,
        }}
      />
    ).toJSON();
    expect(component).toMatchSnapshot();
  });


  it('should render with backgroundStyle', () => {
    const component = renderer.create(
      <Button
        backgroundStyle={{
          width: 300,
          height: 48,
        }}
      />
    ).toJSON();

    expect(component).toMatchSnapshot();
  });


  it('should render with background', () => {
    const component = renderer.create(
      <Button
        background={background}
      />
    ).toJSON();

    expect(component).toMatchSnapshot();
  });


  it('should render with LinearGradient Background', () => {
    const component = renderer.create(
      <Button
        background={linearGradientBackground}
        backgroundStyle={{
          height: 48,
          width: 100,
        }}
      />
    );

    expect(component).toMatchSnapshot();
  });

});
