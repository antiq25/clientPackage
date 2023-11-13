'use client';
import ArrowRightIcon from '@untitled-ui/icons-react/build/esm/ArrowRight';
import PlusIcon from '@untitled-ui/icons-react/build/esm/Plus';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Stack from '@mui/material/Stack';
import SvgIcon from '@mui/material/SvgIcon';
import Typography from '@mui/material/Typography';
import { Seo } from '../components/seo';
import { usePageView } from '../hooks/use-page-view';
import { Layout as DashboardLayout } from 'src/layouts/dashboard';
import { useSettings } from '../hooks/use-settings';
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
        <Container maxWidth={settings.stretch ? false : 'xl'}>
          <Grid
            container
            spacing={{
              xs: 3,
              lg: 4,
            }}
          >
            <Grid xs={12}>
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
