import { useEffect } from 'react';
import { Strings } from 'tuya-panel-kit';
import { useHistory } from 'umi';

export const useMessagePush = () => {
  const history = useHistory();
  useEffect(() => {
    const handle = event => {
      const { method, data } = event.data;
      if (method === 'navigate' && data) {
        const isEN = /^\/en/.test(data);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const currentIsEN = Strings.language === 'en';
        if (isEN !== currentIsEN) {
          window.location.href = `${isEN ? '/en' : ''}${data}`;
          Strings.setLanguage(isEN ? 'en' : 'zh');
        } else {
          history.push(data);
        }
      }
    };
    window.addEventListener('message', handle);
    return () => {
      window.removeEventListener('message', handle);
    };
  }, [history]);
};
