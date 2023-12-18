import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useReviews } from 'src/api/providers/ReviewsDataProvider';
import { CompanyCard } from 'src/sections/dashboard/jobs/company-card';

const BusinessNamesList = () => {
    const { isLoading, error, reviews } = useReviews();
    
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
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
            {Object.values(uniqueBusinesses).map((business) => (
                <CompanyCard
                    key={business.id}
                    company={{
                        name: business.name,
                        shortDescription: business.mainCategory || 'No description available', // Use mainCategory as a short description
                        logo: business.featuredImage,
                        employees: 'N/A', // Placeholder as employees data is not available
                        averageRating: business.averageRating,
                        isVerified: business.isSpendingOnAds, // Assuming isSpendingOnAds indicates verification
                        jobs: [], // Placeholder as job data is not available
                    }}
                />
            ))}
        </Box>
    );
};

export default BusinessNamesList;
