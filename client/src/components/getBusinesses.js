import React from 'react';
import { List, ListItem, ListItemText } from '@mui/material';

const BusinessList = ({ businesses, onSelectBusiness }) => {
  return (
    <List>
      {businesses.map((business) => (
        <ListItem
          button
          key={business.id}
          onClick={() => onSelectBusiness(business)}
        >
          <ListItemText primary={business.name} />
        </ListItem>
      ))}
    </List>
  );
};

export default BusinessList;
