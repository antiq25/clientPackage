import type { NextPage } from 'next';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import SvgIcon from '@mui/material/SvgIcon';
import Typography from '@mui/material/Typography';
import { Seo } from '../components/seo';
import { useSettings } from '../hooks/use-settings';
import { Layout as DashboardLayout } from '../layouts/dashboard';
import BusinessPage from '../components/MapReviews';
import React from 'react';

interface PageProps {}

const Page: NextPage<PageProps> & {
  getLayout: (page: React.ReactNode) => JSX.Element;
} = () => {
  const settings = useSettings();

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
        <BusinessPage
          review={{ any: true }}
          rating={{ any: true }}
          business={{ any: true }}
        />
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
