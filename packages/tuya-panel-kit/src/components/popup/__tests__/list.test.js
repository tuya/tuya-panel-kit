import React from 'react';
import { View } from 'react-native';
import renderer from 'react-test-renderer';
import Popup from '../index';
import _ from 'lodash';
import List from '../list';
import { ThemeUtils } from '../../../utils';

const { ThemeProvider } = ThemeUtils;

describe('Popup Component', () => {
  it('basic render', () => {
    const component = renderer
      .create(
        Popup.list({
          value: '1',
          title: '单选',
          subTitle: '副标题',
          cancelText: '取消',
          confirmText: '确认',
          footerType: 'singleCancel',
          dataSource: _.times(7, n => ({
            key: `${n}`,
            title: `${n}`,
            value: `${n}`,
          })),
          type: 'radio',
          maxItemNum: 7,
          onMaskPress: ({ close }) => close(),
        })
      )
      .toJSON();

    expect(component).toMatchSnapshot();
  });
});

describe('List Component', () => {
  it('basic render', () => {
    const component = renderer.create(
      <ThemeProvider>
        <List
          cancelText="取消"
          confirmText="确认"
          title="单选"
          value="1"
          subTitle="副标题"
          type="radio"
          maxItemNum={7}
          listItemStyle={{
            height: 36,
          }}
          dataSource={_.times(7, n => ({
            key: `${n}`,
            title: `${n}`,
            value: `${n}`,
          }))}
        />
      </ThemeProvider>
    );
    component.update(
      <ThemeProvider>
        <List
          cancelText="取消"
          confirmText="确认"
          title="单选"
          value="3"
          subTitle="副标题"
          type="radio"
          listItemStyle={{
            height: 36,
          }}
          maxItemNum={7}
          dataSource={_.times(7, n => ({
            key: `${n}`,
            title: `${n}`,
            value: `${n}`,
          }))}
        />
      </ThemeProvider>
    );

    const component1 = renderer.create(
      <ThemeProvider>
        <List
          cancelText="取消"
          confirmText="确认"
          title="单选"
          subTitle="副标题"
          type="switch"
          value={['1']}
          maxItemNum={7}
          dataSource={_.times(7, n => ({
            key: `${n}`,
            title: `${n}`,
            value: `${n}`,
          }))}
        />
      </ThemeProvider>
    );

    component1.update(
      <ThemeProvider>
        <List
          cancelText="取消"
          confirmText="确认"
          title="单选"
          subTitle="副标题"
          type="switch"
          value={['3']}
          maxItemNum={7}
          dataSource={_.times(7, n => ({
            key: `${n}`,
            title: `${n}`,
            value: `${n}`,
          }))}
        />
      </ThemeProvider>
    );

    const component2 = renderer.create(
      <ThemeProvider>
        <List
          cancelText="取消"
          confirmText="确认"
          title="单选"
          value="1"
          subTitle="副标题"
          type="radio"
          maxItemNum={7}
          listItemStyle={{
            height: 36,
          }}
          dataSource={_.times(7, n => ({
            key: `${n}`,
            title: `${n}`,
            value: `${n}`,
          }))}
        />
      </ThemeProvider>
    );

    component2.update(
      <ThemeProvider>
        <List
          cancelText="取消"
          confirmText="确认"
          title="单选"
          value="1"
          subTitle="副标题"
          type="radio"
          listItemStyle={{
            height: 36,
          }}
          maxItemNum={7}
          dataSource={_.times(7, n => ({
            key: `${n}`,
            title: `${n}`,
            value: `${n}`,
          }))}
        />
      </ThemeProvider>
    );

    expect(component.toJSON()).toMatchSnapshot();
    expect(component1.toJSON()).toMatchSnapshot();
    expect(component2.toJSON()).toMatchSnapshot();
  });

  it('render with listItemStyle', () => {
    const component1 = renderer.create(
      <ThemeProvider>
        <List
          motionType="none"
          cancelText="取消"
          confirmText="确认"
          title="单选"
          subTitle="副标题"
          type="switch"
          value={['1']}
          maxItemNum={7}
          listItemStyle={{
            backgroundColor: '#ccc',
          }}
          dataSource={_.times(7, n => ({
            key: `${n}`,
            title: `${n}`,
            value: `${n}`,
          }))}
        />
      </ThemeProvider>
    );

    expect(component1).toMatchSnapshot();
  });

  it('render with type', () => {
    const component1 = renderer.create(
      <ThemeProvider>
        <List
          cancelText="取消"
          confirmText="确认"
          title="单选"
          subTitle="副标题"
          type="else"
          value={['1']}
          maxItemNum={7}
          listItemStyle={{
            backgroundColor: '#ccc',
          }}
          dataSource={_.times(7, n => ({
            key: `${n}`,
            title: `${n}`,
            value: `${n}`,
          }))}
        />
      </ThemeProvider>
    );
    expect(component1.toJSON()).toMatchSnapshot();
  });

  it('render with contentCenter', () => {
    const component1 = renderer.create(
      <List
        cancelText="取消"
        confirmText="确认"
        title="单选"
        subTitle="副标题"
        type="radio"
        value={['1']}
        maxItemNum={7}
        listItemStyle={{
          backgroundColor: '#ccc',
        }}
        contentCenter={true}
        dataSource={_.times(7, n => ({
          key: `${n}`,
          title: `${n}`,
          value: `${n}`,
        }))}
      />
    );

    const instance = component1.getInstance();
    instance._handleSelect();
    instance._handleCancelPress();
    instance._handleBack();
    instance._handleModalClose();
    instance._handleMotionHide();
    instance._handleConfirmPress();
    instance._handleMaskPress();
    instance._handleSwitchValueChange();

    expect(component1).toMatchSnapshot();
  });
});
