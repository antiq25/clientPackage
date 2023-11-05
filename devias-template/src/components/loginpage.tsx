import React from 'react';
import LoginForm from './loginform'; // Make sure the path is correct
import { Box } from '@mui/material';

const LoginPage: React.FC = () => {
  const handleSuccess = () => {
    console.log('Login successful! Redirecting to dashboard...');
    // Implement your success logic, like redirecting to the dashboard
  };

  const handleError = (message: string) => {
    console.error(`Login error: ${message}`);
    // Implement your error handling logic, like showing an error message to the user
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: 'background.default',
        padding: 4,
      }}
    >
      <LoginForm
        onSuccess={handleSuccess}
        onError={handleError}
      />
    </Box>
  );
};

export default LoginPage;
