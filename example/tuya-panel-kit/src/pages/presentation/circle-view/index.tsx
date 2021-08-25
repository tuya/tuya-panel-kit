import React from 'react';
import { CircleView, IconFont, Utils } from 'tuya-panel-kit';
import { ListView } from '#components';
import Strings from '#i18n';

const { convertX: cx } = Utils.RatioUtils;

export default () => {
  return (
    <ListView
      contentCenter={true}
      nthItemStyle={{
        marginTop: cx(40),
      }}
      list={[
        {
          title: Strings.getLang('circleview_basic'),
          content: <CircleView radius={30} color="#F9825C" />,
        },
        {
          title: Strings.getLang('circleview_border'),
          content: <CircleView radius={30} color="#FCDC9D" borderWidth={2} borderColor="#B8B8B8" />,
        },
        {
          title: Strings.getLang('circleview_embedded'),
          content: (
            <CircleView
              radius={50}
              color="#F98553"
              style={{ alignItems: 'center', justifyContent: 'center' }}
            >
              <IconFont name="edit" size={24} />
            </CircleView>
          ),
        },
      ]}
    />
  );
};
