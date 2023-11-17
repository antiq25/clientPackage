'use client';
import PlusIcon from '@untitled-ui/icons-react/build/esm/Plus';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Stack from '@mui/material/Stack';
import SvgIcon from '@mui/material/SvgIcon';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import useUser from '../hooks/decode';
import { Seo } from '../components/seo';
import { Layout as DashboardLayout } from 'src/layouts/dashboard';
import { useSettings } from '../hooks/use-settings';
import { OverviewSubscriptionUsage } from '../sections/dashboard/overview/overview-subscription-usage';
import { chartData } from '../mockData';
import BusinessCard from '../components/businessCard';
import EmailVerificationDialog from '../components/emailverifydialog';
import CreateListingDialog from '../components/createListingPopUp';
import ScrapedReviews from '../components/scrapedReviews';
import BusinessMap from '../components/MapReviews';
import { usePageView } from '../hooks/use-page-view';
import { OverviewReviewIssues } from '../sections/dashboard/overview/overview-review-issues';
import { OverviewRatingIssues } from '../sections/dashboard/overview/overview-rating-issues';
import { OverviewBusinessIssues } from '../sections/dashboard/overview/overview-business-issues';
import { OverviewTips } from '../sections/dashboard/overview/overview-tips';

const Page = () => {
  const settings = useSettings();
  const user = useUser();

  const [selectedBusiness, setSelectedBusiness] = useState(chartData[0] || null);
  const [chartSeries, setChartSeries] = useState([]);
  const [isCreateListingDialogOpen, setCreateListingDialogOpen] = useState(false);
  const [refreshBusinessCard, setRefreshBusinessCard] = useState(false);
  const [reviewAggregate, setReviewAggregate] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [reviewsCount, setReviewsCount] = useState('');
  const [rating, setRating] = useState('');
  const [business, setBusiness] = useState('');
  const [triggerBusinessCardRefresh, setTriggerBusinessCardRefresh] = useState(false);

  const handleBusinessCardRefresh = () => {
    setTriggerBusinessCardRefresh(prev => !prev);
  };

  const handleSetReviewAggregate = (newAggregate) => {
    const formattedData = newAggregate.map((item) => ({
      x: item.star, // 'x' represents the category on the x-axis.
      y: item.reviews, // 'y' represents the value for that category.
    }));
    setReviewAggregate(formattedData);
  };

  const handleSetReviews = (newReviews) => {
    setReviews(newReviews);
  };

  const handleOpenCreateListingDialog = () => {
    setCreateListingDialogOpen(true);
  };

  const handleCloseCreateListingDialog = () => {
    setCreateListingDialogOpen(false);
  };

  const reviewChartData = reviewAggregate.map((item) => ({
    name: item.star,
    data: [item.reviews], // Assuming item.reviews is the count for that star rating
  }));

  useEffect(() => {
    if (selectedBusiness && Array.isArray(chartData[selectedBusiness.id])) {
      const businessChartData = chartData[selectedBusiness.id];
      const viewsSeries = {
        name: 'Views',
        data: businessChartData.map((data) => data.views),
      };
      const clicksSeries = {
        name: 'Clicks',
        data: businessChartData.map((data) => data.clicks),
      };
      setChartSeries([viewsSeries, clicksSeries]);
    } else {
      // Handle the case where there is no data for the selected business
      setChartSeries([]);
    }
  }, [selectedBusiness]);

  useEffect(() => { }, [user]);

  usePageView();

  return (
    <>
      <Seo title="Show My Service: Google Trends" />
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
                  <Typography variant="h4">Show My Service: Analytics</Typography>
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
                    onClick={handleOpenCreateListingDialog}
                  >
                    Add New Listing
                  </Button>
                  <CreateListingDialog
                    open={isCreateListingDialogOpen}
                    onClose={handleCloseCreateListingDialog}
                    onCreationSuccess={() => {
                      setRefreshBusinessCard((prev) => !prev);
                    }}
                  />

                  <EmailVerificationDialog />
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
              <OverviewReviewIssues amount={parseInt(reviewsCount)} />
            </Grid>
            <Grid
              xs={12}
              md={4}
            >
              <OverviewRatingIssues amount={parseInt(rating)} />
            </Grid>
            <Grid
              xs={12}
              lg={12}
            >
              <BusinessMap
                review={setReviewsCount}
                rating={setRating}
                business={setBusiness}
                onBusinessAdded={handleBusinessCardRefresh}
              />
            </Grid>
            <Grid
              xs={12}
              md={5}
            >
              <BusinessCard
                onBusinessSelect={setSelectedBusiness}
                refreshTrigger={refreshBusinessCard}
                mapRefreshTrigger={triggerBusinessCardRefresh}
                onSetReviewAggregate={handleSetReviewAggregate}
                onSetReviews={handleSetReviews}
              />
            </Grid>
            <Grid
              xs={12}
              md={7}
              lg={7}
            >
              <OverviewSubscriptionUsage
                chartSeries={[{ name: 'Reviews', data: reviewAggregate }]}
              />
            </Grid>
            <Grid
              xs={12}
              md={12}
            >
              <ScrapedReviews reviews={reviews} />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
