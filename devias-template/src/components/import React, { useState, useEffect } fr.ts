import React, { useState, useEffect } from 'react';
import { AnalyticsTrafficSources } from '../components/analytics'; // Adjust import path as needed
import { apiCall } from 'src/api'; // Adjust the import path as necessary

const TrafficSourcesContainer = () => {
  const [trafficData, setTrafficData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrafficSources = async () => {
      try {
        setLoading(true);
        const response = await apiCall.fetchTrafficSources(); // Assuming this function exists
        setTrafficData(response.data); // Adjust according to the actual data structure
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchTrafficSources();
  }, []);

  if (loading) return <p>Loading traffic sources...</p>;
  if (error) return <p>Error fetching traffic sources: {error}</p>;

  // Assuming the API returns data in the format needed for the chart
  const chartSeries = trafficData.map(source => ({
    name: source.name,
    data: source.data,
  }));

  return (
    <AnalyticsTrafficSources chartSeries={chartSeries} />
  );
};

export default TrafficSourcesContainer;
