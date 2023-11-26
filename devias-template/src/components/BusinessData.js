import React from 'react';
import { Typography, List, ListItem, Divider } from '@mui/material';

const BusinessDetails = ({ business }) => {
  if (!business) {
    return <Typography>Select a business to view details</Typography>;
  }

  return (
    <div>
      <Typography variant="h5">{business.name}</Typography>
      <List>
        {business.reviews.map((review) => (
          <React.Fragment key={review.review_id}>
            <ListItem alignItems="flex-start">
              <ListItemText
                primary={`Reviewer: ${review.reviewer_name}`}
                secondary={`Rating: ${review.rating} - ${review.review_text}`}
              />
            </ListItem>
            <Divider
              variant="inset"
              component="li"
            />
          </React.Fragment>
        ))}
      </List>
    </div>
  );
};

export default BusinessDetails;
