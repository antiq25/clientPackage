import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import { handleLogin } from '../api/bundle.js'; // Update with the correct path

interface LoginFormProps {
  onSuccess: () => void; // Function to call on successful login
  onError: (message: string) => void; // Function to call on error
}

const LoginForm: React.FC<LoginFormProps> = ({ onSuccess, onError }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const login = async () => {
    setIsLoading(true);
    try {
      const response = await handleLogin(email, password);
      if (response.success) {
        onSuccess();
      } else {
        onError(response.error);
      }
    } catch (error) {
      onError('An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 4,
      }}
    >
      <Typography
        variant="h5"
        sx={{ mb: 2 }}
      >
        Sign In
      </Typography>
      <TextField
        label="Email"
        variant="outlined"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
        sx={{ mb: 2 }}
      />
      <TextField
        label="Password"
        type="password"
        variant="outlined"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
        sx={{ mb: 2 }}
      />
      <Button
        variant="contained"
        onClick={login}
        disabled={isLoading}
        fullWidth
      >
        {isLoading ? 'Logging in...' : 'Login'}
      </Button>
    </Box>
  );
};

export default LoginForm;
