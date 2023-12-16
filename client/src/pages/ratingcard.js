import React, { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import dynamic from 'next/dynamic';
import { useSelectedCompany } from 'src/contexts/reviews/SelectedCompanyContext';
import { useReviews } from 'src/components/company_card/ReviewsDataProvider';


import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import IconButton from '@mui/material/IconButton';
import DotsHorizontalIcon from '@mui/icons-material/MoreHoriz';
import { Scrollbar } from 'src/components/scrollbar';

const ApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

const TopCompaniesChart = () => {
  const theme = useTheme();
  const { setSelectedCompanyId } = useSelectedCompany();
  const { reviews } = useReviews();
  const [chartSeries, setChartSeries] = useState([]);
  const [chartCategories, setChartCategories] = useState([]);

  useEffect(() => {
    if (reviews && reviews.length > 0) {
      // Aggregate ratings by business
      const businessRatings = reviews.reduce((acc, review) => {
        const businessId = review.business.id;
        const businessName = review.business.name;
        if (!acc[businessId]) {
          acc[businessId] = { ratings: [], averageRating: 0, businessName };
        }
        acc[businessId].ratings.push(review.rating);
        return acc;
      }, {});

      // Calculate average rating for each business
      const calculatedBusinesses = Object.values(businessRatings).map(business => ({
        ...business,
        averageRating: (business.ratings.reduce((sum, r) => sum + r, 0) / business.ratings.length).toFixed(2) // Format to two decimal places
      }));

      // Sort businesses by average rating and take the top 5
      const topBusinesses = calculatedBusinesses.sort((a, b) => b.averageRating - a.averageRating).slice(0, 5);

      setChartSeries([{ name: 'Average Rating', data: topBusinesses.map(b => parseFloat(b.averageRating)) }]);
      setChartCategories(topBusinesses.map(b => b.businessName));
    }
  }, [reviews]);

  const chartOptions = {
    chart: {
      type: 'bar',
      height: 350,
      background: 'transparent',
      events: {
        dataPointSelection: (event, chartContext, config) => {
          const businessName = chartCategories[config.dataPointIndex];
          const selectedBusiness = reviews.find(review => review.business.name === businessName).business;
          setSelectedCompanyId(selectedBusiness.id);
        },
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
          speed: 500,
        },
      },
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        horizontal: false,
      },
    },
    dataLabels: {
      enabled: true,
    },
    xaxis: {
      categories: chartCategories,
      labels: {
        rotate: 0, // Keep labels horizontal
      },
    },
    yaxis: {
      title: {
        text: 'Average Rating',
      },
    },
    fill: {
      opacity: 1,
    },
    theme: {
      mode: theme.palette.mode,
    },
    colors: [theme.palette.primary.main],
  };

  return (
    <>
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
          title={'Average Rating Over Time'}
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

      <ApexChart
        options={chartOptions}
        series={chartSeries}
        type="bar"
        height={350}
      />
      
          </Box>
          </Scrollbar>
        </CardContent>
      </Card>
    </Box>
    </>
  
  );
};

export default TopCompaniesChart;
