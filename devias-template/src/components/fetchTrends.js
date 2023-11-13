'use client';
import React, { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { TextField, Button, Box, Typography } from '@mui/material';
import axios from 'axios';
import { authAPI } from '../api/bundle';

const Trends = () => {
  const [trends, setTrends] = useState([]);
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await authAPI.fetchGoogleTrends(query);

      if (response.success) {
        const formattedTrends = response.data.interest_over_time.timeline_data.map((item) => ({
          date: item.date,
          value: item.values[0].extracted_value,
        }));
        setTrends(formattedTrends);
      } else {
        throw new Error(response.error);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography
        variant="h4"
        gutterBottom
      >
        Google Trends Data
      </Typography>
      <Box
        component="form"
        onSubmit={handleSearch}
        noValidate
        autoComplete="off"
        sx={{ mb: 2 }}
      >
        <TextField
          label="Search Query"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          disabled={isLoading}
          sx={{ mr: 1, width: 'auto' }}
        />
        <Button
          variant="contained"
          type="submit"
          disabled={isLoading || !query}
        >
          {isLoading ? 'Loading...' : 'Search'}
        </Button>
      </Box>

      {error && (
        <Typography
          color="error"
          gutterBottom
        >
          Error: {error}
        </Typography>
      )}

      {!isLoading && trends.length > 0 && (
        <ResponsiveContainer
          width="100%"
          height={400}
        >
          <LineChart data={trends}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </Box>
  );
};

export default Trends;
