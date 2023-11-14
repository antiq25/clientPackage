import React, { useEffect, useState, forwardRef } from 'react';
import { useRouter } from 'next/router';
import {
  Card,
  CardHeader,
  CardContent,
  TextField,
  FormHelperText,
  Link,
  Button,
  Snackbar,
  Container,
  Stack,
  Typography,
  Alert as MuiAlert,
} from '@mui/material';
import { Seo } from 'src/components/seo';
import { useSettings } from 'src/hooks/use-settings';
import { apiHandler } from '../api/bundle';

const Alert = forwardRef((props, ref) => (
  <MuiAlert
    elevation={6}
    ref={ref}
    variant="filled"
    {...props}
  />
));
Alert.displayName = 'Alert';

const LoginPage = () => {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, [router]);

  const settings = useSettings();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  if (!isClient) {
    return null;
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const response = await apiHandler.handleLogin(email, password);
      if (response.success) {
        localStorage.setItem('token', response.data.token.token);
        console.log('Login successful:', response);
        setOpenSnackbar(true);
        setTimeout(() => {
          router.push('/');
        }, 2000);
      } else {
        setError(response.error || 'Login failed: Please try again.');
      }
    } catch (errorInstance) {
      setError('Login failed: Invalid credentials or server error');
      console.error('Login error:', errorInstance);
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
    <>
      <Seo title="Login" />
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
                  Don&apos;t have an account? &nbsp;
                  <Link
                    href="/register"
                    variant="body2"
                  >
                    Register
                  </Link>
                </Typography>
              }
              title={
                <Typography variant="h5">
                  Log in
                </Typography>
              }
            />
            <form
              onSubmit={handleLogin}
              noValidate
            >
              <Stack 
                spacing={2}
                mt={2}>
                <TextField
                  autoFocus
                  error={Boolean(error)}
                  fullWidth
                  label="Email Address"
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  value={email}
                />
                <TextField
                  error={Boolean(error)}
                  fullWidth
                  label="Password"
                  name="password"
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  value={password}
                />
              </Stack>
              {error && (
                <FormHelperText
                  error
                  sx={{ mt: 3 }}
                >
                  {error}
                </FormHelperText>
              )}
              <Button
                disabled={isSubmitting}
                fullWidth
                size="large"
                sx={{ mt: 2 }}
                type="submit"
                variant="contained"
              >
                Log In
              </Button>
            </form>
          </CardContent>
        </Card>
      </Container>
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
          Login successful! Redirecting...
        </Alert>
      </Snackbar>
    </>
  );
};

export default LoginPage;
