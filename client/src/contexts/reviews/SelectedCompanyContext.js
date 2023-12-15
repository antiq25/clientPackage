// src/contexts/SelectedCompanyContext.js
import React, { createContext, useState, useContext } from 'react';

const SelectedCompanyContext = createContext({
  selectedCompanyId: null,
  setSelectedCompanyId: () => {}
});

export const useSelectedCompany = () => useContext(SelectedCompanyContext);

export const SelectedCompanyProvider = ({ children }) => {
  const [selectedCompanyId, setSelectedCompanyId] = useState(null);

  return (
    <SelectedCompanyContext.Provider value={{ selectedCompanyId, setSelectedCompanyId }}>
      {children}
    </SelectedCompanyContext.Provider>
  );
};
