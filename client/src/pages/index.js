import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import Grow from '@mui/material/Grow';
import { Seo } from 'src/components/seo';
import { usePageView } from 'src/hooks/use-page-view';
import { useSettings } from 'src/hooks/use-settings';
import { Layout as DashboardLayout } from 'src/layouts/dashboard';
import FetchedReviews from 'src/components/fetchReview';
import { ApiProvider } from 'src/api/providers/ApiProvider';
import TopCompaniesChart from './ratingcard';
import { Chart4 } from 'src/components/company_card/chart/chart2';
import { ReviewsDataProvider } from 'src/api/providers/ReviewsDataProvider';
import { SelectedCompanyProvider } from 'src/contexts/reviews/SelectedCompanyContext';

const Page = () => {
  const settings = useSettings();
  const theme = useTheme();
  usePageView();

  return (
    <>
      <ApiProvider>
        <ReviewsDataProvider>
          <SelectedCompanyProvider>
            <Seo title="Dashboard" />
            <Box
              component="main"
              sx={{
                flexGrow: 1,
                py: 2,
                backgroundColor: theme.palette.background.main,
              }}
            >
              <Container maxWidth={settings.stretch ? false : 'xl'}>
                <Grid
                  container
                  spacing={3}
                >
                  <Grid
                    item
                    xs={12}
                  >
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                      mb={5}
                    >
                      <Typography variant="h4">Dashboard</Typography>
                    </Stack>
                  </Grid>

                  <Grid
                    item
                    xs={12}
                  >
                    <Grow
                      in
                      timeout={1000}
                    >
                      <Card>
                        <CardHeader title="Latest Reviews" />
                        <CardContent>
                          <FetchedReviews />
                        </CardContent>
                      </Card>
                    </Grow>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    md={6}
                    lg={6}
                  >
                    <Grow
                      in
                      timeout={1000}
                    >
                      <Card>
                        <CardHeader title="Performance Over Time" />
                        <CardContent>
                          <Chart4 />
                        </CardContent>
                      </Card>
                    </Grow>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    md={6}
                    lg={6}
                  >
                    <Grow
                      in
                      timeout={1000}
                    >
                      <Card>
                        <CardHeader title="Top Listings" />
                        <CardContent>
                          <TopCompaniesChart />
                        </CardContent>
                      </Card>
                    </Grow>
                  </Grid>
                </Grid>
              </Container>
            </Box>
          </SelectedCompanyProvider>
        </ReviewsDataProvider>
      </ApiProvider>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
