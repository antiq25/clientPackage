
import { dashboardAPI } from '../api/bundle';
import React, { FC, useEffect, useState } from 'react';
import { AnalyticsGraph } from '../components/graphs';

export const YourComponent: FC = () => {
  const [data, setData] = useState<number[]>([]);
  const [labels, setLabels] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await dashboardAPI.fetchReviews('listingId', 'max_reviews');
        const responseData = response.data;

        // Extract the necessary data from the response
        const chartData: number[] = responseData.chartData;
        const chartLabels: string[] = responseData.chartLabels;

        // Update the state with the fetched data
        setData(chartData);
        setLabels(chartLabels);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <AnalyticsGraph data={data}
labels={labels} />
  );
};

