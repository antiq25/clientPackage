import PlusIcon from '@untitled-ui/icons-react/build/esm/Plus';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import SvgIcon from '@mui/material/SvgIcon';
import Typography from '@mui/material/Typography';

import { Seo } from 'src/components/seo';
import { usePageView } from 'src/hooks/use-page-view';
import { useSettings } from 'src/hooks/use-settings';
import { Layout as DashboardLayout } from 'src/layouts/dashboard';
import  ApexCharts  from 'react-apexcharts'; 


const Page = () => {
  const settings = useSettings();

  usePageView();

  return (
    <>
      <Seo title="Dashboard: Blank" />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
<Grid container spacing={8}>
            <Stack
            spacing={3}
          >
            
       
            <Box
              sx={{
                borderColor: 'neutral.300',
                borderStyle:'revert-layer',
                borderWidth: 1,
                height: 300,
                p: '4px',
              }}
            />
          </Stack>
        </Container>
        </Grid>
      </Box>

    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
