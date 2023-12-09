import React, { createContext, useContext } from 'react';

// Import all the necessary handlers and utilities from your API module
import { apiWrap, crawl, authAPI as smsAPI, apiClient as apiConfig, crawlClient, crawler } from 'src/api/bundle'; // Adjust the path to the actual location of your API module

// Create a context for the API
const ApiContext = createContext(null);

// Create a provider component
export const ApiProvider = ({ children }) => {
  // The value that will be provided to the context consumers
  const apiProviderValue = {
    smsAPI,
    apiConfig,
    apiWrap,
    crawlClient,
    crawl,
    crawler,

  };

  return <ApiContext.Provider value={apiProviderValue}>{children}</ApiContext.Provider>;
};

// Create a custom hook to use the API context
export const useApi = () => {
  const context = useContext(ApiContext);
  if (!context) {
    throw new Error('useApi must be used within an ApiProvider');
  }
  return context;
};
