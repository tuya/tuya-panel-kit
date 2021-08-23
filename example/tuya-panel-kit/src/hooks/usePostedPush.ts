import { useHistory } from 'umi';

/* eslint-disable no-restricted-globals */
import Strings from '#i18n';

export const usePostedPush = () => {
  const history = useHistory();
  return (href: string) => {
    history.push(href);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const currentIsEN = Strings.language === 'en';
    if (top !== self) {
      top.postMessage(
        {
          method: 'navigate',
          data: `${currentIsEN ? '/en' : ''}/docs${href === '/' ? '/getting-started' : href}`,
        },
        '*'
      );
    }
  };
};
