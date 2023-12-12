import dynamic from 'next/dynamic';
import { alpha } from '@mui/system/colorManipulator';
import { styled } from '@mui/system';

const ApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
  loading: () => null,
});

const containerStyle = {
  width: '100%',
  height: '400px',
};

const center = {
  lat: 49.2827,
  lng: -123.1207,
};

const libraries = ['places'];

const Chart = styled(ApexChart)(({ theme }) => ({
  '& .apexcharts-xaxistooltip': {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[16],
    borderRadius: theme.shape.borderRadius,
    border: 0,
    '&::before, &::after': {
      display: 'none',
    },
  },
  '& .apexcharts-tooltip': {
    '&.apexcharts-theme-light, &.apexcharts-theme-dark': {
      backdropFilter: 'blur(6px)',
      background: 'transparent',
      border: 0,
      boxShadow: 'none',
      '& .apexcharts-tooltip-title': {
        background: alpha(theme.palette.neutral[900], 0.8),
        border: 0,
        color: theme.palette.common.white,
        margin: 0,
      },
      '& .apexcharts-tooltip-series-group': {
        background: alpha(theme.palette.neutral[900], 0.7),
        border: 0,
        color: theme.palette.common.white,
      },
    },
  },
}));

const chartOptions = {
  chart: {
    background: 'transparent',
    stacked: false,
    toolbar: {
      show: false,
    },
  },

  grid: {
    borderColor: theme.palette.divider,
    padding: {
      bottom: 0,
      left: 0,
      right: 0,
      top: 0,
    },
    strokeDashArray: 2,
  },
  plotOptions: {
    bar: {
      borderRadius: 8,
      horizontal: false,
    },
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
    categories: ['Average Rating', 'Total Reviews'],
  },
  yaxis: [
    {
      seriesName: 'Average Rating',
      axisTicks: {
        show: true,
      },
      axisBorder: {
        show: true,
        color: '#8884d8',
      },
      labels: {
        style: {
          colors: '#8884d8',
        },
      },
      title: {
        text: 'Average Rating',
        style: {
          color: '#8884d8',
        },
      },
    },
    {
      opposite: true,
      seriesName: 'Total Reviews',
      axisTicks: {
        show: true,
      },
      axisBorder: {
        show: true,
        color: '#82ca9d',
      },
      labels: {
        style: {
          colors: '#82ca9d',
        },
      },
      title: {
        text: 'Total Reviews',
        style: {
          color: '#82ca9d',
        },
      },
    },
  ],
};

const chartSeries = [
  {
    name: 'Average Rating',
    data: reviewData.map((item) => item.averageRating),
  },
  {
    name: 'Total Reviews',
    data: reviewData.map((item) => item.totalReviews),
  },
];

export default Chart;
