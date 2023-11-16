import * as apiHandler from '../apiWrap';
export const getInputValue = (id) => {
    return document.getElementById(id).value;
};
export const handleSignup = async () => {
    const email = getInputValue('signupEmail');
    const password = getInputValue('signupPassword');
    const firstName = getInputValue('signupFirstName');
    const lastName = getInputValue('signupLastName');
    await apiHandler.handleSignup(email, password, firstName, lastName);
};
export const handleLogin = async () => {
    const email = getInputValue('loginEmail');
    const password = getInputValue('loginPassword');
    await apiHandler.handleLogin(email, password);
};
export const handleVerifyEmail = async () => {
    const code = getInputValue('verifyEmailCode');
    await apiHandler.handleVerifyEmail(code);
};
export const handleResendEmailVerification = async () => {
    const email = getInputValue('resendVerificationEmail');
    await apiHandler.handleResendEmailVerification(email);
};
export const handleGetProfile = async () => {
    const id = Number(localStorage.getItem('userId'));
    await apiHandler.handleGetProfile(id);
};
export const handleUpdateProfile = async () => {
    const id = Number(localStorage.getItem('userId'));
    const firstName = getInputValue('firstName');
    const lastName = getInputValue('lastName');
    const profileData = { firstName, lastName };
    await apiHandler.handleUpdateProfile(id, profileData);
};
export const handleForgotPassword = async () => {
    const email = getInputValue('forgotPasswordEmail');
    await apiHandler.handleForgotPassword(email);
};
export const handleResetPassword = async () => {
    const token = getInputValue('resetPasswordToken');
    const password = getInputValue('resetPassword');
    await apiHandler.handleResetPassword(token, password);
};
export const handleFetchReviews = async () => {
    const listingId = Number(getInputValue('listingId'));
    const max_reviews = Number(getInputValue('max_reviews'));
    await apiHandler.handleFetchReviews(listingId, max_reviews);
};
export const handleCreateListing = async () => {
    const name = getInputValue('name');
    const reviews_url = getInputValue('reviews_url');
    const description = getInputValue('description');
    const userId = Number(localStorage.getItem('userId')); // Assuming the user ID is stored in localStorage
    await apiHandler.handleCreateListing(userId, name, reviews_url, description);
};
export const handleGetListing = async () => {
    const userId = Number(getInputValue('userId'));
    const listingName = getInputValue('listingName');
    await apiHandler.handleGetListing(userId, listingName);
};
