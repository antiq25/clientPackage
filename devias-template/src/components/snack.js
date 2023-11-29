import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useTheme } from '@mui/system';

// Create an Alert component based on MuiAlert
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6}
ref={ref}
variant="outlined"
{...props} />;
});

// CustomSnackbar component
const CustomSnackbar = ({ open, handleClose, message, severity }) => {
  const theme = useTheme();

  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      sx={{
        // You can customize the style using the theme
        '& .MuiSnackbarContent-root': {
          backgroundColor: theme.palette.background.paper,
          colorRendering: theme.shadows[11],
          margin: theme.spacing(1),
          color: theme.palette.text.primary,
          border: `1px solid ${theme.palette.primary.main}`,
          boxShadow: theme.shadows[11],
          borderRadius: theme.spacing(1),
          opacity: 0.9,
          padding: theme.spacing(1),

        },
      }}
    >
      <Alert onClose={handleClose}
severity={severity}
sx={{ width: '40%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default CustomSnackbar;
