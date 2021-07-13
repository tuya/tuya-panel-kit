import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import Checkbox from '../checkbox';
import { ThemeUtils } from '../../../utils';
import Footer from '../footer';
import { StyledButton } from '../styled';
import TYFlatList from '../../TYLists/list';

const { ThemeProvider } = ThemeUtils;

describe('Checkbox Component', () => {
  it('basic render radio', () => {
    const onConfirm = jest.fn();
    const component = shallow(
      <Checkbox
        title="标题"
        subTitle="副标题"
        confirmText="确认"
        cancelText="取消"
        onConfirm={onConfirm}
        type="radio"
        value="code1"
        dataSource={[
          {
            value: 'code1',
            title: '传感器选择',
          },
          {
            value: 'code2',
            title: '房间传感器校准',
          },
          {
            value: 'code3',
            title: '地板传感器校准',
            iconSize: 24,
            Icon: 'warning',
            reverse: true,
            hideOnUnselect: true,
          },
        ]}
      />
    );
    // const footer = component.find(TYFlatList.CheckboxItem);
    // footer.simulate('press');
    // const checkItem = component.findWhere(c => c.name === 'Footer');
    // console.log({ checkItem });
    // checkItem.simulate('confirm');
    expect(component).toMatchSnapshot();
  });

  it('basic render switch', () => {
    const component = renderer.create(
      <ThemeProvider>
        <Checkbox
          title="标题"
          subTitle="副标题"
          confirmText="确认"
          cancelText="取消"
          type="switch"
          value={['code1']}
          dataSource={[
            {
              value: 'code1',
              title: '传感器选择',
            },
            {
              value: 'code2',
              title: '房间传感器校准',
            },
            {
              value: 'code3',
              title: '地板传感器校准',
              iconSize: 24,
              Icon: 'warning',
              reverse: true,
              hideOnUnselect: true,
            },
          ]}
        />
      </ThemeProvider>
    );
    expect(component.toJSON()).toMatchSnapshot();
    component.update(
      <ThemeProvider>
        <Checkbox
          title="标题"
          subTitle="副标题"
          confirmText="确认"
          cancelText="取消"
          type="switch"
          value={['code2']}
          dataSource={[
            {
              value: 'code1',
              title: '传感器选择',
            },
            {
              value: 'code2',
              title: '房间传感器校准',
            },
            {
              value: 'code3',
              title: '地板传感器校准',
              iconSize: 24,
              Icon: 'warning',
              reverse: true,
              hideOnUnselect: true,
            },
          ]}
        />
      </ThemeProvider>
    );
    expect(component.toJSON()).toMatchSnapshot();
  });
});
