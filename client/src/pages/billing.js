import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Unstable_Grid2';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';
import { useSettings } from '../hooks/use-settings';
import { usePageView } from '../hooks/use-page-view';
import { Seo } from 'src/components/seo';
import { Layout as DashboardLayout } from 'src/layouts/dashboard';
import { PricingPlan } from 'src/sections/pricing/pricing-plan';
import { PricingPlanIcon } from 'src/sections/pricing/pricing-plan-icon';

const plans = [
  {
    id: 'startup',
    icon: <PricingPlanIcon name="startup" />,
    name: 'Startup',
    price: 0,
    features: ['Create contracts', 'Chat support', 'Email alerts'],
    cta: 'Start Free Trial',
  },
  {
    id: 'standard',
    icon: <PricingPlanIcon name="standard" />,
    name: 'Standard',
    price: 4.99,
    features: [
      'All previous',
      'Highlights reporting',
      'Data history',
      'Unlimited users',
    ],
    cta: 'Start Free Trial',
  },
  {
    id: 'business',
    icon: <PricingPlanIcon name="business" />,
    name: 'Business',
    price: 29.99,
    features: [
      'All previous',
      'Unlimited contacts',
      'Analytics platform',
      'Public API access',
      'Send and sign unlimited contracts',
    ],
    cta: 'Contact Us',
  },
];

const Page = () => {
  usePageView();
  useSettings();

  const handleStartFreeTrial = (planId) => {
    if (planId === 'startup') {
      window.location.href = 'https://buy.stripe.com/test_14kfZTaIU94ybaE000';
    } else if (planId === 'standard') {
      window.location.href = 'https://buy.stripe.com/test_14kfZTaIU94ybaE000';
    }
  };

  return (
    <>
      <Seo title="Pricing" />
      <Box component="main"
sx={{ flexGrow: 1 }}>
        <Box
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'dark' ? 'neutral.800' : 'neutral.50',
            pb: '120px',
            pt: '50px',
          }}
        >
          <Container maxWidth="lg">
            <Box
              sx={{
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'column',
                mb: 4,
              }}
            >
              <Typography variant="h3">Show My Service Pricing</Typography>
              <Typography
                color="text.secondary"
                sx={{ my: 2 }}
                variant="body1"
              >
                Find out your analytics &amp; and reach maximum potential with SMS.
              </Typography>
              <Stack alignItems="center"
direction="row"
spacing={1}>
                <Switch checked />
                <Typography variant="body1">Yearly Payment</Typography>
                <Chip color="primary"
label="25% OFF"
size="small" />
              </Stack>
            </Box>
            <Grid container
spacing={4}>
              {plans.map((plan) => (
                <Grid key={plan.id}
xs={12}
md={4}>
                  <PricingPlan
                    cta={plan.cta}
                    currency="$"
                    description="To familiarize yourself with our tools."
                    features={plan.features}
                    icon={plan.icon}
                    name={plan.name}
                    popular={plan.id === 'standard'}
                    price={plan.price}
                    sx={{
                      height: '100%',
                      maxWidth: 460,
                      mx: 'auto',
                    }}
                    onClick={() => handleStartFreeTrial(plan.id)}
                  />
                </Grid>
              ))}
            </Grid>
            <Box sx={{ mt: 4 }}>
              <Typography
                align="center"
                color="text.secondary"
                component="p"
                variant="caption"
              >
                30% of our income goes into Whale Charity
              </Typography>
            </Box>
          </Container>
        </Box>
        <Divider />
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
