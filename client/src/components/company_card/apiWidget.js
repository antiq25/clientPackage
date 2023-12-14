import React, { createContext, useContext } from 'react';
import axios from 'axios';

const ApiContext = createContext();
const baseURL = 'http://localhost:3002/scrape';

export const ApiProvider = ({ children }) => {
  const api = {
    async logView() {
      try {
        const response = await axios.post(`${baseURL}/log-view`);
        return response.data;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },

    async logClick() {
      try {
        const response = await axios.post(`${baseURL}/log-click`);
        return response.data;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },

    async getViewCount() {
      try {
        const response = await axios.get(`${baseURL}/view-count`);
        return response.data.viewCount;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },

    async getClickCount() {
      try {
        const response = await axios.get(`${baseURL}/click-count`);
        return response.data.clickCount;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },

    async businessNames() {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }
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
        throw error;
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
        return response.data;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },

    async fetchUserWidget(userId) {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }
      try {
        const response = await axios.get(`${baseURL}/user-widgets`, {
          params: { userId },
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        return response.data;
      } catch (error) {
        console.error(error);
        throw new Error(`Failed to fetch widgets for userId ${userId}: ${error.message}`);
      }
    }
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
