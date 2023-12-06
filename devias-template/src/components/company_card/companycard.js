import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { useReviews } from 'src/components/company_card/ReviewsDataProvider';
import { CompanyCard } from 'src/sections/dashboard/jobs/company-card';
import WidgetsList from 'src/components/company_card/WidgetCardList';
import { useState, useEffect } from 'react';
import useUser  from 'src/hooks/decode';


const BusinessNamesList = () => {
    const { isLoading, error, reviews } = useReviews();
    const { widgetsData, setWidgetsData } = useState([]);
    const userId = useUser();

     const fetchUserWidgets = async () => {
    try {
      const response = await axios.get(`http://localhost:3002/scrape/user-widgets`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setWidgetsData(response.data);
    } catch (error) {
      console.error('Error fetching widgets', error);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchUserWidgets();
    }
  }, [userId]);

    console.log(widgetsData);

    if (isLoading) {
        return <CircularProgress />;
    }

    if (error) {
        return <Typography color="error">{error.message ? error.message : 'An error occurred'}</Typography>;
    }

    if (!reviews || reviews.length === 0) {
        return <Typography>No reviews data found.</Typography>;
    }

    // Extract unique business IDs from the reviews
    const uniqueBusinesses = reviews.reduce((acc, review) => {
        const { business } = review;
        if (business && !acc[business.id]) {
            acc[business.id] = {
                ...business,
                reviews: [],
                averageRating: 0, // Initialize average rating
                reviewCount: 0, // Initialize review count
            };
        }
        if (business) {
            acc[business.id].reviews.push(review);
            acc[business.id].reviewCount += 1;
            acc[business.id].averageRating += review.rating;
        }
        return acc;
    }, {});

    // Calculate the average rating for each business
    Object.keys(uniqueBusinesses).forEach((businessId) => {
        const business = uniqueBusinesses[businessId];
        business.averageRating = (business.averageRating / business.reviewCount).toFixed(1);
    });


                
    

    return (
        <Grid item key={widget.id} xs={12} sm={6} md={4}>
        {widgetsData.map((widget) => (
                <CompanyCard
                    key={widget.id}
                    company={{
                        name: widget.business.name,
                        shortDescription: widget.widgetDescription,
                        logo: widget.widgetLogo,
                        employees: widget.widgetEmployees,
                        averageRating: widget.widgetRating,
                        isVerified: true,
                        jobs: [],
                    }}
                />
            ))}
        </Grid>
    );
};

export default BusinessNamesList;
