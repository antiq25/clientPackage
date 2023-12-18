import React, { createContext, useContext, useState, useEffect } from 'react';
import { useApi } from 'src/api/providers/ApiProvider';
import { useAuth } from 'src/hooks/use-auth';

export const WidgetDataContext = createContext();

export const useWidgetData = () => useContext(WidgetDataContext);

export const WidgetDataProvider = ({ children }) => {
  const { crawl } = useApi();
  const { user } = useAuth();
  const [widgetData, setWidgetData] = useState([]);

  useEffect(() => {
    const getWidgetData = async () => {
      const userId = user;
      const response = await crawl.userWidgets(userId);
      const widgets = {
        widgetName: response.data.businessName,
        widgetDescription: response.data.description,
        widgetClicks: response.data.clickCount,
      };
      setWidgetData(widgets);
    };
    getWidgetData();
  }, [crawl, user]);

  if (!widgetData) return null;

  return (
    <WidgetDataContext.Provider value={widgetData}>
      {children}
    </WidgetDataContext.Provider>
  );
};

export default WidgetDataProvider;
