import React, { useState } from 'react';
import { Button, TextField, Alert, Container, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import RatingsGraph from './ratings';
import { useTheme } from '@mui/material/styles'


const ReviewsFetcher = ({ apiHandler }) => {
  const [reviews, setReviews] = useState([]);
  const theme = useTheme();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Added missing state variable
  
    const collectReviews = () => {
      setIsLoading(true);
      fetch('http://localhost:3002/collect-reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          companyNames: ['Company A', 'Company B'],
          companyLocations: ['Location A', 'Location B'],
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          setReviews(data);
        })
        .catch((error) => {
          setError(error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    };

  const importReviews = () => {
    fetch('http://localhost:3002/import-reviews', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setReviews(data);
      })
      .catch((error) => {
        setError(error);
      });
  };

  const getReviews = () => {
    fetch('http://localhost:3002/reviews')
      .then((response) => response.json())
      .then((data) => {
        setReviews(data);
      })
      .catch((error) => {
        setError(error);
      });
  };

  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 25;

  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  
  const currentReviews = Array.isArray(reviews)
  ? reviews.slice(indexOfFirstReview, indexOfLastReview)
  : [];
  const gridHeight = Math.max(400, 52 * (currentReviews.length + 1)); // 52px per row + header row
  
  return (
    <>
      <div>
        <Button onClick={importReviews}>Import Reviews</Button>
        <Button onClick={getReviews}>Get Reviews</Button>

        {error && <Alert severity="error">{error.message}</Alert>}

        <RatingsGraph reviews={reviews} />
      </div>
      <div>
        <Typography
          variant="h4"
          gutterBottom
        >
          Reviews
        </Typography>
        <div
          style={{
            height: `${gridHeight}px`,
            width: '100%',
            maxWidth: '100%',
            boxShadow: theme.shadows[3], // Shadow for depth
            borderRadius: theme.shape.borderRadius, // Consistent border radius
          }}
        >
          <DataGrid
            rows={currentReviews}
            columns={[
              { field: 'review_id', headerName: 'ID', width: 150 },
              { field: 'reviewer_name', headerName: 'Name', width: 200 },
              { field: 'rating', headerName: 'Rating', width: 120 },
              { field: 'review_text', headerName: 'Review Text', width: 300 },
              { field: 'published_at', headerName: 'Published', width: 180 },
            ]}
            getRowId={(row) => row.review_id}
            autoHeight={false}
            pageSize={reviewsPerPage}
            rowCount={reviews.length}
            paginationMode="server"
            onPageChange={(params) => {
              setCurrentPage(params.page);
            }}
          />
        </div>
      </div>
    </>
  );
};

export default ReviewsFetcher;
