import { apiCall } from './apiHelper.js';
import apiClient from './apiConfig.js';
export const authAPIEndpoints = {
    signUp: '/auth/signup',
    login: '/auth/login',
    updateProfile: '/profile/update',
    verifyEmail: (code) => `/auth/verify?code=${code}`,
    resendEmailVerification: '/auth/request-email-verif',
    fetchProfile: '/profile/fetch',
    forgotPassword: '/recovery/forgot-password',
    resetPassword: '/recovery/reset-password',
    createListing: '/dashboard/create-listing',
    getListing: '/dashboard/get-listing',
    fetchReviews: '/dashboard/fetch-reviews'
};
export const authAPI = {
    signup: (data) => apiCall('signUp', () => apiClient.post(authAPIEndpoints.signUp, data), 'Signup successful', 'Signup failed'),
    login: (data) => apiCall('login', () => apiClient.post(authAPIEndpoints.login, data), 'Login successful', 'Login failed').then((response) => {
        // After a successful login, if there is a token, store it.
        if (response.success && response.data?.token?.token) {
            localStorage.setItem('token', response.data.token.token);
        }
        return response; // This maintains the same structure as the apiCall response.
    }),
    updateProfile: (id, data) => apiCall('updateProfile', () => apiClient.put(authAPIEndpoints.updateProfile, data), 'Profile updated', 'Updating profile failed'),
    verifyEmail: (code) => apiCall('verifyEmail', () => apiClient.get(authAPIEndpoints.verifyEmail(code)), 'Email verified', 'Email verification failed'),
    resendEmailVerification: (data) => apiCall('resendEmailVerification', () => apiClient.post(authAPIEndpoints.resendEmailVerification, data), 'Verification email resent', 'Resending verification email failed'),
    getProfile: (id) => apiCall('fetchProfile', () => apiClient.get(authAPIEndpoints.fetchProfile), 'Profile fetched', 'Fetching profile failed'),
    forgotPassword: (email) => apiCall('forgotPassword', () => apiClient.post(authAPIEndpoints.forgotPassword, { email }), 'Forgot password email sent', 'Forgot password failed'),
    resetPassword: (code, password) => apiCall('resetPassword', () => apiClient.post(authAPIEndpoints.resetPassword, { code, password }), 'Password reset successful', 'Password reset failed'),
    createListing: (userId, name, reviews_url, description) => apiCall('createListing', () => apiClient.post(authAPIEndpoints.createListing, {
        userId,
        name,
        reviews_url,
        description
    }), 'Listing created successfully', 'Listing creation failed'),
    getListing: (userId, listingName) => apiCall('getListing', () => apiClient.get(authAPIEndpoints.getListing, {
        params: { userId, listingName }
    }), 'Listing fetched', 'Fetching listing failed'),
    fetchReviews: (listingId, max_reviews) => apiCall('fetchReviews', () => apiClient.get(authAPIEndpoints.fetchReviews, {
        params: { listingId, max_reviews }
    }), 'Reviews fetched', 'Fetching reviews failed')
};
