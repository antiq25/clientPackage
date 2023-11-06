import { useEffect } from 'react';

import type { GTMConfig } from './libs/gtm';
import { gtm } from './libs/gtm';

export function useAnalytics(config: GTMConfig) {
  useEffect(() => {
    gtm.initialize(config);
  }, [config]);
}
