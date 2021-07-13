import React from 'react';
import { View } from 'react-native';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import Tips from '../index';

describe('Tips Component', () => {
  it('onLayout trigger', () => {
    const wrapper = shallow(
      <Tips
        show={true}
        bgColor="#00f"
        cornerPosition="topLeft"
        contentStyle={{ width: 110, height: 64, borderRadius: 16 }}
      />
    );
    const target = wrapper.find('View');
    target.simulate('layout', {
      nativeEvent: {
        layout: {
          height: 100,
          width: 100,
        },
      },
    });
  });
  it('cornerPosition render = topLeft', () => {
    const component = renderer.create(
      <Tips
        show={true}
        bgColor="#00f"
        cornerPosition="topLeft"
        contentStyle={{ width: 110, height: 64, borderRadius: 16 }}
      />
    ).toJSON;
    const component1 = renderer.create(
      <Tips
        show={true}
        bgColor="#00f"
        cornerPosition="topLeft"
        tipStyle={{ position: 'absolute', top: 50 }}
        contentStyle={{ width: 110, height: 64, borderRadius: 16 }}
      />
    ).toJSON;
    const component2 = renderer.create(
      <Tips
        show={true}
        bgColor="#00f"
        cornerPosition="topLeft"
        tipStyle={{ position: 'absolute', left: 50 }}
        contentStyle={{ width: 110, height: 64, borderRadius: 16 }}
      />
    ).toJSON;
    const component3 = renderer.create(
      <Tips
        show={true}
        bgColor="#00f"
        cornerPosition="topLeft"
        tipStyle={{ position: 'absolute', bottom: 50 }}
        contentStyle={{ width: 110, height: 64, borderRadius: 16 }}
      />
    ).toJSON;
    const component4 = renderer.create(
      <Tips
        show={true}
        bgColor="#00f"
        cornerPosition="topLeft"
        tipStyle={{ position: 'absolute', right: 50 }}
        contentStyle={{ width: 110, height: 64, borderRadius: 16 }}
      />
    ).toJSON;
    expect(component).toMatchSnapshot();
    expect(component1).toMatchSnapshot();
    expect(component2).toMatchSnapshot();
    expect(component3).toMatchSnapshot();
    expect(component4).toMatchSnapshot();
  });

  it('showCorner render = false', () => {
    const component = renderer.create(
      <Tips
        show={true}
        bgColor="#00f"
        showCorner={false}
        tipStyle={{ position: 'absolute', top: 50 }}
        contentStyle={{ width: 110, height: 64, borderRadius: 16 }}
      />
    ).toJSON;
    expect(component).toMatchSnapshot();
  });

  it('show render = false', () => {
    const component = renderer.create(
      <Tips
        show={false}
        bgColor="#00f"
        showCorner={false}
        tipStyle={{ position: 'absolute', left: 50 }}
        contentStyle={{ width: 110, height: 64, borderRadius: 16 }}
      />
    ).toJSON;
    expect(component).toMatchSnapshot();
  });

  it('cornerPosition render = topRight', () => {
    const component = renderer.create(
      <Tips
        show={true}
        bgColor="#00f"
        cornerPosition="topRight"
        motionType="ScaleFadeIn"
        contentStyle={{ width: 110, height: 64, borderRadius: 16 }}
      />
    ).toJSON;
    const component1 = renderer.create(
      <Tips
        show={true}
        bgColor="#00f"
        cornerPosition="topRight"
        motionType="ScaleFadeIn"
        tipStyle={{ position: 'absolute', bottom: 50 }}
        contentStyle={{ width: 110, height: 64, borderRadius: 16 }}
      />
    ).toJSON;
    const component2 = renderer.create(
      <Tips
        show={true}
        bgColor="#00f"
        cornerPosition="topRight"
        motionType="ScaleFadeIn"
        tipStyle={{ position: 'absolute', top: 50 }}
        contentStyle={{ width: 110, height: 64, borderRadius: 16 }}
      />
    ).toJSON;
    const component3 = renderer.create(
      <Tips
        show={true}
        bgColor="#00f"
        cornerPosition="topRight"
        motionType="ScaleFadeIn"
        tipStyle={{ position: 'absolute', left: 50 }}
        contentStyle={{ width: 110, height: 64, borderRadius: 16 }}
      />
    ).toJSON;
    const component4 = renderer.create(
      <Tips
        show={true}
        bgColor="#00f"
        cornerPosition="topRight"
        motionType="ScaleFadeIn"
        tipStyle={{ position: 'absolute', right: 50 }}
        contentStyle={{ width: 110, height: 64, borderRadius: 16 }}
      />
    ).toJSON;
    expect(component).toMatchSnapshot();
    expect(component1).toMatchSnapshot();
    expect(component2).toMatchSnapshot();
    expect(component3).toMatchSnapshot();
    expect(component4).toMatchSnapshot();
  });

  it('cornerPosition render = topCenter', () => {
    const component = renderer.create(
      <Tips
        show={true}
        bgColor="#00f"
        cornerPosition="topCenter"
        motionType="Fade"
        withModal={true}
        motionConfig={{ showDuration: 500 }}
        tipStyle={{ position: 'absolute', right: 50 }}
        contentStyle={{ width: 110, height: 64, borderRadius: 16 }}
      />
    ).toJSON;
    expect(component).toMatchSnapshot();
  });

  it('withModal render = bottomLeft', () => {
    const component = renderer.create(
      <Tips
        show={true}
        bgColor="#00f"
        cornerPosition="bottomLeft"
        motionType="PullUp"
        motionConfig={{ showDuration: 500 }}
        contentStyle={{ width: 110, height: 64, borderRadius: 16 }}
      >
        <View style={{ width: 40, height: 30 }} />
      </Tips>
    ).toJSON;
    const component1 = renderer.create(
      <Tips
        show={true}
        bgColor="#00f"
        cornerPosition="bottomLeft"
        motionType="PullUp"
        tipStyle={{ position: 'absolute', right: 50 }}
        motionConfig={{ showDuration: 500 }}
        contentStyle={{ width: 110, height: 64, borderRadius: 16 }}
      >
        <View style={{ width: 40, height: 30 }} />
      </Tips>
    ).toJSON;
    const component2 = renderer.create(
      <Tips
        show={true}
        bgColor="#00f"
        cornerPosition="bottomLeft"
        motionType="PullUp"
        tipStyle={{ position: 'absolute', left: 50 }}
        motionConfig={{ showDuration: 500 }}
        contentStyle={{ width: 110, height: 64, borderRadius: 16 }}
      >
        <View style={{ width: 40, height: 30 }} />
      </Tips>
    ).toJSON;
    const component3 = renderer.create(
      <Tips
        show={true}
        bgColor="#00f"
        cornerPosition="bottomLeft"
        motionType="PullUp"
        tipStyle={{ position: 'absolute', top: 50 }}
        motionConfig={{ showDuration: 500 }}
        contentStyle={{ width: 110, height: 64, borderRadius: 16 }}
      >
        <View style={{ width: 40, height: 30 }} />
      </Tips>
    ).toJSON;
    const component4 = renderer.create(
      <Tips
        show={true}
        bgColor="#00f"
        cornerPosition="bottomLeft"
        motionType="PullUp"
        tipStyle={{ position: 'absolute', bottom: 50 }}
        motionConfig={{ showDuration: 500 }}
        contentStyle={{ width: 110, height: 64, borderRadius: 16 }}
      >
        <View style={{ width: 40, height: 30 }} />
      </Tips>
    ).toJSON;
    expect(component).toMatchSnapshot();
    expect(component1).toMatchSnapshot();
    expect(component2).toMatchSnapshot();
    expect(component3).toMatchSnapshot();
    expect(component4).toMatchSnapshot();
  });

  it('cornerPosition render: bottomCenter', () => {
    const component = renderer.create(
      <Tips
        show={true}
        bgColor="#00f"
        cornerPosition="bottomCenter"
        motionConfig={{ showDuration: 500 }}
        contentStyle={{ width: 110, height: 64, borderRadius: 16 }}
      >
        <View style={{ width: 40, height: 30 }} />
      </Tips>
    ).toJSON;
    expect(component).toMatchSnapshot();
  });

  it('cornerPosition render: bottomRight', () => {
    const component = renderer.create(
      <Tips
        show={true}
        bgColor="#00f"
        cornerPosition="bottomRight"
        motionConfig={{ showDuration: 500 }}
        contentStyle={{ width: 110, height: 64, borderRadius: 16 }}
      >
        <View style={{ width: 40, height: 30 }} />
      </Tips>
    ).toJSON;
    const component1 = renderer.create(
      <Tips
        show={true}
        bgColor="#00f"
        cornerPosition="bottomRight"
        motionConfig={{ showDuration: 500 }}
        tipStyle={{ position: 'absolute', bottom: 50 }}
        contentStyle={{ width: 110, height: 64, borderRadius: 16 }}
      >
        <View style={{ width: 40, height: 30 }} />
      </Tips>
    ).toJSON;
    const component2 = renderer.create(
      <Tips
        show={true}
        bgColor="#00f"
        cornerPosition="bottomRight"
        motionConfig={{ showDuration: 500 }}
        tipStyle={{ position: 'absolute', top: 50 }}
        contentStyle={{ width: 110, height: 64, borderRadius: 16 }}
      >
        <View style={{ width: 40, height: 30 }} />
      </Tips>
    ).toJSON;
    const component3 = renderer.create(
      <Tips
        show={true}
        bgColor="#00f"
        cornerPosition="bottomRight"
        motionConfig={{ showDuration: 500 }}
        tipStyle={{ position: 'absolute', left: 50 }}
        contentStyle={{ width: 110, height: 64, borderRadius: 16 }}
      >
        <View style={{ width: 40, height: 30 }} />
      </Tips>
    ).toJSON;
    const component4 = renderer.create(
      <Tips
        show={true}
        bgColor="#00f"
        cornerPosition="bottomRight"
        motionConfig={{ showDuration: 500 }}
        tipStyle={{ position: 'absolute', right: 50 }}
        contentStyle={{ width: 110, height: 64, borderRadius: 16 }}
      >
        <View style={{ width: 40, height: 30 }} />
      </Tips>
    ).toJSON;
    expect(component).toMatchSnapshot();
    expect(component1).toMatchSnapshot();
    expect(component2).toMatchSnapshot();
    expect(component3).toMatchSnapshot();
    expect(component4).toMatchSnapshot();
  });

  it('render width update', () => {
    const component = renderer.create(
      <Tips
        show={true}
        bgColor="#00f"
        motionConfig={{ showDuration: 500 }}
        contentStyle={{ width: 110, height: 64, borderRadius: 16 }}
      >
        <View style={{ width: 40, height: 30 }} />
      </Tips>
    );
    expect(component).toMatchSnapshot();
    component.update(
      <Tips
        show={false}
        bgColor="#00f"
        motionConfig={{ showDuration: 500 }}
        contentStyle={{ width: 110, height: 64, borderRadius: 16 }}
      >
        <View style={{ width: 40, height: 30 }} />
      </Tips>
    );
    expect(component).toMatchSnapshot();
  });
});
