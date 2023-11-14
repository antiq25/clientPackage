'use client';
import React, { useState } from 'react';
import { TextField, Button, Card, CardContent, Typography, List, ListItem } from '@mui/material';
import { apiHandler, handleCreateListing } from './bundle';
import useUser from '../hooks/decode';
import CardHeader from '@mui/material/CardHeader';
import { debounce } from 'lodash'; // Import debounce

const ListingManager = () => {
  const [newListingName, setNewListingName] = useState('');
  const [newListingDescription, setNewListingDescription] = useState('');
  const [newListingReviewsUrl, setNewListingReviewsUrl] = useState('');
  const [userId, setUserId] = useState('');
  const [listingName, setListingName] = useState('');
  const [listingId, setListingId] = useState('');
  const [url, setUrl] = useState(''); // [TODO] - Remove this from the UI and the API 
  const [maxReviews, setMaxReviews] = useState(10);
  const [createdListing, setCreatedListing] = useState(null);
  const [fetchedListing, setFetchedListing] = useState(null);
  const [reviews, setReviews] = useState([]);

  const SMSCreateListing = async () => {
    const response = await apiHandler.handleCreateListing(url, user.id, listingName, description);
    
    setCreatedListing(response);
  };

  const SMShandleGetListing = async () => {
    const response = await apiHandler.getListing(userId, listingName);
    setFetchedListing(response);
  };

  const SMShandleFetchReviews = async () => {
    const response = await apiHandler.fetchReviews(listingId, maxReviews);
    setReviews(response);
  };

  return (
    <div>
      <Card>
        <CardContent>
          <Typography variant="h5">Create New Listing</Typography>
          <TextField
            label="User ID"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Listing Name"
            value={newListingName}
            onChange={(e) => setNewListingName(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Reviews URL"
            value={newListingReviewsUrl}
            onChange={(e) => setNewListingReviewsUrl(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Description"
            value={newListingDescription}
            onChange={(e) => setNewListingDescription(e.target.value)}
            fullWidth
            margin="normal"
          />
          <Button
            variant="contained"
            color="primary"
            onClick={SMSCreateListing}
          >
            Create Listing
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography variant="h5">Get Listing</Typography>
          <TextField
            label="User ID"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Listing Name"
            value={listingName}
            onChange={(e) => setListingName(e.target.value)}
            fullWidth
            margin="normal"
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleGetListing}
          >
            Get Listing
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography variant="h5">Fetch Reviews</Typography>
          <TextField
            label="Listing ID"
            value={listingId}
            onChange={(e) => setListingId(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Max Reviews"
            type="number"
            value={maxReviews}
            onChange={(e) => setMaxReviews(e.target.value)}
            fullWidth
            margin="normal"
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleFetchReviews}
          >
            Fetch Reviews
          </Button>
        </CardContent>
      </Card>

      {createdListing && <Typography>Listing Created: {JSON.stringify(createdListing)}</Typography>}
      {fetchedListing && <Typography>Fetched Listing: {JSON.stringify(fetchedListing)}</Typography>}
      {reviews.length > 0 && (
        <List>
          {reviews.map((review, index) => (
            <ListItem key={index}>{JSON.stringify(review)}</ListItem>
          ))}
        </List>
      )}
    </div>
  );
};

export default ListingManager;
