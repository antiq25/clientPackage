import { authAPI } from './apiCaller.js';
export const showSuccessMessage = (type, message) => console.log(generateMessage('success', type, message));
export const showErrorMessage = (type, message) => console.log(generateMessage('error', type, message));
export const generateMessage = (messageType, type, message) => `[${messageType.toUpperCase()}] ${type}: ${message}`;
export const handleAPIRequest = async (apiCall, args, type = '') => {
    try {
        const data = await apiCall(...args);
        showSuccessMessage(type, 'Request successful');
        return data;
    }
    catch (error) {
        showErrorMessage(type, error.message || 'Request failed');
        throw error;
    }
};
export const signup = async (email, password, firstName, lastName) => handleAPIRequest(authAPI.signup, [{ email, password, firstName, lastName }]);
export const handleLogin = async (email, password) => handleAPIRequest(authAPI.login, [{ email, password }]);
export const handleVerifyEmail = async (code) => handleAPIRequest(authAPI.verifyEmail, [code]);
export const handleResendEmailVerification = async (email) => handleAPIRequest(authAPI.resendEmailVerification, [{ email }]);
export const handleGetProfile = async (id) => handleAPIRequest(authAPI.getProfile, [id]);
export const handleUpdateProfile = async (id, profileData) => handleAPIRequest(authAPI.updateProfile, [id, profileData]);
export const handleForgotPassword = async (email) => handleAPIRequest(authAPI.forgotPassword, [email]);
export const handleResetPassword = async (token, password) => handleAPIRequest(authAPI.resetPassword, [token, password]);
