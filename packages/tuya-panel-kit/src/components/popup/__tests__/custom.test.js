import React from 'react';
import { View, Text } from 'react-native';
import renderer from 'react-test-renderer';
import Popup from '../index';
import _ from 'lodash';
import Custom from '../custom';
import { ThemeUtils } from '../../../utils';

const { ThemeProvider } = ThemeUtils;

describe('Popup Component', () => {
  it('basic render', () => {
    const component = renderer
      .create(
        Popup.custom({
          content: (
            <View
              style={{
                height: 200,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#fff',
              }}
            >
              <Text style={{ fontSize: 36, color: '#000' }}>Custom Content</Text>
            </View>
          ),
          title: 'Custom',
          cancelText: '取消',
          confirmText: '确认',
          onMaskPress: ({ close }) => close(),
        })
      )
      .toJSON();

    expect(component).toMatchSnapshot();
  });
});

describe('Custom Component', () => {
  it('basic render', () => {
    const component = renderer.create(
      <Custom
        content={
          <View
            style={{
              height: 200,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#fff',
            }}
          >
            <Text style={{ fontSize: 36, color: '#000' }}>Custom Content</Text>
          </View>
        }
        title="自定义"
        showBack={true}
        cancelText="取消"
        confirmText="确认"
        onSwitchValueChange={jest.fn()}
        onMaskPress={jest.fn(({ close: callback }) => callback())}
      />
    );
    const instance = component.getInstance();
    instance._handleSelect();
    instance._handleCancelPress();
    instance._handleBack();
    instance._handleModalClose();
    instance._handleMotionHide();
    instance._handleConfirmPress();
    instance._handleMaskPress();
    instance._handleSwitchValueChange();

    expect(component).toMatchSnapshot();
  });

  it('basic render with visible', () => {
    const component = renderer.create(
      <ThemeProvider>
        <Custom
          content={
            <View
              style={{
                height: 200,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#fff',
              }}
            >
              <Text style={{ fontSize: 36, color: '#000' }}>Custom Content</Text>
            </View>
          }
          visible={false}
          title="自定义"
          cancelText="取消"
          showBack={true}
          confirmText="确认"
        />
      </ThemeProvider>
    );

    component.update(
      <ThemeProvider>
        <Custom
          content={
            <View
              style={{
                height: 200,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#fff',
              }}
            >
              <Text style={{ fontSize: 36, color: '#000' }}>Custom Content</Text>
            </View>
          }
          visible={true}
          title="自定义"
          showBack={true}
          cancelText="取消"
          confirmText="确认"
        />
      </ThemeProvider>
    );

    expect(component).toMatchSnapshot();
  });
});
