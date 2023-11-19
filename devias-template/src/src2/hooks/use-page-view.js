import { useEffect } from 'react';

import { gtm } from 'src/src2/libs/gtm';

export const usePageView = () => {
  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);
};
