import React, { useEffect, useState } from 'react';
import RefreshCcw02Icon from '@untitled-ui/icons-react/build/esm/RefreshCcw02';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import SvgIcon from '@mui/material/SvgIcon';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/system';

import { Chart } from 'src/src2/components/chart';

const chartSeries = [
  {
    name: 'Conversions',
    data: [],
  },
];

const useChartOptions = () => {
  const theme = useTheme();

  return {
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
};

export const QuickStats8 = () => {
  const chartOptions = useChartOptions();
  const [conversions, setConversions] = useState<number>(0);
  const [viewCounts, setViewCounts] = useState<number(0);

  useEffect(() => {
    const handleClick = () => {
      setConversions((prevCount) => prevCount + 1);
    };

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);

  useEffect(() => {
    const handleView = () => {
      setViewCounts((prevCounts) => [...prevCounts, prevCounts.length + 1]);
    };

    document.addEventListener('DOMContentLoaded', handleView);

    return () => {
      document.removeEventListener('DOMContentLoaded', handleView);
    };
  }, []);

  const updatedChartSeries = [
    {
      name: 'Conversions',
      data: viewCounts,
    },
  ];

  return (
    <Box sx={{ backgroundColor: (theme) => (theme.palette.mode === 'dark' ? 'neutral.800' : 'neutral.100'), p: 3 }}>
      <Box maxWidth="sm"
sx={{ mx: 'auto' }}>
        <Card>
          <Stack alignItems="center"
direction="row"
spacing={2}
sx={{ p: 3 }}>
            <Avatar sx={{ backgroundColor: 'primary.main', color: 'primary.contrastText' }}>
              <SvgIcon>
                <RefreshCcw02Icon />
              </SvgIcon>
            </Avatar>
            <Box sx={{ flexGrow: 1 }}>
              <Typography color="text.secondary"
noWrap
variant="body1">
                Conversions
              </Typography>
              <Typography variant="h4">{conversions}</Typography>
            </Box>
            <Box sx={{ maxWidth: 200 }}>
              <Chart height={100}
type="line"
options={chartOptions}
series={updatedChartSeries} />
            </Box>
          </Stack>
        </Card>
      </Box>
    </Box>
  );
};
