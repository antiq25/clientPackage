'use client';
import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Seo } from '../components/seo';
import { useSettings } from '../hooks/use-settings';
import { Layout as DashboardLayout } from 'src/layouts/dashboard';
import BusinessMap from '../components/MapReviews';
import { usePageView } from '../hooks/use-page-view';
import { OverviewReviewIssues } from '../sections/dashboard/overview/overview-review-issues';
import { OverviewRatingIssues } from '../sections/dashboard/overview/overview-rating-issues';
import { OverviewBusinessIssues } from '../sections/dashboard/overview/overview-business-issues';
import { OverviewTips } from '../sections/dashboard/overview/overview-tips';

const Page = () => {
  const settings = useSettings();
  usePageView();

  const [reviewsCount, setReviewsCount] = useState('');
  const [rating, setRating] = useState('');
  const [business, setBusiness] = useState('');

  const handleSetReviewsCount = (newReviewsCount) => {
    setReviewsCount(newReviewsCount);
  };

  const handleSetRating = (rate) => {
    setRating(rate);
  };

  const handleSetBusiness = (name) => {
    setBusiness(name);
  };

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
                  <Typography variant="h4">Business Map</Typography>
                </Stack>
              </Stack>
            </Grid>

            <Grid
              xs={12}
              md={12}
            >
              <OverviewTips
                sx={{ height: '100%' }}
                tips={[
                  {
                    title: 'Explore the Map',
                    content:
                      'Use your mouse or touchpad to navigate around the map. Scroll to zoom in and out to find businesses in your area of interest.',
                  },
                  {
                    title: 'Business Information at a Glance',
                    content:
                      'Click on any business pin to see a brief overview including the business name, total number of reviews, and average rating.',
                  },
                  {
                    title: 'Detailed Business Insights',
                    content:
                      'After selecting a business, check the overview components on the dashboard for detailed insights and metrics.',
                  },
                  {
                    title: 'Refresh Data',
                    content:
                      'If you navigate to a new area of the map, click on a business to refresh the data displayed in the overview components.',
                  },
                  {
                    title: 'Full Screen View',
                    content:
                      'For an immersive experience, you can use the full screen option provided by your browser when viewing the map.',
                  },
                ]}
              />
            </Grid>
            <Grid
              xs={12}
              md={4}
            >
              <OverviewBusinessIssues name={business} />
            </Grid>
            <Grid
              xs={12}
              md={4}
            >
              <OverviewReviewIssues amount={reviewsCount} />
            </Grid>
            <Grid
              xs={12}
              md={4}
            >
              <OverviewRatingIssues amount={rating} />
            </Grid>
            <Grid
              xs={12}
              lg={12}
            >
              <BusinessMap
                review={setReviewsCount}
                rating={setRating}
                business={setBusiness}
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
