import {
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
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
    const component = renderer.create(
      <ListItem arrow={true} />
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('should render with title and subTitle', () => {
    const component = renderer.create(
      <ListItem
        title="title"
        subTitle="subTitle"
      />
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('should render with Icon', () => {
    const Item1 = renderer.create(
      <ListItem Icon={<Image source={Res.color} />} />
    );
    const Item2 = renderer.create(
      <ListItem Icon={() => <Image source={Res.color} />} />
    );
    expect(Item1.toJSON()).toMatchSnapshot();
    expect(Item2.toJSON()).toMatchSnapshot();
  });

  it('should render with Action', () => {
    const Item1 = renderer.create(
      <ListItem Action={<Text>Component</Text>} />
    );
    const Item2 = renderer.create(
      <ListItem Action={() => <Text>Function</Text>} />
    );
    expect(Item1.toJSON()).toMatchSnapshot();
    expect(Item2.toJSON()).toMatchSnapshot();
  });

  it('should not update', () => {
    const component = renderer.create(
      <ListItem
        key="some-key"
        title="No Subtitle"
        needUpdate={false}
      />
    );
    component.update(
      <ListItem
        key="some-key"
        title="Has Subtitle"
        subTitle="subTitle"
        needUpdate={false}
      />
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('should update', () => {
    const component = renderer.create(
      <ListItem
        key="some-key"
        title="No Subtitle"
      />
    );
    component.update(
      <ListItem
        key="some-key"
        title="Has Subtitle"
        subTitle="subTitle"
      />
    );
    expect(component.toJSON()).toMatchSnapshot();
  });
});
