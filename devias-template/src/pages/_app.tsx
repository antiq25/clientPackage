// Remove if simplebar is not used
import 'simplebar-react/dist/simplebar.min.css';

import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import type { EmotionCache } from '@emotion/react';
import { CacheProvider } from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import 'src/global.css';
// Remove if locales are not used
import 'src/locales/i18n';

import { RTL } from '../components/rtl';
import { SettingsButton } from '../components/settings/settings-button';
import { SettingsDrawer } from '../components/settings/settings-drawer';
import { Toaster } from '../components/toaster';
import { SettingsConsumer, SettingsProvider } from '../contexts/settings';
import { useNprogress } from '../hooks/use-nprogress';
import { createTheme } from '../theme';
import { createEmotionCache } from '../utils/create-emotion-cache';
import React from 'react';

const clientSideEmotionCache = createEmotionCache();

export interface CustomAppProps extends AppProps {
  Component: NextPage;
  emotionCache?: EmotionCache;
}

const CustomApp = (props: CustomAppProps) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  useNprogress();

  const getLayout = (Component as any).getLayout ?? ((page) => page);

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>Show My Service: Dashboard</title>
        <meta
          name="viewport"
          content="initial-scale=1, width=device-width"
        />
      </Head>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <SettingsProvider>
          <SettingsConsumer>
            {(settings) => {
              // Prevent theme flicker when restoring custom settings from browser storage
              if (!settings.isInitialized) {
                // return null;
              }

              const theme = createTheme({
                colorPreset: settings.colorPreset,
                contrast: settings.contrast,
                direction: settings.direction,
                paletteMode: settings.paletteMode,
                responsiveFontSizes: settings.responsiveFontSizes,
              });

              return (
                <ThemeProvider theme={theme}>
                  <Head>
                    <meta
                      name="color-scheme"
                      content={settings.paletteMode}
                    />
                    <meta
                      name="theme-color"
                      content={theme.palette.neutral[900]}
                    />
                  </Head>
                  <RTL direction={settings.direction}>
                    <CssBaseline />
                    {getLayout(<Component {...pageProps} />)}
                    <SettingsButton onClick={settings.handleDrawerOpen} />
                    <SettingsDrawer
                      canReset={settings.isCustom}
                      onClose={settings.handleDrawerClose}
                      onReset={settings.handleReset}
                      onUpdate={settings.handleUpdate}
                      open={settings.openDrawer}
                      values={{
                        colorPreset: settings.colorPreset,
                        contrast: settings.contrast,
                        direction: settings.direction,
                        paletteMode: settings.paletteMode,
                        responsiveFontSizes: settings.responsiveFontSizes,
                        stretch: settings.stretch,
                        layout: settings.layout,
                        navColor: settings.navColor,
                      }}
                    />
                    <Toaster />
                  </RTL>
                </ThemeProvider>
              );
            }}
          </SettingsConsumer>
        </SettingsProvider>
      </LocalizationProvider>
    </CacheProvider>
  );
};

export default CustomApp;
