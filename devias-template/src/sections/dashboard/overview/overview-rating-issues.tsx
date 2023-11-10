import type { FC } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import StarOutlineIcon from '@mui/icons-material/StarOutline';

interface OverviewRatingIssuesProps {
  amount: number;
}

export const OverviewRatingIssues: FC<OverviewRatingIssuesProps> = (props) => {
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
          <StarOutlineIcon sx={{ fontSize: 50 }}/>
        </div>
        <Box sx={{ flexGrow: 1 }}>
          <Typography
            color="text.secondary"
            variant="body2"
          >
            Rating Average
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

OverviewRatingIssues.propTypes = {
  amount: PropTypes.number.isRequired,
};
