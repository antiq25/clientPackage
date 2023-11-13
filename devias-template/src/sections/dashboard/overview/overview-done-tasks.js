import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { dashboardAPI } from '../../../api/bundle';
import { apiHandler } from '../../../api/bundle';
import useUser from '../../../hooks/decode';

const OverviewDoneTasks = () => {
  const [listingsCount, setListingsCount] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const user = useUser();

  useEffect(() => {
    const fetchUserProfileAndListings = async () => {
      try {
        setIsLoading(true);
        // Fetch the user's profile to get their ID
        const profileResponse = await apiHandler.handleGetProfile();
        const userId = profileResponse.data?.id;

        // Fetch listings
        const listingsResponse = await dashboardAPI.getListing(userId, undefined);

        // Assuming the response has a `data` object which contains a `listing` array
        if (
          listingsResponse &&
          listingsResponse.success &&
          listingsResponse.data &&
          Array.isArray(listingsResponse.data.listing)
        ) {
          setListingsCount(listingsResponse.data.listing.length);
        } else {
          // Handle cases where the data isn't in the expected format
          console.error('Unexpected structure of listings response:', listingsResponse);
        }
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserProfileAndListings();
  }, []);

  // Outside of useEffect
  console.log('isLoading:', isLoading, 'listingsCount:', listingsCount);

  return (
    <Card>
      <Stack
        alignItems="center"
        direction={{
          xs: 'column',
          sm: 'row',
        }}
        spacing={3}
        sx={{
          px: 4,
          py: 3,
        }}
      >
        <div>
          <img
            alt="Completed Tasks"
            src="/assets/iconly/iconly-glass-tick.svg"
            width={48}
          />
        </div>
        <Box sx={{ flexGrow: 1 }}>
          <Typography
            color="text.secondary"
            variant="body2"
          ></Typography>
          <Typography
            color="text.primary"
            variant="h4"
          >
            {listingsCount} {/* This will display the number */}
          </Typography>
        </Box>
      </Stack>
      <Divider />
      <CardActions>
        <Button
          color="inherit"
          endIcon={<ArrowRightIcon />}
          size="small"
        >
          Google Listings
        </Button>
      </CardActions>
    </Card>
  );
};

export default OverviewDoneTasks;
