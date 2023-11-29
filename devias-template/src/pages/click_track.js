import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import SvgIcon from '@mui/material/SvgIcon';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/system';
import RefreshCcw02Icon from '@untitled-ui/icons-react/build/esm/RefreshCcw02';

// Dynamically import the Chart component with SSR disabled
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const QuickStats8 = () => {
  const theme = useTheme();
  const chartOptions = {
    chart: {
      background: 'transparent',
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },
    colors: [theme.palette.primary.main],
    dataLabels: {
      enabled: false,
    },
    fill: {
      opacity: 1,
      type: 'solid',
    },
    grid: {
      yaxis: {
        lines: {
          show: false,
        },
      },
      xaxis: {
        lines: {
          show: false,
        },
      },
    },
    legend: {
      show: false,
    },
    stroke: {
      width: 2,
    },
    theme: {
      mode: theme.palette.mode,
    },
    xaxis: {
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        show: false,
      },
    },
    yaxis: {
      labels: {
        show: false,
      },
    },
    tooltip: {
      enabled: false,
    },
  };

  const [viewCounts, setViewCounts] = useState([]);
  const [conversions, setConversions] = useState(0);

  useEffect(() => {
    // Fetch initial data for the chart
    setViewCounts([100, 200, 300]); // Replace with actual data fetching logic
  }, []);

  const updatedChartSeries = [
    {
      name: 'Conversions',
      data: viewCounts,
    },
  ];

  // Function to handle conversion increment
  const onConversionClick = () => {
    setConversions((prev) => prev + 1);
  };

  return (
    <Box
      sx={{ backgroundColor: theme.palette.mode === 'dark' ? 'neutral.800' : 'neutral.100', p: 3 }}
    >
      <Box
        maxWidth="sm"
        sx={{ mx: 'auto' }}
      >
        <Card>
          <Stack
            alignItems="center"
            direction="row"
            spacing={2}
            sx={{ p: 3 }}
          >
            <Avatar
              sx={{ backgroundColor: 'primary.main', color: 'primary.contrastText' }}
              onClick={onConversionClick}
            >
              <SvgIcon>
                <RefreshCcw02Icon />
              </SvgIcon>
            </Avatar>
            <Box sx={{ flexGrow: 1 }}>
              <Typography
                color="text.secondary"
                noWrap
                variant="body1"
              >
                Conversions
              </Typography>
              <Typography variant="h4">{conversions}</Typography>
            </Box>
            <Box sx={{ maxWidth: 200 }}>
              {Chart && (
                <Chart
                  height={100}
                  type="line"
                  options={chartOptions}
                  series={updatedChartSeries}
                />
              )}
            </Box>
          </Stack>
        </Card>
      </Box>
    </Box>
  );
};

export default QuickStats8;
