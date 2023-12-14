import React, { useState, useEffect } from 'react';

const Widget = ({ widgetId }) => {
  const [widgetData, setWidgetData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch widget data from the server
  useEffect(() => {
    const fetchWidgetData = async () => {
      try {
        const response = await fetch(`http://localhost:3002/public-widgets/${widgetId}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setWidgetData(data);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    if (widgetId) {
      fetchWidgetData();
    }
  }, [widgetId]);

  // Render loading, error, or the widget
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!widgetData) return <div>No widget data available.</div>;

  // Assuming 'settings' and 'htmlContent' are properties of the widget data returned by your API
  return (
    <div
      id={`widget_${widgetId}`}
      style={{ border: '1px solid #000', padding: '10px', width: '300px' }}
    >
      <div dangerouslySetInnerHTML={{ __html: widgetData.settings.htmlContent }} />
      <button onClick={() => (window.location.href = 'https://the-target-website.com')}>
        Visit Website
      </button>
    </div>
  );
};

export default Widget;
