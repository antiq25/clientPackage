import PlusIcon from '@untitled-ui/icons-react/build/esm/Plus';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Card, CardHeader } from '@mui/material';
import { Seo } from 'src/components/seo';
import { useSettings } from 'src/hooks/use-settings';
import { Layout as DashboardLayout } from 'src/layouts/dashboard';
import BusinessMap from '../components/MapReviews';
import { usePageView } from '../hooks/use-page-view';

const Page = () => {
  const settings = useSettings();
  // usePageView();


  return (
    <>
      <Seo title="Dashboard: Blank" />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 2,
        }}
      >
                <Container maxWidth={settings.stretch ? false : 'xl'}>

        <Card>
          <CardHeader subheader="Map"  

           />
            <BusinessMap />
        </Card>
        </Container>

      </Box>
      
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
