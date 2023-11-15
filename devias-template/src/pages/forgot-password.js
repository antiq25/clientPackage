'use client';
import React, { useState, useEffect, forwardRef } from 'react';
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
    Alert as MuiAlert,
} from '@mui/material';
import { Seo } from '../components/seo';
import { usePageView } from '../hooks/use-page-view';
import { useSettings } from '../hooks/use-settings';
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

const Page = () => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isClient, setIsClient] = useState(false);
    const [error, setError] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);

    const settings = useSettings();

    useEffect(() => {
        setIsClient(true);
    }, [router]);

    usePageView();

    if (!isClient) {
        return null;
    }

    const handleForgot = async (event) => {
        event.preventDefault();
        setIsSubmitting(true);

        const response = await apiHandler.handleForgotPassword(email);
        if (response.success) {
            setOpenSnackbar(true);
            setTimeout(() => {
                router.push('/reset-password');
            }, 4000);
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
        <>
            <Seo title="Dashboard: Analytics" />
            <Container
                maxWidth={settings.stretch ? false : 'sm'}
                sx={{ paddingTop: '200px' }}
            >
                <Card elevation={16}>
                    <CardHeader
                        sx={{ pb: 0 }}
                        title="Forgot password"
                    />
                    <CardContent>
                        <form onSubmit={handleForgot} noValidate>
                            <TextField
                                autoFocus
                                fullWidth
                                label="Email"
                                type="email"
                                name="email"
                                variant="outlined"
                                required
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                            />
                            {error && (
                                <FormHelperText
                                    error
                                    sx={{ mt: 3 }}
                                >
                                    {error.replaceAll("\"",'')}
                                </FormHelperText>
                            )}
                            <Button
                                disabled={isSubmitting}
                                fullWidth
                                sx={{ mt: 3 }}
                                type="submit"
                                variant="contained"
                            >
                                Send reset link
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
                    Resent Email Successful! Redirecting to reset ...
                </Alert>
            </Snackbar>
        </>
    );
};

export default Page;
