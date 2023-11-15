'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import {
    Card,
    CardHeader,
    CardContent,
    TextField,
    FormHelperText,
    Button,
    Snackbar,
    Container,
    Alert as MuiAlert,
} from '@mui/material';
import { Seo } from '../components/seo';
import { useSettings } from '../hooks/use-settings';
import { apiHandler } from '../api/bundle';

const ResetPasswordPage = () => {
    const router = useRouter();
    const [resetCode, setResetCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);

    const settings = useSettings();

    const handleResetPassword = async (event) => {
        event.preventDefault();
        if (newPassword !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        setIsSubmitting(true);
        setError('');

        try {
            const response = await apiHandler.handleResetPassword(resetCode, newPassword);
            if (response.success) {
                setOpenSnackbar(true);
                setTimeout(() => {
                    router.push('/login');
                }, 4000);
            } else {
                setError(response.error);
            }
        } catch (errorInstance) {
            setError('Failed to reset password.');
            console.error('Reset Password Error:', errorInstance);
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
            <Seo title="Reset Password" />
            <Container
                maxWidth={settings.stretch ? false : 'sm'}
                sx={{ paddingTop: '200px' }}
            >
                <Card elevation={16}>
                    <CardHeader title="Reset Password" />
                    <CardContent>
                        <form onSubmit={handleResetPassword} noValidate>
                            <TextField
                                autoFocus
                                fullWidth
                                label="Reset Code"
                                margin="normal"
                                name="resetCode"
                                onChange={(e) => setResetCode(e.target.value)}
                                type="text"
                                value={resetCode}
                            />
                            <TextField
                                fullWidth
                                label="New Password"
                                margin="normal"
                                name="newPassword"
                                onChange={(e) => setNewPassword(e.target.value)}
                                type="password"
                                value={newPassword}
                            />
                            <TextField
                                fullWidth
                                label="Confirm New Password"
                                margin="normal"
                                name="confirmPassword"
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                type="password"
                                value={confirmPassword}
                            />
                            {error && (
                                <FormHelperText error sx={{ mt: 2 }}>
                                    {error}
                                </FormHelperText>
                            )}
                            <Button
                                disabled={isSubmitting}
                                fullWidth
                                size="large"
                                sx={{ mt: 3 }}
                                type="submit"
                                variant="contained"
                            >
                                Change Password
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
                <MuiAlert
                    onClose={handleCloseSnackbar}
                    severity="success"
                    sx={{ width: '100%' }}
                >
                    Password Reset Successful! Redirecting...
                </MuiAlert>
            </Snackbar>
        </>
    );
};

export default ResetPasswordPage;
