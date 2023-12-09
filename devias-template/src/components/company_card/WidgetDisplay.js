import React, { useState, useEffect } from 'react';
import axios from 'axios';
import WidgetTracker from 'src/components/WidgetTracker';

const WidgetsDisplay = ({ userId }) => {
  const [widgets, setWidgets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch the widgets for the user
    const fetchWidgets = async () => {
      try {
        const response = await axios.get(`http://localhost:3002/scrape/user-widgets?userId=${userId}`);
        setWidgets(response.data); // Assuming the response data is an array of widgets
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchWidgets();
  }, [userId]);

  if (loading) {
    return <div>Loading widgets...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      {widgets.map((widget) => (
        <div key={widget.id}>
          <WidgetTracker userId={userId}
businessId={widget.businessId} />
          {/* Render any additional widget details you want to display */}
        </div>
      ))}
    </div>
  );
};

export default WidgetsDisplay;
