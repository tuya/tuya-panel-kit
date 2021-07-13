import React from 'react';
import { Divider } from 'tuya-panel-kit';

import { ListView } from '#components';
import Strings from '#i18n';

export default () => {
  return (
    <ListView
      contentCenter={true}
      list={[
        {
          title: Strings.getLang('divider_basic'),
          content: <Divider color="red" width={300} />,
        },
        {
          title: Strings.getLang('divider_block'),
          content: <Divider color="#333" width={300} height={30} />,
        },
      ]}
    />
  );
};
