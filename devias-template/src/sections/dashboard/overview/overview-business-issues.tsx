import type { FC } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import BusinessIcon from '@mui/icons-material/Business';
import React from 'react';

interface OverviewBusinessIssuesProps {
  amount: number;
  name: string;
}

export const OverviewBusinessIssues: FC<OverviewBusinessIssuesProps> = (props) => {
  const { name } = props;

  return (
    <Card>
      <Stack
        alignItems="center"
        direction={{
          xs: 'column',
          sm: 'row',
        }}
        spacing={3}
        sx={{
          px: 4,
          py: 3,
        }}
      >
        <div>
          <BusinessIcon sx={{ fontSize: 50 }} />
        </div>
        <Box sx={{ flexGrow: 1 }}>
          <Typography
            color="text.secondary"
            variant="body2"
          >
            Business Name
          </Typography>
          <Typography
            color="text.primary"
            variant="h5"
          >
            {name}
          </Typography>
        </Box>
      </Stack>
    </Card>
  );
};

OverviewBusinessIssues.propTypes = {
  amount: PropTypes.number.isRequired,
};
