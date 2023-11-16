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
import ReviewSelector from '../components/customWidget/reviewSelector';
import ReviewCard from '../components/customWidget/reviewCard';
import ListingSelector from '../components/customWidget/listingSelector';

const Page = () => {
  const settings = useSettings();
  usePageView();

  const [selectedListing, setSelectedListing] = useState(null);
  const [selectedReview, setSelectedReview] = useState(null);

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
                  <Typography variant="h4">Custom Widget</Typography>
                </Stack>
              </Stack>
            </Grid>
            <Grid
              xs={12}
              md={6}
            >
              <ListingSelector onSelect={setSelectedListing} />
            </Grid>
            <Grid
              xs={12}
              md={6}
            >
              <ReviewCard review={selectedReview} />
            </Grid>
            <Grid
              xs={12}
              md={12}
            >
              <ReviewSelector
                listingId={selectedListing?.id}
                onSelect={setSelectedReview}
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
