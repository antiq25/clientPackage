import React, { createContext, useContext } from 'react';

import { smsAPI, crawlClient, crawl, crawler, apiHandler } from 'src/api/bundle';

const ApiContext = createContext(null);

export const ApiProvider = ({ children }) => {
  const apiProviderValue = {
    smsAPI,
    crawlClient,
    crawl,
    crawler,
    apiHandler,
  };

  return <ApiContext.Provider value={apiProviderValue}>{children}</ApiContext.Provider>;
};

export const useApi = () => {
  const context = useContext(ApiContext);
  if (!context) {
    throw new Error('useApi must be used within an ApiProvider');
  }
  return context;
};
