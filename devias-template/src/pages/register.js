import React, { useState, forwardRef } from 'react';
import { useRouter } from 'next/router';
import {
  Card,
  CardHeader,
  CardContent,
  TextField,
  Link,
  Button,
  Snackbar,
  Container,
  Stack,
  FormHelperText,
  Typography,
  Alert as MuiAlert,
} from '@mui/material';
import { useSettings } from 'src/hooks/use-settings';
import { apiHandler } from '../api/bundle'; // Adjust the path as necessary

const Alert = forwardRef((props, ref) => (
  <MuiAlert
    elevation={6}
    ref={ref}
    variant="filled"
    {...props}
  />
));
Alert.displayName = 'Alert';

const RegisterPage = () => {
  const router = useRouter();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const settings = useSettings();
  
  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    
    setIsSubmitting(true);
    setError('');

    const response = await apiHandler.handleSignup(email, password, firstName, lastName);
    if (response.success) {
      setOpenSnackbar(true);
      setTimeout(() => {
        router.push('/login');
      }, 2000);
    } else {
      setError(response.error);
    }
    setIsSubmitting(false);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <Container
      maxWidth={settings.stretch ? false : 'sm'}
      sx={{ paddingTop: '200px' }}
    >
      <Card
        elevation={14}
        sx={{ margin: '25px' }}
      >
        <CardContent>
          <CardHeader
            sx={{ padding: '0px' }}
            subheader={
              <Typography
                color="text.secondary"
                variant="body2"
              >
                Already have an account? &nbsp;
                <Link
                  href="/login"
                  variant="body2"
                >
                  Log in here.
                </Link>
              </Typography>
            }
            title={
              <Typography variant="h5">
                Register
              </Typography>
            }
          />
          <form
            onSubmit={handleRegister}
            noValidate
          >
            <Stack
              spacing={2}
              mt={2}
            >
              <TextField
                label="First Name"
                variant="outlined"
                fullWidth
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <TextField
                label="Last Name"
                variant="outlined"
                fullWidth
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
              <TextField
                label="Email"
                type="email"
                variant="outlined"
                fullWidth
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <TextField
                label="Confirm Password"
                type="password"
                variant="outlined"
                fullWidth
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {error && (
                <FormHelperText
                  error
                  mt={2}
                >
                  {error.replaceAll("\"",'')}
                </FormHelperText>
              )}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={isSubmitting}
                sx={{ mt: 2 }}
              >
                Register
              </Button>
            </Stack>
          </form>
        </CardContent>
      </Card>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          sx={{ width: '100%' }}
        >
          Registration successful! Redirecting to login...
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default RegisterPage;
