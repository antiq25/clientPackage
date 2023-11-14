import React, { useState, useEffect, useMemo } from 'react';
import { Typography, Tooltip, Card, CardHeader } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const mockReviews = {
  L1: [
    { id: 1, text: 'Great place!', rating: 5 },
    { id: 2, text: 'Average experience', rating: 3 },
  ],
  // ... add mock reviews for other listings based on their IDs
};

const ReviewSelector = ({ listingId, onSelect }) => {
  const specificReviews = mockReviews[listingId]; // Extract to a separate variable
  const reviews = useMemo(() => specificReviews || [], [specificReviews, listingId]);
  const [selectedReview, setSelectedReview] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Loading state added

  useEffect(() => {
    setTimeout(() => {
      if (reviews.length > 0) {
        setSelectedReview(reviews[0].id);
        onSelect(reviews[0]);
      }
      setIsLoading(false);
    }, 1000);
  }, [listingId, onSelect, reviews]);

  const handleSelect = (reviewId) => {
    const review = reviews.find((r) => r.id === reviewId);
    setSelectedReview(reviewId);
    onSelect(review);
  };

  const rows = reviews.map((review) => ({
    id: review.id,
    reviewText: review.text,
    stars: '⭐'.repeat(review.rating),
  }));

  const columns = [
    {
      field: 'userPic',
      headerName: 'User',
      width: 100,
      renderCell: (params) =>
        params.value ? (
          <img
            src={params.value}
            alt="User"
            style={{ height: 40, width: 40, borderRadius: '50%' }}
          />
        ) : (
          <AccountCircleIcon style={{ fontSize: 40 }} />
        ),
      disableClickEventBubbling: true,
    },
    { field: 'stars', headerName: 'Rating', flex: 1 },
    {
      field: 'reviewText',
      headerName: 'Review',
      flex: 3,
      renderCell: (params) => (
        <Tooltip title={params.value}>
          <Typography
            style={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              width: '80%',
            }}
          >
            {params.value}
          </Typography>
        </Tooltip>
      ),
    },
  ];

  return (
    <Card sx={{ height: 390 }}>
      <CardHeader
        title="Reviews Table"
        subheader="Select a Review to preview"
      />
      {isLoading ? (
        <div
          style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 300 }}
        >
          Loading...
        </div>
      ) : reviews.length > 0 ? (
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[15, 30, 100]}
          pagination
          disableColumnMenu
          onRowClick={(rowParams) => handleSelect(rowParams.id)}
          selectionModel={[selectedReview]}
          sx={{ paddingLeft: '16px', paddingRight: '16px', height: 500, width: '100%', border: 0 }}
        />
      ) : (
        <Typography variant="body1" color="textPrimary" sx={{ padding: '0px 25px 25px 25px' }}>No businesses found</Typography>
      )}
    </Card>
  );
};

export default ReviewSelector;
