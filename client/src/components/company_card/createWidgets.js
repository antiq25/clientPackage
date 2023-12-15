// Import necessary React hooks.
import React, { useState, useEffect } from 'react';

// Import Material UI components.
import { Box, Paper, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

// Import custom components.
import WidgetCreateForm from 'src/components/company_card/widgetForm';
import { ApiProvider } from './apiWidget';

// Define the WidgetCreator component.
const WidgetCreator = () => {
  // Define necessary states.
  const [businesses, setBusinesses] = useState([]); // Stores a list of businesses fetched from API.
  const [selectedBusinessId, setSelectedBusinessId] = useState(''); // Stores id of selected business.
  const [isLoading, setIsLoading] = useState(false); // Indicates if the data is currently being fetched from API.
  const [error, setError] = useState(''); // Stores any error message during API fetch operation.

  // Use effect to fetch businesses when the component gets mounted.
  useEffect(() => {
    fetchBusinesses();
  }, []);

  // Define fetchBusinesses method to Call API and retrieve business list.
  const fetchBusinesses = async () => {
    setIsLoading(true);
    setError('');
    try {
      const response = await fetch('https://smart.aliveai.net/scrape/business-names', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        credentials: 'include',
      });
      if (!response.ok) {
        throw new Error('Failed to fetch businesses');
      }
      const data = await response.json();
      setBusinesses(data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Define handleSelectChange method to update selectedBusinessId state when a business is selected from dropdown.
  const handleSelectChange = (event) => {
    setSelectedBusinessId(event.target.value);
  };

  // Return function to render the component UI.
  return (
    <ApiProvider>
      <Box sx={{ flexGrow: 1, p: 2 }}>
        <Paper
          elevation={3}
          sx={{ p: 3, borderRadius: 3, bgcolor: 'background.paper' }}
        >
          <FormControl
            fullWidth
            margin="normal"
            variant="outlined"
            sx={{ mt: 3 }}
          >
            <InputLabel id="business-select-label">Select a Business</InputLabel>
            <Select
              labelId="business-select-label"
              value={selectedBusinessId}
              onChange={handleSelectChange}
              label="Select a Business"
            >
              {businesses.map((business) => (
                <MenuItem
                  key={business.id}
                  value={business.id}
                >
                  {`${business.name} - ${business.address}`}
                </MenuItem>
              ))}
            </Select>
            {selectedBusinessId && <WidgetCreateForm selectedBusinessId={selectedBusinessId} />}
          </FormControl>
        </Paper>
      </Box>
    </ApiProvider>
  );
};

export default WidgetCreator;
