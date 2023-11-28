import { useContext } from 'react';

import { SettingsContext } from 'src/src2/contexts/settings';

export const useSettings = () => useContext(SettingsContext);
