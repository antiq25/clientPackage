import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { AccountPlanIcon } from 'src/components/account-plan-icon';
import { paths } from 'src/paths';
import { Logo } from 'src/components/logo'

const issuers = {
  login: paths.login
};



export const AuthIssuer = (props) => {
  const { issuer: currentIssuer } = props;

  return (
    <Box
      sx={{
        borderColor: 'divider',
        borderRadius: 2.5,
        borderStyle: 'solid',
        borderWidth: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        p: 3,
      }}
    >
      <Typography variant="body2">
        <Link
          component="a"
          href={paths.docs}
          target="_blank"
          underline="hover"
          variant="subtitle2"
        >
         
        </Link>{' '}
      </Typography>
      <Stack
        alignItems="center"
        direction="row"
        gap={3}
        sx={{ mt: 2 }}
      >
        {Object.keys(issuers).map((issuer) => {
          const isCurrent = issuer === currentIssuer;
          const icon = issuers[issuer];

          return (
            <Tooltip
              key={issuer}
              title={issuer}
            >
              <Box />
              <Card>
                <Logo />
                <Logo />
                <Logo />
              </Card>
            </Tooltip>
          );
        })}
      </Stack>
    </Box>
  );
};

AuthIssuer.propTypes = {
  issuer: PropTypes.string.isRequired,
};
