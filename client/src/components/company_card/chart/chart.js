import React from 'react';
import { useTheme } from '@mui/material/styles';
import PropTypes from 'prop-types';
import { Chart } from 'src/components/chart';

const Chart2 = ({ series, categories }) => {

  const theme = useTheme();

  // Chart options
  const chartOptions = {
    chart: {
      background: 'transparent',
      stacked: false,
      toolbar: {
        show: false,
      },
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 800,
        animateGradually: {
          enabled: true,
          delay: 150,
        },
        dynamicAnimation: {
          enabled: true,
          speed: 350,
        },
      },
    },
    colors: [theme.palette.primary.main, theme.palette.warning.main],
    dataLabels: {
      enabled: false,
    },
    fill: {
      opacity: 1,
      type: 'solid',
    },
    grid: {
      borderColor: theme.palette.divider,
      strokeDashArray: 2,
      xaxis: {
        lines: {
          show: false,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    legend: {
      horizontalAlign: 'right',
      labels: {
        colors: theme.palette.text.secondary,
      },
      position: 'top',
      show: true,
    },
    markers: {
      hover: {
        size: undefined,
        sizeOffset: 2,
      },
      radius: 2,
      shape: 'circle',
      size: 4,
      strokeWidth: 0,
    },
    stroke: {
      curve: 'smooth',
      dashArray: [0, 3],
      lineCap: 'butt',
      width: 3,
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
      categories: categories,
      labels: {
        style: {
          colors: theme.palette.text.secondary,
          fontSize: '12px',
          fontWeight: 600,
          cssClass: 'apexcharts-xaxis-label',
        },
        rotate: 0,
        offsetY: 5,
        offsetX: 0,
        align: 'center',
      },
    },
    yaxis: {
      axisBorder: {
        show: true,
      },
      axisTicks: {
        show: true,
      },
      labels: {
        style: {
          colors: theme.palette.text.secondary,
        },
      },
    },
    tooltip: {
      enabled: true,
      x: {
        show: true,
      },
      y: {
        formatter: (value, { seriesIndex, dataPointIndex, w }) => {
          // Use the seriesIndex and dataPointIndex to find the corresponding business name
          const businessName = w.config.series[seriesIndex].data[dataPointIndex].x;
          return `${businessName}: ${value}`;
        },
      },

      style: {
        fontSize: '12px',
      },
      onDatasetHover: {
        highlightDataSeries: true,
      },
      custom: function({ series, seriesIndex, dataPointIndex, w }) {
        // Access the business name using the dataPointIndex and the categories array
        const businessName = w.globals.labels[dataPointIndex];
        return (
          '<div class="apexcharts-tooltip-title">' +
          businessName +
          '</div><div class="apexcharts-tooltip-series-group"><span class="apexcharts-tooltip-marker"></span>' +
          '<div class="apexcharts-tooltip-text" style="font-size: 12px;">' +
          '<div class="apexcharts-tooltip-y-group"><span class="apexcharts-tooltip-text-label">' +
          series[seriesIndex][dataPointIndex] +
          '</span></div></div></div>'
        );
      },
    },
  };
  
  return (
  
 
          <Chart
            height={300}
            options={chartOptions}
            series={series}
            type="bar"
          />
     
  );
};

Chart.propTypes = {
  series: PropTypes.array.isRequired,
  categories: PropTypes.array.isRequired,
};

export default Chart2;
