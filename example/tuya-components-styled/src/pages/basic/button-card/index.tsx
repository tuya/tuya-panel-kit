import React from 'react';
import * as StyledButtonCard from 'tuya-panel-style-button-card';
import TuyaRNSvgs from 'tuya-panel-kit/lib/components/iconfont/svg/defaultSvg';
/* eslint-disable prefer-destructuring */

const ClassicButtonCard = StyledButtonCard.ClassicButtonCard;
const NordicButtonCard = StyledButtonCard.NordicButtonCard;

export default () => {
  const list = [
    {
      label: '按钮1',
      key: '0',
      disabled: true,
    },
    {
      label: '按钮2',
      key: '1',
    },
    {
      label: '按钮3',
      key: '2',
    },
    {
      label: '按钮4',
      key: '3',
    },
  ];

  const list1 = list.map((item, idx) => ({
    ...item,
    label: `custom_${idx}`,
  }));

  return (
    <>
      <ClassicButtonCard title="工作模式" showIconBg={false} icon={TuyaRNSvgs.power} list={list} />{' '}
      <NordicButtonCard title="工作" list={list} />
    </>
  );
};
