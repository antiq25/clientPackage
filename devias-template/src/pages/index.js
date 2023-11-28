'use client';
import PlusIcon from '@untitled-ui/icons-react/build/esm/Plus';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';  
import CardHeader from '@mui/material/Card';  

import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Stack from '@mui/material/Stack';
import SvgIcon from '@mui/material/SvgIcon';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import useUser from '../hooks/decode';
import { Seo } from '../components/seo';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { chartData } from '../mockData';
import { usePageView } from 'src/src2/hooks/use-page-view';
import { useSettings } from 'src/src2/hooks/use-settings';
import EmailVerificationDialog from '../components/emailverifydialog';
import CreateListingDialog from '../components/createListingPopUp';
import FetchedReviews from '../components/fetchReview';

const Page = () => {
  const settings = useSettings();
  const user = useUser();

  const [selectedBusiness, setSelectedBusiness] = useState(chartData[0] || null);
  const [chartSeries, setChartSeries] = useState([]);
  const [isCreateListingDialogOpen, setCreateListingDialogOpen] = useState(false);
  const [refreshBusinessCard, setRefreshBusinessCard] = useState(false);
  const [reviewAggregate, setReviewAggregate] = useState([]);
  const [reviews, setReviews] = useState([]);

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

  useEffect(() => {}, [user]);

  usePageView();

  return (
    <>
      <Seo title="Show My Service: Dashboard" />
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
                justifyContent="center"
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
                      // This should toggle the state and trigger a re-render of BusinessCard
                      setRefreshBusinessCard((prev) => !prev);
                    }}
                  />

                  <EmailVerificationDialog />
                </Stack>
              </Stack>
            </Grid>

  
            <Grid
              item
              xs={12}
              md={12}
            >
              <Card>
              <CardHeader
                title="Businesses"
                subheader="Manage your businesses"
              />
            <FetchedReviews />
            </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
