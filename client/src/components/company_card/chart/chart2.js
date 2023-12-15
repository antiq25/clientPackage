import React, { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import IconButton from '@mui/material/IconButton';
import DotsHorizontalIcon from '@mui/icons-material/MoreHoriz';
import { Chart } from 'src/components/chart';
import { Scrollbar } from 'src/components/scrollbar';
import { useSelectedCompany } from 'src/contexts/reviews/SelectedCompanyContext';
import { useReviews } from 'src/components/company_card/ReviewsDataProvider';

export const Chart4 = () => {
  const theme = useTheme();
  const { selectedCompanyId } = useSelectedCompany();
  const { reviews } = useReviews();
  const [chartOptions, setChartOptions] = useState({});
  const [chartSeries, setChartSeries] = useState([]);
  const [selectedBusinessName, setSelectedBusinessName] = useState('');

  useEffect(() => {
    if (reviews && reviews.length > 0) {
      let filteredReviews = reviews;
      let businessName = 'All Businesses';

      if (selectedCompanyId) {
        filteredReviews = reviews.filter(review => review.businessId === selectedCompanyId);
        const selectedBusiness = reviews.find(review => review.businessId === selectedCompanyId);
        businessName = selectedBusiness ? selectedBusiness.business.name : 'Selected Business';
      }

      setSelectedBusinessName(businessName);

      const ratingsByMonth = filteredReviews.reduce((acc, review) => {
        const monthYear = new Date(review.publishedAt).toLocaleString('default', { month: 'short', year: 'numeric' });
        if (!acc[monthYear]) {
          acc[monthYear] = [];
        }
        acc[monthYear].push(review.rating);
        return acc;
      }, {});

      const sortedMonths = Object.keys(ratingsByMonth).sort((a, b) => new Date(a) - new Date(b));
      const chartData = sortedMonths.map(monthYear => {
        const ratings = ratingsByMonth[monthYear];
        const averageRating = (ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length).toFixed(2); // Format to two decimal places
        return parseFloat(averageRating); // Convert string back to float
      });

      setChartOptions({
        chart: {
          background: 'transparent',
          stacked: false,
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
          gradient: {
            opacityFrom: 0.4,
            opacityTo: 0.1,
            stops: [0, 100],
          },
          type: 'gradient',
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
        markers: {
          size: 6,
          strokeColors: theme.palette.background.default,
          strokeWidth: 3,
        },
        stroke: {
          curve: 'smooth',
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
          categories: sortedMonths,
          labels: {
            offsetY: 5,
            style: {
              colors: theme.palette.text.secondary,
            },
          },
        },
        yaxis: {
          labels: {
            formatter: (value) => `${value}`,
            offsetX: -10,
            style: {
              colors: theme.palette.text.secondary,
            },
          },
        },
      });

      setChartSeries([
        {
          name: 'Average Rating',
          data: chartData,
        }
      ]);
    }
  }, [selectedCompanyId, reviews, theme]);

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.mode === 'dark' ? 'neutral.800' : 'neutral.100',
        p: 3,
      }}
    >
      <Card>
        <CardHeader
          action={
            <IconButton>
              <DotsHorizontalIcon />
            </IconButton>
          }
          title={`Average Rating Over Time - ${selectedBusinessName}`}
        />
        <CardContent>
          <Scrollbar>
            <Box
              sx={{
                height: 375,
                minWidth: 500,
                position: 'relative',
              }}
            >
              {chartSeries.length > 0 && (
                <Chart
                  height={350}
                  options={chartOptions}
                  series={chartSeries}
                  type="line"
                />
              )}
            </Box>
          </Scrollbar>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Chart4;
