import React, { useEffect, useState } from 'react';
import { Button, useTheme } from '@mui/material';
import { ChartContainer, BarPlot, Legend, Axis, Title } from '@mui/x-charts';
import { getCounts, logClick } from './company_card/apiWidget';

export default function UserInteractionChart() {
  const [clickCount, setClickCount] = useState(0);
  const [viewCount, setViewCount] = useState(0);

  const theme = useTheme(); // You're not using theme anywhere, consider removing if not used

  useEffect(() => {
    let isMounted = true;
    (async () => {
      const data = await getCounts();
      if (isMounted && data) {
        setClickCount(data.clickCount);
        setViewCount(data.viewCount);
      }
    })();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleLogClick = async () => {
    setClickCount((prev) => prev + 1);
    await logClick();
  };

  const xLabels = ['Clicks', 'Views'];
  const yValues = [clickCount, viewCount];
  const chartData = xLabels.map((label, index) => ({
    label,
    value: yValues[index],
  }));

  return (
    <>
      <Button
        variant="contained"
        onClick={handleLogClick}
      >
        Add View (Click Tracker)
      </Button>
      <ChartContainer
        xLabels=""
        width={600}
        height={400}
      >
        <Title text="User Interactions" />
        <BarPlot
          data={chartData}
          x={(d) => d.label}
          y={(d) => d.value}
        />
        <Axis
          position="bottom"
          scaleType="band"
        />
        <Axis position="left" />
        <Legend position="top-right" />
      </ChartContainer>
    </>
  );
}
