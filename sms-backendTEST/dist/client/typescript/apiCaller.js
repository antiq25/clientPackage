"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authAPI = void 0;
const apiConfig_1 = require("./apiConfig");
const apiHelper_1 = require("./apiHelper");
const authAPIEndpoints = {
    signUp: '/auth/signup',
    login: '/auth/login',
    updateProfile: '/profile/update',
    verifyEmail: (code) => `/auth/verify?code=${code}`,
    resendEmailVerification: '/auth/request-email-verif',
    fetchProfile: '/profile/fetch',
    forgotPassword: '/recovery/forgot-password',
    resetPassword: '/recovery/reset-password'
};
exports.authAPI = {
    signup: (data) => (0, apiHelper_1.apiCall)('signUp', () => apiConfig_1.apiClient.post(authAPIEndpoints.signUp, data), 'Signup successful', 'Signup failed'),
    login: async (data) => {
        const response = await (0, apiHelper_1.apiCall)('login', () => apiConfig_1.apiClient.post(authAPIEndpoints.login, data), 'Login successful', 'Login failed');
        const { success, data: responseData } = response;
        if (success && responseData?.token?.token) {
            localStorage.setItem('token', responseData.token.token);
        }
        return response;
    },
    updateProfile: (id, data) => (0, apiHelper_1.apiCall)('updateProfile', () => apiConfig_1.apiClient.put(authAPIEndpoints.updateProfile, data), 'Profile updated', 'Updating profile failed'),
    verifyEmail: (code) => (0, apiHelper_1.apiCall)('verifyEmail', () => apiConfig_1.apiClient.get(authAPIEndpoints.verifyEmail(code)), 'Email verified', 'Email verification failed'),
    resendEmailVerification: (data) => (0, apiHelper_1.apiCall)('resendEmailVerification', () => apiConfig_1.apiClient.post(authAPIEndpoints.resendEmailVerification, data), 'Verification email resent', 'Resending verification email failed'),
    getProfile: (id) => (0, apiHelper_1.apiCall)('fetchProfile', () => apiConfig_1.apiClient.get(authAPIEndpoints.fetchProfile), 'Profile fetched', 'Fetching profile failed'),
    forgotPassword: (email) => (0, apiHelper_1.apiCall)('forgotPassword', () => apiConfig_1.apiClient.post(authAPIEndpoints.forgotPassword, { email }), 'Forgot password email sent', 'Forgot password failed'),
    resetPassword: (code, password) => (0, apiHelper_1.apiCall)('resetPassword', () => apiConfig_1.apiClient.post(authAPIEndpoints.resetPassword, { code, password }), 'Password reset successful', 'Password reset failed')
};
