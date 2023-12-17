import React, { useEffect } from 'react';
import axios from 'axios';

const WidgetTracker = ({ userId, businessId }) => {
  useEffect(() => {
    // Log a view when the widget is rendered
    const logView = async () => {
      try {
        await axios.post('https://database.aliveai.net/scrape/log-view', { userId, businessId });
        // Handle successful logging here, if needed
      } catch (error) {
        console.error('Error logging view:', error);
      }
    };

    logView();
  }, [userId, businessId]);

  const handleClick = async () => {
    try {
      await axios.post('https://database.aliveai.net/scrape/log-click', { userId, businessId });
      // Handle successful click logging here, if needed
    } catch (error) {
      console.error('Error logging click:', error);
    }
  };

  // Render the widget with the business ID and a button to track clicks
  return (
    <div>
      <div>Business ID: {businessId}</div>
      <button onClick={handleClick}>Click Me</button>
    </div>
  );
};

export default WidgetTracker;
