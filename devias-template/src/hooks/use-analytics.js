import { useEffect } from 'react';
import { gtm } from 'src/src2/libs/gtm';

export function useAnalytics(config) {
  useEffect(() => {
    gtm.initialize(config);
  }, [config]);
}
