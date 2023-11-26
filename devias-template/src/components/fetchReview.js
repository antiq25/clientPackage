import React, { useState, useEffect } from 'react';
import { Button, Typography, Alert } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

const ReviewsFetcher = () => {
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const fetchReviews = () => {
    setIsLoading(true);
    const token = localStorage.getItem('token'); // Retrieve the token from local storage

    fetch('http://localhost:3002/scrape/reviews', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`, // Include the token in the Authorization header
      },
      credentials: 'include', // Needed for CORS requests with credentials
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch reviews');
        }
        return response.json();
      })
      .then((data) => {
        const transformedReviews = data.map((detailedReview, index) => ({
          id: `review-${index}`, // Unique ID for the DataGrid
          name: detailedReview.business.name,
          reviewCount: detailedReview.business.reviewCount,
          isSpendingOnAds: detailedReview.business.isSpendingOnAds,
          averageRating: detailedReview.business.averageRating,
          reviewerName: detailedReview.reviewerName,
          reviewText: detailedReview.reviewText,
          publishedAt: new Date(detailedReview.publishedAt).toISOString(),
          rating: detailedReview.rating,
        }));

        setReviews(transformedReviews);
      })
      .catch((err) => {
        setError(err.message || 'Failed to load reviews');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const importReviews = () => {
    setIsLoading(true);
    const token = localStorage.getItem('token');

    fetch('http://localhost:3002/scrape/import-reviews', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setReviews(data))
      .catch((error) => setError(error))
      .finally(() => setIsLoading(false));
  };

  const columns = [
    { field: 'name', headerName: 'Business Name', width: 200 },
    { field: 'reviewerName', headerName: 'Reviewer Name', width: 200 },
    { field: 'reviewText', headerName: 'Review Text', width: 300 },
    { field: 'publishedAt', headerName: 'Published At', width: 180 },
    { field: 'rating', headerName: 'Rating', width: 120 },
    { field: 'reviewCount', headerName: 'Review Count', width: 120 },
    { field: 'averageRating', headerName: 'Average Rating', width: 120 },
    { field: 'isSpendingOnAds', headerName: 'Spending on Ads', width: 120 },
  ];

  return (
    <div>
      <Button
        onClick={importReviews}
        disabled={isLoading}
      >
        Fetch Reviews
      </Button>
      <Button
        onClick={fetchReviews}
        disabled={isLoading}
      >
        Fetch Reviews
      </Button>
      {error && <Alert severity="error">{error}</Alert>}
      <Typography
        variant="h4"
        gutterBottom
      >
        Reviews
      </Typography>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={reviews}
          columns={columns}
          pageSize={5}
          checkboxSelection
          disableSelectionOnClick
        />
      </div>
    </div>
  );
};

export default ReviewsFetcher;
