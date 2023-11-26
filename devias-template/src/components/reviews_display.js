import React from 'react';
import { Paper, Typography, List, ListItem, Divider } from '@mui/material';

const ReviewsDisplay = ({ reviews }) => {
  // Group reviews by business name
  const reviewsByBusiness = reviews.reduce((acc, review) => {
    const { business } = review;
    if (!acc[business.name]) {
      acc[business.name] = [];
    }
    acc[business.name].push(review);
    return acc;
  }, {});

  return (
    <div>
      {Object.entries(reviewsByBusiness).map(([businessName, reviews]) => (
        <Paper
          elevation={3}
          style={{ padding: '20px', marginTop: '20px' }}
          key={businessName}
        >
          <Typography
            variant="h5"
            gutterBottom
          >
            Business Name: {businessName}
          </Typography>
          <Typography variant="subtitle1">Total Reviews: {reviews.length}</Typography>
          <List>
            {reviews.map((review, index) => (
              <React.Fragment key={review.review_id}>
                {index > 0 && <Divider />}
                <ListItem>
                  <Typography variant="subtitle2">Reviewer: {review.reviewer_name}</Typography>
                  <Typography variant="body2">Rating: {review.rating}</Typography>
                  <Typography variant="body2">Review: {review.review_text}</Typography>
                  <Typography variant="body2">
                    Published Date: {review.published_at_date}
                  </Typography>
                </ListItem>
              </React.Fragment>
            ))}
          </List>
        </Paper>
      ))}
    </div>
  );
};

export default ReviewsDisplay;
p
