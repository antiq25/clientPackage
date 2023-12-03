import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

// Create a context for the API
const ApiContext = createContext();

// Base URLs
const baseURL = 'https://smart.aliveai.net/api/v1/pixel';
const SatURL = 'http://localhost:3002/scrape';

// Provider component that wraps your app and makes an API object available to any child component that calls `useApi()`.
export const ApiProvider = ({ children }) => {
  // You can include state here if you want to keep track of data globally

  // Log a view activity
  const logView = async () => {
    try {
      const response = await axios.post(`${baseURL}/log-view`);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  // Log a click activity
  const logClick = async () => {
    try {
      const response = await axios.post(`${baseURL}/log-click`);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  // Get the view count
  const getViewCount = async () => {
    try {
      const response = await axios.get(`${baseURL}/view-count`);
      return response.data.viewCount;
    } catch (error) {
      console.error(error);
    }
  };

  // Get the click count
  const getClickCount = async () => {
    try {
      const response = await axios.get(`${baseURL}/click-count`);
      return response.data.clickCount;
    } catch (error) {
      console.error(error);
    }
  };

  // Fetch business names
  const businessNames = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get(`${SatURL}/business-names`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch business names');
    }
  };

  // Fetch reviews
  const fetchReviews = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token found');
    }
    try {
      const response = await axios.get(`${SatURL}/reviews`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.status !== 200) {
        throw new Error('Failed to fetch reviews');
      }
      return response.data;
    } catch (err) {
      console.error(err);
      throw new Error('An error occurred while fetching the reviews');
    }
  };

  // The value provided to the context consumers
  const api = {
    logView,
    logClick,
    getViewCount,
    getClickCount,
    businessNames,
    fetchReviews
  };

  return <ApiContext.Provider value={api}>{children}</ApiContext.Provider>;
};

// Hook to use the API context
export const useApi = () => {
  const context = useContext(ApiContext);
  if (context === undefined) {
    throw new Error('useApi must be used within an ApiProvider');
  }
  return context;
};
