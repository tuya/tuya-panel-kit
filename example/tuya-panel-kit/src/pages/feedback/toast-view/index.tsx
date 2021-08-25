import React from 'react';
import { Toast } from 'tuya-panel-kit';

import { BlockView, Icons } from '#components';
import Strings from '#i18n';

export default () => {
  const [successShow, setSuccessShow] = React.useState(false);
  const [warningShow, setWarningShow] = React.useState(false);
  const [errorShow, setErrorShow] = React.useState(false);
  const [loadingShow, setLoadingShow] = React.useState(false);
  const [show, setShow] = React.useState(false);
  return (
    <>
      <BlockView
        list={[
          {
            title: Strings.getLang('toastview'),
            list: [
              {
                name: Strings.getLang('toastview_hasicon_success'),
                onPress: () => setSuccessShow(true),
                component: <>{Icons.right}</>,
              },
              {
                name: Strings.getLang('toastview_hasicon_warn'),
                onPress: () => setWarningShow(true),
                component: <>{Icons.right}</>,
              },
              {
                name: Strings.getLang('toastview_hasicon_error'),
                onPress: () => setErrorShow(true),
                component: <>{Icons.right}</>,
              },
              {
                name: Strings.getLang('toastview_hasicon_loading'),
                onPress: () => setLoadingShow(true),
                component: <>{Icons.right}</>,
              },
            ],
          },
          {
            title: Strings.getLang('toastview_noicon'),
            list: [
              {
                name: Strings.getLang('toastview_light'),
                onPress: () => setShow(true),
                component: <>{Icons.right}</>,
              },
            ],
          },
        ]}
      />
      <Toast.Success
        show={successShow}
        text={Strings.getLang('toastview_hasicon_success_text')}
        onFinish={() => setSuccessShow(false)}
      />
      <Toast.Warning
        show={warningShow}
        text={Strings.getLang('toastview_hasicon_warn_text')}
        onFinish={() => setWarningShow(false)}
      />
      <Toast.Error
        show={errorShow}
        text={Strings.getLang('toastview_hasicon_error_text')}
        onFinish={() => setErrorShow(false)}
      />
      <Toast.Loading show={loadingShow} onFinish={() => setLoadingShow(false)} />
      <Toast
        show={show}
        text={Strings.getLang('toastview_light_text')}
        onFinish={() => setShow(false)}
      />
    </>
  );
};
