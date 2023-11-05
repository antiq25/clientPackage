import { useState, useEffect } from 'react';
import { addDays, subDays, subHours, subMinutes } from 'date-fns';
import PlusIcon from '@untitled-ui/icons-react/build/esm/Plus';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import SvgIcon from '@mui/material/SvgIcon';
import Typography from '@mui/material/Typography';
import useUser from '../hooks/decode';
import { Seo } from 'src/components/seo';
import { useSettings } from 'src/hooks/use-settings';
import { Layout as DashboardLayout } from 'src/layouts/dashboard';
import { OverviewBanner } from 'src/sections/dashboard/overview/overview-banner';
import OverviewDoneTasks from 'src/sections/dashboard/overview/overview-done-tasks';
import { OverviewEvents } from 'src/sections/dashboard/overview/overview-events';
import { OverviewInbox } from 'src/sections/dashboard/overview/overview-inbox';
import { OverviewTransactions } from 'src/sections/dashboard/overview/overview-transactions';
import { OverviewPendingIssues } from 'src/sections/dashboard/overview/overview-pending-issues';
import { OverviewSubscriptionUsage } from 'src/sections/dashboard/overview/overview-subscription-usage';
import { OverviewHelp } from 'src/sections/dashboard/overview/overview-help';
import { OverviewJobs } from 'src/sections/dashboard/overview/overview-jobs';
import { OverviewOpenTickets } from 'src/sections/dashboard/overview/overview-open-tickets';
import { OverviewTips } from 'src/sections/dashboard/overview/overview-tips';
import EmailVerificationDialog from '../components/emailverifydialog'; // Adjust the import path as needed

import { dashboardAPI } from 'src/api/bundle';

const now = new Date();

const Page = () => {
  const settings = useSettings();
  const user = useUser();
  // const [listingsCount, setListingsCount] = useState(0);


  useEffect(() => {

  //     const fetchListingsCount = async () => {
  //       try {
  //         const response = await dashboardAPI.getListing(user.sub);
  //         if (response && response.message === "Listing found") {
  //           setListingsCount(response.listing.length); // set the count to the length of the listing array
  //         }
  //       } catch (error) {
  //         console.error('Error fetching listings:', error);
  //       }
  //     };

  //     fetchListingsCount();
  //   }
 
}, [user]); 


  return (
    <>
      <Seo title="ShowMyService: Overview" />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
           <EmailVerificationDialog />

        <Container maxWidth={settings.stretch ? false : 'xl'}>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              xs={12}
              md={4}
            >
              <OverviewDoneTasks />
            </Grid>
            <Grid
              item
              xs={12}
              md={4}
            >
              <OverviewPendingIssues amount={12} />
            </Grid>
            <Grid
              item
              xs={12}
              md={4}
            >
              <OverviewOpenTickets amount={5} />
            </Grid>
            <Grid
              item
              xs={12}
              md={7}
            >
              <OverviewBanner />
            </Grid>
            <Grid
              item
              xs={12}
              md={5}
            >
              <OverviewTips
                sx={{ height: '100%' }}
                tips={[
                  {
                    title: 'New fresh design.',
                    content:
                      'Your favorite template has a new trendy look, more customization options, screens & more.',
                  },
                  {
                    title: 'Tip 2.',
                    content: 'Tip content',
                  },
                  {
                    title: 'Tip 3.',
                    content: 'Tip content',
                  },
                ]}
              />
            </Grid>
            <Grid
              item
              xs={12}
              md={7}
            >
              <OverviewSubscriptionUsage
                chartSeries={[
                  {
                    name: 'This year',
                    data: [40, 37, 41, 42, 45, 42, 36, 45, 40, 44, 38, 41],
                  },
                  {
                    name: 'Last year',
                    data: [26, 22, 19, 22, 24, 28, 23, 25, 24, 21, 17, 19],
                  },
                ]}
              />
            </Grid>
            <Grid
              item
              xs={12}
              md={5}
            >
              <OverviewInbox
                messages={
                  [
                    // ... your messages
                  ]
                }
              />
            </Grid>
            <Grid
              item
              xs={12}
              md={7}
            >
              <OverviewTransactions
                transactions={
                  [
                    // ... your transactions
                  ]
                }
              />
            </Grid>
            <Grid
              item
              xs={12}
              md={5}
            >
              <OverviewEvents
                events={
                  [
                    // ... your events
                  ]
                }
              />
            </Grid>
            <Grid
              item
              xs={6}
            >
              <OverviewJobs />
            </Grid>
            <Grid
              item
              xs={6}
            >
              <OverviewHelp />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
