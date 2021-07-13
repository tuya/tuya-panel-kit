import { Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import ListItem from '../list-item';

const Res = {
  color: require('../../color-picker/color-picker.png'),
};

describe('ListItem Component', () => {
  it('basic render', () => {
    const component = renderer.create(<ListItem />);
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('should render with styles', () => {
    const component = renderer.create(
      <ListItem
        styles={{
          container: { height: 64 },
          content: { backgroundColor: 'red' },
          contentLeft: { width: 48, height: 48 },
          contentCenter: { backgroundColor: 'blue' },
          contentRight: { width: 48, height: 48 },
          title: { color: 'yellow' },
          subTitle: { color: '#000' },
        }}
        title="title"
        subTitle="subTitle"
        arrow={true}
      />
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('should render with arrow', () => {
    const component = renderer.create(<ListItem arrow={true} />);
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('should render with arrowUseIcon', () => {
    const component = renderer.create(
      <ListItem arrow={true} arrowUseIcon={true} arrowColor="#f0f" />
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('should render with title and subTitle', () => {
    const component = renderer.create(<ListItem title="title" subTitle="subTitle" />);
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('should render with Icon', () => {
    const Item1 = renderer.create(<ListItem Icon={<Image source={Res.color} />} />);
    const Item2 = renderer.create(<ListItem Icon={() => <Image source={Res.color} />} />);
    const Item3 = renderer.create(<ListItem Icon={true} />);
    const Item4 = renderer.create(
      <ListItem Icon={{ uri: '../../color-picker/color-picker.png' }} />
    );
    const Item5 = renderer.create(<ListItem Icon={4} />);
    const Item6 = renderer.create(<ListItem Icon="power" />);
    expect(Item1.toJSON()).toMatchSnapshot();
    expect(Item2.toJSON()).toMatchSnapshot();
    expect(Item3.toJSON()).toMatchSnapshot();
    expect(Item4.toJSON()).toMatchSnapshot();
    expect(Item5.toJSON()).toMatchSnapshot();
    expect(Item6.toJSON()).toMatchSnapshot();
  });

  it('should render with Action', () => {
    const Item1 = renderer.create(<ListItem Action={<Text>Component</Text>} />);
    const Item2 = renderer.create(<ListItem Action={() => <Text>Function</Text>} />);
    const Item3 = renderer.create(<ListItem Action={true} />);
    const Item4 = renderer.create(
      <ListItem Action={{ uri: '../../color-picker/color-picker.png' }} />
    );
    const Item5 = renderer.create(<ListItem Action={4} />);
    const Item6 = renderer.create(<ListItem Action="tuya" />);
    expect(Item1.toJSON()).toMatchSnapshot();
    expect(Item2.toJSON()).toMatchSnapshot();
    expect(Item3.toJSON()).toMatchSnapshot();
    expect(Item4.toJSON()).toMatchSnapshot();
    expect(Item5.toJSON()).toMatchSnapshot();
    expect(Item6.toJSON()).toMatchSnapshot();
  });

  it('should render with actionType', () => {
    const Item1 = renderer.create(<ListItem Action={<Text>Component</Text>} actionType="tuya" />);
    const Item2 = renderer.create(
      <ListItem Action={() => <Text>Function</Text>} actionType="iconfont" />
    );
    const Item4 = renderer.create(
      <ListItem Action={{ uri: '../../color-picker/color-picker.png' }} actionType="image" />
    );
    expect(Item1.toJSON()).toMatchSnapshot();
    expect(Item2.toJSON()).toMatchSnapshot();
    expect(Item4.toJSON()).toMatchSnapshot();
  });

  it('should render with iconType', () => {
    const Item1 = renderer.create(<ListItem Icon="power" iconType="tuya" />);
    const Item2 = renderer.create(<ListItem Icon="power" iconType="iconfont" />);
    const Item3 = renderer.create(<ListItem Icon="power" iconType="image" />);
    const Item4 = renderer.create(<ListItem Icon="power" iconType="text" />);
    expect(Item1.toJSON()).toMatchSnapshot();
    expect(Item2.toJSON()).toMatchSnapshot();
    expect(Item3.toJSON()).toMatchSnapshot();
    expect(Item4.toJSON()).toMatchSnapshot();
  });

  it('should not update', () => {
    const component = renderer.create(
      <ListItem key="some-key" title="No Subtitle" needUpdate={false} />
    );
    component.update(
      <ListItem key="some-key" title="Has Subtitle" subTitle="subTitle" needUpdate={false} />
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('should update', () => {
    const component = renderer.create(<ListItem key="some-key" title="No Subtitle" />);
    component.update(<ListItem key="some-key" title="Has Subtitle" subTitle="subTitle" />);
    expect(component.toJSON()).toMatchSnapshot();
  });
});
