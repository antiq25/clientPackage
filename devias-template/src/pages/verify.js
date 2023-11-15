import React, { useState, forwardRef, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  Card,
  CardHeader,
  CardContent,
  TextField,
  Button,
  Snackbar,
  Container,
  Stack,
  Typography,
  Alert as MuiAlert,
} from '@mui/material';
import { Seo } from '../components/seo';
import { useSettings } from '../hooks/use-settings';
import { apiHandler } from '../api/bundle';
import useUser from '../hooks/decode';

const Alert = forwardRef((props, ref) => (
  <MuiAlert
    elevation={6}
    ref={ref}
    variant="filled"
    {...props}
  />
));
Alert.displayName = 'Alert';

const VerifyEmailPage = () => {
  const router = useRouter();
  const settings = useSettings();
  const user = useUser();
  const [code, setCode] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleVerifyEmail = async () => {
    setIsSubmitting(true);
    setError('');
    try {
      const response = await apiHandler.handleVerifyEmail(code);
      if (response.success) {
        setOpenSnackbar(true);
        setTimeout(() => {
          router.push('/login');
        }, 2000);
      } else {
        setError('Verification failed. Please try again.');
      }
    } catch (errorInstance) {
      setError('Verification error. Please try again later.');
      console.error('Verification error:', errorInstance);
    }
    setIsSubmitting(false);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  useEffect(() => {}, [user]);

  return (
    <>
      <Seo title="Verify Email" />
      <Container maxWidth={settings.stretch ? false : 'xl'}>
        <Card
          elevation={14}
          sx={{ margin: '25px' }}
        >
          <CardHeader title="Email Verification" />
          <CardContent>
            <form
              onSubmit={(e) => e.preventDefault()}
              noValidate
            >
              <Stack spacing={3}>
                <TextField
                  autoFocus
                  error={Boolean(error)}
                  fullWidth
                  label="Verification Code"
                  name="verificationCode"
                  onChange={(e) => setCode(e.target.value)}
                  type="text"
                  value={code}
                />
                {error && (
                  <Typography
                    color="error"
                    variant="body2"
                  >
                    {error}
                  </Typography>
                )}
                <Button
                  disabled={isSubmitting}
                  fullWidth
                  size="large"
                  onClick={handleVerifyEmail}
                  variant="contained"
                >
                  Verify Email
                </Button>
              </Stack>
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
          Email verified! Redirecting to login...
        </Alert>
      </Snackbar>
    </>
  );
};

export default VerifyEmailPage;
