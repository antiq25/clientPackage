import React, { createContext, useContext } from 'react';
import axios from 'axios';

const ApiContext = createContext();

const baseURL = 'http://localhost:3002/scrape';
const SatURL = 'https://smart.aliveai.net/scrape';

export const ApiProvider = ({ children }) => {
  const api = {
    async logView() {
      try {
        const response = await axios.post(`${baseURL}/log-view`);
        return response.data;
      } catch (error) {
        console.error(error);
      }
    },

    async logClick() {
      try {
        const response = await axios.post(`${baseURL}/log-click`);
        return response.data;
      } catch (error) {
        console.error(error);
      }
    },

    async getViewCount() {
      try {
        const response = await axios.get(`${baseURL}/view-count`);
        return response.data.viewCount;
      } catch (error) {
        console.error(error);
      }
    },

    async getClickCount() {
      try {
        const response = await axios.get(`${baseURL}/click-count`);
        return response.data.clickCount.data;
      } catch (error) {
        console.error(error);
      }
    },

    async businessNames() {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get(`${baseURL}/business-names`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        return response.data;
      } catch (error) {
        console.error(error);
        throw new Error('Failed to fetch business names');
      }
    },

    async fetchReviews() {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }
      try {
        const response = await axios.get(`${baseURL}/reviews`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status !== 200) {
          throw new Error('Failed to fetch reviews');
        }
        return response.data;
      } catch (error) {
        console.error(error);
        throw new Error('An error occurred while fetching the reviews');
      }
    },
  };

  return <ApiContext.Provider value={api}>{children}</ApiContext.Provider>;
};

export const useApi = () => {
  const context = useContext(ApiContext);
  if (context === undefined) {
    throw new Error('useApi must be used within an ApiProvider');
  }
  return context;
};
