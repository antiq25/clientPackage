import { useCallback, useEffect, useState } from 'react';
import ChevronLeftIcon from '@untitled-ui/icons-react/build/esm/ChevronLeft';
import ChevronRightIcon from '@untitled-ui/icons-react/build/esm/ChevronRight';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import SvgIcon from '@mui/material/SvgIcon';
import Typography from '@mui/material/Typography';

import { jobsApi } from 'src/src2/api/jobs';
import { RouterLink } from 'src/src2/components/router-link';
import { Seo } from 'src/src2/components/seo';
import { useMounted } from 'src/src2/hooks/use-mounted';
import { usePageView } from 'src/src2/hooks/use-page-view';
import { JobListSearch } from 'src/src2/sections/dashboard/jobs/job-list-search';
import { Logo } from 'src/components/logo1';  
import { Layout as DashboardLayout } from 'src/layouts/dashboard';
import { paths } from 'src/paths';
import { useSettings } from 'src/hooks/use-settings'; 
import BusinessNamesList from 'src/components/company_card/companycard';
import WidgetsCardList from 'src/components/company_card/WidgetCardList'
import { ReviewsDataProvider } from 'src/components/company_card/ReviewsDataProvider';
import useUser from  'src/hooks/decode';

const useCompanies = () => {
  const isMounted = useMounted();
  const [widgetsData, setWidgetsData] = useState([]);

  const [companies, setCompanies] = useState([]);
  const handleCompaniesGet = useCallback(async () => {
    try {
      const response = await jobsApi.getCompanies();
      
      if (isMounted()) {
        setCompanies(response);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMounted]);
  
  useEffect(
    () => {
      handleCompaniesGet();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
    );
    
    return companies;
    const userId = useUser();
};

const Page = () => {
  const companies = useCompanies();

  usePageView();
  useSettings();

  return (
    <>
      <Seo title="Dashboard: Job Browse" />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="lg">
          <Grid
            alignItems="center"
            container
            sx={{
              backgroundColor: 'neutral.900',
              borderRadius: 1,
              color: 'common.white',
              px: 4,
              py: 8,
            }}
          >
            <Grid
              xs={12}
              sm={7}
            >
              <Typography
                color="inherit"
                variant="h3"
              >
                Show My Service: Widgets
              </Typography>
              <Typography
                color="neutral.500"
                sx={{ mt: 2 }}
                variant="body1"
              >
                Create a widget to track your business analytics..
              </Typography>
              <Button
                color="primary"
                component={RouterLink}
                href={paths.widget}
                size="medium"
                sx={{ mt: 3 }}
                variant="contained"
              >
                Create
              </Button>
            </Grid>
            <Grid
              sm={5}
              sx={{
                display: {
                  xs: 'none',
                  sm: 'flex',
                },
                justifyContent: 'center',
              }}
            >
              <Logo />
            </Grid>
          </Grid>
          <Stack
            spacing={4}
            sx={{ mt: 4 }}
          >
            <JobListSearch />

            <ReviewsDataProvider>
             <WidgetsCardList /> 
            </ReviewsDataProvider>

            <Stack
              alignItems="center"
              direction="row"
              justifyContent="flex-end"
              spacing={2}
              sx={{
                px: 3,
                py: 2,
              }}
            >
              <IconButton disabled>
                <SvgIcon fontSize="small">
                  <ChevronLeftIcon />
                </SvgIcon>
              </IconButton>
              <IconButton>
                <SvgIcon fontSize="small">
                  <ChevronRightIcon />
                </SvgIcon>
              </IconButton>
            </Stack>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
