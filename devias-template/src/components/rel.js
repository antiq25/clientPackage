import React, { useState } from 'react';
import { Button, TextField, Box } from '@mui/material';
import axios from 'axios';

const ReviewForm = () => {
  const [companyNames, setCompanyNames] = useState('');
  const [companyLocations, setCompanyLocations] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:3002/scrape/collect-reviews', {
        companyNames: companyNames.split(','),
        companyLocations: companyLocations.split(','),
      });
      console.log(response.data);
      // Handle response data here
    } catch (error) {
      console.error(error);
      // Handle error here
    }
  };

  return (
    <Box component="form"
onSubmit={handleSubmit}
noValidate
sx={{ mt: 1 }}>
      <TextField
        margin="normal"
        required
        fullWidth
        label="Company Names (comma-separated)"
        autoFocus
        value={companyNames}
        onChange={(e) => setCompanyNames(e.target.value)}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        label="Company Locations (comma-separated)"
        value={companyLocations}
        onChange={(e) => setCompanyLocations(e.target.value)}
      />
      <Button type="submit"
fullWidth
variant="contained"
sx={{ mt: 3, mb: 2 }}>
        Scrape Reviews
      </Button>
    </Box>
  );
};

export default ReviewForm;
