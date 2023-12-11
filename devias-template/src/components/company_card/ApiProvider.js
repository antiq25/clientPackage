import React, { createContext, useContext } from 'react';

import {  smsAPI,
    crawlClient,
    crawl,
    crawler,
    apiHandler,
  } from 'src/api/bundle';   

// Import all the necessary handlers and utilities from your API module

// Create a context for the API
const ApiContext = createContext(null);

// Create a provider component
export const ApiProvider = ({ children }) => {
  // The value that will be provided to the context consumers
 
  const apiProviderValue = {
    smsAPI,
    crawlClient,
    crawl,
    crawler,
    apiHandler,


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
