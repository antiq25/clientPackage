'use client';
import PlusIcon from '@untitled-ui/icons-react/build/esm/Plus';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader'; // Corrected import
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import SvgIcon from '@mui/material/SvgIcon';
import Typography from '@mui/material/Typography';
import FetchedReviews from 'src/components/fetchReview';
// import EmailVerificationDialog from 'src/components/emailverifydialog';
import CreateListingDialog from 'src/components/createListingPopUp';
import { useTheme } from '@mui/system';
import { Seo } from 'src/components/seo';
import { useEffect, useState } from 'react';
import { usePageView } from 'src/hooks/use-page-view';
import { useSettings } from 'src/hooks/use-settings';
import { Layout as DashboardLayout } from 'src/layouts/dashboard';
import { QuickStats2 } from 'src/sections/components/quick-stats/quick-stats-2';

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
  useTheme();

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
            <Grid
              item
              xs={12}
            >
              {' '}
              {/* Corrected by adding item prop */}
              <Stack
                direction="row"
                justifyContent="space-between"
                spacing={4}
              >
                <Stack spacing={1}>
                  <Typography variant="h4">Show My Service</Typography>
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
                    onCreationSuccess={() => {}}
                  />

                  {/* <EmailVerificationDialog /> */}
                </Stack>
              </Stack>
            </Grid>
            <Grid
              item // Corrected by adding item prop
              xs={12}
              md={12}
              lg={12}
            >
              <FetchedReviews />

              <QuickStats2 />
            </Grid>
            <Grid
              item // Corrected by adding item prop
              xs={12} // Changed from 7 to 12 for consistency
              md={12}
            ></Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
