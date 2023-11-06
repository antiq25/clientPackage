import React, { FC, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ApexCharts from 'apexcharts';
import InfoCircleIcon from '@untitled-ui/icons-react/build/esm/InfoCircle';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Tooltip from '@mui/material/Tooltip';
import { useTheme } from '@mui/material/styles';

import { dashboardAPI } from '../api/bundle';

interface AnalyticsGraphProps {
  data: number[];
  labels: string[];
}

export const AnalyticsGraph: FC<AnalyticsGraphProps> = (props) => {
  const { data, labels } = props;
  const theme = useTheme();

  useEffect(() => {
    const chartOptions = {
      chart: {
        type: 'bar',
        background: 'transparent',
        toolbar: {
          show: false,
        },
      },
      colors: [theme.palette.primary.main],
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '55%',
          endingShape: 'rounded',
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent'],
      },
      xaxis: {
        categories: labels,
      },
      yaxis: {
        title: {
          text: 'Count',
        },
      },
      fill: {
        opacity: 1,
      },
      tooltip: {
        y: {
          formatter: (val: number) => val.toFixed(0),
        },
      },
    };

    const chartSeries = [
      {
        name: 'Count',
        data: data,
      },
    ];

    const chartOptionsWithSeries = {
      ...chartOptions,
      series: chartSeries,
    };

    const chart = new ApexCharts(document.getElementById('chart'), chartOptionsWithSeries);
    chart.render();

    return () => {
      chart.destroy();
    };
  }, [data, labels, theme]);

  return (
    <Card>
      <CardHeader
        title="Analytics Graph"
        action={
          <Tooltip title="Refresh rate is 24h">
            <InfoCircleIcon color="action" />
          </Tooltip>
        }
      />
      <CardContent>
        <div id="chart"
style={{ height: '300px' }} />
      </CardContent>
    </Card>
  );
};

AnalyticsGraph.propTypes = {
  data: PropTypes.array.isRequired,
  labels: PropTypes.array.isRequired,
};