import PlusIcon from '@untitled-ui/icons-react/build/esm/Plus';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import { Card, CardHeader } from '@mui/material';
import SvgIcon from '@mui/material/SvgIcon';
import Typography from '@mui/material/Typography';
import ChartPage from '../components/ChartPage';
import { Seo } from '../components/seo';
import { useSettings } from '../hooks/use-settings';
import { Layout as DashboardLayout } from 'src/layouts/dashboard';
import BusinessPage from '../components/MapReviews';
import Trends from '../components/fetchTrends';

const Page = () => {
  const settings = useSettings();

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
            <CardHeader subheader="Map" />
            <Trends />
          </Card>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
