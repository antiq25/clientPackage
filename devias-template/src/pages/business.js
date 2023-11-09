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
import { AnalyticsStats } from '../sections/dashboard/overview/analytics-stats';
import { AnalyticsMostVisited } from '../sections/dashboard/overview/analytics-most-visited';
import { AnalyticsSocialSources } from '../sections/dashboard/overview/analytics-social-sources';
import { AnalyticsTrafficSources } from '../sections/dashboard/overview/analytics-traffic-sources';
import { AnalyticsVisitsByCountry } from '../sections/dashboard/overview/analytics-visits-by-country';

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
                  <Typography variant="h4">Analytics</Typography>
                </Stack>
                <Stack
                  alignItems="center"
                  direction="row"
                  spacing={2}
                >
                  <Button
                    startIcon={
                      <SvgIcon>
                        <PlusIcon />
                      </SvgIcon>
                    }
                    variant="contained"
                  >
                    Create Listing
                  </Button>
                </Stack>
              </Stack>
            </Grid>
            <Grid
              xs={12}
              md={4}
            >
              <AnalyticsStats
                action={
                  <Button
                    color="inherit"
                    endIcon={
                      <SvgIcon>
                        <ArrowRightIcon />
                      </SvgIcon>
                    }
                    size="small"
                  >
                    Review Data
                  </Button>
                }
                chartSeries={[
                  {
                    data: [0, 170, 242, 98, 63, 56, 85, 171, 209, 163, 204, 21, 264, 0],
                  },
                ]}
                title="Impressions"
                value="36,6K"
              />
            </Grid>
            <Grid
              xs={12}
              md={4}
            >
              <AnalyticsStats
                action={
                  <Button
                    color="inherit"
                    endIcon={
                      <SvgIcon>
                        <ArrowRightIcon />
                      </SvgIcon>
                    }
                    size="small"
                  >
                    Site Traffic
                  </Button>
                }
                chartSeries={[
                  {
                    data: [0, 245, 290, 187, 172, 106, 15, 210, 202, 19, 18, 3, 212, 0],
                  },
                ]}
                title="Engagements"
                value="19K"
              />
            </Grid>
            <Grid
              xs={12}
              md={4}
            >
              <AnalyticsStats
                action={
                  <Button
                    color="inherit"
                    endIcon={
                      <SvgIcon>
                        <ArrowRightIcon />
                      </SvgIcon>
                    }
                    size="small"
                  >
                    Earnings
                  </Button>
                }
                chartSeries={[
                  {
                    data: [0, 277, 191, 93, 92, 85, 166, 240, 63, 4, 296, 144, 166, 0],
                  },
                ]}
                title="Spent"
                value="$41.2K"
              />
            </Grid>
            <Grid
              xs={12}
              lg={8}
            >
              <AnalyticsTrafficSources
                chartSeries={[
                  {
                    name: 'Organic',
                    data: [45, 40, 37, 41, 42, 45, 42],
                  },
                  {
                    name: 'Marketing',
                    data: [19, 26, 22, 19, 22, 24, 28],
                  },
                ]}
              />
            </Grid>
            
          </Grid>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;


export default Page;
