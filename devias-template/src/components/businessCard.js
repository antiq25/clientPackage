import React, { useState, useEffect, useRef } from 'react';
import { Typography, Radio, ListItem } from '@mui/material';
import { FixedSizeList as VirtualizedList } from 'react-window';
import useUser from '../hooks/decode';
import { dashboardAPI } from '../api/bundle';
import { OverviewSubscriptionUsage } from '../sections/dashboard/overview/overview-subscription-usage';

const BusinessCard = ({ onBusinessSelect, refreshTrigger, onSetReviewAggregate }) => {
  const [businesses, setBusinesses] = useState([]);
  const [selectedBusinessId, setSelectedBusinessId] = useState('');
  const [reviewAggregate, setReviewAggregate] = useState([]);
  const user = useUser();
  const fetchLockRef = useRef(false);

  useEffect(() => {
    if (fetchLockRef.current) {
      // Exit early if we're already fetching
      return;
    }
    fetchLockRef.current = true; // Set the lock

    const fetchListings = async () => {
      if (user) {
        const response = await dashboardAPI.getListing(user.id);
        if (response && response.data && response.data.listing) {
          const listings = response.data.listing.map((listing) => ({
            id: listing.id,
            name: listing.name,
          }));
          setBusinesses(listings);
          if (listings.length > 0) {
            setSelectedBusinessId(listings[0].id);
            onBusinessSelect(listings[0]);
            fetchReviewsForListing(listings[0].id);
          }
        }
      }
    };

    fetchListings().finally(() => {
      fetchLockRef.current = false; // Release the lock after fetching
    });

  }, [user, refreshTrigger]); // Dependencies include refreshTrigger

  const fetchReviewsForListing = async (listingId) => {
    const reviewsResponse = await dashboardAPI.fetchReviews(listingId);
    if (reviewsResponse?.success) {
      const reviews = reviewsResponse.data.reviews;
      const aggregate = reviews.reduce((acc, review) => {
        // Ensure all stars are represented, even if count is 0
        acc[review.stars] = (acc[review.stars] || 0) + 1;
        return acc;
      }, { '1': 0, '2': 0, '3': 0, '4': 0, '5': 0 }); // Initialize all star counts to 0

      // Transform aggregate into an array with objects { star: "Star N", reviews: count }
      const graphData = Object.entries(aggregate).map(([star, count]) => ({
        star: `Star ${star}`,
        reviews: count
      }));

      onSetReviewAggregate(graphData); // Pass data to parent component
    } else {
      console.error('Failed to fetch reviews:', reviewsResponse.error);
    }
  };



  const handleSelect = (business) => {
    setSelectedBusinessId(business.id);
    onBusinessSelect(business);
    fetchReviewsForListing(business.id);
  };

  const Row = ({ index, style }) => {
    const business = businesses[index];
    return (
      <ListItem
        key={business.id}
        sx={style}
        onClick={() => handleSelect(business)}
        selected={selectedBusinessId === business.id}
      >
        <Radio
          checked={selectedBusinessId === business.id}
          onChange={() => handleSelect(business)}
        />
        <Typography>{business.name}</Typography>
      </ListItem>
    );
  };

  return (
    <>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Select Business
      </Typography>
      {businesses.length > 0 ? (
        <VirtualizedList
          height={300}
          width="100%"
          itemCount={businesses.length}
          itemSize={50}
          outerElementType="div"
        >
          {Row}
        </VirtualizedList>
      ) : (
        <Typography>No businesses found.</Typography>
      )}
    </>
  );
};

export default BusinessCard;
