import { authAPI } from './apiCaller.js';
export const handleSignup = (email, password, firstName, lastName) => {
    return authAPI.signup({ email, password, firstName, lastName });
};
export const handleLogin = (email, password) => {
    return authAPI.login({ email, password });
};
export const handleVerifyEmail = (code) => {
    return authAPI.verifyEmail(code);
};
export const handleResendEmailVerification = (email) => {
    return authAPI.resendEmailVerification({ email });
};
export const handleGetProfile = (id) => {
    return authAPI.getProfile(id);
};
export const handleUpdateProfile = (id, profileData) => {
    return authAPI.updateProfile(id, profileData);
};
export const handleForgotPassword = (email) => {
    return authAPI.forgotPassword(email);
};
export const handleResetPassword = (token, password) => {
    return authAPI.resetPassword(token, password);
};
export const handleCreateListing = (userId, name, reviews_url, description) => {
    return authAPI.createListing(userId, name, reviews_url, description);
};
export const handleGetListing = (userId, listingName) => {
    return authAPI.getListing(userId, listingName);
};
export const handleFetchReviews = (listingId, max_reviews) => {
    return authAPI.fetchReviews(listingId, max_reviews);
};
