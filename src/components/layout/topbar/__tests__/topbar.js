import 'react-native';
import _ from 'lodash';
import React from 'react';
import renderer from 'react-test-renderer';
import TopBarIos from '../index.ios';
import TopBarAndroid from '../index.android';

const Res = {
  more: require('../common_back_more.png'),
};

jest.mock('../../../../i18n/strings', () => ({}));

describe('TopBar Component', () => {
  it('basic render', () => {
    const ios = renderer.create(<TopBarIos />).toJSON();
    const android = renderer.create(<TopBarAndroid />).toJSON();
    expect(ios).toMatchSnapshot();
    expect(android).toMatchSnapshot();
  });

  it('should onChange be called', () => {
    const onChangeIos = jest.fn();
    const onChangeAndroid = jest.fn();
    const ios = renderer
      .create(<TopBarIos onChange={onChangeIos} />);
    const android = renderer
      .create(<TopBarAndroid onChange={onChangeAndroid} />);
    const iosInstance = ios.getInstance();
    const androidInstance = android.getInstance();
    iosInstance._onChange();
    androidInstance._onChange();
    expect(onChangeIos).toHaveBeenCalled();
    expect(onChangeAndroid).toHaveBeenCalled();
  });

  it('should have same default props except alignCenter', () => {
    const ios = renderer.create(<TopBarIos />);
    const android = renderer.create(<TopBarAndroid />);
    const iosInstance = ios.getInstance();
    const androidInstance = android.getInstance();
    const androidProps = _.omit(androidInstance.props, 'alignCenter');
    expect(iosInstance.props).toEqual(androidProps);
  });

  it('should render only with leftImage', () => {
    const ios = renderer
      .create(<TopBarIos leftImage={Res.more} leftText={null} />)
      .toJSON();
    const android = renderer
      .create(<TopBarAndroid leftImage={Res.more} leftText={null} />)
      .toJSON();
    expect(ios).toMatchSnapshot();
    expect(android).toMatchSnapshot();
  });

  it('should render only with centerText', () => {
    const ios = renderer
      .create(<TopBarIos centerText="Title" />)
      .toJSON();
    const android = renderer
      .create(<TopBarAndroid centerText="Title" />)
      .toJSON();
    expect(ios).toMatchSnapshot();
    expect(android).toMatchSnapshot();
  });

  it('should render with rightImage and rightText', () => {
    const ios = renderer
      .create(<TopBarIos rightText="Back" rightImage={Res.more} />)
      .toJSON();
    const android = renderer
      .create(<TopBarAndroid rightText="Back" rightImage={Res.more} />)
      .toJSON();
    expect(ios).toMatchSnapshot();
    expect(android).toMatchSnapshot();
  });
});
