import React from 'react';
import 'react-native';
import renderer from 'react-test-renderer';
import Button from '../index';

const background = require('./res/button.png');

const linearBackground = {
  x1: '20%',
  y1: '20%',
  x2: '30%',
  y2: '100%',
  stops: {
    '0%': '#ffff00',
    '100%': '#000',
  },
};

const radialBackground = {
  stops: [
    {
      offset: '40%',
      stopColor: '#ff0',
      stopOpacity: '1',
    },
    {
      offset: '100%',
      stopColor: '#00f',
      stopOpacity: '1',
    },
  ],
};

describe('Button Component', () => {
  it('basic render', () => {
    const component = renderer.create(<Button />).toJSON();
    expect(component).toMatchSnapshot();
  });

  it('should have onPress event', () => {
    const onPress = jest.fn();
    const component = renderer
      .create(
        <Button onPress={onPress} style={{ backgroundColor: 'yellow', width: 200, height: 68 }} />
      )
      .toJSON();
    expect(component).toMatchSnapshot();
  });

  it('should render with background', () => {
    const component = renderer
      .create(
        <Button
          text="点我一下"
          textSingleLine={false}
          textDirection={'top'}
          background={background}
        />
      )
      .toJSON();

    expect(component).toMatchSnapshot();
  });

  it('should render with image', () => {
    const component = renderer
      .create(
        <Button
          imageColor="#666"
          imageStyle={{ width: 48, height: 48, borderRadius: 24 }}
          image={background}
        />
      )
      .toJSON();

    expect(component).toMatchSnapshot();
  });

  it('should render with LinearBackground', () => {
    const component = renderer.create(
      <Button
        background={linearBackground}
        icon="selected"
        iconSize={24}
        iconColor="#f0f"
        text="文字"
        backgroundStyle={{
          height: 48,
          width: 100,
        }}
      />
    );
    expect(component).toMatchSnapshot();
  });

  it('should render with RadialGradient', () => {
    const component = renderer.create(
      <Button
        background={radialBackground}
        badgeText="涂鸦智能"
        badgeTextStyle={{ fontSize: 14, color: '#333' }}
        badgeStyle={{ width: 48, height: 32 }}
        border={false}
      />
    );
    expect(component).toMatchSnapshot();
  });

  it('should render with background', () => {
    const component = renderer.create(
      <Button
        background="#346545"
        stretch={true}
        disabled={true}
        wrapperStyle={{
          height: 48,
          width: 100,
        }}
      />
    );
    expect(component).toMatchSnapshot();
  });

  it('should render with Stretch Size Type', () => {
    const component = renderer.create(<Button stretch={true} size="large" type="primary" />);
    expect(component).toMatchSnapshot();
  });

  it('should render with IconPath', () => {
    const component = renderer.create(
      <Button
        text="中文按钮"
        iconPath="M512 0c282.752 0 512 229.248 512 512s-229.248 512-512 512S0 794.752 0 512 229.248 0 512 0z m0 85.333333C276.352 85.333333 85.333333 276.352 85.333333 512s191.018667 426.666667 426.666667 426.666667 426.666667-191.018667 426.666667-426.666667S747.648 85.333333 512 85.333333z"
        useART={true}
      />
    );
    expect(component).toMatchSnapshot();
  });

  it('should render with Theme', () => {
    const component = renderer.create(
      <Button
        theme={{
          bgWidth: 120,
          bgHeight: 64,
          bgRadius: 16,
          bgColor: '#f8f8f8',
          margin: [2, 2, 2, 2],
          fontSize: 14,
          iconSize: 18,
          fontColor: '#666',
        }}
        textDirection="bottom"
        icon="selected"
        text="本地theme测试"
      />
    );
    expect(component).toMatchSnapshot();
  });

  it('should render with Icon', () => {
    const component = renderer.create(
      <Button
        type="primary"
        textDirection="left"
        size={40}
        icon="selected"
        iconSize={24}
        iconColor="#fff"
        text="文字"
        background="#7ED321"
      />
    );
    expect(component).toMatchSnapshot();
  });

  it('should render with Icon Theme', () => {
    const component = renderer.create(
      <Button icon="selected" theme={{ iconSize: 24, bgWidth: 36 }} text="文字" size="noSet" />
    );
    expect(component).toMatchSnapshot();
  });
});
