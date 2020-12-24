import React from 'react';
import { ScrollView } from 'react-native';
import { ControllerBar } from 'tuya-panel-kit';
import TesterTitle from '../../components/TesterTitle';

// const ControlItem = props => {
//   const { theme, schema, values, ...rest } = props;
//   return <ControllerBar {...rest} />;
// };

const ControllerBarScene = () => {
  const baseDataSource = [
    { text: '开关', icon: 'selected', iconSize: 28 },
    { text: '自动', icon: 'warning', iconSize: 28 },
    { text: '睡眠', icon: 'plus', iconSize: 28 },
    { text: '强力', icon: 'minus', iconSize: 28 },
  ];
  return (
    <ScrollView>
      <TesterTitle title="Icon底部栏" />
      <ControllerBar button={baseDataSource} />
      <TesterTitle title="待底色Icon底部栏" />
      <ControllerBar type="primary" button={baseDataSource} />
      <TesterTitle title="控制栏组合" />
      <ControllerBar.Group>
        <ControllerBar
          size={44}
          button={[{ text: '按', type: 'primary' }, { text: '钮', type: 'primary' }]}
        />
        <ControllerBar
          size={44}
          button={[{ text: '组', type: 'primary' }, { text: '啊', type: 'primary' }]}
        />
      </ControllerBar.Group>
      <TesterTitle title="多屏可滑动" />
      <ControllerBar.Group
        type="swiper"
        swiperConfig={{
          style: { height: 60 },
          dotActiveStyle: { backgroundColor: 'red' },
          dotStyle: { backgroundColor: 'blue' },
        }}
        size={44}
      >
        <ControllerBar
          size={44}
          button={[{ text: 'Swiper', type: 'primary' }, { text: '组1', type: 'primary' }]}
        />
        <ControllerBar
          size={44}
          button={[{ text: 'Swiper', type: 'primary' }, { text: '组2', type: 'primary' }]}
        />
      </ControllerBar.Group>
      <TesterTitle title="测试Size" />
      <ControllerBar.Group size={44} type="divide">
        <ControllerBar
          size={22}
          button={[{ text: '测', size: 80, type: 'primary' }, { text: '试', type: 'primary' }]}
        />
        <ControllerBar
          // size={22}
          button={[{ text: 'Size', type: 'primary' }, { text: '啊', type: 'primary' }]}
        />
      </ControllerBar.Group>
    </ScrollView>
  );
};

export default ControllerBarScene;
