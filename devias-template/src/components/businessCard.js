import React, { useState, useEffect } from 'react';
import { Typography, Radio, ListItem } from '@mui/material';
import { FixedSizeList as VirtualizedList } from 'react-window';
import useUser from '../hooks/decode';
import { dashboardAPI } from '../api/bundle';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell
} from 'recharts';

const BusinessCard = ({ onBusinessSelect }) => {
  const [businesses, setBusinesses] = useState([]);
  const [selectedBusinessId, setSelectedBusinessId] = useState('');
  const [reviewAggregate, setReviewAggregate] = useState([]);
  const user = useUser();

  useEffect(() => {
    const fetchListings = async () => {
      if (user) {
        const response = await dashboardAPI.getListing(user.id);
        const listings = response?.data?.listing?.map((listing) => ({ id: listing.id, name: listing.name })) ?? [];
        setBusinesses(listings);
        if (listings.length > 0) {
          setSelectedBusinessId(listings[0].id);
          fetchReviewsForListing(listings[0].id);
        }
      }
    };

    fetchListings();
  }, [user]);

  const fetchReviewsForListing = async (listingId) => {
    const reviewsResponse = await dashboardAPI.fetchReviews(listingId);
    if (reviewsResponse?.success) {
      const reviews = reviewsResponse.data.reviews;
      const aggregate = reviews.reduce((acc, review) => {
        acc[review.stars] = (acc[review.stars] || 0) + 1;
        return acc;
      }, {});
      const graphData = Object.keys(aggregate).map(star => ({
        star,
        reviews: aggregate[star]
      }));
      setReviewAggregate(graphData);
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
      <ListItem key={business.id}
sx={style}
onClick={() => handleSelect(business)}>
        <Radio checked={selectedBusinessId === business.id}
onChange={() => handleSelect(business)} />
        <Typography>{business.name}</Typography>
      </ListItem>
    );
  };

  const BarGraph = ({ data }) => (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <BarChart data={data}
margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
          <XAxis dataKey="star" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="reviews"
fill="#82ca9d"
barSize={40}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`}
fill={entry.star >= 3 ? '#82ca9d' : '#ffc658'} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );

  return (
    <>
      <Typography variant="h4"
sx={{ mb: 2 }}>
        Select Business
      </Typography>
      {businesses.length > 0 ? (
        <VirtualizedList height={300}
width="100%"
itemCount={businesses.length}
itemSize={50}
outerElementType="div">
          {Row}
        </VirtualizedList>
      ) : (
        <Typography>No businesses found.</Typography>
      )}
      <BarGraph data={reviewAggregate} />
    </>
  );
};

export default BusinessCard;
