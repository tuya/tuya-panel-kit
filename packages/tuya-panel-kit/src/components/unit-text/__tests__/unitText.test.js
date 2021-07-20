import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import UnitText from '../../unit-text/index';
import UnitTextArt from '../unit-text-art';

jest.mock('AppState', () => {
  return {
    addEventListener: (type, callback) => {
      callback();
    },
    removeEventListener: (type, callback) => {
      callback();
    },
  };
});

describe('UnitText Component', () => {
  it('basic render', () => {
    const component = renderer.create(<UnitText value="1" unit="℃" size={48} />).toJSON();
    expect(component).toMatchSnapshot();

    const noComponent = renderer
      .create(<UnitText value="tuya" unit="%" unitColor="green" style={{ marginRight: 50 }} />)
      .toJSON();
    expect(noComponent).toMatchSnapshot();
  });

  it(' render width unit', () => {
    jest.doMock('I18nManager', () => {
      const I18nManager = require.requireActual('I18nManager');
      I18nManager.isRTL = true;
      return I18nManager;
    });

    const component = renderer
      .create(
        <UnitText value="tuya" symbols={['t', 'y']} valueColors={['#f0f', '#ff0']} size={48} />
      )
      .toJSON();
    expect(component).toMatchSnapshot();

    const component1 = renderer
      .create(
        <UnitText
          value="tuya"
          unit="C"
          unitType="text"
          symbols={['t', 'y']}
          valueColors={['#f0f', '#ff0']}
          size={48}
        />
      )
      .toJSON();
    expect(component1).toMatchSnapshot();
  });

  it(' render width isRtl', () => {
    jest.doMock('I18nManager', () => {
      const I18nManager = require.requireActual('I18nManager');
      I18nManager.isRTL = true;
      return I18nManager;
    });
    const component = renderer
      .create(
        <UnitText value="tuya" symbols={['t', 'y']} valueColors={['#f0f', '#ff0']} size={48} />
      )
      .toJSON();
    expect(component).toMatchSnapshot();
  });

  it(' render width value', () => {
    jest.doMock('I18nManager', () => {
      const I18nManager = require.requireActual('I18nManager');
      I18nManager.isRTL = false;
      return I18nManager;
    });
    const component = renderer.create(<UnitText value="" size={48} />).toJSON();
    expect(component).toMatchSnapshot();
  });
});

describe('UnitText Component: useArt', () => {
  it('basic render', () => {
    const component = renderer
      .create(<UnitText value="1" unit="℃" size={48} useART={true} />)
      .toJSON();
    expect(component).toMatchSnapshot();

    const noComponent = renderer
      .create(
        <UnitText
          unit="%"
          value="tuya"
          unitColor="green"
          style={{ marginRight: 50 }}
          useART={true}
        />
      )
      .toJSON();
    expect(noComponent).toMatchSnapshot();
  });

  it('render with unit', () => {
    const component = renderer.create(<UnitText value="1" size={48} useART={true} />).toJSON();
    expect(component).toMatchSnapshot();
  });

  it('render with update', () => {
    const component = renderer.create(<UnitText value="1" unit="%" size={48} useART={true} />);
    expect(component).toMatchSnapshot();
    component.update(<UnitText value="W" unit="C" size={48} useART={true} />);
    expect(component).toMatchSnapshot();
  });

  it(' render width unit', () => {
    jest.doMock('I18nManager', () => {
      const I18nManager = require.requireActual('I18nManager');
      I18nManager.isRTL = true;
      return I18nManager;
    });

    const component = renderer
      .create(
        <UnitText
          value="tuya"
          symbols={['t', 'y']}
          valueColors={['#f0f', '#ff0']}
          size={48}
          useART={true}
        />
      )
      .toJSON();
    expect(component).toMatchSnapshot();

    const component1 = renderer
      .create(
        <UnitText
          value="tuya"
          unit="C"
          unitType="text"
          symbols={['t', 'y']}
          valueColors={['#f0f', '#ff0']}
          size={48}
          useART={true}
        />
      )
      .toJSON();
    expect(component1).toMatchSnapshot();
  });
  it('UnitTextArt update letter', () => {
    const wrapper = shallow(<UnitTextArt />);
    wrapper.setState({ letter: null });
  });
});
