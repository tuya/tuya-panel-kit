import { View, Text, Image } from 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import Lists from '../lists';
import { ThemeUtils } from '../../../utils';

const { ThemeProvider } = ThemeUtils;

const Res = {
  color: require('../../color-picker/color-picker.png'),
};

describe('Lists Component', () => {
  it('basic render', () => {
    const sections = [1].map(v => ({
      title: 'Section Title',
      footer: true,
      data: [1].map(val => ({
        styles: {
          container: { height: 64 },
          content: { backgroundColor: 'red' },
          contentLeft: { width: 48, height: 48 },
          contentCenter: { backgroundColor: 'blue' },
          contentRight: { width: 48, height: 48 },
          title: { color: 'yellow' },
          subTitle: { color: '#000' },
          valueText: { color: 'pink' },
        },
        title: `title_${v}`,
        subTitle: `subTitle_${v}`,
        Icon: <Image style={{}} source={Res.color} />,
        onPress: jest.fn(),
        renderItem: () => <View />,
      })),
    }));
    const component = renderer.create(<Lists sections={sections} />);
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('basic render 1', () => {
    const sections = [1].map(v => ({
      title: 'Section Title',
      footer: true,
      data: [1, 2].map((val, index) => ({
        styles: {
          container: { height: 64 },
          content: { backgroundColor: 'red' },
          contentLeft: { width: 48, height: 48 },
          contentCenter: { backgroundColor: 'blue' },
          contentRight: { width: 48, height: 48 },
          title: { color: 'yellow' },
          subTitle: { color: '#000' },
          valueText: { color: 'pink' },
        },
        title: `title_${v}`,
        subTitle: `subTitle_${v}`,
        Icon: <Image style={{}} source={Res.color} />,
        onPress: jest.fn(),
        value: index === 0 ? true : undefined,
      })),
    }));
    const component = renderer.create(
      <ThemeProvider>
        <Lists sections={sections} />
      </ThemeProvider>
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('should not render SectionHeader without title', () => {
    const sections = [
      {
        title: null,
        data: [],
      },
    ];
    const component = renderer.create(<Lists sections={sections} ListHeaderComponent={<View />} />);
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('should able to use SectionList props', () => {
    const sections = [
      {
        title: 'Section Title',
        data: [1].map(v => ({
          key: v,
          title: `title_${v}`,
          value: `${v}`,
          Action: () => (
            <View>
              <Text>Action</Text>
            </View>
          ),
        })),
      },
    ];
    const component = renderer.create(<Lists sections={sections} ListHeaderComponent={<View />} />);
    expect(component.toJSON()).toMatchSnapshot();
  });
});
