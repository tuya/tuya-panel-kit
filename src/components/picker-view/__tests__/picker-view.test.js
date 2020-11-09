/**
 * @jest-environment jsdom
 */
import { requireNativeComponent, Picker } from 'react-native';
import React from 'react';
import { mount } from 'enzyme';
import renderer from 'react-test-renderer';
import PickerIos from '../index.ios';
import PickerAndroid from '../index.android';
import PickerWeb from '../index.web';
import { ThemeUtils } from '../../../utils';

const { ThemeProvider } = ThemeUtils;

describe('Picker Component', () => {
  const origConsole = console.error;
  beforeEach(() => {
    console.error = () => {};
  });
  afterEach(() => {
    console.error = origConsole;
  });
  it('trigger ios events', () => {
    const ios = mount(
      <ThemeProvider>
        <PickerIos loop={true}>
          <PickerIos.Item label="Java" value="java" />
          <PickerIos.Item label="JavaScript" value="js" />
        </PickerIos>
      </ThemeProvider>
    );
    ios
      .findWhere(c => !!c.prop('onValueChange'))
      .props()
      .onValueChange('tuya');
    const ios1 = mount(
      <ThemeProvider>
        <PickerIos loop={false}>
          <PickerIos.Item label="Java" value="java" />
          <PickerIos.Item label="JavaScript" value="js" />
        </PickerIos>
      </ThemeProvider>
    );
    ios1
      .findWhere(c => !!c.prop('onValueChange'))
      .props()
      .onValueChange('tuya');
  });
  it('trigger android events', () => {
    const android = mount(
      <ThemeProvider>
        <PickerAndroid onValueChange={jest.fn()}>
          <PickerAndroid.Item label="Java" value="java" />
          <PickerAndroid.Item label="JavaScript" value="js" />
        </PickerAndroid>
      </ThemeProvider>
    );
    const target = android.findWhere(c => !!c.prop('onValueChange'));
    target
      .at(2)
      .props()
      .onValueChange({ nativeEvent: { newIndex: 0 } });
  });
  it('trigger web events', () => {
    const web = mount(
      <ThemeProvider>
        <PickerWeb loop={true}>
          <PickerWeb.Item label="Java" value="java" />
          <PickerWeb.Item label="JavaScript" value="js" />
        </PickerWeb>
      </ThemeProvider>
    );
    const target = web.findWhere(c => !!c.prop('onValueChange'));
    target.at(0).props().onValueChange('tuya');
    const web1 = mount(
      <ThemeProvider>
        <PickerWeb>
          <PickerWeb.Item label="Java" value="java" />
          <PickerWeb.Item label="JavaScript" value="js" />
        </PickerWeb>
      </ThemeProvider>
    );
    const target1 = web1.findWhere(c => !!c.prop('onValueChange'));
    target1.at(0).props().onValueChange('tuya');
  });
  it('basic render', () => {
    const ios = renderer
      .create(
        <ThemeProvider>
          <PickerIos>
            <PickerIos.Item label="Java" value="java" />
            <PickerIos.Item label="JavaScript" value="js" />
          </PickerIos>
        </ThemeProvider>
      )
      .toJSON();
    expect(ios).toMatchSnapshot();

    const android = renderer
      .create(
        <ThemeProvider>
          <PickerAndroid>
            <PickerAndroid.Item label="Java" value="java" />
            <PickerAndroid.Item label="JavaScript" value="js" />
          </PickerAndroid>
        </ThemeProvider>
      )
      .toJSON();
    expect(android).toMatchSnapshot();

    const web = renderer
      .create(
        <ThemeProvider>
          <PickerWeb>
            <PickerWeb.Item label="Java" value="java" />
            <PickerWeb.Item label="JavaScript" value="js" />
          </PickerWeb>
        </ThemeProvider>
      )
      .toJSON();

    expect(web).toMatchSnapshot();
  });

  it('should picker ios value change', () => {
    let mockRef;
    const fn = jest.fn();
    const component = renderer.create(
      <ThemeProvider>
        <PickerIos onValueChange={fn} loop={true}>
          <PickerIos.Item label="Java" value="java" />
          <PickerIos.Item label="JavaScript" value="js" />
        </PickerIos>
      </ThemeProvider>
    );
    expect(component).toMatchSnapshot();
    component.update(
      <ThemeProvider>
        <PickerIos
          selectedValue="js"
          onValueChange={fn}
          ref={ref => {
            mockRef = ref;
          }}
          loop={true}
        >
          <PickerIos.Item label="Java" value="java" />
          <PickerIos.Item label="JavaScript" value="js" />
        </PickerIos>
      </ThemeProvider>
    );
    expect(component).toMatchSnapshot();
  });

  it('should picker android value change', () => {
    let mockRef;
    const fn = jest.fn();
    const component = renderer.create(
      <ThemeProvider>
        <PickerAndroid onValueChange={fn} loop={true}>
          <PickerAndroid.Item label="Java" value="java" />
          <PickerAndroid.Item label="JavaScript" value="js" />
        </PickerAndroid>
      </ThemeProvider>
    );
    expect(component).toMatchSnapshot();
    component.update(
      <ThemeProvider>
        <PickerAndroid
          selectedValue="js"
          onValueChange={fn}
          ref={ref => {
            mockRef = ref;
          }}
          loop={true}
        >
          <PickerAndroid.Item label="Java" value="java" />
          <PickerAndroid.Item label="JavaScript" value="js" />
        </PickerAndroid>
      </ThemeProvider>
    );
    expect(component).toMatchSnapshot();
  });

  it('should picker ios value change', () => {
    let mockRef;
    const fn = jest.fn();
    const component = renderer.create(
      <ThemeProvider>
        <PickerWeb onValueChange={fn} loop={true}>
          <PickerWeb.Item label="Java" value="java" />
          <PickerWeb.Item label="JavaScript" value="js" />
        </PickerWeb>
      </ThemeProvider>
    );
    expect(component).toMatchSnapshot();
    component.update(
      <ThemeProvider>
        <PickerWeb
          selectedValue="js"
          onValueChange={fn}
          ref={ref => {
            mockRef = ref;
          }}
          loop={true}
        >
          <PickerWeb.Item label="Java" value="java" />
          <PickerWeb.Item label="JavaScript" value="js" />
        </PickerWeb>
      </ThemeProvider>
    );
    expect(component).toMatchSnapshot();
  });

  it('should picker android item render', () => {
    const component = renderer
      .create(
        <ThemeProvider>
          <PickerAndroid.Item label="Java" value="java" />
        </ThemeProvider>
      )
      .toJSON();
    expect(component).toMatchSnapshot();
  });

  it('should picker ios item render', () => {
    const component = renderer
      .create(
        <ThemeProvider>
          <PickerIos.Item label="Java" value="java" />
        </ThemeProvider>
      )
      .toJSON();
    expect(component).toMatchSnapshot();
  });
});
