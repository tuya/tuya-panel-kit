import React from 'react';
import renderer from 'react-test-renderer';
import List from '../list';
import { ThemeUtils } from '../../../utils';

const { ThemeProvider } = ThemeUtils;

describe('List Component', () => {
  it('basic render', () => {
    const component = renderer.create(
      <ThemeProvider>
        <List
          title="标题"
          subTitle="副标题"
          confirmText="确认"
          cancelText="取消"
          dataSource={new Array(6).fill(1).map((_, idx) => ({
            title: idx === 0 ? '点我关闭' : `选项${idx}`,
            onPress: jest.fn(),
          }))}
        />
      </ThemeProvider>
    );
    expect(component.toJSON()).toMatchSnapshot();
  });
});
