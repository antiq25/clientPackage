import * as React from 'react';
import { useState, useEffect } from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import axios from 'axios';

const baseURL = 'http://localhost:3000/api/v1/pixel';

const getChartData = async () => {
  try {
    const viewResponse = await axios.get(`${baseURL}/view-count`);
    const clickResponse = await axios.get(`${baseURL}/click-count`);

    // Transforming the data into an array format
    return {
      viewData: [viewResponse.data.viewCount],
      clickData: [clickResponse.data.clickCount],
    };
  } catch (error) {
    console.error('API Error:', error);
    return { viewData: [], clickData: [] };
  }
};

export default function BiaxialLineChart() {
  const [viewData, setViewData] = useState([]);
  const [clickData, setClickData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getChartData();
      setViewData(data.viewData);
      setClickData(data.clickData);
    };

    fetchData();
  }, []);

  if (!viewData.length || !clickData.length) {
    return <div>Loading...</div>;
  }

  return (
    <LineChart
      width={500}
      height={300}
      series={[
        { data: clickData, label: 'Clicks', id: 'clicksId' },
        { data: viewData, label: 'Views', id: 'viewsId' },
      ]}
      xAxis={[{ scaleType: 'point', data: xLabels }]}
      sx={{
        '.MuiLineElement-root, .MuiMarkElement-root': {
          strokeWidth: 1,
        },
        '.MuiLineElement-series-clicksId': {
          strokeDasharray: '5 5',
        },
        '.MuiLineElement-series-viewsId': {
          strokeDasharray: '3 4 5 2',
        },
        '.MuiMarkElement-root:not(.MuiMarkElement-highlighted)': {
          fill: '#fff',
        },
        '& .MuiMarkElement-highlighted': {
          stroke: 'none',
        },
      }}
    />
  );
}
