<<<<<<< HEAD
import React from 'react';
import Box from '@mui/material/Box'; // Corrected import statement
import Container from '@mui/material/Container'; // Corrected import statement
import Stack from '@mui/material/Stack'; // Corrected import statement
import PlusIcon from '@mui/icons-material/Add'; // Corrected import statement
import Button from '@mui/material/Button';
import SvgIcon from '@mui/material/SvgIcon';
=======
'use client';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Stack from '@mui/material/Stack';
>>>>>>> Mustafa
import Typography from '@mui/material/Typography';
import { Seo } from '../components/seo';
import { usePageView } from '../hooks/use-page-view';
import { Layout as DashboardLayout } from 'src/layouts/dashboard';
import { useSettings } from 'src/hooks/use-settings';
import PixelTracking from '../components/pixelTracking';

const Page = () => {
  const settings = useSettings();

  usePageView();

  return (
    <>
      <Seo title="Dashboard: Analytics" />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
<<<<<<< HEAD
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
=======
        <Container maxWidth={settings.stretch ? false : 'xl'}>
          <Grid
            container
            spacing={{
              xs: 3,
              lg: 4,
            }}
          >
            <Grid xs={12} >
              <Stack
                direction="row"
                justifyContent="space-between"
                spacing={4}
              >
                <Stack spacing={1}>
                  <Typography variant="h4">Pixel</Typography>
                </Stack>
              </Stack>
            </Grid>
            <Grid
              xs={12}
              lg={12}
>>>>>>> Mustafa
            >
              <PixelTracking />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
