import type { ReactNode } from 'react';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { SvgIcon } from '@mui/material';
import PaymentIcon from '@mui/icons-material/Payment';
import BusinessIcon from '@mui/icons-material/Business';
import HomeSmileIcon from '../../icons/untitled-ui/duocolor/home-smile';
import MapIcon from '@mui/icons-material/Map';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import WidgetsIcon from '@mui/icons-material/Widgets';
import PixelIcon from '@mui/icons-material/Grain';
import { tokens } from '../../locales/tokens';
import { paths } from '../../paths';

export interface Item {
  disabled?: boolean;
  external?: boolean;
  icon?: ReactNode;
  items?: Item[];
  label?: ReactNode;
  path?: string;
  title: string;
}

export interface Section {
  items: Item[];
  subheader?: string;
}

export const useSections = () => {
  const { t } = useTranslation();

  return useMemo(() => {
    return [
      {
        items: [
          {
            title: t(tokens.nav.dashboard),
            path: paths.index,
            icon: (
              <SvgIcon fontSize="small">
                <HomeSmileIcon />
              </SvgIcon>
            ),
          },
          {
            title: t(tokens.nav.map),
            path: paths.map,
            icon: (
              <SvgIcon fontSize="small">
                <MapIcon />
              </SvgIcon>
            ),
          },
         
          {
            title: t(tokens.nav.pixel),
            path: paths.pixel,
            icon: (
              <SvgIcon fontSize="small">
                <PixelIcon />
              </SvgIcon>
            ),
          },
          {
            title: t(tokens.nav.widget),
            path: paths.widget,
            icon: (
              <SvgIcon fontSize="small">
                <WidgetsIcon />
              </SvgIcon>
            ),
          },
          {
            title: t(tokens.nav.billing),
            path: paths.billing,
            icon: (
              <SvgIcon fontSize="small">
                <PaymentIcon />
              </SvgIcon>
            ),
          },
        ],
      },
    ];
  }, [t]);
};
