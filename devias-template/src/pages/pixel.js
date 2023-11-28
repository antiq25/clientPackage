import React from 'react';
import Box from '@mui/material/Box'; // Corrected import statement
import Container from '@mui/material/Container'; // Corrected import statement
import Stack from '@mui/material/Stack'; // Corrected import statement
import PlusIcon from '@mui/icons-material/Add'; // Corrected import statement
import Button from '@mui/material/Button';
import SvgIcon from '@mui/material/SvgIcon';
import Typography from '@mui/material/Typography';
import { QuickStats1 } from 'src/sections/components/quick-stats/quick-stats-1';
import { QuickStats2 } from 'src/sections/components/quick-stats/quick-stats-2';
import { QuickStats3 } from 'src/sections/components/quick-stats/quick-stats-3';
import { QuickStats4 } from 'src/sections/components/quick-stats/quick-stats-4';
import { QuickStats5 } from 'src/sections/components/quick-stats/quick-stats-5';
import { QuickStats6 } from 'src/sections/components/quick-stats/quick-stats-6';
import { QuickStats7 } from 'src/sections/components/quick-stats/quick-stats-7';
import { QuickStats8 } from 'src/sections/components/quick-stats/quick-stats-8';
import { QuickStats9 } from 'src/sections/components/quick-stats/quick-stats-9';
import { Previewer } from 'src/src2/sections/components/previewer';
import { useEffect, useState } from 'react';
import { Seo } from 'src/src2/components/seo'; // Corrected import statement
import { useSettings } from '../hooks/use-settings'; // Corrected import statement
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { usePageView } from '../hooks/use-page-view';

const components = [
  {
    element: <QuickStats2 />,
    title: 'Pixel Tracker #1',
  },
  {
    element: <QuickStats1 />,
    title: 'Business 2',
  },
  {
    element: <QuickStats3 />,
    title: 'Business 3',
  },
  {
    element: <QuickStats4 />,
    title: 'Business 4',
  },
  {
    element: <QuickStats5 />,
    title: 'Business 5',
  },
  {
    element: <QuickStats6 />,
    title: 'Business 6',
  },
  {
    element: <QuickStats7 />,
    title: 'Business 7',
  },
  {
    element: <QuickStats8 />,
    title: 'Business 8',
  },
  {
    element: <QuickStats9 />,
    title: 'Business 9',
  },
];

const Page = () => {
  const settings = useSettings();
  usePageView();


  useEffect(() => {
    fetch('http://localhost:3000/api/v1/pixel/log-view', { method: 'POST' })
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log('error', error));
  });

  useEffect(() => {
    fetch('http://localhost:3000/api/v1/pixel/log-view', { method: 'POST' })
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log('error', error));
  });

  const handleConversionClick = () => {
    fetch('http://localhost:3000/v1/pixel/log-click', { method: 'POST' })
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log('error', error));
  };

  return (
    <>
      <Seo title="Dashboard: Blank" />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            py: 8,
          }}
        >
          <Container maxWidth="lg">
            <Stack spacing={8}>
              {components.map((component) => (
                <Previewer
                  key={component.title}
                  title={component.title}
                >
                  {component.element}
                </Previewer>
              ))}
            </Stack>
            <Button
              variant="contained"
              onClick={handleConversionClick}
            >
              Log Conversion
            </Button>
          </Container>
        </Box>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
