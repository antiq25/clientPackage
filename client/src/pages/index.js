'use client';
import PlusIcon from '@untitled-ui/icons-react/build/esm/Plus';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import SvgIcon from '@mui/material/SvgIcon';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import Grow from '@mui/material/Grow';
import { Seo } from 'src/components/seo';
import { useState } from 'react';
import { usePageView } from 'src/hooks/use-page-view';
import { useSettings } from 'src/hooks/use-settings';
import { Layout as DashboardLayout } from 'src/layouts/dashboard';
import FetchedReviews from 'src/components/fetchReview';
import CreateListingDialog from 'src/components/createListingPopUp';
import { ApiProvider } from 'src/components/company_card/apiProvide';
// import ReviewStatistics from 'src/components/ReviewStatistics'; // Placeholder for statistics component

const Page = () => {
  const settings = useSettings();
  const [isCreateListingDialogOpen, setCreateListingDialogOpen] = useState(false);
  const handleOpenCreateListingDialog = () => {
    setCreateListingDialogOpen(true);
  };

  const handleCloseCreateListingDialog = () => {
    setCreateListingDialogOpen(false);
  };

  usePageView();
  const theme = useTheme();

  return (
    <>
      <Seo title="Dashboard" />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
          backgroundColor: theme.palette.background.default,
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
                <Button
                  startIcon={<SvgIcon component={PlusIcon} />}
                  variant="contained"
                  onClick={handleOpenCreateListingDialog}
                >
                  Add New Listing
                </Button>
                <CreateListingDialog
                  open={isCreateListingDialogOpen}
                  onClose={handleCloseCreateListingDialog}
                  onCreationSuccess={() => {}}
                />
              </Stack>
            </Grid>

            {/* Review Statistics Card */}
            <Grid
              item
              xs={12}
              md={6}
              lg={4}
            >
              <Grow
                in
                timeout={1000}
              >
                <Card>
                  <CardHeader title="Review Statistics" />
                  <CardContent>
                    <ApiProvider>
                      
                    </ApiProvider>
                  </CardContent>
                </Card>
              </Grow>
            </Grid>

            {/* Fetched Reviews */}
            <FetchedReviews />
            <Grid
              item
              xs={12}
              md={6}
              lg={8}
            >
              <Grow
                in
                timeout={1000}
              >
                <Card>
                  <CardHeader title="Latest Reviews" />
                  <CardContent>
                  </CardContent>
                </Card>
              </Grow>
            </Grid>

            {/* More dashboard cards can be added here */}
          </Grid>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
