import React from 'react';
import { Box, Typography, Button, Container, Paper, Card, CardHeader, Grid } from '@mui/material';

const plans = [
  { title: 'Starter', price: 29, accounts: 1, listings: 1 },
  { title: 'Business', price: 79, accounts: 5, listings: 5, popular: true },
  { title: 'Pro', price: 129, accounts: 10, listings: 10 },
];

const PlanCard = ({ plan }) => {
  return (
    <Paper
      elevation={3}
      style={{
        padding: '0px',
        margin: '20px',
        position: 'relative',
        width: '350px',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {plan.popular && (
        <Box
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            backgroundColor: '#cea528',
            padding: '5px 10px',
          }}
        >
          POPULAR
        </Box>
      )}
      <Card>
        <CardHeader
          title={plan.title}
          subheader={`${plan.accounts} Account`}
          titleTypographyProps={{ align: 'center', variant: 'h4' }}
          subheaderTypographyProps={{ align: 'center' }}
        />
        <Container
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            margin: '0px 0px 40px 0px',
          }}
        >
          <Box style={{ display: 'flex', alignItems: 'baseline' }}>
            <Typography variant="h4">$</Typography>
            <Typography variant="h2">{plan.price}</Typography>
            <Typography variant="h6">Month</Typography>
          </Box>

          <Typography variant="subtitle1">✓ {plan.listings} Business Listings</Typography>
          <Button
            variant="contained"
            style={{ marginTop: '20px' }}
          >
            START FREE TRIAL
          </Button>
        </Container>
      </Card>
    </Paper>
  );
};

function BillingPage() {
  return (
    <Card>
      <Box
        textAlign="center"
        paddingY={4}
      >
        <Typography variant="h3">Choose Your Plan</Typography>
        <Typography variant="subtitle2">
          After your 7-day FREE Trial – you will be automatically charged according to the plan you
          select. If you require more than 10 business listings, please Contact Us Here.
        </Typography>
      </Box>

      {/* Use the Grid container for responsive layout */}
      <Grid
        container
        sx={{ justifyContent: 'center', paddingBottom: '10px' }}
      >
        {plans.map((plan) => (
          // Define how the item should behave on different screen sizes
          <Grid
            item
            key={plan.title}
            display="flex"
            justifyContent="center"
            xs={12}
            sm={6}
            md={4}
          >
            <PlanCard plan={plan} />
          </Grid>
        ))}
      </Grid>
    </Card>
  );
}

export default BillingPage;
