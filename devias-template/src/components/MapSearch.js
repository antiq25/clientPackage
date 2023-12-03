import React, { useState } from 'react';
import axios from 'axios';
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button, Snackbar, Alert, CircularProgress, Autocomplete } from '@mui/material';

const MapSearchDialog = () => {
  const [mapSearchQuery, setMapSearchQuery] = useState('');
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Static map suggestions
  const mapSuggestions = [
    { label: 'New York', value: 'New York' },
    { label: 'Los Angeles', value: 'Los Angeles' },
    { label: 'Chicago', value: 'Chicago' },
    { label: 'Houston', value: 'Houston' },
    // Add more suggestions as needed
  ];

  const handleMapSearchChange = (event, value) => {
    setMapSearchQuery(value);
  };

  const getMapSrc = (query) => {
    return `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    setIsLoading(true);
    try {
      const response = await axios.get(`http://localhost:3002/collect-reviews`, {
        params: {
          companyName: mapSearchQuery,
          companyLocation: mapSearchQuery
        },
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      // setScrapedData(response.data); // Assuming you have a state or function to handle this
    } catch (error) {
      setError(error.response?.data?.message || 'An error occurred while fetching data!');
    } finally {
      setIsLoading(false);
    }
  };

  const getToken = () => {
    // Implement token retrieval logic here
    return localStorage.getItem('token');
  };

  return (
    <div>
      <Dialog open={open}
onClose={() => setOpen(false)}>
        <DialogTitle>Search Location on Map</DialogTitle>
        <DialogContent>
          <Autocomplete
            freeSolo
            disableClearable
            options={mapSuggestions.map((option) => option.label)}
            onInputChange={handleMapSearchChange}
            inputValue={mapSearchQuery}
            renderInput={(params) => (
              <TextField
                {...params}
                autoFocus
                margin="dense"
                label="Map Location Search"
                type="text"
                fullWidth
                variant="outlined"
                onChange={(e) => setMapSearchQuery(e.target.value)}
                InputProps={{ ...params.InputProps, type: 'search' }}
              />
            )}
          />
          <div style={{ marginTop: '16px', height: '300px' }}>
            <iframe
              title="google-map"
              src={getMapSrc(mapSearchQuery)}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              aria-label="Google Map"
            />
            {isLoading && <CircularProgress />}
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}
color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar open={error !== null}
autoHideDuration={6000}
onClose={() => setError(null)}>
        <Alert onClose={() => setError(null)}
severity="error"
sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default MapSearchDialog;
