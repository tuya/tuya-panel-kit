import React from 'react';
import * as StyledButtonCard from 'tuya-panel-style-button-card';
import TuyaRNSvgs from 'tuya-panel-kit/lib/components/iconfont/svg/defaultSvg';
import { ListView } from '#components';
import Strings from '#i18n';
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
    <ListView
      contentPadding={false}
      list={[
        {
          title: Strings.getLang('button_card'),
          content: (
            <ClassicButtonCard
              title="工作模式"
              showIconBg={false}
              icon={TuyaRNSvgs.power}
              list={list}
            />
          ),
        },
        {
          title: Strings.getLang('button_card'),
          content: <NordicButtonCard title="工作" list={list} />,
        },
      ]}
    />
  );
};
