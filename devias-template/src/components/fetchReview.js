import React, { useState } from 'react';
import { Button, TextField, Alert, Container, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

const ReviewsFetcher = ({ apiHandler }) => {
  const [listingId, setListingId] = useState('');
  const [maxReviews, setMaxReviews] = useState('');
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // const fetchReviews = async () => {
  //   setIsLoading(true);
  //   try {
  //     const response = await apiHandler.fetchReviews(Number(listingId), Number(maxReviews));
  //     if (response.success) {
  //       setReviews(response.data);
  //       setError('');
  //     } else {
  //       setError(response.error);
  //     }
  //   } catch (error) {
  //     setError('An error occurred.');
  //     console.error(error);
  //   }
  //   setIsLoading(false);
  // };

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   fetchReviews();
  // };

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'review', headerName: 'Review', width: 130 },
    // Add other columns based on the structure of the review data
  ];

  return (
    <Container maxWidth="sm">
      <Typography
        variant="h4"
        gutterBottom
      >
        Fetch Reviews
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Listing ID"
          variant="outlined"
          fullWidth
          margin="normal"
          value={listingId}
          onChange={(e) => setListingId(e.target.value)}
        />
        <TextField
          label="Max Reviews"
          variant="outlined"
          fullWidth
          margin="normal"
          value={maxReviews}
          onChange={(e) => setMaxReviews(e.target.value)}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={isLoading}
        >
          Fetch Reviews
        </Button>
      </form>
      {error && <Alert severity="error">{error}</Alert>}
      <div style={{ height: 400, width: '100%', marginTop: 20 }}>
        <DataGrid
          rows={reviews}
          columns={columns}
          pageSize={5}
          checkboxSelection
          disableSelectionOnClick
        />
      </div>
    </Container>
  );
};

export default ReviewsFetcher;
