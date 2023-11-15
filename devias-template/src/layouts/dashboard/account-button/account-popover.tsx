import PropTypes from 'prop-types';
import toast from 'react-hot-toast';
import CreditCard01Icon from '@untitled-ui/icons-react/build/esm/CreditCard01';
import Settings04Icon from '@untitled-ui/icons-react/build/esm/Settings04';
import User03Icon from '@untitled-ui/icons-react/build/esm/User03';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Popover from '@mui/material/Popover';
import SvgIcon from '@mui/material/SvgIcon';
import Typography from '@mui/material/Typography';
import { RouterLink } from 'src/components/router-link';
import { useRouter } from 'src/hooks/use-router';
import { paths } from 'src/paths';
import useLogout from '../../../hooks/logout';
import useUser from '../../../hooks/decode';
import { apiHandler } from '../../../api/bundle';
import { FC, useState, useEffect, useCallback } from 'react';

interface AccountPopoverProps {
  anchorEl: null | Element;
  onClose?: () => void;
  open?: boolean;
}

export const AccountPopover: FC<AccountPopoverProps> = (props) => {
  const { anchorEl, onClose, open, ...other } = props;
  const router = useRouter();
  const logout = useLogout(); // This hook should encapsulate the logout logic
  const user = useUser();
  const [userInfo, setUserInfo] = useState({ firstName: '', lastName: '', email: '' });
  const getUserInfo = async () => {
    try {
      const response = await apiHandler.handleGetProfile();
      if (response.success) {
        // Notice how we are now accessing the profile property of the response data
        setUserInfo(response.data.profile);
      } else {
        toast.error('Failed to fetch profile information.');
      }
    } catch (error) {
      console.error('Error fetching profile information:', error);
      toast.error('An error occurred while fetching profile information.');
    }
  };

  const handleLogout = useCallback(async (): Promise<void> => {
    try {
      onClose?.();
      await logout(); // Call the logout function provided by the useLogout hook
      toast.success('Logout successful!');
      router.push(paths.login); // Redirect to login page after logout
    } catch (err) {
      console.error(err);
      toast.error('Something went wrong!');
    }
  }, [router, onClose, logout]);

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: 'center',
        vertical: 'bottom',
      }}
      disableScrollLock
      onClose={onClose}
      open={!!open}
      PaperProps={{ sx: { width: 250 } }}
      {...other}
    >
      <Box sx={{ p: 2 }}>
        {userInfo && (
          <>
            <Typography variant="body1">{`${userInfo.firstName} ${userInfo.lastName}`}</Typography>
            <Typography
              color="text.secondary"
              variant="body2"
            >
              {userInfo.email}
            </Typography>
          </>
        )}
      </Box>
      <Divider />
      <Box sx={{ p: 1 }}>
        <ListItemButton
          component={RouterLink}
          href={paths.profile}
          onClick={onClose}
          sx={{
            borderRadius: 1,
            px: 1,
            py: 0.5,
          }}
        >
          <ListItemIcon>
            <SvgIcon fontSize="small">
              <User03Icon />
            </SvgIcon>
          </ListItemIcon>
          <ListItemText primary={<Typography variant="body1">Profile</Typography>} />
        </ListItemButton>
        <ListItemButton
          component={RouterLink}
          href={paths.billing}
          onClick={onClose}
          sx={{
            borderRadius: 1,
            px: 1,
            py: 0.5,
          }}
        >
          <ListItemIcon>
            <SvgIcon fontSize="small">
              <CreditCard01Icon />
            </SvgIcon>
          </ListItemIcon>
          <ListItemText primary={<Typography variant="body1">Billing</Typography>} />
        </ListItemButton>
      </Box>
      <Divider sx={{ my: '0 !important' }} />
      <Box
        sx={{
          display: 'flex',
          p: 1,
          justifyContent: 'center',
        }}
      >
        <Button
          color="inherit"
          onClick={handleLogout}
          size="small"
        >
          Logout
        </Button>
      </Box>
    </Popover>
  );
};

AccountPopover.propTypes = {
  anchorEl: PropTypes.any,
  onClose: PropTypes.func,
  open: PropTypes.bool,
};
