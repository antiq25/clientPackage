import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';

import WidgetForm from 'src/components/widgetForm';


const WidgetCreator = () => {
  const [businesses, setBusinesses] = useState([]);
  const [selectedBusinessId, setSelectedBusinessId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchBusinesses();
  }, []);

  const fetchBusinesses = async () => {
    setIsLoading(true);
    setError('');
    try {
      const response = await fetch('http://localhost:3002/scrape/business-names', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
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

  const handleSelectChange = (event) => {
    setSelectedBusinessId(event.target.value);
  };

  return (
    <Box sx={{ flexGrow: 1, p: 2 }}>
      <Paper elevation={3} sx={{ p: 3, borderRadius: 3, bgcolor: 'background.paper' }}>
        <FormControl fullWidth margin="normal" variant="outlined" sx={{ mt: 3 }}>
          <InputLabel id="business-select-label">Select a Business</InputLabel>
          <Select
            labelId="business-select-label"
            value={selectedBusinessId}
            onChange={handleSelectChange}
            label="Select a Business"
          >
            {businesses.map((business) => (
              <MenuItem key={business.id} value={business.id}>
                {`${business.name} - ${business.address}`}
              </MenuItem>
            ))}
          </Select>
          {selectedBusinessId && (
        <WidgetForm selectedBusinessId={selectedBusinessId} />
      )}
        </FormControl>
      </Paper>
    </Box>
  );
};

export default WidgetCreator;
