'use client';
import React, { useState, useEffect, useRef } from 'react';
import {
    Container,
    Card,
    CardContent,
    TextField,
    Button,
    Typography,
    Snackbar,
    Alert,
    Box,
    Stack
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { Seo } from 'src/components/seo';
import { Layout as DashboardLayout } from 'src/layouts/dashboard';
import { useSettings } from 'src/hooks/use-settings';
import { usePageView } from '../hooks/use-page-view';
import { apiHandler } from '../api/bundle';
import useUser from '../hooks/decode';

const Page = () => {
    const settings = useSettings();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [isUpdating, setIsUpdating] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');
    const user = useUser();
    const [userInfo, setUserInfo] = useState({ firstName: '', lastName: '', email: '' });

    usePageView();

    const getUserInfo = async () => {
        try {
            const response = await apiHandler.handleGetProfile();
            if (response.success) {
                // Notice how we are now accessing the profile property of the response data
                const profile = response.data.profile;
                setFirstName(profile.firstName);
                setLastName(profile.lastName);
                setEmail(profile.email);
                setUserInfo(profile);
            } else {
                toast.error('Failed to fetch profile information.');
            }
        } catch (error) {
            console.error('Error fetching profile information:', error);
            toast.error('An error occurred while fetching profile information.');
        }
    };

    useEffect(() => {
        getUserInfo();
    }, []);

    useEffect(() => {
        const observer = new MutationObserver(mutations => {
            mutations.forEach(mutation => {
                if (mutation.type === 'attributes' && mutation.attributeName.startsWith('autofill-')) {
                    mutation.target.removeAttribute(mutation.attributeName);
                }
            });
        });

        const inputs = document.querySelectorAll('input');
        inputs.forEach(input => {
            observer.observe(input, { attributes: true });
        });

        return () => observer.disconnect();
    }, []);


    const handleUpdate = async () => {
        setIsUpdating(true);
        if (userInfo.firstName === firstName && userInfo.lastName === lastName) {
            setSnackbarMessage('No changes detected. Profile not updated.');
            setSnackbarSeverity('info');
            setSnackbarOpen(true);
            setIsUpdating(false);
        } else {
            const response = await apiHandler.handleUpdateProfile(user.id, { firstName, lastName });
            setSnackbarMessage(response.success ? 'Profile updated successfully!' : response.error);
            setSnackbarSeverity(response.success ? 'success' : 'error');
            setSnackbarOpen(true);
            setIsUpdating(false);
        }
    };

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbarOpen(false);
    };



    return (
        <>
            <Seo title="Profile" />
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    py: 8,
                }}>
                <Container maxWidth={settings.stretch ? false : 'xl'}>
                    <Grid xs={12}>
                        <Stack
                            direction="row"
                            justifyContent="space-between"
                            spacing={4}
                        >
                            <Stack spacing={1}>
                                <Typography variant="h4">Account</Typography>
                            </Stack>
                        </Stack>
                    </Grid>
                    <Card elevation={14} sx={{ marginTop: '50px' }}>
                        <CardContent>
                            <Grid
                                container
                                spacing={3}
                            >
                                <Grid
                                    xs={12}
                                    md={4}
                                >
                                    <Typography variant="h6">Basic details</Typography>
                                </Grid>
                                <Grid
                                    xs={12}
                                    md={8}
                                >
                                    <TextField
                                        name={`firstName`}
                                        id={`firstName`}
                                        fullWidth
                                        label="First Name"
                                        margin="normal"
                                        value={firstName ? firstName : ''}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        type="firstName"
                                        autoComplete="off"
                                    />
                                    <TextField
                                        name={`LastName`}
                                        id={`LastName`}
                                        fullWidth
                                        label="Last Name"
                                        margin="normal"
                                        value={lastName ? lastName : ''}
                                        onChange={(e) => setLastName(e.target.value)}
                                        type="lastName"
                                        autoComplete="off"
                                    />
                                    <TextField
                                        name={`email`}
                                        id={`email`}
                                        fullWidth
                                        label="Email Address"
                                        margin="normal"
                                        value={email ? email : ''}
                                        disabled={true}
                                        type="email"
                                        autoComplete="off"
                                    />
                                    <Button
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        sx={{ marginTop: '20px' }}
                                        onClick={handleUpdate}
                                        disabled={isUpdating}
                                        type="submit"
                                    >
                                        Update
                                    </Button>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                    <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                        <Alert elevation={6} variant="filled" severity={snackbarSeverity} onClose={handleCloseSnackbar}>
                            {snackbarMessage}
                        </Alert>
                    </Snackbar>
                </Container>
            </Box >
        </>
    );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
