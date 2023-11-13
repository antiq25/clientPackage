import type { FC } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import RateReviewIcon from '@mui/icons-material/RateReview';

interface OverviewReviewIssuesProps {
  amount: number;
}

export const OverviewReviewIssues: FC<OverviewReviewIssuesProps> = (props) => {
  const { amount } = props;

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
          <RateReviewIcon sx={{ fontSize: 50 }} />
        </div>
        <Box sx={{ flexGrow: 1 }}>
          <Typography
            color="text.secondary"
            variant="body2"
          >
            Reviews Total
          </Typography>
          <Typography
            color="text.primary"
            variant="h5"
          >
            {amount}
          </Typography>
        </Box>
      </Stack>
    </Card>
  );
};

OverviewReviewIssues.propTypes = {
  amount: PropTypes.number.isRequired,
};
