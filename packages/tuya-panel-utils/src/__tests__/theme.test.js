import React from 'react';
import { View } from 'react-native';
import { css } from 'styled-components/native';
import renderer from 'react-test-renderer';
import { Utils } from '../index';

const {
  withTheme,
  ThemeProvider,
  ThemeConsumer,
  parseToCss,
  parseToStyle,
  deepMerge,
  getTheme,
} = Utils.ThemeUtils;

test('withTheme', () => {
  const component = renderer.create(withTheme(<View />));
  expect(component).toMatchSnapshot();
});

test('parseToStyle', () => {
  const result = parseToStyle([1, 2, 3, 4], 'padding');
  expect(result).toEqual({ paddingBottom: 3, paddingLeft: 4, paddingRight: 2, paddingTop: 1 });
});

test('getTheme', () => {
  const result = getTheme({ theme: { height: 7 } }, 'height', 9);
  expect(result).toEqual(7);
});

test('deepMerge', () => {
  const result = deepMerge({ button: { height: 7 } }, { slider: { width: 20 } });
  expect(result).toEqual({ button: { height: 7 }, slider: { width: 20 } });
});
