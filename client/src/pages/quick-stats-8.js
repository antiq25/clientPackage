import * as React from 'react';
import { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import { BarChart } from '@mui/x-charts';

export default function BiaxialLineChart() {
  const [clickCount, setConversions] = useState(0);
  const [viewCount, setViewCounts] = useState(0);
  const xLabels = ['Clicks', 'Views'];

  useEffect(() => {
    fetch('https://smart.aliveai.net/api/v1/pixel/log-view', { method: 'POST' })
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log('error', error));

    fetch('https://smart.aliveai.net/api/v1/pixel/get-counts')
      .then((response) => response.json())
      .then((data) => {
        setViewCounts(data.viewCount);
        setConversions(data.clickCount);
      })
      .catch((error) => console.error('Error fetching counts:', error));
  }, []);

  const handleConversionClick = () => {
    setConversions((prev) => prev + 1);
    fetch('https://smart.aliveai.net/api/v1/pixel/log-click', { method: 'POST' })
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log('error', error));
  };

  return (
    <>
      <Button
        variant="contained"
        onClick={handleConversionClick}
      >
        Log Conversion
      </Button>
      <BarChart
        width={500}
        height={300}
        
        series={[{ data: [clickCount, viewCount], label: 'Counts', type: 'bar' }]}
        xAxis={[{ scaleType: 'band', data: xLabels }]}
      >
        
</BarChart>
    </>
  );
}
